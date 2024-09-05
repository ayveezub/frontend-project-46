import _ from 'lodash';

const getPathString = (node) => node.path.join('.');

const stringify = (data) => {
  if (_.isObject(data)) return '[complex value]';
  if (_.isBoolean(data) || _.isNil(data)) {
    return `${data}`;
  }
  return `'${data}'`;
};

const stringifyLeafNode = (node) => {
  const line = `Property '${getPathString(node)}'`;
  const value1 = node?.value1;
  const value2 = node?.value2;

  const { type } = node;
  if (type === 'Removed') {
    return `${line} was removed`;
  }
  if (type === 'Added') {
    return `${line} was added with value: ${stringify(value2)}`;
  }
  if (type === 'Unchanged') return null;
  return `${line} was updated. From ${stringify(value1)} to ${stringify(value2)}`;
};

export default (diffTree) => {
  const iter = (currentNode) => {
    const { type } = currentNode;
    if (type !== 'Nested') {
      return stringifyLeafNode(currentNode);
    }

    const newLines = currentNode
      .children
      .map((node) => iter(node))
      .filter((line) => line);

    return [...newLines].join('\n');
  };

  const lines = diffTree
    .children
    .map((node) => iter(node))
    .filter((line) => line);

  return [...lines].join('\n');
};
