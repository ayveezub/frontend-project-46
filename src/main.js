import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import * as parse from './parsing.js';

const isJSON = (filepath) => filepath.endsWith('.json');

const getSign = (keyStatus) => {
  const emptySign = ' ';

  if (keyStatus === 'added') return '+';
  if (keyStatus === 'deleted') return '-';
  return emptySign;
};

const makeLine = (keyStatus, key, value) => `${getSign(keyStatus)} ${key}: ${value}`;

const getflatJSONKeysStatus = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const keysStatus = {};
  keys.forEach((key) => {
    if (!Object.hasOwn(data1, key)) {
      keysStatus[key] = 'added';
    }
    if (!Object.hasOwn(data2, key)) {
      keysStatus[key] = 'deleted';
    }
    if (
      data1[key] !== data2[key]
      && Object.hasOwn(data1, key)
      && Object.hasOwn(data2, key)
    ) {
      keysStatus[key] = 'changed';
    }
    if (data1[key] === data2[key]) {
      keysStatus[key] = 'unchanged';
    }
  });

  return keysStatus;
};

const flatJSONDiff = (data1, data2) => {
  const keysStatus = getflatJSONKeysStatus(data1, data2);
  const sortedKeys = Object.keys(keysStatus).sort();

  const lines = [];
  sortedKeys.forEach((key) => {
    const keyStatus = keysStatus[key];

    if (keyStatus === 'added') {
      lines.push(makeLine(keyStatus, key, data2[key]));
    }
    if (keyStatus === 'deleted') {
      lines.push(makeLine(keyStatus, key, data1[key]));
    }
    if (keyStatus === 'changed') {
      lines.push(makeLine('deleted', key, data1[key]));
      lines.push(makeLine('added', key, data2[key]));
    }
    if (keyStatus === 'unchanged') {
      lines.push(makeLine(keyStatus, key, data1[key]));
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

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

  return flatJSONDiff(data1, data2);
};
