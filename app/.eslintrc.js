module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'sort-imports-es6-autofix'
  ],
  rules: {
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreMemberSort: true,
      ignoreDeclarationSort: true,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
    }],
    'sort-imports-es6-autofix/sort-imports-es6': [2, {
      ignoreCase: true,
      ignoreMemberSort: true,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
    }]
  }
}
