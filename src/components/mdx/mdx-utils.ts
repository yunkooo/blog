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
