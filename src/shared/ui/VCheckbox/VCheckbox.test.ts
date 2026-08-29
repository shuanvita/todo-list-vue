import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VCheckbox from './VCheckbox.vue'

const VSvgStub = {
  name: 'VSvg',
  props: ['name'],
  template: '<svg></svg>',
}

const mountCheckbox = (props = {}, slots = {}) =>
  mount(VCheckbox, {
    props,
    slots,
    global: {
      stubs: { VSvg: VSvgStub },
    },
  })

describe('VCheckbox', () => {
  describe('v-model / базовое поведение', () => {
    it('рендерится с modelValue = false по умолчанию', () => {
      const wrapper = mountCheckbox()
      const input = wrapper.find('input[type="checkbox"]')
      expect((input.element as HTMLInputElement).checked).toBe(false)
    })

    it('отражает переданный modelValue', async () => {
      const wrapper = mountCheckbox({ modelValue: true })
      const input = wrapper.find('input[type="checkbox"]')
      expect((input.element as HTMLInputElement).checked).toBe(true)
    })

    it('эмитит update:modelValue при клике', async () => {
      const wrapper = mountCheckbox({ modelValue: false })
      const input = wrapper.find('input[type="checkbox"]')

      await input.setValue(true)

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('переключается обратно в false при повторном клике', async () => {
      const wrapper = mountCheckbox({ modelValue: true })
      const input = wrapper.find('input[type="checkbox"]')

      await input.setValue(false)

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    })
  })

  describe('disabled', () => {
    it('проставляет атрибут disabled на input', () => {
      const wrapper = mountCheckbox({ disabled: true })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('disabled')).toBeDefined()
    })

    it('не проставляет disabled по умолчанию', () => {
      const wrapper = mountCheckbox()
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('disabled')).toBeUndefined()
    })

    it('добавляет класс is-disabled на label', () => {
      const wrapper = mountCheckbox({ disabled: true })
      expect(wrapper.find('.checkbox-label').classes()).toContain('is-disabled')
    })

    it('не позволяет изменить значение через клик, если disabled', async () => {
      const wrapper = mountCheckbox({ modelValue: false, disabled: true })
      const input = wrapper.find('input[type="checkbox"]')

      await input.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  describe('error / errorMessage', () => {
    it('добавляет класс is-error на label при error=true', () => {
      const wrapper = mountCheckbox({ error: true })
      expect(wrapper.find('.checkbox-label').classes()).toContain('is-error')
    })

    it('не добавляет is-error по умолчанию', () => {
      const wrapper = mountCheckbox()
      expect(wrapper.find('.checkbox-label').classes()).not.toContain('is-error')
    })

    it('проставляет aria-invalid на input при error=true', () => {
      const wrapper = mountCheckbox({ error: true })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-invalid')).toBe('true')
    })

    it('не рендерит текст ошибки, если error=true, но errorMessage не передан', () => {
      const wrapper = mountCheckbox({ error: true })
      expect(wrapper.find('.checkbox-error-text').exists()).toBe(false)
    })

    it('не рендерит текст ошибки, если errorMessage передан, но error=false', () => {
      const wrapper = mountCheckbox({ error: false, errorMessage: 'Обязательное поле' })
      expect(wrapper.find('.checkbox-error-text').exists()).toBe(false)
    })

    it('рендерит текст ошибки при error=true и заданном errorMessage', () => {
      const wrapper = mountCheckbox({ error: true, errorMessage: 'Обязательное поле' })
      const errorText = wrapper.find('.checkbox-error-text')

      expect(errorText.exists()).toBe(true)
      expect(errorText.text()).toBe('Обязательное поле')
    })

    it('проставляет role="alert" на блок с текстом ошибки', () => {
      const wrapper = mountCheckbox({ error: true, errorMessage: 'Обязательное поле' })
      const errorText = wrapper.find('.checkbox-error-text')
      expect(errorText.attributes('role')).toBe('alert')
    })
  })

  describe('доступность (a11y)', () => {
    it('связывает input и label через id/for', () => {
      const wrapper = mountCheckbox()
      const input = wrapper.find('input')
      const label = wrapper.find('label')

      const inputId = input.attributes('id')
      expect(inputId).toBeTruthy()
      expect(label.attributes('for')).toBe(inputId)
    })

    it('связывает input с текстом ошибки через aria-describedby', () => {
      const wrapper = mountCheckbox({ error: true, errorMessage: 'Обязательное поле' })
      const input = wrapper.find('input')
      const errorText = wrapper.find('.checkbox-error-text')

      const describedBy = input.attributes('aria-describedby')
      expect(describedBy).toBeTruthy()
      expect(errorText.attributes('id')).toBe(describedBy)
    })

    it('не проставляет aria-describedby, если ошибки нет', () => {
      const wrapper = mountCheckbox()
      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBeUndefined()
    })

    it('не проставляет aria-describedby, если error=true, но errorMessage не задан', () => {
      const wrapper = mountCheckbox({ error: true })
      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBeUndefined()
    })

    it('иконка помечена aria-hidden', () => {
      const wrapper = mountCheckbox()
      const icon = wrapper.findComponent(VSvgStub)
      expect(icon.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('slot', () => {
    it('рендерит переданный контент слота как текст лейбла', () => {
      const wrapper = mountCheckbox({}, { default: 'Согласен с условиями' })
      expect(wrapper.find('.checkbox-label').text()).toContain('Согласен с условиями')
    })
  })
})
