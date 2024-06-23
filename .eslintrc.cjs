/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules:{    
    "vue/multi-word-component-names": 0,   
     "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off"
  
  },
}
