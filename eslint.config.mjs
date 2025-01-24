// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/require-default-prop': 'warn',
    'vue/no-required-prop-with-default': 'error',
    'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
    '@stylistic/max-len': ['error', { code: 130, ignoreComments: true, ignoreStrings: true, ignoreUrls: true }],
  },
})
