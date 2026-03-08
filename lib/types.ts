export type BubbleLinkType = "internal" | "external" | "modal";
export type BubbleSize = "sm" | "md" | "lg" | "xl";
export type BubbleModalType = "listen" | "shows" | "info" | "history" | "unreleased" | "tnl";

export interface BubbleConfig {
  id: string;
  label: string;
  /** Primary destination: used for external href or internal page path */
  href: string;
  /** How the bubble behaves: external link, modal overlay, or internal page */
  type: BubbleLinkType;
  size: BubbleSize;
  priority: number;
  description?: string;
  accent?: boolean;
  locked?: boolean;
  externalIcon?: boolean;
  /** For type "modal": which modal to open */
  modalType?: BubbleModalType;
  /** For type "internal": optional explicit page path (defaults to href) */
  pageSlug?: string;
  /** For type "external": open in new tab (default true for external) */
  openInNewTab?: boolean;
}

export interface SiteConfig {
  artistName: string;
  tagline: string;
  twitterUrl?: string;
  instagramUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  youtubeUrl?: string;
  youtubeMusicUrl?: string;
  geniusUrl?: string;
  tiktokUrl?: string;
  merchStoreUrl?: string;
  bandsintownUrl?: string;
  bioHubUrl?: string;
  spotifyConcertsUrl?: string;
  inquiryEmail?: string;
}

export interface Track {
  id: string;
  title: string;
  type: "single" | "album" | "ep";
  releaseDate: string;
  artworkUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  description?: string;
}

export interface UnreleasedItem {
  id: string;
  title: string;
  description?: string;
  locked: boolean;
  releaseNote?: string;
  statusTag?: string;
  audioPreviewPlaceholder?: boolean;
}

export interface TimelineEvent {
  id: string;
  era: string;
  title: string;
  date?: string;
  body: string;
  imageUrl?: string;
}

export interface Show {
  id: string;
  date: string;
  city: string;
  venue: string;
  status: "on_sale" | "sold_out" | "coming_soon";
  ticketUrl?: string;
  isPast?: boolean;
}

export interface Video {
  id: string;
  title: string;
  category: "music_video" | "live" | "interview" | "bts" | "visualizer";
  duration?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
  youtubeUrl?: string;
  featured?: boolean;
}

export interface MerchItem {
  id: string;
  title: string;
  price: string;
  imageUrl?: string;
  badge?: string;
  soldOut?: boolean;
  collection?: string;
}

export interface Contact {
  id: string;
  label: string;
  value: string;
  href?: string;
  type: "management" | "booking" | "press" | "label" | "social";
}

export interface TNLMember {
  id: string;
  name: string;
  role?: string;
  imageUrl?: string;
  link?: string;
}

export interface TNLConfig {
  title: string;
  subtitle: string;
  manifesto: string;
  members: TNLMember[];
  relatedLinks: { label: string; href: string }[];
}
