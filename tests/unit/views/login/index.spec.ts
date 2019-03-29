import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import store from '@/store/index'
const router = new VueRouter()
router.push = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

function createWrapper(): Wrapper<Login> {
  return mount(Login, {
    localVue,
    store,
    router
  })
}

describe('登录页面', () => {
  it('空用户名验证', () => {
    const wrapper = createWrapper()
    wrapper.find('button[id="submit"]').trigger('click')
    expect(wrapper.find('.el-form-item__error').text()).toMatch('请输入登录名')
  })

  it('用户名空格验证', () => {
    const wrapper = createWrapper()
    wrapper.find('input[placeholder="账号"]').setValue('         ')
    wrapper.find('button[id="submit"]').trigger('click')
    expect(wrapper.find('.el-form-item__error').text()).toMatch('请输入登录名')
  })

  it('用户名失去焦点时空验证', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.$data.rules.username[0].trigger).toBe('blur')
  })

  it('密码空验证', () => {
    const wrapper = createWrapper()
    wrapper.find('input[placeholder="账号"]').setValue('admin')
    wrapper.find('button[id="submit"]').trigger('click')
    expect(wrapper.find('.el-form-item__error').text()).toMatch('请输入密码')
  })

  it('密码空格验证', () => {
    const wrapper = createWrapper()
    wrapper.find('input[placeholder="账号"]').setValue('admin')
    wrapper.find('input[placeholder="密码"]').setValue('             ')
    wrapper.find('button[id="submit"]').trigger('click')
    expect(wrapper.find('.el-form-item__error').text()).toMatch('请输入密码')
  })

  it('密码失去焦点时空验证', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.$data.rules.password[0].trigger).toBe('blur')
  })

  it('输入用户名和密码,执行登录操作,页面显示loading加载中', () => {
    const wrapper = createWrapper()
    wrapper.find('input[placeholder="账号"]').setValue('admin')
    wrapper.find('input[placeholder="密码"]').setValue('admin')
    wrapper.find('button[id="submit"]').trigger('click')
    expect(wrapper.vm.$data.loading).toBe(true)
  })

  it('按回车键，提交登录', () => {
    const wrapper = createWrapper()
    wrapper.find('input[placeholder="账号"]').setValue('')
    wrapper.find('input[placeholder="密码"]').setValue('')
    wrapper.trigger('keydown.enter')
    expect(wrapper.find('.el-form-item__error').text()).toMatch('请输入登录名')
  })

  it('登录成功，跳转到首页', async (done) => {
    const next = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          code: 200
        })
      })
    })

    const wrapper = createWrapper()
    wrapper.vm.$store.dispatch = next

    wrapper.find('input[placeholder="账号"]').setValue('admin')
    wrapper.find('input[placeholder="密码"]').setValue('admin1')
    wrapper.find('button[id="submit"]').trigger('click')
    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/')
      done()
    })
  })

  it('登录失败，loading加载中隐藏', (done) => {

    const next = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject({
          code: 30001,
          message: '用户名/密码错误'
        })
      })
    })

    const wrapper = createWrapper()
    wrapper.vm.$store.dispatch = next

    wrapper.find('input[placeholder="账号"]').setValue('admin')
    wrapper.find('input[placeholder="密码"]').setValue('admin1')
    wrapper.find('button[id="submit"]').trigger('click')

    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(wrapper.vm.$data.loading).toBe(false)
      done()
    })
  })

  it('登录失败,显示失败内容', (done) => {
    const next = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject({
          code: 30001,
          message: '用户名/密码错误'
        })
      })
    })

    const error = jest.fn()

    const wrapper = createWrapper()
    wrapper.vm.$store.dispatch = next
    wrapper.vm.$message.error = error

    wrapper.find('input[placeholder="账号"]').setValue('admin')
    wrapper.find('input[placeholder="密码"]').setValue('admin1')
    wrapper.find('button[id="submit"]').trigger('click')

    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(error).toBeCalledTimes(1)
      expect(error.mock.calls[0][0]).toBe('用户名/密码错误')
      done()
    })

  })
})
