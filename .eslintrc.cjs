module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist', 
    '.eslintrc.cjs',
    "vite.config.ts",
    "postcss.config.mjs",
    "tailwind.config.js",
    "commitlint.config.cjs",
    "playwright.config.ts",
    "vitest.setup.ts",
    "routeTree.gen.ts"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
		"ecmaVersion": "latest",
		"sourceType": "module",
		"project": ["./tsconfig.json"]
	},
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
