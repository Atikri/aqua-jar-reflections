
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileVideo } from "lucide-react";

const Videos = () => {
  const videoCategories = ["全部", "创作", "教程", "Vlog", "音乐"];

  const videos = [
    {
      id: 1,
      title: "如何使用Hugo建立个人博客 - 完整教程",
      thumbnail: "/placeholder.svg",
      duration: "15:24",
      date: "2023-05-15",
      views: 1243,
      category: "教程"
    },
    {
      id: 2,
      title: "一日创作Vlog - 音乐制作过程",
      thumbnail: "/placeholder.svg",
      duration: "10:45",
      date: "2023-05-05",
      views: 853,
      category: "Vlog"
    },
    {
      id: 3,
      title: "《雨后的天空》MV",
      thumbnail: "/placeholder.svg",
      duration: "3:45",
      date: "2023-04-25",
      views: 2156,
      category: "音乐"
    },
    {
      id: 4,
      title: "旅行日记 - 城市一角",
      thumbnail: "/placeholder.svg",
      duration: "8:30",
      date: "2023-04-10",
      views: 732,
      category: "Vlog"
    },
    {
      id: 5,
      title: "创作者与AI - 思考与展望",
      thumbnail: "/placeholder.svg",
      duration: "12:15",
      date: "2023-03-20",
      views: 1546,
      category: "创作"
    },
    {
      id: 6,
      title: "如何提高录音质量 - 家庭录音技巧",
      thumbnail: "/placeholder.svg",
      duration: "18:35",
      date: "2023-03-05",
      views: 974,
      category: "教程"
    }
  ];

  const filteredVideos = (category: string) => {
    return videos.filter(video => 
      category === "全部" || video.category === category
    );
  };

  // Format view count
  const formatViews = (views: number) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views.toString();
  };

  return (
    <Layout>
      {/* Videos Header */}
      <section className="bg-aqua-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              视频
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              探索各种视频内容，包括创作过程、教程、Vlog以及音乐视频
            </p>
          </div>
        </div>
      </section>

      {/* Videos Collection */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="全部" className="w-full">
            <TabsList className="mb-8">
              {videoCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {videoCategories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos(category).map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{video.title}</h3>
                          <Badge variant="outline">{video.category}</Badge>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{video.date}</span>
                          <span className="flex items-center">
                            <FileVideo className="h-3 w-3 mr-1" /> {formatViews(video.views)} 次观看
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Videos;
