---
title: 事件委托
date: 2022-01-29T21:29:28+08:00
tags:
  - JavaScript
---

事件捕获/冒泡，示例：https://github.com/uphg/dom-event-demo

要实现事件委托，首先要理解 JavaScript 的 DOM 事件模型，该事件模型分为三个阶段：从上到下的捕获阶段，目标元素的目标阶段，以及从下到上的冒泡阶段。

## 事件冒泡

起源：微软公司提出使用事件冒泡来处理事件流，事件冒泡表示事件会从最内层元素开始触发，一直向外传播，具体顺序为：`div -> body -> html -> document`

## 事件捕获

起源：网景公司提出另一种名为事件捕获的概念，与事件冒泡相反，事件会从最外层开始触发，直到最内侧的元素，顺序为：`document -> html -> body -> div`

## w3c 的标准

w3c 标准采用了折中的方法，制定了事件传播的统一标准：**先捕获再冒泡**

## addEventListener

事件监听器，该方法 `target.addEventListener(type, listener, useCapture)`  的第三个参数，就是配置事件是在捕获阶段处理，还是在冒泡阶段处理。该值默认为 `false`，表示在事件冒泡阶段调用处理函数。为 `true` 则表示在事件捕获阶段调用处理函数。

## 实现事件委托

根据事件冒泡的原理，在获取当前触发事件的元素时（`e.target`），利用 while 循环判断当前元素是否为委托元素的选择器，如果不是，就获取它的 parentNode 节点，继续向上找，直到找到被委托的元素，或被监听的元素

```javascript
function on(element, eventName, selector, handler) {
  element.addEventListener(eventName, (e) => {
    let el = e.target
    while (!el?.matches(selector)) {
      if (element === el) {
        el = null
        break
      }
      el = el?.parentNode
    }
    el && handler.call(el, e, el)
  })
  return element
}
```