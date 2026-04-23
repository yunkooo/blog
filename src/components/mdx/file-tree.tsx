import { MdxCodeFrame, type MdxSize } from "@/components/mdx/mdx-primitives";
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

export function FileTree({ title = "File tree", code, items, size = "md" }: FileTreeProps) {
  const treeCode = items ? buildFileTreeCode(items) : code ?? "";

  return <MdxCodeFrame title={title} code={treeCode} variant="tree" size={size} />;
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
