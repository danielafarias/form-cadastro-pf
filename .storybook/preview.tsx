import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { appTheme } from '../src/theme'
import '@mantine/core/styles.css'
import '../src/App.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MantineProvider theme={appTheme} defaultColorScheme="light">
        <Story />
      </MantineProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
