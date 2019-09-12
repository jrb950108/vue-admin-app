### 使用组件

这是项目的基础目录结构

```
├── README.md
├── babel.config
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── index.js
│   │   └── Button
│   ├── App.vue
│   └── main.js
└── yarn.lock
```

完整引入

```javascript
// main.js
import Vue from 'vue'
import Musd from './components'

Vue.use(Musd)
```

局部导入组件

```javascript
// main.js
import Vue from 'vue'
import { Button } from './components'

Vue.use(Button)
```