import path from "path"
import matter from "gray-matter"
import fs from "fs"
import fg from "fast-glob"
import MarkdownIt from "markdown-it"
import { orderBy } from "lodash-es"
import { fileURLToPath } from "url"

const reFilterTag = /<(\/)?[^>]+>/g
const reMeta = /^---\s*\n([\s\S]*?)\n---/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../output')

async function run() {
  const resolve = (p) => path.resolve(outputDir, p)
  const posts = await getPostList()
  const pagingPosts = getPagingPosts(posts)

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }

  const postsDir = resolve('posts')
  // const tagsDir = resolve('tags')

  fs.mkdirSync(outputDir)
  fs.mkdirSync(postsDir)
  fs.mkdirSync(resolve('post'))
  // fs.mkdirSync(tagsDir)

  copyDirectory(path.resolve(__dirname, '../src'), outputDir)
  const postsTemp = fs.readFileSync(path.resolve(__dirname, '../template/posts.md'), 'utf8');

  pagingPosts.forEach((data) => {
    const dir = resolve(`posts/${data.page}`)
    fs.mkdirSync(dir)
    const postsMd = postsTemp.replace(/@__([A-Za-z]+)__@/g, (_, name) => {
      switch (name) {
        case 'posts':
          return JSON.stringify(data.items.map((item) => ({ title: item.title, to: item.fileName, description: item.description, date: item.date })))
        case 'next':
          return data.next
        case 'prev':
          return data.prev
      }
    }) 
  
    fs.writeFile(resolve(`posts/${data.page}/index.md`), postsMd, onError)
    if (data.page === 1) {
      fs.writeFile(resolve('posts/index.md'), postsMd, onError)
    }
  
    data.items.forEach((post) => {
      // fs.copyFile(path.resolve(post.source), resolve(`post/${post.fileName}.md`), onError)
      // const filePath = path.resolve(post.source)
      const content = fs.readFileSync(path.resolve(post.source), 'utf8');
      const newContent = content.replace(reMeta, (prev) => `${prev}\n\n# ${post.title}\n`);
      fs.writeFileSync(resolve(`post/${post.fileName}.md`), newContent, 'utf8')
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

function getFileName(path) {
  const names = path.split(/(\\)|(\/)/)
  const fileName = names[names.length - 1]
  return fileName.replace(/\.md$/g, "")
}

function insertTitle(filePath, content) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const modifiedContent = fileContent.replace(reMeta, `$1\n${content}`);
  fs.writeFileSync(filePath, modifiedContent, 'utf8')
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
