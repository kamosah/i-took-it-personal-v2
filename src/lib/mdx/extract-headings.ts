import { RootContent } from "mdast";
import { toHtml } from "hast-util-to-html";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  items?: TableOfContentsItem[];
}

/**
 * Extract headings from markdown content
 * @param content The markdown content
 * @returns Array of headings with their levels and ids
 */
export function extractHeadings(content: string): TableOfContentsItem[] {
  // Parse markdown to mdast
  const mdast = fromMarkdown(content);

  // Get all headings
  const headings = mdast.children
    .filter(
      (node): node is RootContent & { type: "heading" } =>
        node.type === "heading" && node.depth >= 2 && node.depth <= 4
    )
    .map((node) => {
      // Convert heading to HTML to get text content
      const hast = toHast(node);
      if (!hast) return null;

      const html = toHtml(hast);
      // Extract ID from HTML (assumes rehype-slug will use the same algorithm)
      const id = generateSlug(html.replace(/<[^>]*>/g, "").trim());

      return {
        id,
        title: html.replace(/<[^>]*>/g, "").trim(),
        level: node.depth,
        items: [],
      };
    })
    .filter(Boolean) as TableOfContentsItem[];

  // Nest headings in a hierarchy
  return nestHeadings(headings);
}

/**
 * Convert headings into a nested structure
 * @param headings Flat list of headings
 * @returns Nested structure of headings
 */
function nestHeadings(headings: TableOfContentsItem[]): TableOfContentsItem[] {
  const result: TableOfContentsItem[] = [];
  const stack: TableOfContentsItem[] = [];

  headings.forEach((heading) => {
    // Clear stack until we find a parent heading or the stack is empty
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // This is a top-level heading
      result.push(heading);
      stack.push(heading);
    } else {
      // This is a child heading
      const parent = stack[stack.length - 1];
      parent.items = parent.items || [];
      parent.items.push(heading);
      stack.push(heading);
    }
  });

  return result;
}

/**
 * Generate a slug from a string (similar to rehype-slug)
 * @param str The string to convert to a slug
 * @returns The slug
 */
function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
