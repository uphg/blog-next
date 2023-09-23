---
title: React Router
date: 2021-01-28T11:20:01+08:00
categories: 前端
tags:
  - React
---

## GitHub 案例链接

- [实现一个 React Hash 路由](https://github.com/uphg/react-router-demo/blob/a5d7d35df481975e2725c0c615ec4282633d1ef7/src/App.js)
- [实现一个 React History 路由](https://github.com/uphg/react-router-demo/blob/cb74fdd0d38528b80dafc6edc919a10c2d68d6ce/src/App.js)
- [使用 React Router](https://github.com/uphg/react-router-demo/blob/master/src/App.js)

## 路由的原理

首先使用 React 一个简单的 hash 路由

```jsx
import React, { useState } from "react";

const About = () => <div>我是关于页</div>
const User = () => <div>我是用户页</div>
const Home = () => <div>我是首页</div>

function App() {
  const [hash, setHash] = useState(window.location.hash)
  const clickLink = (link) => {
    setHash(link)
    window.location.hash = link
  }

  const loadingPage = (path) => {
    if (path === '#/') {
      return <Home />
    } else if (path === '#/user') {
      return <User />
    } else if (path === '#/about') {
      return <About />
    }
  }
  return (
    <div className="App">
      <header>
        <button onClick={() => { clickLink('#/') }}>首页</button>
        <button onClick={() => { clickLink('#/user') }}>用户</button>
        <button onClick={() => { clickLink('#/about') }}>关于</button>
      </header>
      <main>
        {loadingPage(hash)}
      </main>
    </div>
  );
}
```

再实现一个 history 模式路由，相对 hash 原理类似，只是使用的 API 不同

```jsx
import React, { useState } from "react";

const About = () => <div>我是关于页</div>
const User = () => <div>我是用户页</div>
const Home = () => <div>我是首页</div>

function App() {
  const [history, setHistory] = useState(window.location.pathname)
  const clickLink = (link) => {
    setHistory(link)
    window.history.pushState(null, '', link)
  }

  const loadingPage = (path) => {
    if (path === '/') {
      return <Home />
    } else if (path === '/user') {
      return <User />
    } else if (path === '/about') {
      return <About />
    }
  }
  return (
    <div className="App">
      <header>
        <button onClick={() => { clickLink('/') }}>首页</button>
        <button onClick={() => { clickLink('/user') }}>用户</button>
        <button onClick={() => { clickLink('/about') }}>关于</button>
      </header>
      <main>
        {loadingPage(history)}
      </main>
    </div>
  );
}
```

## 使用 React Router

安装

```sh
yarn add react-router
# or
npm install react-router
```

一个简单的使用案例

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

const About = () => <div>我是关于页</div>
const User = () => <div>我是用户页</div>
const Home = () => <div>我是首页</div>

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/user">User</Link>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
```
