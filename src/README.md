


# AQUA IN JAR 博客网站

## 如何发布新的博客文章

要发布新的博客文章，你有两种方法：

### 方法一：在blogPosts.tsx中直接添加HTML内容

1. 打开 GitHub 仓库中的 `src/data/blogPosts.tsx` 文件。

2. 在 `blogPosts` 数组中添加一个新的博客文章对象。确保给新文章一个唯一的 `id`（通常是数组中的最大 id + 1）。

3. 填写以下必要字段：
   - `id`: 唯一标识符（数字）
   - `title`: 文章标题
   - `excerpt`: 文章摘要（显示在博客列表中）
   - `content`: 文章内容（支持 HTML 格式）
   - `date`: 发布日期（格式：YYYY-MM-DD）
   - `author`: 作者名称
   - `tags`: 标签数组
   - `category`: 分类名称

4. 示例：
```typescript
{
  id: 7,
  title: "我的新博客文章",
  excerpt: "这是一篇新的博客文章...",
  content: `
    <p>这是我的新博客文章的内容。</p>
    
    <h2>第一部分</h2>
    <p>这是第一部分的内容。</p>
    
    <h2>第二部分</h2>
    <p>这是第二部分的内容。</p>
  `,
  date: "2023-06-01",
  author: "tikri",
  tags: ["新标签", "博客"],
  category: "随笔"
}
```

### 方法二：使用Markdown文件（推荐）

1. 创建一个新的Markdown文件（.md），放在 `src/content/blog/` 目录下，例如 `my-post.md`。

2. 在Markdown文件中编写博客内容，例如：
```markdown
# 我的博客标题

这是博客内容的第一段。

## 小标题

- 列表项1
- 列表项2

### 代码示例
```javascript
console.log("Hello, world!");
```

3. 在 `src/data/blogPosts.tsx` 文件中，添加一个新的博客文章对象，但使用 `markdownFile` 而不是 `content` 字段：

```typescript
{
  id: 8,
  title: "使用Markdown写的博客",
  excerpt: "这是一篇使用Markdown格式的博客文章...",
  markdownFile: "/src/content/blog/my-post.md",
  date: "2023-06-05",
  author: "tikri",
  tags: ["Markdown", "博客"],
  category: "技术"
}
```

4. 保存并提交更改到GitHub仓库。

5. 网站将自动更新，显示新的博客文章。

## 如何上传音乐

要上传音乐到网站，您有两种方法：

### 方法一：通过网站界面上传（临时存储）

1. 在音乐页面上点击"上传音乐"按钮。
2. 选择要上传的音频文件（支持 MP3、WAV、OGG 格式）。
3. 音乐将被添加到网站中，但这种方式只是临时的，刷新页面后上传的音乐会消失。

### 方法二：通过代码添加（永久存储）

要永久添加音乐到网站，请修改 `src/data/musicTracks.tsx` 文件中的 `musicTracks` 数组：

1. 首先将您的音乐文件上传到网络存储服务（如七牛云、阿里云 OSS 或 GitHub 等）。

2. 获得音乐文件的公开访问 URL。

3. 在 `musicTracks` 数组中添加一个新的音乐对象：

```javascript
{
  id: 7, // 使用下一个可用的 ID
  title: "音乐标题",
  artist: "演唱者",
  duration: "3:45", // 音乐时长
  date: "2023-06-01", // 发布日期
  category: "原创", // 分类（原创、翻唱或推荐）
  cover: "/placeholder.svg", // 封面图片 URL
  file: "https://您的音乐文件URL.mp3" // 音乐文件 URL
}
```

4. 保存文件，提交并推送更改到 GitHub 仓库。

5. 网站将自动更新，显示您的新音乐。

## 注意事项

- 确保每篇文章和每首音乐都有一个唯一的 `id`。
- 日期格式应为 `YYYY-MM-DD`。
- 文章内容支持 HTML 格式和Markdown格式，可以根据需要选择。
- 音乐文件应上传到可公开访问的网络存储服务，并确保 URL 是长期有效的。
- 添加大量音乐后，可能需要考虑将音乐数据移至单独的数据文件中，类似于博客文章的处理方式。

