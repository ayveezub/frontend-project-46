import _ from 'lodash';

const getKey = (node) => node.path.at(-1);

const makeIndent = (depth, shiftToLeft = 0) => {
  const replacer = ' ';
  const spacesPerLevel = 4;

  return replacer.repeat(depth * spacesPerLevel - shiftToLeft);
};

const stringify = (data, nodeDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = makeIndent(depth);
    const bracketIndent = makeIndent(depth, 4);
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${indent}${key}: ${iter(value, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, nodeDepth + 1);
};

const stringifyLeafNode = (node, depth) => {
  const key = getKey(node);
  const value1 = node?.value1;
  const value2 = node?.value2;
  const indent = makeIndent(depth, 2);

  const { type } = node;
  if (type === 'Removed') {
    return `${indent}- ${key}: ${stringify(value1, depth)}`;
  }
  if (type === 'Added') {
    return `${indent}+ ${key}: ${stringify(value2, depth)}`;
  }
  if (type === 'Unchanged') {
    return `${indent}  ${key}: ${stringify(value1, depth)}`;
  }
  return [
    `${indent}- ${key}: ${stringify(value1, depth)}`,
    `${indent}+ ${key}: ${stringify(value2, depth)}`,
  ].join('\n');
};

export default (diffTree) => {
  const iter = (currentNode, depth) => {
    const { type } = currentNode;
    if (type !== 'Nested') {
      return stringifyLeafNode(currentNode, depth);
    }

    const key = getKey(currentNode);

    return [
      `${makeIndent(depth)}${key}: {`,
      ...currentNode.children.map((node) => iter(node, depth + 1)),
      `${makeIndent(depth)}}`,
    ].join('\n');
  };

  return [
    '{',
    ...diffTree.children.map((node) => iter(node, 1)),
    '}',
  ].join('\n');
};
