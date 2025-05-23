import { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Extract all unique categories
  const allCategories = ["全部", ...Array.from(new Set(blogPosts.map(post => post.category)))];

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
              {allCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {allCategories.map((category) => (
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
                          <Link to={`/blog/${post.markdownFile}`} state={{ postId: post.id }}>
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
                          <Link to={`/blog/${post.markdownFile}`} state={{ postId: post.id }} className="text-aqua-dark hover:text-aqua flex items-center text-sm font-medium">
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
