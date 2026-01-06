import { defineConfig, presetUno } from 'unocss';
import presetTypography from '@unocss/preset-typography';

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        'code::before': { content: '""' },
        'code::after': { content: '""' },
      },
    }),
  ],
  theme: {
    fontFamily: {
      sans: 'system-ui, -apple-system, Segoe UI, sans-serif',
    },
  },
  dark: 'class',
});
