import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import * as parse from './parsing.js';

const isJSON = (filepath) => filepath.endsWith('.json');

export default (filepath1, filepath2) => {
  const absolutePath1 = resolve(filepath1);
  const absolutePath2 = resolve(filepath2);

  const encoding = 'utf-8';
  const text1 = readFileSync(absolutePath1, encoding);
  const text2 = readFileSync(absolutePath2, encoding);

  let data1;
  let data2;
  if (isJSON(filepath1)) {
    data1 = parse.json(text1);
  }
  if (isJSON(filepath2)) {
    data2 = parse.json(text2);
  }

  return [data1, data2];
};
