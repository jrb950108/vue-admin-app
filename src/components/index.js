import Button from './button'
import SideMenu from './side-menu'
import Affix from './affix'
import Icon from './icon'

const components = [
  Button,
  SideMenu,
  Affix,
  Icon
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}

export {
  Button,
  SideMenu,
  Affix,
  Icon
}

export default {
  install
}
