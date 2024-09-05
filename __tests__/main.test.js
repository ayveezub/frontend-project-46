import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'node:fs';
import { beforeAll, test } from '@jest/globals';
import genDiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let expectedDiffOutput;
beforeAll(() => {
  expectedDiffOutput = readFileSync(getFixturePath('expectedDiffOutput.txt'), 'utf-8');
});

test('show differences between two JSON files', () => {
  const jsonDiffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(jsonDiffOutput).toEqual(expectedDiffOutput);
});

test('show differences between two YAML files', () => {
  const yamlDiffOutput = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(yamlDiffOutput).toEqual(expectedDiffOutput);
});
