// utils/buildTree.js

export const buildTree = (data, level = "level1", name = "You", depth = 1, maxDepth = 4) => {
  // Stop recursion if max depth reached
  if (depth >= maxDepth || !data[level] || !data[level].children || data[level].children.length === 0) {
    return { name, children: [] };
  }

  const children = data[level].children.map((childId, index) => {
    const nextLevelKey = `${level}${index + 1}`; // e.g., level1 -> level11, level12, etc.
    return buildTree(data, nextLevelKey, childId, depth + 1, maxDepth);
  });

  return { name, children };
};
