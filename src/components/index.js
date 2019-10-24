import Button from './button'
import SideMenu from './side-menu'
import Affix from './affix'

const components = [
  Button,
  SideMenu,
  Affix
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}

export {
  Button,
  SideMenu,
  Affix
}

export default {
  install
}
