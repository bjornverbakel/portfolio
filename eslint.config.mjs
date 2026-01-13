// @ts-ignore
import withNuxt from './.nuxt/eslint.config.mjs'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      vue,
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'always',
        },
      ],
      '@stylistic/indent': ['error', 2],
      'vue/multi-word-component-names': 'off',
    },
  },
)
