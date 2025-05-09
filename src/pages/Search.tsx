
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search as SearchIcon, ArrowRight, Book, Music, FileVideo } from "lucide-react";

const Search = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for search results
  const blogResults = [
    {
      id: 1,
      title: "快速使用Hugo搭建个人博客",
      excerpt: "一个简单的指南，教你如何使用Hugo快速搭建自己的个人博客网站...",
      date: "2023-05-15",
      category: "技术",
      type: "blog"
    },
    {
      id: 2,
      title: "我最近听的5首歌曲推荐",
      excerpt: "分享一下最近发现的5首好听的歌曲，希望你也会喜欢...",
      date: "2023-05-10",
      category: "音乐",
      type: "blog"
    }
  ];

  const musicResults = [
    {
      id: 1,
      title: "雨后的天空",
      artist: "tikri",
      duration: "3:45",
      date: "2023-05-10",
      category: "原创",
      type: "music"
    },
    {
      id: 2,
      title: "Stay With Me - Cover",
      artist: "tikri (原唱: Sam Smith)",
      duration: "4:12",
      date: "2023-04-20",
      category: "翻唱",
      type: "music"
    }
  ];

  const videoResults = [
    {
      id: 1,
      title: "如何使用Hugo建立个人博客 - 完整教程",
      duration: "15:24",
      date: "2023-05-15",
      views: 1243,
      category: "教程",
      type: "video"
    },
    {
      id: 2,
      title: "一日创作Vlog - 音乐制作过程",
      duration: "10:45",
      date: "2023-05-05",
      views: 853,
      category: "Vlog",
      type: "video"
    }
  ];

  // Parse query parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, we would update the URL and trigger a new search
      window.history.replaceState(
        {},
        "",
        `/search?q=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  // Filter results based on search query
  const filterResults = (results: any[]) => {
    if (!searchQuery.trim()) return results;
    return results.filter(
      item => item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredBlogResults = filterResults(blogResults);
  const filteredMusicResults = filterResults(musicResults);
  const filteredVideoResults = filterResults(videoResults);
  const allResultsCount = filteredBlogResults.length + filteredMusicResults.length + filteredVideoResults.length;

  return (
    <Layout>
      {/* Search Header */}
      <section className="bg-aqua-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              搜索结果
            </h1>
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="搜索文章、音乐或视频..."
                  className="pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                >
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchQuery ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  {allResultsCount > 0 
                    ? `找到 ${allResultsCount} 个与 "${searchQuery}" 相关的结果` 
                    : `没有找到与 "${searchQuery}" 相关的结果`}
                </p>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="all">
                    全部 ({allResultsCount})
                  </TabsTrigger>
                  <TabsTrigger value="blogs">
                    博客 ({filteredBlogResults.length})
                  </TabsTrigger>
                  <TabsTrigger value="music">
                    音乐 ({filteredMusicResults.length})
                  </TabsTrigger>
                  <TabsTrigger value="videos">
                    视频 ({filteredVideoResults.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  {allResultsCount > 0 ? (
                    <div className="space-y-8">
                      {/* Blog Results */}
                      {filteredBlogResults.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Book className="h-5 w-5 mr-2" /> 博客
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredBlogResults.map((result) => (
                              <Card key={`blog-${result.id}`}>
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <span>{result.date}</span>
                                    <span>•</span>
                                    <Badge variant="outline">{result.category}</Badge>
                                  </div>
                                  <Link to={`/blogs/${result.id}`}>
                                    <h3 className="text-xl font-semibold mb-2 hover:text-aqua-dark">
                                      {result.title}
                                    </h3>
                                  </Link>
                                  <p className="text-gray-600 mb-4">{result.excerpt}</p>
                                  <Link to={`/blogs/${result.id}`} className="text-aqua-dark hover:text-aqua flex items-center text-sm font-medium">
                                    阅读更多 <ArrowRight className="ml-1 h-3 w-3" />
                                  </Link>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Music Results */}
                      {filteredMusicResults.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Music className="h-5 w-5 mr-2" /> 音乐
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredMusicResults.map((result) => (
                              <Card key={`music-${result.id}`}>
                                <CardContent className="p-6">
                                  <h3 className="text-xl font-semibold mb-1">{result.title}</h3>
                                  <div className="text-gray-600 mb-4">{result.artist}</div>
                                  <div className="flex justify-between items-center">
                                    <Badge variant="outline">{result.category}</Badge>
                                    <div className="text-sm text-gray-500">{result.duration}</div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Video Results */}
                      {filteredVideoResults.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <FileVideo className="h-5 w-5 mr-2" /> 视频
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredVideoResults.map((result) => (
                              <Card key={`video-${result.id}`}>
                                <CardContent className="p-6">
                                  <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                                  <div className="flex justify-between items-center mt-4">
                                    <Badge variant="outline">{result.category}</Badge>
                                    <div className="text-sm text-gray-500">
                                      {result.duration} • {result.views} 次观看
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">没有找到相关结果</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="blogs">
                  {filteredBlogResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredBlogResults.map((result) => (
                        <Card key={`blog-tab-${result.id}`}>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <span>{result.date}</span>
                              <span>•</span>
                              <Badge variant="outline">{result.category}</Badge>
                            </div>
                            <Link to={`/blogs/${result.id}`}>
                              <h3 className="text-xl font-semibold mb-2 hover:text-aqua-dark">
                                {result.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 mb-4">{result.excerpt}</p>
                            <Link to={`/blogs/${result.id}`} className="text-aqua-dark hover:text-aqua flex items-center text-sm font-medium">
                              阅读更多 <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">没有找到相关博客</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="music">
                  {filteredMusicResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredMusicResults.map((result) => (
                        <Card key={`music-tab-${result.id}`}>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-1">{result.title}</h3>
                            <div className="text-gray-600 mb-4">{result.artist}</div>
                            <div className="flex justify-between items-center">
                              <Badge variant="outline">{result.category}</Badge>
                              <div className="text-sm text-gray-500">{result.duration}</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">没有找到相关音乐</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="videos">
                  {filteredVideoResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredVideoResults.map((result) => (
                        <Card key={`video-tab-${result.id}`}>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                            <div className="flex justify-between items-center mt-4">
                              <Badge variant="outline">{result.category}</Badge>
                              <div className="text-sm text-gray-500">
                                {result.duration} • {result.views} 次观看
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">没有找到相关视频</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">请输入搜索关键词</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
