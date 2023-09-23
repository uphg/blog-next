import path from "path"
import matter from "gray-matter"
import fs from "fs"
import fg from "fast-glob"
import dayjs from "dayjs"
import MarkdownIt from "markdown-it"
import { orderBy, pickBy, isNil } from "lodash-es"
import { cloneJson } from "./cloneJson"

const reFilterTag = /<(\/)?[^>]+>/g
const customLayout = ["about"]
const customPaths = ["about"]

export const getRawPosts = async ({ tag } = { tag: null }) => {
  const filePaths = await fg(["posts/**/*.md"])
  const posts = []
  filePaths.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath)
    const id = getPostId(fullPath)
    const text = fs.readFileSync(fullPath, "utf-8")
    const {
      data: { title, tags, date, layout, description },
      content
    } = matter(text)
    if (customLayout.includes(layout)) return

    const _description = description || createDescription(content)
    const post = pickBy(
      {
        id,
        title,
        tags,
        description: _description,
        date: date ? dayjs(date).valueOf() : null
        // mdContent: content
      },
      item => !isNil(item)
    )
    if (tag) {
      if (tags?.length) {
        tags.map(item => item.toLowerCase()).includes(tag.toLowerCase()) &&
          posts.push(post)
      }
    } else {
      posts.push(post)
    }
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

export const getPagingPosts = async (_page = 1, pageSize = 10, options) => {
  const page = _page ?? 1
  const { tag = null } = options
  const posts = await getPostList({ tag })
  const start = pageSize * (Number(page) - 1)
  return posts.slice(start, start + pageSize)
}

export const getPostIdList = async () => {
  const filePaths = await fg(["posts/**/*.md"])
  const result = filePaths
    .map(item => getPostId(item))
    .filter(item => !customPaths.includes(item))
  return cloneJson(result)
}

export async function getPostMatter(id) {
  const filePaths = await fg(["posts/**/*.md"])
  const pathMaps = filePaths.map(item => [getPostId(item), item])
  const pathMap = pathMaps.find(item => item[0] === id)

  if (!pathMap) return null
  const text = fs.readFileSync(pathMap[1], "utf-8")
  const {
    data: { title, date },
    content
  } = matter(text)
  return {
    id: pathMap[0],
    title,
    date,
    content
  }
}

function getPostId(path) {
  const names = path.split(/(\\)|(\/)/)
  const fileName = names[names.length - 1]
  return fileName.replace(/\.md$/g, "")
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
