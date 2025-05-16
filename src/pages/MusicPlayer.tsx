
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  trackId: number;
  currentTrackId: number | null;
  onPlayPause: (id: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  isPlaying, 
  trackId, 
  currentTrackId, 
  onPlayPause 
}) => {
  return (
    <Button 
      size="icon" 
      className="absolute bottom-4 right-4 rounded-full bg-white text-aqua-dark hover:bg-aqua hover:text-white"
      onClick={() => onPlayPause(trackId)}
    >
      {isPlaying && currentTrackId === trackId ? 
        <Pause className="h-5 w-5" /> : 
        <Play className="h-5 w-5" />
      }
    </Button>
  );
};

export default MusicPlayer;
