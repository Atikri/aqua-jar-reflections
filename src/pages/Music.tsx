
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Pause, Upload, Search } from "lucide-react";
import { musicTracks } from "@/data/musicTracks";

const Music = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState(musicTracks);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 检查浏览器支持的音频格式
  useEffect(() => {
    const audio = new Audio();
    console.log("浏览器音频格式支持:");
    console.log("MP3:", audio.canPlayType("audio/mpeg"));
    console.log("WAV:", audio.canPlayType("audio/wav"));
    console.log("OGG:", audio.canPlayType("audio/ogg"));
    console.log("M4A:", audio.canPlayType("audio/mp4"));
  }, []);

  const allCategories = ["全部", ...Array.from(new Set(tracks.map(track => track.category)))];

  const filteredTracks = (category: string) => {
    return tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "全部" || track.category === category;
      return matchesSearch && matchesCategory;
    });
  };

  const playTrack = (trackId: number) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) {
      console.error("找不到音轨:", trackId);
      return;
    }

    console.log("尝试播放音轨:", track.title, "文件路径:", track.file);

    if (audioRef.current) {
      // 添加详细的错误处理
      audioRef.current.onerror = (e) => {
        console.error("音频加载错误:", e);
        const audio = e.target as HTMLAudioElement;
        if (audio.error) {
          switch (audio.error.code) {
            case audio.error.MEDIA_ERR_ABORTED:
              console.error("音频播放被中止");
              break;
            case audio.error.MEDIA_ERR_NETWORK:
              console.error("网络错误");
              break;
            case audio.error.MEDIA_ERR_DECODE:
              console.error("音频解码错误 - 文件格式可能不受支持");
              break;
            case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              console.error("音频源不受支持 - 检查文件路径和格式");
              break;
            default:
              console.error("未知音频错误");
          }
        }
      };

      audioRef.current.onloadstart = () => console.log("开始加载音频");
      audioRef.current.oncanplay = () => console.log("音频可以播放");
      audioRef.current.onloadeddata = () => console.log("音频数据已加载");

      if (currentTrack === trackId) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          console.log("暂停播放");
        } else {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            console.log("开始播放");
          }).catch(error => {
            console.error("播放失败:", error);
          });
        }
      } else {
        audioRef.current.src = track.file;
        audioRef.current.load(); // 强制重新加载
        audioRef.current.play().then(() => {
          setCurrentTrack(trackId);
          setIsPlaying(true);
          console.log("播放新音轨:", track.title);
        }).catch(error => {
          console.error("播放失败:", error);
        });
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newTrack = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "用户上传",
        duration: "未知",
        date: new Date().toISOString().split('T')[0],
        category: "上传",
        cover: "/placeholder.svg",
        file: url
      };
      setTracks([newTrack, ...tracks]);
      console.log("上传新音轨:", newTrack);
    }
  };

  return (
    <Layout>
      <audio ref={audioRef} />
      
      {/* Header */}
      <section className="bg-aqua-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              音乐
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              在这里聆听我的音乐作品，包括原创歌曲、翻唱作品和推荐的音乐
            </p>
          </div>
        </div>
      </section>

      {/* Upload and Search Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索音乐或艺术家..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="music-upload" className="text-sm font-medium">
                上传音乐
              </Label>
              <div className="relative">
                <Input
                  id="music-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button asChild variant="outline">
                  <label htmlFor="music-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    上传音乐
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Tracks */}
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
                {filteredTracks(category).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTracks(category).map((track) => (
                      <Card key={track.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <img 
                              src={track.cover} 
                              alt={track.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg truncate">{track.title}</h3>
                              <p className="text-gray-600 truncate">{track.artist}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline">{track.category}</Badge>
                            <span className="text-sm text-gray-500">{track.duration}</span>
                          </div>
                          
                          <Button 
                            onClick={() => playTrack(track.id)}
                            className="w-full"
                            variant={currentTrack === track.id && isPlaying ? "secondary" : "default"}
                          >
                            {currentTrack === track.id && isPlaying ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                暂停
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                播放
                              </>
                            )}
                          </Button>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            发布于 {track.date}
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
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Music;
