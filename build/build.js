import path from "path"
import matter from "gray-matter"
import fs from "fs"
import fg from "fast-glob"
import MarkdownIt from "markdown-it"
import { orderBy } from "lodash-es"
import { fileURLToPath } from "url"

const reFilterTag = /<(\/)?[^>]+>/g
const reMeta = /^---\s*\n([\s\S]*?)\n---/
const rePlace = /@__([A-Za-z]+)__@/g

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../output')
const resolve = (p) => path.resolve(outputDir, p)
const postsTemp = fs.readFileSync(path.resolve(__dirname, '../template/posts.md'), 'utf8');
const tagsTemp = fs.readFileSync(path.resolve(__dirname, '../template/tags.md'), 'utf8');

async function run() {
  const posts = await getPostList()
  const pagingPosts = getPagingPosts(posts)

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }

  const postsDir = resolve('posts')
  const tagsDir = resolve('tags')

  fs.mkdirSync(outputDir)
  fs.mkdirSync(postsDir)
  fs.mkdirSync(resolve('post'))
  fs.mkdirSync(tagsDir)

  copyDirectory(path.resolve(__dirname, '../src'), outputDir)

  createPagingPosts(pagingPosts, {
    pathPrefix: 'posts',
    title: () => '博客',
    description: () => '我最近的博客',
    next: (data) => data.next ? `/posts/${data.next}/` : '',
    prev: (data) => data.prev ? `/posts/${data.prev}/` : '',
    callback: (data) => {
      data.items.forEach((post) => {
        const content = fs.readFileSync(path.resolve(post.source), 'utf8');
        const newContent = content.replace(reMeta, (prev) => `${prev}\n\n# ${post.title}\n`);
        fs.writeFileSync(resolve(`post/${post.fileName}.md`), newContent, 'utf8')
      })
    }
  })

  // 创建 tag 目录
  const tags = getTags(posts)
  const tagsMd = tagsTemp.replace(rePlace, (_, name) => {
    if (name === 'tags') {
      return JSON.stringify(tags)
    }
  })
  fs.writeFile(resolve('tags/index.md'), tagsMd, onError)

  tags.forEach((tag) => {
    fs.mkdirSync(resolve(`tags/${tag}`))
    const tagPosts = getTagPosts(posts, tag)
    const pagingPosts = getPagingPosts(tagPosts, 10)
    createPagingPosts(pagingPosts, {
      pathPrefix: `tags/${tag}`,
      title: () => `标签：${tag}`,
      next: (data) => data.next ? `/tags/${tag}/${data.next}/` : '',
      prev: (data) => data.prev ? `/tags/${tag}/${data.prev}/` : ''
    })
  })
}

function onError(e) {
  if (e) {
    console.error('createGroup writeFile Error:')
    console.error(e)
  }
}

export const getRawPosts = async (options) => {
  const filePaths = await fg(["posts/**/*.md"])
  const posts = []
  filePaths.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath)
    const fileName = getFileName(fullPath)
    const text = fs.readFileSync(fullPath, "utf-8")
    const { data, content } = matter(text)

    const description = data?.description ?? createDescription(content)
    const post = {
      ...data,
      source: fullPath,
      fileName,
      description,
    }
    posts.push(post)
  })

  return posts
}

export const getPostList = async (options = { tag: null }) => {
  const posts = await getRawPosts(options)
  const orderPosts = orderBy(posts, ["date"], "desc")
  const dateNotEmptys = orderPosts.filter(item => item.date)
  const dateEmptys = orderBy(
    orderPosts.filter(item => !item.date),
    ["title"],
    "desc"
  )
  return dateNotEmptys.concat(dateEmptys)
}

export const getPagingPosts = (posts, pageSize = 10) => {
  const result = []
  const pageCount = Math.ceil(posts.length / pageSize)
  let index = -1
  while (++index < pageCount) {
    const start = pageSize * index
    const items = posts.slice(start, start + pageSize)
    const page = index + 1
    const next = page - 1 <= 0 ? null : page - 1
    const prev = page + 1 > pageCount ? null : page + 1
    result.push({ page: index + 1, next, prev, items })
  }
  return result
}

function createPagingPosts(pagingPosts, { pathPrefix, callback, next, prev, title, description }) {
  pagingPosts.forEach((data) => {
    const dir = resolve(`${pathPrefix}/${data.page}`)
    fs.mkdirSync(dir)
    const postsMd = postsTemp.replace(rePlace, (_, name) => {
      switch (name) {
        case 'posts':
          return JSON.stringify(data.items.map((item) => ({ title: item.title, to: item.fileName, description: item.description, date: item.date })))
        case 'next':
          return next(data)
        case 'prev':
          return prev(data)
        case 'title':
          return title ? title(data) : ''
        case 'description':
          return description ? description(data) : ''
      }
    }) 
  
    fs.writeFile(resolve(`${pathPrefix}/${data.page}/index.md`), postsMd, onError)
    if (data.page === 1) {
      fs.writeFile(resolve(`${pathPrefix}/index.md`), postsMd, onError)
    }

    callback?.(data)
  })
}

function createDescription(value) {
  // max 268
  // 中文 [\u4e00-\u9fa5]，双字节字符 [^\x00-\xff]
  const md = new MarkdownIt()
  const content = md
    .render(value)
    .replace(reFilterTag, "")
    .replace(/\n/g, " ")
  return content.slice(0, 160)
}

function getTagPosts(posts, tag) {
  const result = []
  for (const post of posts) {
    if (post.tags?.includes(tag)) {
      result.push(post)
    }
  }

  return result
}

function getTags(posts) {
  const result = []
  posts.forEach((item) => {
    item.tags?.forEach((tag) => {
      if (!result.includes(tag)) {
        result.push(tag)
      }
    })
  })

  return result
}

function getFileName(path) {
  const names = path.split(/(\\)|(\/)/)
  const fileName = names[names.length - 1]
  return fileName.replace(/\.md$/g, "")
}

function copyDirectory(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      copyDirectory(sourcePath, targetPath);
    }
  });
}

run()
