import YAML from 'yaml';

export const getFileFormat = (filepath) => {
  if (filepath.endsWith('.json')) return 'json';
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) return 'yaml';
  return null;
};

export const parse = (text, fileFormat) => {
  if (fileFormat === 'json') return JSON.parse(text);
  if (fileFormat === 'yaml') return YAML.parse(text);
  return null;
};
