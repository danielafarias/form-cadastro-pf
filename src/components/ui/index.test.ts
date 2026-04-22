import { describe, expect, it } from 'vitest'
import * as ui from './index'

describe('ui index exports', () => {
  it('expõe os principais componentes', () => {
    expect(ui.PrimaryButton).toBeDefined()
    expect(ui.SecondaryButton).toBeDefined()
    expect(ui.AppCard).toBeDefined()
    expect(ui.FormStepHeader).toBeDefined()
    expect(ui.FormStepNavigation).toBeDefined()
    expect(ui.Header).toBeDefined()
    expect(ui.HighlightBadge).toBeDefined()
    expect(ui.StepIndicator).toBeDefined()
  })
})
