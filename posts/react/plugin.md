---
title: React 相关插件
date: 2021-02-11T18:10:22+08:00
categories: 前端
tags:
  - React
---

## immer.js

便捷修改 React 的 setState

使用案例

```js
const newState = produce(state, (draft) => {
  draft.user.name = 'Jack'
})
```

## React Swiper

安装

```sh
yarn add swiper
# or npm install swiper
```

使用案例

```jsx
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// 引入 Swiper 样式
import 'swiper/swiper.scss';
import './App.css'

export default () => {
  const [state, setState] = useState(0);
  return (
    <div className="swiper-demo">
      <Swiper
        slidesPerView={1}
        onSlideChange={() => {
          console.log('swiper 发生改变时执行')
        }}
        onSwiper={(swiper) => {
          setState(swiper)
        }}
      >
        <SwiperSlide>第一张</SwiperSlide>
        <SwiperSlide>第二张</SwiperSlide>
        <SwiperSlide>第三张</SwiperSlide>
        <SwiperSlide>第四张</SwiperSlide>
      </Swiper>
      <div className="pages">
        <button onClick={() => { state.slidePrev() }}>上一页</button>
        <button onClick={() => { state.slideNext() }}>下一页</button>
      </div>
      <div className="control">
        <button onClick={() => { state.slideTo(0) }}>1</button>
        <button onClick={() => { state.slideTo(1) }}>2</button>
        <button onClick={() => { state.slideTo(2) }}>3</button>
        <button onClick={() => { state.slideTo(3) }}>4</button>
      </div>
    </div>
  )
}
```

> 案例地址：[https://github.com/uphg/react-swiper-demo/blob/master/src/App.js](https://github.com/uphg/react-swiper-demo/blob/master/src/App.js)