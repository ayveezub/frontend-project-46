import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diffTree, formatName) => {
  if (formatName === 'stylish') return stylish(diffTree);
  if (formatName === 'plain') return plain(diffTree);
  if (formatName === 'json') return json(diffTree);
  return null;
};
