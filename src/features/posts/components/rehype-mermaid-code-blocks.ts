type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: {
    className?: string[] | string;
    [key: string]: unknown;
  };
  children?: HastNode[];
};

export function rehypeMermaidCodeBlocks() {
  return (tree: HastNode) => {
    replaceMermaidCodeBlocks(tree);
  };
}

function replaceMermaidCodeBlocks(node: HastNode) {
  if (!node.children) {
    return;
  }

  node.children = node.children.map((child) => {
    const codeNode = getCodeNode(child);

    if (!codeNode || !isMermaidCode(codeNode)) {
      replaceMermaidCodeBlocks(child);
      return child;
    }

    return {
      type: "mdxJsxFlowElement",
      name: "MermaidDiagram",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "chart",
          value: getTextContent(codeNode).trim(),
        },
      ],
      children: [],
    };
  });
}

function getCodeNode(node: HastNode) {
  if (node.type !== "element" || node.tagName !== "pre") {
    return null;
  }

  const [firstChild] = node.children ?? [];

  if (firstChild?.type !== "element" || firstChild.tagName !== "code") {
    return null;
  }

  return firstChild;
}

function isMermaidCode(node: HastNode) {
  const className = node.properties?.className;
  const classes = Array.isArray(className) ? className : [className].filter(Boolean);

  return classes.some((classValue) => classValue === "language-mermaid");
}

function getTextContent(node: HastNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  return (node.children ?? []).map(getTextContent).join("");
}
