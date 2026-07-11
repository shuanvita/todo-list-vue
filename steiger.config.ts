import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
  {
    files: ['./src/shared/assets/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
])
