module.exports = {
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  plugins: ['jest'],
  root: true,
  rules: {
    /* Code style */
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'class-methods-use-this': 'off',
    'function-paren-newline': 'off',
    'id-length': 'error',
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      {
        code: 140,
        ignorePattern: '\\s*<|\\s*className|^import|^\\s*\\{.*\\},$',
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': [
      'warn',
      { allow: ['error', 'warn'] },
    ],
    'no-debugger': 'warn',
    'no-irregular-whitespace': ['error', { skipTemplates: true }],
    'no-mixed-operators': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-globals': ['error', 'name'],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'prefer-destructuring': 'off',

    /* a11y */
    'jsx-a11y/no-static-element-interactions': 'off',

    /* React */
    'react/no-danger': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
    ],
    'import/resolver': {
      webpack: {
        config: './webpack/webpack.common.js',
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
};
