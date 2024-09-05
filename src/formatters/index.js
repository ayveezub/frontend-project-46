import stylish from './stylish.js';
import plain from './plain.js';

export default (diffTree, formatName) => {
  if (formatName === 'stylish') return stylish(diffTree);
  if (formatName === 'plain') return plain(diffTree);
  return null;
};
