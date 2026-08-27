import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VButton from './VButton.vue'

describe('VButton', () => {
  it('рендерит текст из default-слота', () => {
    const wrapper = mount(VButton, {
      slots: { default: 'Сохранить' },
    })
    expect(wrapper.text()).toBe('Сохранить')
  })

  it('по умолчанию имеет type="button" и variant="primary"', () => {
    const wrapper = mount(VButton)
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('применяет классы выбранного варианта', () => {
    const wrapper = mount(VButton, { props: { variant: 'secondary' } })
    expect(wrapper.classes()).toContain('border-stroke')
    expect(wrapper.classes()).not.toContain('bg-primary')
  })

  it('пробрасывает переданный type на нативный button', () => {
    const wrapper = mount(VButton, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('устанавливает disabled и не эмитит click при клике', async () => {
    const wrapper = mount(VButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()

    await wrapper.trigger('click')
    // нативный disabled блокирует click-событие браузером;
    // в jsdom клик по disabled-кнопке не должен долетать до обработчиков
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('эмитит click, когда кнопка активна', async () => {
    const wrapper = mount(VButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  describe('иконки', () => {
    it('рендерит только icon-иконку и скрывает default-слот, если передан icon', () => {
      const wrapper = mount(VButton, {
        props: { icon: 'plus' },
        slots: { default: 'Текст' },
      })
      const svg = wrapper.findComponent({ name: 'VSvg' })
      expect(svg.exists()).toBe(true)
      expect(svg.props('name')).toBe('plus')
      expect(wrapper.text()).not.toContain('Текст')
    })

    it('рендерит preIcon перед текстом', () => {
      const wrapper = mount(VButton, {
        props: { preIcon: 'plus' },
        slots: { default: 'Готово' },
      })
      const svg = wrapper.findComponent({ name: 'VSvg' })
      expect(svg.exists()).toBe(true)
      expect(svg.props('name')).toBe('plus')
      expect(wrapper.text()).toBe('Готово')
    })

    it('рендерит postIcon после текста', () => {
      const wrapper = mount(VButton, {
        props: { postIcon: 'plus' },
        slots: { default: 'Далее' },
      })
      const svg = wrapper.findComponent({ name: 'VSvg' })
      expect(svg.props('name')).toBe('plus')
      expect(wrapper.text()).toBe('Далее')
    })

    it('не рендерит VSvg, если ни один из иконок-пропов не передан', () => {
      const wrapper = mount(VButton, { slots: { default: 'Текст' } })
      expect(wrapper.findComponent({ name: 'VSvg' }).exists()).toBe(false)
    })

    it('применяет дефолтный iconSize', () => {
      const wrapper = mount(VButton, { props: { icon: 'plus' } })
      const svg = wrapper.findComponent({ name: 'VSvg' })
      expect(svg.classes()).toContain('w-4')
      expect(svg.classes()).toContain('h-4')
    })

    it('применяет кастомный iconSize', () => {
      const wrapper = mount(VButton, {
        props: { icon: 'delete', iconSize: 'w-6 h-6' },
      })
      const svg = wrapper.findComponent({ name: 'VSvg' })
      expect(svg.classes()).toContain('w-6')
      expect(svg.classes()).toContain('h-6')
    })
  })
})
