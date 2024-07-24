import { fileURLToPath } from 'url';
import path from 'path';
import { test } from '@jest/globals';
import genDiff from '../src/main.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedDiffOutput = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('genDiff', () => {
  const diffOutput = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(diffOutput).toEqual(expectedDiffOutput);
});
