
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileAudio, Play, Music as MusicIcon } from "lucide-react";

const Music = () => {
  const musicCategories = ["全部", "原创", "翻唱", "推荐"];

  const musicTracks = [
    {
      id: 1,
      title: "雨后的天空",
      artist: "tikri",
      duration: "3:45",
      date: "2023-05-10",
      category: "原创",
      cover: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Stay With Me - Cover",
      artist: "tikri (原唱: Sam Smith)",
      duration: "4:12",
      date: "2023-04-20",
      category: "翻唱",
      cover: "/placeholder.svg"
    },
    {
      id: 3,
      title: "晴天 - Cover",
      artist: "tikri (原唱: 周杰伦)",
      duration: "4:30",
      date: "2023-03-15",
      category: "翻唱",
      cover: "/placeholder.svg"
    },
    {
      id: 4,
      title: "夜曲",
      artist: "tikri",
      duration: "3:55",
      date: "2023-02-25",
      category: "原创",
      cover: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Summer Vibes",
      artist: "Fresh Touch",
      duration: "3:28",
      date: "2023-01-30",
      category: "推荐",
      cover: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Memories",
      artist: "The Wave",
      duration: "4:05",
      date: "2023-01-15",
      category: "推荐",
      cover: "/placeholder.svg"
    }
  ];

  const filteredTracks = (category: string) => {
    return musicTracks.filter(track => 
      category === "全部" || track.category === category
    );
  };

  return (
    <Layout>
      {/* Music Header */}
      <section className="bg-aqua-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              音乐
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              这里收集了我的原创音乐、翻唱以及一些我喜欢的音乐推荐
            </p>
          </div>
        </div>
      </section>

      {/* Music Collection */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="全部" className="w-full">
            <TabsList className="mb-8">
              {musicCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {musicCategories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTracks(category).map((track) => (
                    <Card key={track.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 bg-gray-100">
                        <img 
                          src={track.cover} 
                          alt={track.title} 
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          size="icon" 
                          className="absolute bottom-4 right-4 rounded-full bg-white text-aqua-dark hover:bg-aqua hover:text-white"
                        >
                          <Play className="h-5 w-5" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">{track.title}</h3>
                          <Badge variant="outline">{track.category}</Badge>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          {track.artist}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{track.date}</span>
                          <span className="flex items-center">
                            <FileAudio className="h-3 w-3 mr-1" /> {track.duration}
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
      
      {/* Featured Playlists */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-8 text-center">
            精选歌单
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 bg-gray-100">
                  <div className="h-full flex items-center justify-center p-6">
                    <MusicIcon className="h-16 w-16 text-aqua-dark" />
                  </div>
                </div>
                <div className="w-full md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold mb-2">安静时光</h3>
                  <p className="text-gray-600 mb-4">
                    适合独处时聆听的轻柔音乐集合，帮助你放松和沉思...
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>10 首歌曲</span>
                    <span className="mx-2">•</span>
                    <span>45 分钟</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 bg-gray-100">
                  <div className="h-full flex items-center justify-center p-6">
                    <MusicIcon className="h-16 w-16 text-aqua-dark" />
                  </div>
                </div>
                <div className="w-full md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold mb-2">创作灵感</h3>
                  <p className="text-gray-600 mb-4">
                    这些音乐作品给了我创作灵感，希望也能激发你的创意...
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>15 首歌曲</span>
                    <span className="mx-2">•</span>
                    <span>65 分钟</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Music;
