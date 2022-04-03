.PHONY: test

test: | src
	@tree-sitter test

parse: | src
	@tree-sitter parse $(asm)

src:
	tree-sitter generate --no-bindings
