#!/usr/bin/env node

import { Command, Option } from 'commander';
import genDiff from '../src/main.js';

const program = new Command();
const option = new Option('-f, --format <type>', 'output format', 'stylish')
  .choices(['stylish']);

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.3');

program
  .arguments('<filepath1> <filepath2>')
  .addOption(option)
  .action((first, second) => {
    const diff = genDiff(first, second);

    console.log(diff);
  });

program.parse();
