
import React, { useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileAudio, Music as MusicIcon } from "lucide-react";
import { toast } from "sonner";
import { musicTracks as initialMusicTracks, MusicTrack } from "@/data/musicTracks";
import MusicPlayer from "./MusicPlayer";

const Music = () => {
  const musicCategories = ["全部", "原创", "翻唱", "推荐"];
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>(initialMusicTracks);

  const filteredTracks = (category: string) => {
    return musicTracks.filter(track => 
      category === "全部" || track.category === category
    );
  };

  // 检查浏览器对音频格式的支持
  const checkAudioSupport = (url: string) => {
    const audio = document.createElement('audio');
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'mp3':
        return audio.canPlayType('audio/mpeg');
      case 'wav':
        return audio.canPlayType('audio/wav');
      case 'ogg':
        return audio.canPlayType('audio/ogg');
      case 'flac':
        return audio.canPlayType('audio/flac');
      case 'm4a':
        return audio.canPlayType('audio/mp4');
      default:
        return '';
    }
  };

  const handlePlayPause = async (trackId: number) => {
    const track = musicTracks.find(t => t.id === trackId);
    
    if (!track) {
      console.error("找不到音轨:", trackId);
      toast.error("找不到音轨");
      return;
    }

    console.log("尝试播放音轨:", track.title, "文件路径:", track.file);
    
    // 检查浏览器对该音频格式的支持
    const support = checkAudioSupport(track.file);
    console.log("浏览器对该音频格式的支持:", support);
    
    if (!support || support === '') {
      const extension = track.file.split('.').pop()?.toLowerCase();
      toast.error(`浏览器不支持 ${extension?.toUpperCase()} 格式的音频文件`);
      console.error("浏览器不支持该音频格式:", extension);
      return;
    }

    if (currentTrack === trackId) {
      // 如果是当前播放的曲目，切换播放/暂停
      if (isPlaying) {
        console.log("暂停音频");
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        console.log("恢复播放音频");
        try {
          await audioRef.current?.play();
          console.log("音频播放成功");
          setIsPlaying(true);
        } catch (error) {
          console.error("音频播放失败:", error);
          toast.error("无法播放此音频文件: " + (error as Error).message);
        }
      }
    } else {
      // 如果选择了新曲目
      console.log("加载新音轨:", track.file);
      setCurrentTrack(trackId);
      
      if (audioRef.current) {
        // 先暂停当前播放
        audioRef.current.pause();
        
        // 清理之前的事件监听器
        audioRef.current.onloadstart = null;
        audioRef.current.oncanplay = null;
        audioRef.current.onerror = null;
        audioRef.current.onloadeddata = null;
        
        // 设置新的音频源
        audioRef.current.src = track.file;
        
        // 添加详细的音频事件监听器
        audioRef.current.onloadstart = () => {
          console.log("开始加载音频:", track.file);
        };
        
        audioRef.current.oncanplay = () => {
          console.log("音频可以播放");
        };
        
        audioRef.current.onloadeddata = () => {
          console.log("音频数据加载完成");
        };
        
        audioRef.current.onerror = (e) => {
          console.error("音频加载错误:", e);
          console.error("音频元素错误代码:", audioRef.current?.error?.code);
          console.error("音频元素错误消息:", audioRef.current?.error?.message);
          
          let errorMsg = "音频文件加载失败";
          if (audioRef.current?.error) {
            switch (audioRef.current.error.code) {
              case 1:
                errorMsg = "音频加载被中止";
                break;
              case 2:
                errorMsg = "网络错误，无法下载音频文件";
                break;
              case 3:
                errorMsg = "音频文件已损坏或格式不支持";
                break;
              case 4:
                errorMsg = "音频文件格式不支持";
                break;
              default:
                errorMsg = "未知的音频播放错误";
            }
          }
          
          toast.error(errorMsg);
          setIsPlaying(false);
          setCurrentTrack(null);
        };
        
        // 尝试播放音频
        try {
          await audioRef.current.play();
          console.log("新音频播放成功");
          setIsPlaying(true);
        } catch (error) {
          console.error("新音频播放失败:", error);
          
          // 提供更具体的错误信息
          let errorMsg = "无法播放此音频文件";
          if (error instanceof DOMException) {
            switch (error.name) {
              case 'NotSupportedError':
                errorMsg = "浏览器不支持此音频格式";
                break;
              case 'NotAllowedError':
                errorMsg = "浏览器阻止了音频播放，请先与页面交互";
                break;
              case 'AbortError':
                errorMsg = "音频播放被中止";
                break;
              default:
                errorMsg = `播放错误: ${error.message}`;
            }
          }
          
          toast.error(errorMsg);
          setIsPlaying(false);
          setCurrentTrack(null);
        }
      }
    }
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log("上传的文件:", file.name, "类型:", file.type, "大小:", file.size);
    
    if (!file.type.startsWith('audio/')) {
      toast.error("请上传音频文件");
      return;
    }

    // 创建临时URL
    const fileUrl = URL.createObjectURL(file);
    console.log("创建的文件URL:", fileUrl);
    
    // 获取音频时长
    const audio = new Audio(fileUrl);
    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      const durationString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      
      console.log("音频时长:", durationString);
      
      // 添加新音乐
      const newTrack: MusicTrack = {
        id: Math.max(...musicTracks.map(t => t.id)) + 1,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "tikri",
        duration: durationString,
        date: new Date().toISOString().split('T')[0],
        category: "原创",
        cover: "/placeholder.svg",
        file: fileUrl
      };

      console.log("添加新音轨:", newTrack);
      setMusicTracks([...musicTracks, newTrack]);
      toast.success("音乐上传成功");
    };
    
    audio.onerror = (e) => {
      console.error("获取音频元数据失败:", e);
      toast.error("无法读取音频文件信息");
    };
  };

  return (
    <Layout>
      {/* 隐藏的音频播放器 */}
      <audio 
        ref={audioRef} 
        onEnded={() => {
          console.log("音频播放结束");
          setIsPlaying(false);
        }}
        preload="metadata"
      />

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
            
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-aqua-dark hover:bg-aqua">上传音乐</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>上传新音乐</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-500 mb-4">选择要上传的音频文件 (MP3, WAV, OGG 格式)</p>
                    <input 
                      type="file" 
                      accept="audio/*" 
                      onChange={handleMusicUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-aqua-light file:text-aqua-dark
                        hover:file:bg-aqua-dark hover:file:text-white"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
                        <MusicPlayer 
                          isPlaying={isPlaying}
                          trackId={track.id}
                          currentTrackId={currentTrack}
                          onPlayPause={handlePlayPause}
                        />
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
