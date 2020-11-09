# vue-cli-app

## 目录结构

```
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 图片等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── lib                    # 全局公用方法
│   ├── locale                 # 国际化
│   ├── mock                   # 项目 mock 模拟数据
│   ├── router                 # 路由
│   ├── store                  # 全局 store 管理
│   ├── styles                 # 全局样式
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── element-ui.js          # element 组件按需引入
├── .eslintrc.js               # eslint 配置项
├── babel.config.js            # babel 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json 
```

## 项目安装

```
npm install
```

## Compiles and hot-reloads for development

```
npm run dev
```

## Compiles and minifies for production

```
npm run build
```

## Lints and fixes files

```
npm run lint
```

## 引入路径

为了防止相对路径过深，使用别名方式便捷引入文件、静态资源等

`@` 是 webpack 的 [alias](https://webpack.js.org/configuration/resolve/#resolve-alias)

图片路径引入

```
<img src="@/assets/logo.png" />

// css 背景图片
background: url('~@/assets/logo.png')
```

js模块引入

```
import { getToken } from '@/lib/util'
```

## 组件

### Svg Icon

全局 `Svg` 图标组件

默认在 `src/icons` 中注册到全局中，可以在项目中任意地方使用。所以图标均可在 `src/icons/svg`。可自行添加或者删除图标，所以图标都会被自动导入，无需手动操作。

#### 使用方式

```
<m-icon icon-class="password"  class-name='custom-class' />
```

#### 改变颜色

`m-icon` 默认会读取其父级的 color `fill: currentColor`

你可以改变父级的 `color` 或者直接改变 `fill` 的颜色即可

#### 使用外链

支持使用外链的形式引入 `svg`。例如：

```
<m-icon icon-class="https://xxxx.svg />
```

## Script

### Svgo

本项目提供了 svg 压缩处理优化功能。基于 [svgo](https://github.com/svg/svgo) 实现。

```
npm run svgo
```

我们很多网上下载或者 `Sketch` 导出的 svg 会有很多冗余无用的信息，大大的增加了 svg 的尺寸，我们可以使用 `svgo` 对它进行优化。比如下图是有 `Sketch` 导出的一个 svg

![](https://wpimg.wallstcn.com/333edb6b-4b95-42f8-aa60-b8f42e516b52.jpg)

我们可以执行 `npm run svgo`

![](https://wpimg.wallstcn.com/e7b1324e-cd67-4306-aebf-f659bcc433cf.jpg)

无用的信息都被处理掉了。

![](https://wpimg.wallstcn.com/006c4bb5-b2d1-447d-a1c9-a912cf5dee47.jpg)

更多详细的配置 可以在 `/scr/icons/svgo.yml` 中进行配置。

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
