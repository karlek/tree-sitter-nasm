
# tree-sitter-nasm

A work in progress tree sitter grammar for NASM.

## Installation

```
# Arch linux
$ pacman -S tree-sitter
```

```
$ npm install
$ ./node_modules/.bin/tree-sitter
```

## Usage

```
# Run test suite
$ make test

# Print parse tree for a specific nasm file.
$ asm=path/to/a.asm make parse
```
