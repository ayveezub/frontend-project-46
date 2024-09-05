import YAML from 'yaml';

export default (text, fileFormat) => {
  if (fileFormat === 'json') return JSON.parse(text);
  if (fileFormat === 'yaml') return YAML.parse(text);
  return null;
};
