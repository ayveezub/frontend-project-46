#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/main.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.3');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((first, second) => {
    const diff = genDiff(first, second);

    console.log(diff);
  });

program.parse();
