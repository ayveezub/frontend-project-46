# genDiff

[![Actions Status](https://github.com/ayveezub/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ayveezub/frontend-project-46/actions)

[![Actions Status](https://github.com/ayveezub/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/ayveezub/frontend-project-46/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/419ff26af00d23c8c263/test_coverage)](https://codeclimate.com/github/ayveezub/frontend-project-46/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/419ff26af00d23c8c263/maintainability)](https://codeclimate.com/github/ayveezub/frontend-project-46/maintainability)

## About

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (choices: "stylish", "plain")
  -h, --help           display help for command
```

- JSON (*"stylish"* format): ![stylish-json-gendiff gif](./extra/promo/stylish-json-gendiff.gif)

- YAML (*"plain"* format): ![plain-yaml-gendiff gif](./extra/promo/plain-yaml-gendiff.gif)

## Requirements

- node >= 20.14.0

- npm >= 10.7.0

## Installation

```bash
make install
```

## Run tests

```bash
make test
```
