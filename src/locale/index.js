import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCN from './lang/zh-CN'
import customEnUS from './lang/en-US'
import elementEnUS from 'element-ui/lib/locale/lang/en'
import elementZhCN from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import { readLocale } from '@/lib/util'

Vue.use(VueI18n)

Vue.locale = () => {}

const messages = {
  'zh-CN': Object.assign(customZhCN, elementZhCN),
  'en-US': Object.assign(customEnUS, elementEnUS)
}

const navLang = navigator.language
const localLang = (navLang in messages) ? navLang : 'en-US'
let locale = readLocale() || localLang

const i18n = new VueI18n({
  locale,
  messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
