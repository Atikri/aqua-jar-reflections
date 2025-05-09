
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock blog post data (in a real app, this would be fetched from an API)
  const post = {
    id: Number(id),
    title: "快速使用Hugo搭建个人博客",
    content: `
      <p>Hugo是一个优秀的静态网站生成器，特别适合用来搭建个人博客。在这篇文章中，我将分享如何快速使用Hugo搭建一个个人博客网站。</p>
      
      <h2>第一步：安装Hugo</h2>
      <p>首先，我们需要在本地电脑上安装Hugo。Hugo支持多种操作系统，包括Windows、macOS和Linux。</p>
      <p>在macOS上，你可以使用Homebrew来安装Hugo：</p>
      <pre><code>brew install hugo</code></pre>
      
      <h2>第二步：创建新网站</h2>
      <p>安装完成后，我们可以使用Hugo创建一个新的网站：</p>
      <pre><code>hugo new site my-blog</code></pre>
      <p>这将创建一个名为"my-blog"的目录，该目录中包含了Hugo网站的基本结构。</p>
      
      <h2>第三步：安装主题</h2>
      <p>Hugo支持多种主题，可以在Hugo官方主题库中找到自己喜欢的主题。以下是安装主题的基本步骤：</p>
      <pre><code>cd my-blog
      git init
      git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke
      echo 'theme = "ananke"' >> config.toml</code></pre>
      
      <h2>第四步：创建内容</h2>
      <p>现在，我们可以开始创建博客内容了。Hugo使用Markdown格式存储内容：</p>
      <pre><code>hugo new posts/my-first-post.md</code></pre>
      <p>这将在content/posts目录下创建一个名为my-first-post.md的文件。你可以用Markdown编辑器打开这个文件，编辑你的文章内容。</p>
      
      <h2>第五步：本地预览</h2>
      <p>在发布之前，你可以在本地预览你的网站：</p>
      <pre><code>hugo server -D</code></pre>
      <p>现在，你可以在浏览器中访问http://localhost:1313预览你的网站。</p>
      
      <h2>第六步：构建与部署</h2>
      <p>当你准备好发布你的网站时，可以使用以下命令构建静态网站：</p>
      <pre><code>hugo</code></pre>
      <p>这将在public目录下生成静态网站文件。你可以将这些文件上传到Web服务器或GitHub Pages等平台来发布你的网站。</p>
      
      <h2>总结</h2>
      <p>使用Hugo搭建个人博客非常简单快捷。通过以上六个步骤，你已经可以拥有一个功能完整的个人博客网站了。希望这篇文章对你有所帮助！</p>
    `,
    date: "2023-05-15",
    author: "tikri",
    tags: ["Hugo", "博客", "网站建设"],
    category: "技术"
  };

  return (
    <Layout>
      <article className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/blogs" className="flex items-center text-aqua-dark hover:text-aqua mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回博客列表
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
              <span>•</span>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button asChild variant="outline">
                <Link to="/blogs">返回博客列表</Link>
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600">分享：</span>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">分享到微信</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.667 18.583a.803.803 0 01-.397-.11l-3.86 1.93.106-3.255a7.062 7.062 0 01-3.121-5.807C1.395 6.495 5.15 2.75 9.667 2.75c3.593 0 6.717 2.356 7.803 5.617-.121-.118-.245-.234-.375-.345.004.16.007.32.007.048 0 4.296-3.761 7.784-8.417 7.784-.309 0-.614-.017-.915-.05-.009 1.217-.022 2.117-.103 2.78z"/>
                    <path d="M22.605 22.452l.09-2.77a5.995 5.995 0 01-2.647-4.921c0-3.308 2.694-6.003 6.002-6.003 3.309 0 6.003 2.695 6.003 6.003 0 3.308-2.694 6.003-6.002 6.003-.264 0-.527-.017-.784-.051-.097 1.043-.102 1.739-.662 1.739z"/>
                  </svg>
                </Button>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">分享到微博</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.098 20.323c-3.977 0-7.215-1.391-7.215-3.109 0-1.719 3.238-3.109 7.215-3.109 3.977 0 7.215 1.39 7.215 3.109 0 1.718-3.238 3.109-7.215 3.109zm5.482-8.052c-.184-.614-1.848-.217-1.543-1.518.303-1.301 2.889.504 1.543 1.518zm1.143-1.763c-1.05-.273-3.537.047-2.834-1.211.703-1.258 3.071.855 2.834 1.211zM21.191 5.415c-.728-6.024-11.312-4.642-15.774-1.42C1.596 6.512.39 9.982 2.465 12.062c2.074 2.08 5.542.889 8.63-1.131 3.087-2.02 10.093-2.503 10.093 3.687 0 2.051-2.382 8.108-9.73 8.108-5.089 0-9.267-3.083-9.267-6.887 0-3.803 4.585-5.97 9.83-5.97 4.222 0 7.082 1.282 8.397 1.928 1.315.646 2.162.356 1.794-.83-.367-1.187-3.138-3.511-5.306-4.279C14.717 5.92 6.42 6.915 6.42 12.531c0 5.615 6.721 10.536 14.907 10.536 8.186 0 12.13-5.313 12.13-9.477 0-4.165-4.83-8.691-12.266-8.175z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
