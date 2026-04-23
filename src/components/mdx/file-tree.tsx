import { joinClassNames, type MdxSize } from "@/components/mdx/mdx-primitives";
import { normalizeCodeLines, type DelimitedItems } from "@/components/mdx/mdx-utils";

type FileTreeProps = {
  title?: string;
  code?: string;
  items?: DelimitedItems;
  size?: MdxSize;
};

type FileTreeNode = {
  label: string;
  comment?: string;
  children: FileTreeNode[];
};

type ParsedFileTreeItem = {
  path: string;
  comment?: string;
};

const fileTreeSizeClasses: Record<MdxSize, string> = {
  sm: "px-4 py-3 text-[0.9rem] leading-7",
  md: "px-4 py-4 text-[0.95rem] leading-7",
  lg: "px-5 py-5 text-[1rem] leading-8",
};

export function FileTree({ title = "File tree", code, items, size = "md" }: FileTreeProps) {
  const treeCode = items ? buildFileTreeCode(items) : buildFileTreeCodeFromIndentedText(code ?? "");
  const lines = normalizeCodeLines(treeCode);

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-[1.35rem] border border-border/80 bg-surface-raised text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <figcaption className="border-b border-border/70 bg-surface-muted px-4 py-2.5 text-sm font-medium text-foreground">
        {title}
      </figcaption>
      <pre
        className={joinClassNames(
          "m-0 overflow-x-auto whitespace-pre bg-transparent font-mono text-foreground/88",
          fileTreeSizeClasses[size],
        )}
      >
        <code>
          {lines.map((line, index) => (
            <span key={`${index}-${line}`} className="block">
              <span className={line.trim().endsWith("/") ? "text-foreground" : "text-foreground/82"}>
                {line || "\u00a0"}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

function buildFileTreeCodeFromIndentedText(code: string) {
  const lines = normalizeCodeLines(code);

  if (lines.some((line) => /[├└│]/.test(line))) {
    return lines.join("\n");
  }

  const roots: FileTreeNode[] = [];
  const stack: FileTreeNode[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      stack.length = 0;
      continue;
    }

    const indent = line.match(/^\s*/)?.[0].replace(/\t/g, "  ").length ?? 0;
    const depth = Math.floor(indent / 2);
    const parsedItem = parseFileTreeItem(line.trim());
    const label = parsedItem.path || line.trim();
    const node: FileTreeNode = {
      label,
      comment: parsedItem.comment,
      children: [],
    };

    if (depth === 0 || !stack[depth - 1]) {
      roots.push(node);
    } else {
      stack[depth - 1].children.push(node);
    }

    stack[depth] = node;
    stack.length = depth + 1;
  }

  return roots
    .flatMap((node, index) => renderFileTreeNode(node, "", index === roots.length - 1))
    .join("\n");
}

function buildFileTreeCode(items: DelimitedItems) {
  const parsedItems = normalizeCodeLinesFromDelimitedItems(items).map(parseFileTreeItem);
  const roots = buildFileTreeNodes(parsedItems);

  return roots
    .flatMap((node, index) => renderFileTreeNode(node, "", index === roots.length - 1))
    .join("\n");
}

function normalizeCodeLinesFromDelimitedItems(items: DelimitedItems) {
  if (Array.isArray(items)) {
    return items.map((item) => item.trim()).filter(Boolean);
  }

  if (typeof items === "string") {
    return normalizeCodeLines(items)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function parseFileTreeItem(item: string): ParsedFileTreeItem {
  const commentIndex = item.indexOf("#");

  if (commentIndex === -1) {
    return {
      path: normalizeFileTreePath(item),
    };
  }

  return {
    path: normalizeFileTreePath(item.slice(0, commentIndex)),
    comment: item.slice(commentIndex + 1).trim(),
  };
}

function normalizeFileTreePath(path: string) {
  return path.trim().replace(/\/+$/g, "");
}

function buildFileTreeNodes(items: ParsedFileTreeItem[]) {
  const rootNodes: FileTreeNode[] = [];
  const nodeMap = new Map<string, FileTreeNode>();

  for (const item of items) {
    if (!item.path) {
      continue;
    }

    const segments = item.path.split("/").filter(Boolean);
    const rootPath = findExplicitParentPath(item.path, nodeMap);
    const rootNode = rootPath ? nodeMap.get(rootPath) : undefined;
    const remainingSegments = rootPath
      ? item.path.slice(rootPath.length).replace(/^\/+/, "").split("/").filter(Boolean)
      : [segments.join("/")];

    if (rootNode) {
      appendFileTreeSegments(rootNode, rootPath, remainingSegments, item.comment, nodeMap);
      continue;
    }

    const label = remainingSegments[0];
    const node = getOrCreateFileTreeNode(label, item.comment, rootNodes, item.path, nodeMap);
    appendFileTreeSegments(node, item.path, [], item.comment, nodeMap);
  }

  return rootNodes;
}

function findExplicitParentPath(path: string, nodeMap: Map<string, FileTreeNode>) {
  return Array.from(nodeMap.keys())
    .filter((candidate) => path.startsWith(`${candidate}/`))
    .sort((a, b) => b.length - a.length)[0];
}

function appendFileTreeSegments(
  parent: FileTreeNode,
  parentPath: string,
  segments: string[],
  comment: string | undefined,
  nodeMap: Map<string, FileTreeNode>,
) {
  let currentParent = parent;
  let currentPath = parentPath;

  segments.forEach((segment, index) => {
    currentPath = `${currentPath}/${segment}`;
    currentParent = getOrCreateFileTreeNode(
      segment,
      index === segments.length - 1 ? comment : undefined,
      currentParent.children,
      currentPath,
      nodeMap,
    );
  });

  if (segments.length === 0 && comment) {
    parent.comment = comment;
  }
}

function getOrCreateFileTreeNode(
  label: string,
  comment: string | undefined,
  siblings: FileTreeNode[],
  path: string,
  nodeMap: Map<string, FileTreeNode>,
) {
  const existingNode = nodeMap.get(path);

  if (existingNode) {
    if (comment) {
      existingNode.comment = comment;
    }

    return existingNode;
  }

  const node = {
    label,
    comment,
    children: [],
  };

  siblings.push(node);
  nodeMap.set(path, node);

  return node;
}

function renderFileTreeNode(node: FileTreeNode, prefix: string, isLast: boolean): string[] {
  const connector = prefix ? (isLast ? "└─ " : "├─ ") : "";
  const line = `${prefix}${connector}${formatFileTreeLine(node.label, node.comment)}`;
  const childPrefix = prefix ? `${prefix}${isLast ? "   " : "│  "}` : "   ";

  return [
    line,
    ...node.children.flatMap((child, index) =>
      renderFileTreeNode(child, childPrefix, index === node.children.length - 1),
    ),
  ];
}

function formatFileTreeLine(label: string, comment?: string) {
  if (!comment) {
    return label;
  }

  const commentColumn = 34;
  const spaces = " ".repeat(Math.max(2, commentColumn - label.length));

  return `${label}${spaces}# ${comment}`;
}
