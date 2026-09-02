import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VProgressBar from './VProgressBar.vue'

describe('VProgressBar', () => {
  it('отображает title', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: 50 },
    })
    expect(wrapper.text()).toContain('Прогресс')
  })

  it('отображает округлённый процент в подписи', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: 33.6 },
    })
    expect(wrapper.text()).toContain('34%')
  })

  it('устанавливает ширину полосы в соответствии с percent', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: 42 },
    })
    const bar = wrapper.find('.bg-primary')
    expect(bar.attributes('style')).toContain('width: 42%')
  })

  it('клэмпит значения больше 100 до 100', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: 150 },
    })
    expect(wrapper.text()).toContain('100%')
    expect(wrapper.find('.bg-primary').attributes('style')).toContain('width: 100%')
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('100')
  })

  it('клэмпит отрицательные значения до 0', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: -20 },
    })
    expect(wrapper.text()).toContain('0%')
    expect(wrapper.find('.bg-primary').attributes('style')).toContain('width: 0%')
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('0')
  })

  it('округляет дробные значения', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: 66.5 },
    })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('67')
  })

  it('устанавливает корректные aria-атрибуты', () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Загрузка файла', percent: 75 },
    })
    const bar = wrapper.find('[role="progressbar"]')
    expect(bar.attributes('aria-valuenow')).toBe('75')
    expect(bar.attributes('aria-valuemin')).toBe('0')
    expect(bar.attributes('aria-valuemax')).toBe('100')
    expect(bar.attributes('aria-label')).toBe('Загрузка файла')
  })

  it('реактивно обновляется при изменении percent', async () => {
    const wrapper = mount(VProgressBar, {
      props: { title: 'Прогресс', percent: 10 },
    })
    expect(wrapper.text()).toContain('10%')

    await wrapper.setProps({ percent: 90 })
    expect(wrapper.text()).toContain('90%')
    expect(wrapper.find('.bg-primary').attributes('style')).toContain('width: 90%')
  })
})
