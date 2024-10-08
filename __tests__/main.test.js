import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'node:fs';
import { test } from '@jest/globals';
import genDiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('show diffs between two JSON files (stylish format)', () => {
  const expectedStylishOutput = readFileSync(getFixturePath('expectedStylishOutput.txt'), 'utf-8');
  const diffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(diffOutput).toEqual(expectedStylishOutput);
});

test('show diffs between two YAML files (stylish format)', () => {
  const expectedStylishOutput = readFileSync(getFixturePath('expectedStylishOutput.txt'), 'utf-8');
  const diffOutput = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));

  expect(diffOutput).toEqual(expectedStylishOutput);
});

test('show diffs between two JSON files (plain format)', () => {
  const expectedPlainOutput = readFileSync(getFixturePath('expectedPlainOutput.txt'), 'utf-8');
  const diffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');

  expect(diffOutput).toEqual(expectedPlainOutput);
});

test('show diffs between two JSON files (json format)', () => {
  const expectedJSONOutput = readFileSync(getFixturePath('expectedJSONOutput.txt'), 'utf-8');
  const diffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');

  expect(diffOutput).toEqual(expectedJSONOutput);
});
