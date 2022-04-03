.PHONY: test

test: binding.gyp
	@tree-sitter parse example-file

binding.gyp:
	tree-sitter generate
