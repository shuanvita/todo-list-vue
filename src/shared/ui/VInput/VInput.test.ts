import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import VInput from './VInput.vue'

const mountInput = (props = {}, attrs = {}) =>
  mount(VInput, {
    props,
    attrs,
  })

describe('VInput', () => {
  describe('v-model / базовое поведение', () => {
    it('рендерит input с типом text по умолчанию', () => {
      const wrapper = mountInput()
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('text')
    })

    it('применяет переданный type', () => {
      const wrapper = mountInput({ type: 'email' })
      expect(wrapper.find('input').attributes('type')).toBe('email')
    })

    it('отражает переданный modelValue', () => {
      const wrapper = mountInput({ modelValue: 'hello' })
      const input = wrapper.find('input')
      expect((input.element as HTMLInputElement).value).toBe('hello')
    })

    it('эмитит update:modelValue при вводе текста', async () => {
      const wrapper = mountInput({ modelValue: '' })
      const input = wrapper.find('input')

      await input.setValue('test')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test'])
    })
  })

  describe('label', () => {
    it('не рендерит label, если label не передан', () => {
      const wrapper = mountInput()
      expect(wrapper.find('label').exists()).toBe(false)
    })

    it('рендерит label с переданным текстом', () => {
      const wrapper = mountInput({ label: 'Имя' })
      expect(wrapper.find('label').text()).toBe('Имя')
    })

    it('связывает label и input через for/id', () => {
      const wrapper = mountInput({ label: 'Имя' })
      const input = wrapper.find('input')
      const label = wrapper.find('label')

      const inputId = input.attributes('id')
      expect(inputId).toBeTruthy()
      expect(label.attributes('for')).toBe(inputId)
    })
  })

  describe('name', () => {
    it('проставляет name на input', () => {
      const wrapper = mountInput({ name: 'username' })
      expect(wrapper.find('input').attributes('name')).toBe('username')
    })

    it('не проставляет атрибут name, если не передан', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('name')).toBeUndefined()
    })
  })

  describe('disabled', () => {
    it('не disabled по умолчанию', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
    })

    it('проставляет disabled на input при disabled=true', () => {
      const wrapper = mountInput({ disabled: true })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })
  })

  describe('error / errorMessage', () => {
    it('проставляет aria-invalid=true при error=true', () => {
      const wrapper = mountInput({ error: true })
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('не проставляет aria-invalid при error не передан', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
    })

    it('не проставляет aria-invalid при явном error=false', () => {
      const wrapper = mountInput({ error: false })
      expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
    })

    it('не рендерит текст ошибки без errorMessage', () => {
      const wrapper = mountInput({ error: true })
      expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    })

    it('не рендерит текст ошибки без error=true', () => {
      const wrapper = mountInput({ error: false, errorMessage: 'Обязательное поле' })
      expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    })

    it('рендерит текст ошибки при error=true и errorMessage', () => {
      const wrapper = mountInput({ error: true, errorMessage: 'Обязательное поле' })
      const errorEl = wrapper.find('[role="alert"]')

      expect(errorEl.exists()).toBe(true)
      expect(errorEl.text()).toBe('Обязательное поле')
    })

    it('связывает input с текстом ошибки через aria-describedby', () => {
      const wrapper = mountInput({ error: true, errorMessage: 'Обязательное поле' })
      const input = wrapper.find('input')
      const errorEl = wrapper.find('[role="alert"]')

      const describedBy = input.attributes('aria-describedby')
      expect(describedBy).toBeTruthy()
      expect(errorEl.attributes('id')).toBe(describedBy)
    })

    it('не проставляет aria-describedby, если ошибки нет', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
    })

    it('не проставляет aria-describedby, если error=true, но errorMessage не задан', () => {
      const wrapper = mountInput({ error: true })
      expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
    })

    it('добавляет error-класс на input при error=true', () => {
      const wrapper = mountInput({ error: true })
      expect(wrapper.find('input').classes()).toContain('border-destructive')
    })

    it('не добавляет error-класс на input по умолчанию', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').classes()).not.toContain('border-destructive')
    })
  })

  describe('fallthrough-атрибуты и class', () => {
    it('применяет переданный class к корневому div, а не к input', () => {
      const wrapper = mountInput({}, { class: 'mb-8' })

      expect(wrapper.classes()).toContain('mb-8')
      expect(wrapper.find('input').classes()).not.toContain('mb-8')
    })

    it('прокидывает произвольные атрибуты (например placeholder) на input', () => {
      const wrapper = mountInput({}, { placeholder: 'Добавить задачу...' })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Добавить задачу...')
    })

    it('прокидывает произвольные атрибуты (например maxlength) на input', () => {
      const wrapper = mountInput({}, { maxlength: '10' })
      expect(wrapper.find('input').attributes('maxlength')).toBe('10')
    })
  })

  describe('a11y', () => {
    it('генерирует уникальные id для нескольких инпутов в одном дереве', () => {
      const Parent = defineComponent({
        render() {
          return h('div', [h(VInput, { label: 'Поле 1' }), h(VInput, { label: 'Поле 2' })])
        },
      })

      const wrapper = mount(Parent)
      const inputs = wrapper.findAll('input')
      const [firstInput, secondInput] = inputs

      if (!firstInput || !secondInput) {
        throw new Error('Ожидалось два input-элемента')
      }

      expect(firstInput.attributes('id')).not.toBe(secondInput.attributes('id'))
    })
  })
})
