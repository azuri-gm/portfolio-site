/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:import/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
}
