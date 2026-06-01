import type { NormalizedOperation, TagObject } from '../data/openapi-spec';

export interface TagGroup {
  tag: TagObject;
  operations: NormalizedOperation[];
}

export function groupByTag(operations: NormalizedOperation[], tags: TagObject[]): TagGroup[] {
  const tagMap = new Map<string, TagGroup>();

  for (const tag of tags) {
    tagMap.set(tag.name, { tag, operations: [] });
  }

  for (const op of operations) {
    if (tagMap.has(op.tag)) {
      tagMap.get(op.tag)!.operations.push(op);
    } else {
      // Uncategorized operations — create a group on the fly
      if (!tagMap.has(op.tag)) {
        tagMap.set(op.tag, { tag: { name: op.tag }, operations: [] });
      }
      tagMap.get(op.tag)!.operations.push(op);
    }
  }

  // Return only tags that have operations (preserve spec tag order)
  return Array.from(tagMap.values()).filter(g => g.operations.length > 0);
}
