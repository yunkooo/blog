export type DelimitedItems = string[] | string | undefined;

export function normalizeDelimitedItems(items: DelimitedItems) {
  if (Array.isArray(items)) {
    return items.map((item) => item.trim()).filter(Boolean);
  }

  if (typeof items === "string") {
    return items
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function normalizeCodeLines(code: string) {
  const separator = code.includes("|") ? "|" : /\r?\n/;

  return code.split(separator).map((line) => line.trimEnd());
}

export function parseTitleDescriptionItem(item: string) {
  const separatorIndex = item.indexOf(":");

  if (separatorIndex === -1) {
    return {
      title: item.trim(),
      description: "",
    };
  }

  return {
    title: item.slice(0, separatorIndex).trim(),
    description: item.slice(separatorIndex + 1).trim(),
  };
}

export function parseLabelUrlItem(item: string) {
  if (item.startsWith("http://") || item.startsWith("https://")) {
    return {
      label: item.trim(),
      href: item.trim(),
    };
  }

  const separatorIndex = item.indexOf(":");

  if (separatorIndex === -1) {
    return {
      label: item.trim(),
      href: item.trim(),
    };
  }

  return {
    label: item.slice(0, separatorIndex).trim(),
    href: item.slice(separatorIndex + 1).trim(),
  };
}
