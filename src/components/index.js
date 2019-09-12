import Button from './button'
import SideMenu from './side-menu'

const components = [
  Button,
  SideMenu
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component)
  })
}

export {
  Button,
  SideMenu
}

export default {
  install
}
