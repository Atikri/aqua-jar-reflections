
// 音乐数据存储
export interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  duration: string;
  date: string;
  category: string;
  cover: string;
  file: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: 1,
    title: "没有咖啡的噄茶店",
    artist: "AGA",
    duration: "3:45",
    date: "2023-05-10",
    category: "instrumental",
    cover: "/placeholder.svg",
    file: "https://file-examples.com/storage/fe19e15eac6560f8c936254/2017/11/file_example_MP3_1MG.mp3"
  },
  {
    id: 2,
    title: "Stay With Me - Cover",
    artist: "tikri (原唱: Sam Smith)",
    duration: "4:12",
    date: "2023-04-20",
    category: "翻唱",
    cover: "/placeholder.svg",
    file: "https://file-examples.com/storage/fe19e15eac6560f8c936254/2017/11/file_example_MP3_2MG.mp3"
  },
  {
    id: 3,
    title: "晴天 - Cover",
    artist: "tikri (原唱: 周杰伦)",
    duration: "4:30",
    date: "2023-03-15",
    category: "翻唱",
    cover: "/placeholder.svg",
    file: "https://file-examples.com/storage/fe19e15eac6560f8c936254/2017/11/file_example_MP3_5MG.mp3"
  },
  {
    id: 4,
    title: "夜曲",
    artist: "tikri",
    duration: "3:55",
    date: "2023-02-25",
    category: "原创",
    cover: "/placeholder.svg",
    file: "https://file-examples.com/storage/fe19e15eac6560f8c936254/2017/11/file_example_MP3_700KB.mp3"
  },
  {
    id: 5,
    title: "Summer Vibes",
    artist: "Fresh Touch",
    duration: "3:28",
    date: "2023-01-30",
    category: "推荐",
    cover: "/placeholder.svg",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 6,
    title: "Memories",
    artist: "The Wave",
    duration: "4:05",
    date: "2023-01-15",
    category: "推荐",
    cover: "/placeholder.svg",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  }
];
