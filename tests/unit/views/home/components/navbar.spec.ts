import { mount, Wrapper, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store/index'
import Navbar from '@/views/home/components/navbar.vue'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

function createWrapper(): Wrapper<Navbar> {
  return mount(Navbar, {
    localVue,
    store
  })
}

describe('navnar', () => {

  it('测试是否执行了获取用户信息', (done) => {
    const dispatch = jest.fn()
    store.dispatch = dispatch
    const wrapper = createWrapper()
    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(dispatch).toBeCalledTimes(1)
      expect(dispatch).toBeCalledWith('user/getUserInfo')
      done()
    })
  })

  it('测试显示用户名', (done) => {
    const dispatch = jest.fn()
    store.dispatch = dispatch
    const wrapper = createWrapper()
    wrapper.setData({
      userinfo: {
        userid: '',
        username: 'admin',
        realName: '系统管理员'
      }
    })
    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(wrapper.find('.userinfo-inner').text()).toBe('系统管理员')
      done()
    })
  })

  it('没有上传头像,显示默认头像', (done) => {
    const dispatch = jest.fn()
    store.dispatch = dispatch
    const wrapper = createWrapper()
    wrapper.setData({
      userinfo: {
        userid: '',
        username: 'admin',
        realName: '系统管理员',
        avatar: ''
      }
    })
    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(wrapper.find('.userinfo-img').attributes('src')).toBe('../../../assets/user.png')
      done()
    })
  })

  it('没有上传头像,显示默认头像', (done) => {
    const dispatch = jest.fn()
    store.dispatch = dispatch
    const wrapper = createWrapper()
    wrapper.setData({
      userinfo: {
        userid: '',
        username: 'admin',
        realName: '系统管理员'
      }
    })
    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(wrapper.find('.userinfo-img').attributes('src')).toBe('../../../assets/user.png')
      done()
    })
  })

  it('已上传头像，显示上传的头像', (done) => {
    const dispatch = jest.fn()
    store.dispatch = dispatch
    const wrapper = createWrapper()
    wrapper.setData({
      userinfo: {
        userid: '',
        username: 'admin',
        realName: '系统管理员',
        avatar: '/avatar'
      }
    })
    wrapper.vm.$nextTick(async () => {
      await flushPromises()
      expect(wrapper.find('.userinfo-img').attributes('src')).toBe('/avatar')
      done()
    })
  })

})
