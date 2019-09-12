import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Button,
  Select,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'medium' }

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Button)
Vue.use(Select)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
// Vue.use(Scrollbar)
