
import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "快速使用Hugo搭建个人博客",
      excerpt: "一个简单的指南，教你如何使用Hugo快速搭建自己的个人博客网站...",
      date: "2023-05-15",
      category: "技术",
      tags: ["Hugo", "博客", "网站建设"]
    },
    {
      id: 2,
      title: "我最近听的5首歌曲推荐",
      excerpt: "分享一下最近发现的5首好听的歌曲，希望你也会喜欢...",
      date: "2023-05-10",
      category: "音乐",
      tags: ["音乐", "推荐", "歌单"]
    },
    {
      id: 3,
      title: "关于写作的一些思考",
      excerpt: "最近对写作产生了一些新的想法和思考，在这篇文章中我想分享一下...",
      date: "2023-05-05",
      category: "随笔",
      tags: ["写作", "思考", "创作"]
    },
    {
      id: 4,
      title: "我喜欢的5本书",
      excerpt: "这些书籍对我产生了深远的影响，推荐给所有喜欢阅读的人...",
      date: "2023-04-28",
      category: "阅读",
      tags: ["书籍", "阅读", "推荐"]
    },
    {
      id: 5,
      title: "如何提高自己的创作力",
      excerpt: "探索一些有效的方法和技巧，帮助你提高创作力和灵感...",
      date: "2023-04-20",
      category: "创作",
      tags: ["创作", "灵感", "技巧"]
    },
    {
      id: 6,
      title: "旅行中的小确幸",
      excerpt: "分享一些在旅行中遇到的小确幸和感动的瞬间...",
      date: "2023-04-15",
      category: "旅行",
      tags: ["旅行", "记忆", "分享"]
    },
  ];

  const categories = ["全部", "技术", "音乐", "随笔", "阅读", "创作", "旅行"];

  // Filter posts based on search query and category
  const filteredPosts = (category: string) => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = category === "全部" || post.category === category;
      
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <Layout>
      {/* Blog Header */}
      <section className="bg-aqua-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              博客
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              这里是我的所有文章，包括技术分享、音乐推荐、生活随笔等各种类型的内容
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索文章标题、内容或标签..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="全部" className="w-full">
            <TabsList className="mb-8 flex flex-wrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                {filteredPosts(category).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts(category).map((post) => (
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
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                          <Link to={`/blogs/${post.id}`} className="text-aqua-dark hover:text-aqua flex items-center text-sm font-medium">
                            阅读更多 <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">没有找到相关文章</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
