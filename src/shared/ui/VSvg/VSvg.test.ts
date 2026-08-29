// VSvg.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import VSvg from './VSvg.vue'

/**
 * ВАЖНО: import.meta.glob резолвится Vite на этапе трансформации файла,
 * поэтому в тестах он реально сканирует файловую систему проекта
 * (@/shared/icons/*.svg), а не мокается как обычный модуль.
 *
 * Тесты ниже используют `checked` как заведомо существующую иконку.
 * Если в вашем репозитории иконка называется иначе — замените EXISTING_ICON.
 */
const EXISTING_ICON = 'checked'
const NON_EXISTENT_ICON = '__definitely-not-existing-icon__'

describe('VSvg', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  describe('найденная иконка', () => {
    it('рендерит SVG-элемент по имени', () => {
      const wrapper = mount(VSvg, {
        props: { name: EXISTING_ICON },
      })

      expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('не вызывает console.warn для существующей иконки', () => {
      mount(VSvg, {
        props: { name: EXISTING_ICON },
      })

      expect(warnSpy).not.toHaveBeenCalled()
    })

    it('проставляет role="img" на корневой элемент', () => {
      const wrapper = mount(VSvg, {
        props: { name: EXISTING_ICON },
      })

      expect(wrapper.find('svg').attributes('role')).toBe('img')
    })
  })

  describe('несуществующая иконка', () => {
    it('ничего не рендерит', () => {
      const wrapper = mount(VSvg, {
        props: { name: NON_EXISTENT_ICON },
      })

      expect(wrapper.find('svg').exists()).toBe(false)
      expect(wrapper.html()).toBe('<!--v-if-->')
    })

    it('вызывает console.warn с именем иконки', () => {
      mount(VSvg, {
        props: { name: NON_EXISTENT_ICON },
      })

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(`SVG not found: ${NON_EXISTENT_ICON}`),
      )
    })

    it('не падает и не бросает исключение при рендере', () => {
      expect(() =>
        mount(VSvg, {
          props: { name: NON_EXISTENT_ICON },
        }),
      ).not.toThrow()
    })
  })

  describe('decorative (по умолчанию true)', () => {
    it('проставляет aria-hidden="true" по умолчанию', () => {
      const wrapper = mount(VSvg, {
        props: { name: EXISTING_ICON },
      })

      expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
    })

    it('не проставляет aria-hidden при decorative=false', () => {
      const wrapper = mount(VSvg, {
        props: { name: EXISTING_ICON, decorative: false },
        attrs: { 'aria-label': 'Значимая иконка' },
      })

      expect(wrapper.find('svg').attributes('aria-hidden')).toBeUndefined()
    })

    it('не вызывает warn при decorative=false с aria-label', () => {
      mount(VSvg, {
        props: { name: EXISTING_ICON, decorative: false },
        attrs: { 'aria-label': 'Значимая иконка' },
      })

      expect(warnSpy).not.toHaveBeenCalled()
    })

    it('не вызывает warn при decorative=false с aria-labelledby', () => {
      mount(VSvg, {
        props: { name: EXISTING_ICON, decorative: false },
        attrs: { 'aria-labelledby': 'some-heading-id' },
      })

      expect(warnSpy).not.toHaveBeenCalled()
    })

    it('вызывает warn при decorative=false без aria-label/aria-labelledby', () => {
      mount(VSvg, {
        props: { name: EXISTING_ICON, decorative: false },
      })

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('requires aria-label or aria-labelledby'),
      )
    })

    it('прокидывает aria-label как fallthrough-атрибут на svg', () => {
      const wrapper = mount(VSvg, {
        props: { name: EXISTING_ICON, decorative: false },
        attrs: { 'aria-label': 'Значимая иконка' },
      })

      expect(wrapper.find('svg').attributes('aria-label')).toBe('Значимая иконка')
    })
  })
})
