import js from '@eslint/js';
import globals from 'globals';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  // General JavaScript configuration
  {
    files: ['**/*.js'],
    ignores: [
      '__tests__/**',
      '**/*.config.js',
      '**/*.config.json',
      'dist/**',
      'public/**',
      'node_modules/**',
      '.env',
      '.env_template',
      '*.json',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      jest: eslintPluginJest,
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: 'error',
      curly: 'error',
      "no-console": ["error", {"allow": ["error", "warn"]}],
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-const-assign': 'error',
      'no-debugger': 'warn',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'no-unreachable': 'error',
      'spaced-comment': ['error', 'always'],
      'no-inline-comments': 'warn',
    },
  },
  // Jest-specific configuration for test files
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: eslintPluginJest,
    },
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
    },
  },
  
];
