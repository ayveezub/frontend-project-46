import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import buildDiffTree from './diff.js';
import format from './formatters.js';

const getFileFormat = (filepath) => {
  if (filepath.endsWith('.json')) return 'json';
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) return 'yaml';
  return null;
};

export default (filepath1, filepath2, formatType = 'stylish') => {
  const encoding = 'utf-8';
  const text1 = readFileSync(resolve(filepath1), encoding);
  const text2 = readFileSync(resolve(filepath2), encoding);

  const parsedText1 = parse(text1, getFileFormat(filepath1));
  const parsedText2 = parse(text2, getFileFormat(filepath2));

  const diff = buildDiffTree(parsedText1, parsedText2);

  return format(diff, formatType);
};
