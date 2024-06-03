install: install-deps
	npx simple-git-hooks

run:
	node bin/gendiff.js -h

install-deps:
	npm ci --legacy-peer-deps

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

.PHONY: test