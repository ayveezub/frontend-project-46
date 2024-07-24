install: deps-install
	npx simple-git-hooks

run:
	node bin/gendiff.js -h

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

.PHONY: test