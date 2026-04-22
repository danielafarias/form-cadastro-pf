import { createTheme } from '@mantine/core'

export const appTheme = createTheme({
  primaryColor: 'violet',
  defaultRadius: 'md',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  components: {
    TextInput: {
      styles: {
        input: {
          '&:focus': {
            borderColor: 'var(--mantine-color-violet-5)',
          },
        },
      },
    },
    Select: {
      styles: {
        input: {
          '&:focus': {
            borderColor: 'var(--mantine-color-violet-5)',
          },
        },
      },
    },
  },
})
