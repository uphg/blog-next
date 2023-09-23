---
title: ruby 入门
date: 2023-05-23T14:20:58+08:00
tags:
  - ruby
---

创建一个 User 类

```ruby
class User
  def initialize(name)
    @name = name
  end

  def hi(target)
    p "Hi #{target}, I am #{@name}"
  end
end

u1 = User.new 'jack'
u1.hi 'tom'
```

筛选数组偶数项

```ruby
# 基础写法
even_numbers = []
[1, 2, 3, 4, 5, 6].select do |n|
  if n.even?
    even_numbers << n
  end
end

# 简化1
even_numbers = []
[1, 2, 3, 4, 5, 6].select do |n|
  even_numbers << n if n.even?
end

# 简化2
even_numbers = [1, 2, 3, 4, 5, 6].select { |n| n.even? }

# 简化3
even_numbers = [1, 2, 3, 4, 5, 6].select(&:even?)

# 简化4
even_numbers = (1..6)to_a.select(&:even?)

# 简化5
even_numbers = (1..6).select(&:even?)
```