
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Book, Music, BookAudio } from "lucide-react";

const Index = () => {
  const recentPosts = [
    {
      id: 1,
      title: "快速使用Hugo搭建个人博客",
      excerpt: "一个简单的指南，教你如何使用Hugo快速搭建自己的个人博客网站...",
      date: "2023-05-15",
      category: "技术",
    },
    {
      id: 2,
      title: "我最近听的5首歌曲推荐",
      excerpt: "分享一下最近发现的5首好听的歌曲，希望你也会喜欢...",
      date: "2023-05-10",
      category: "音乐",
    },
    {
      id: 3,
      title: "关于写作的一些思考",
      excerpt: "最近对写作产生了一些新的想法和思考，在这篇文章中我想分享一下...",
      date: "2023-05-05",
      category: "随笔",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-aqua-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8">
              AQUA IN JAR
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Hi，欢迎来到tikri的瓶子中，很高兴可以在瓶中相遇，在这边逗留一会儿吧，这里有各种各样的资讯，音乐，还有许多正在建造中。想喝点水嘛？
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-aqua-dark hover:bg-aqua text-white">
                <Link to="/blogs">浏览博客</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-aqua-dark text-aqua-dark hover:bg-aqua-light">
                <Link to="/about">了解更多</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900">
              最新文章
            </h2>
            <Link to="/blogs" className="text-aqua-dark hover:text-aqua flex items-center">
              查看全部 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                  <Link to={`/blogs/${post.id}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-aqua-dark">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link to={`/blogs/${post.id}`} className="text-aqua-dark hover:text-aqua flex items-center text-sm font-medium">
                    阅读更多 <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8 text-center">
            探索内容分类
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <Book className="h-12 w-12 text-aqua-dark mb-4" />
                <h3 className="text-xl font-semibold mb-2">博客</h3>
                <p className="text-gray-600 mb-4">
                  各种各样的文章、随笔、技术分享和生活感悟
                </p>
                <Button asChild variant="outline" className="border-aqua-dark text-aqua-dark hover:bg-aqua-light mt-2">
                  <Link to="/blogs">浏览博客</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <Music className="h-12 w-12 text-aqua-dark mb-4" />
                <h3 className="text-xl font-semibold mb-2">音乐</h3>
                <p className="text-gray-600 mb-4">
                  精选的音乐作品、歌单推荐和音乐相关的分享
                </p>
                <Button asChild variant="outline" className="border-aqua-dark text-aqua-dark hover:bg-aqua-light mt-2">
                  <Link to="/music">聆听音乐</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <BookAudio className="h-12 w-12 text-aqua-dark mb-4" />
                <h3 className="text-xl font-semibold mb-2">视频</h3>
                <p className="text-gray-600 mb-4">
                  视频内容、创意作品和各种有趣的视频分享
                </p>
                <Button asChild variant="outline" className="border-aqua-dark text-aqua-dark hover:bg-aqua-light mt-2">
                  <Link to="/videos">观看视频</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
