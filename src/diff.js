import _ from 'lodash';

const deepCheck = (data1, data2, path) => {
  const value1 = _.get(data1, path);
  const value2 = _.get(data2, path);

  if (_.isObject(value1) && _.isObject(value2)) {
    return 'Nested';
  }
  if (!_.has(data2, path)) return 'Removed';
  if (!_.has(data1, path)) return 'Added';
  if (_.isEqual(value1, value2)) {
    return 'Unchanged';
  }
  return 'Updated';
};

const buildLeafNode = (type, path, data1, data2) => {
  const newLeafNode = { type, path };

  if (_.has(data1, path)) {
    newLeafNode.value1 = _.get(data1, path);
  }
  if (_.has(data2, path)) {
    newLeafNode.value2 = _.get(data2, path);
  }

  return newLeafNode;
};

const buildNestedNode = (type, path, children) => ({
  type,
  path,
  children,
});

export default (data1, data2) => {
  const initialKeys = _
    .union(Object.keys(data1), Object.keys(data2))
    .sort();

  const iter = (currentKey, ancestry = []) => {
    const currentPath = [...ancestry, currentKey];
    const type = deepCheck(data1, data2, currentPath);

    if (type !== 'Nested') {
      return buildLeafNode(type, currentPath, data1, data2);
    }

    const newKeys1 = Object.keys(_.get(data1, currentPath));
    const newKeys2 = Object.keys(_.get(data2, currentPath));
    const newKeys = _
      .union(newKeys1, newKeys2)
      .sort();

    const newChildren = newKeys.map((newKey) => iter(newKey, currentPath));

    return buildNestedNode(type, currentPath, newChildren);
  };

  return {
    type: 'Nested',
    children: initialKeys.map((key) => iter(key)),
  };
};
