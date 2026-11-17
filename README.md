# AI 看板

每天 1–2 条 AI / 前沿科技的大事和好玩的事，带中文摘要、公众号角度和来源链接。

上线地址：https://lxcswlp.github.io/seendfirstindex/

## 这是什么

这是我的第一个 GitHub 项目。网站是纯静态的，没有服务器、不用花钱：

- 首页 `index.html` 就是看板，按日期倒着排故事，可以按“只看想写这个 / 大事 / 好玩”筛选。
- 故事都存在 `stories.json` 里，网站打开时读这个文件。每天更新就是改这个文件再推送，别人刷新页面就能看到新内容。
- `articles.html` 是公众号“不可错过的小莫”的文章归档。
- `manifest.webmanifest` + `sw.js` 让它可以像 App 一样用：在手机浏览器里点分享，选“添加到主屏幕”就行。
- `todo.html` 是我最早做的 TODO 小应用，留着做个纪念。

## 怎么更新故事

在 `stories.json` 的 `stories` 数组最前面加一条，字段是：

- `date`：看板日期，如 `2026-11-17`
- `category`：`大事` 或 `好玩`
- `title` / `summary` / `angle`：标题、中文摘要、公众号角度
- `sourceName` / `sourceUrl`：来源名称和链接（来源错了要换，别留错链接）
- `picked`：我点了“想写这个”就是 `true`，否则 `false`
- `note`：核对提示，日期容易写错的（比如一周回顾、CES 回顾）一定要写清楚

推到 `main` 分支后，GitHub Pages 会自动部署，1 分钟左右生效。

## 本地看效果

```bash
python3 -m http.server 8000
```

然后打开 http://localhost:8000/ 。直接双击打开 `index.html` 也能看，但 `fetch` 读 `stories.json` 在某些浏览器里需要用本地服务器才行。
