import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-config-prettier';

const browserGlobals = {
	window: 'readonly',
	document: 'readonly',
	console: 'readonly',
	fetch: 'readonly',
	Element: 'readonly',
	Node: 'readonly',
	EventTarget: 'readonly',
	MouseEvent: 'readonly',
	HTMLElement: 'readonly',
	HTMLDivElement: 'readonly',
	HTMLInputElement: 'readonly',
	HTMLSelectElement: 'readonly',
	HTMLFormElement: 'readonly',
	CustomEvent: 'readonly',
	Event: 'readonly',
	KeyboardEvent: 'readonly',
	AbortController: 'readonly',
	Blob: 'readonly',
	URL: 'readonly',
	Request: 'readonly',
	Response: 'readonly',
	Headers: 'readonly',
	setTimeout: 'readonly',
	clearTimeout: 'readonly',
	setInterval: 'readonly',
	clearInterval: 'readonly',
	confirm: 'readonly',
};
const nodeGlobals = {
	process: 'readonly',
	__dirname: 'readonly',
};
const testGlobals = {
	global: 'readonly',
	beforeAll: 'readonly',
	afterAll: 'readonly',
};

export default [
	js.configs.recommended,
	{
		files: ['**/*.ts', '**/*.js'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...browserGlobals,
				...nodeGlobals,
				...testGlobals,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/triple-slash-reference': 'off',
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.svelte'],
			},
			globals: {
				...browserGlobals,
				...nodeGlobals,
				...testGlobals,
			},
		},
		plugins: {
			svelte: sveltePlugin,
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...sveltePlugin.configs.recommended.rules,
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
	{
		files: ['**/__tests__/**/*.ts', '**/__tests__/**/*.js', '**/__tests__/**/*.svelte'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-unused-vars': 'off',
		},
	},
	{
		files: ['src/test/**/*.{ts,js,svelte}', 'src/test/mocks/**/*.{ts,js,svelte}'],
		linterOptions: {
			reportUnusedDisableDirectives: 'off',
		},
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'no-unused-vars': 'off',
			'no-console': 'off',
		},
	},
	prettier,
];
