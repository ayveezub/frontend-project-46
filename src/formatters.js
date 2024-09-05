import _ from 'lodash';

const makeIndent = (depth, shiftToLeft = 0) => {
  const replacer = ' ';
  const spacesPerLevel = 4;

  return replacer.repeat(depth * spacesPerLevel - shiftToLeft);
};

const stringifyValue = (initialValue, initialDepth) => {
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

  return iter(initialValue, initialDepth + 1);
};

const stringifyLeafNode = (type, node, depth) => {
  const { key } = node;
  const value1 = node?.value1;
  const value2 = node?.value2;
  const indent = makeIndent(depth, 2);

  if (type === 'Removed') {
    return `${indent}- ${key}: ${stringifyValue(value1, depth)}`;
  }
  if (type === 'Added') {
    return `${indent}+ ${key}: ${stringifyValue(value2, depth)}`;
  }
  if (type === 'Unchanged') {
    return `${indent}  ${key}: ${stringifyValue(value1, depth)}`;
  }
  return [
    `${indent}- ${key}: ${stringifyValue(value1, depth)}`,
    `${indent}+ ${key}: ${stringifyValue(value2, depth)}`,
  ].join('\n');
};

const stylish = (diffTree) => {
  const iter = (currentNode, depth) => {
    const { type } = currentNode;

    if (type !== 'Nested') {
      return stringifyLeafNode(type, currentNode, depth);
    }

    const { key } = currentNode;

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

export default (diffTree, formatType) => {
  if (formatType === 'stylish') return stylish(diffTree);
  return null;
};
