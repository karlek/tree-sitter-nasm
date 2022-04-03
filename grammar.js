module.exports = grammar({
	name: 'nasm',

	rules: {
		// TODO: add the actual grammar rules
		source_file: $ => seq(
			repeat($.source_line),
		),

		source_line: $ => seq(
			optional($.label),
			choice(
				$.bits_mode,
				$.align_mode,
				$.extern_symbol,
				$.instruction,
				$.pseudo_instruction,
			),
			"\n",
		),

		label: $ => seq(
			optional("."),
			$.identifier,
			":",
		),

		equ: $ => seq(
			"equ",
			$.expression,
		),

		d_declare_initialized: $ => seq(
			choice(
				'db',
				'db',
				'dd',
				'dq',
				'dt',
				'dw',
			),
			$.expression,
		),

		pseudo_instruction: $ => seq(
			choice(
				$.equ,
				$.d_declare_initialized,
				// $.incbin,
				// $.res_declare_uninitialized,
			),
		),

		extern_symbol: $ => seq(
			"extern",
			$.identifier,
		),

		global_symbol: $ => seq(
			"global",
			$.identifier,
		),

		align_mode: $ => seq(
			"align",
			$.numeric_constant,
		),

		bits_mode: $ => seq(
			"bits",
			choice(
				"16",
				"32",
				"64",
			)
		),

		instruction: $ => seq(
			$.add,
		),

		numeric_constant: $ => /\d+/,

		imm8: $ => /-?[0-9]{1,3}/,
		imm16: $ => /-?[0-9]{1,5}/,
		imm32: $ => /-?[0-9]{1,10}/,
		imm64: $ => /-?[0-9]{1,19}/,

		size_specifier: $ => choice(
			"byte",
			"word",
			"dword",
			"qword",
			"tword",
			"oword",
			"yword",
			"zword",
		),

		// https://www.nasm.us/xdoc/2.15.05/html/nasmdoc3.html#section-3.3
		effective_address: $ => seq(
			optional($.size_specifier),
			"[",
			$.expression,
			"]",
		),

		arithmetic_operator: $ => choice(
			"+",
			"-",
			"*",
			"/",
			"%",
			"//",
			"%%",
		),

		identifier: $ => /[a-z]+/,

		expression: $ => choice(
			// $.conditional_expression,
			// $.boolean_or_expression,
			// $.boolean_xor_expression,
			// $.boolean_and_expression,
			// $.comparison_expression,
			// $.bitwise_or_expression,
			// $.bitwise_xor_expression,
			// $.bitwise_and_expression,
			// $.bitshift_expression,
			$.reg,
			$.numeric_constant,
			$.identifier,
			prec.left(1, seq($.expression, "+", $.expression)),
			prec.left(1, seq($.expression, "-", $.expression)),
			prec.left(2, seq($.expression, "*", $.expression)),
			prec.left(2, seq($.expression, "/", $.expression)),
			prec.left(1, seq($.expression, "%", $.expression)),
			prec.left(2, seq($.expression, "//", $.expression)),
			prec.left(1, seq($.expression, "%%", $.expression)),
			// $.modulo_expression,
			// $.unary_expression,
		),

		imm: $ => choice(
			$.imm8,
			$.imm16,
			$.imm32,
			$.imm64,
		),

		reg: $ => choice(
			'al',
			'ax',
			'bl',
			'bp',
			'bpl',
			'bx',
			'cl',
			'cx',
			'di',
			'dil',
			'dl',
			'dx',
			'eax',
			'ebp',
			'ebx',
			'ecx',
			'edi',
			'edx',
			'esi',
			'esp',
			'r10',
			'r10b',
			'r10d',
			'r10w',
			'r11',
			'r11b',
			'r11d',
			'r11w',
			'r12',
			'r12b',
			'r12d',
			'r12w',
			'r13',
			'r13b',
			'r13d',
			'r13w',
			'r14',
			'r14b',
			'r14d',
			'r14w',
			'r15',
			'r15b',
			'r15d',
			'r15w',
			'r8',
			'r8b',
			'r8d',
			'r8w',
			'r9',
			'r9b',
			'r9d',
			'r9w',
			'rax',
			'rbp',
			'rbx',
			'rcx',
			'rdi',
			'rdx',
			'rsi',
			'rsp',
			'si',
			'sil',
			'sp',
			'spl',
		),

		add: $ => seq(
			"add",
			choice(
				$.reg,
				$.effective_address,
			),
			',',
			choice(
				$.imm,
				$.reg,
				$.effective_address,
			),
		),
	}
});
