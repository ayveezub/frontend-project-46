import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'node:fs';
import { beforeAll, test } from '@jest/globals';
import genDiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedStylishOutput;
let expectedPlainOutput;
beforeAll(() => {
  expectedStylishOutput = readFileSync(getFixturePath('expectedStylishOutput.txt'), 'utf-8');
  expectedPlainOutput = readFileSync(getFixturePath('expectedPlainOutput.txt'), 'utf-8');
});

test('show diffs between two JSON files (stylish format)', () => {
  const jsonDiffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(jsonDiffOutput).toEqual(expectedStylishOutput);
});

test('show diffs between two YAML files (stylish format)', () => {
  const yamlDiffOutput = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(yamlDiffOutput).toEqual(expectedStylishOutput);
});

test('show diffs between two JSON files (plain format)', () => {
  const jsonDiffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(jsonDiffOutput).toEqual(expectedPlainOutput);
});

test('show diffs between two YAML files (plain format)', () => {
  const yamlDiffOutput = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(yamlDiffOutput).toEqual(expectedPlainOutput);
});
