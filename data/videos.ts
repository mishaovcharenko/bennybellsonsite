import type { Video } from "@/lib/types";

export const videos: Video[] = [
  {
    id: "v-theclubrock-audio",
    title: "theclubrock (Official Audio)",
    category: "music_video",
    youtubeUrl: "https://www.youtube.com/watch?v=apwdxcFTaaE",
    embedUrl: "https://www.youtube.com/embed/apwdxcFTaaE",
    featured: true,
  },
  {
    id: "v-theclubrock-lyric",
    title: "theclubrock (Lyric/Visualizer)",
    category: "visualizer",
    youtubeUrl: "https://www.youtube.com/watch?v=LjW8Ap31rUM",
    embedUrl: "https://www.youtube.com/embed/LjW8Ap31rUM",
  },
  {
    id: "v-i-wonder",
    title: "i wonder (Official Video)",
    category: "music_video",
    youtubeUrl: "https://www.youtube.com/watch?v=j2_IXfqYOWo",
    embedUrl: "https://www.youtube.com/embed/j2_IXfqYOWo",
  },
  {
    id: "v-its-star",
    title: "'It's Star' (Official Video)",
    category: "music_video",
    youtubeUrl: "https://www.youtube.com/watch?v=lRWUqueVx0w",
    embedUrl: "https://www.youtube.com/embed/lRWUqueVx0w",
  },
  {
    id: "v-in-time",
    title: "In Time (Official Music Video)",
    category: "music_video",
    youtubeUrl: "https://www.youtube.com/watch?v=RQJHXLInbeM",
    embedUrl: "https://www.youtube.com/embed/RQJHXLInbeM",
  },
  {
    id: "v-cherry",
    title: "CHERRY (Official Video)",
    category: "music_video",
    youtubeUrl: "https://www.youtube.com/watch?v=PuAOI9Db_jg",
    embedUrl: "https://www.youtube.com/embed/PuAOI9Db_jg",
  },
  {
    id: "v-theclubrock-live",
    title: "theclubrock live in santa barbara w/sha crow",
    category: "live",
    youtubeUrl: "https://www.youtube.com/watch?v=AD4hBz39Bfk",
    embedUrl: "https://www.youtube.com/embed/AD4hBz39Bfk",
  },
];

export const featuredVideo = videos.find((v) => v.featured) ?? videos[0];
