import type { BubbleConfig } from "@/lib/types";
import { site } from "@/data/site";

const BUBBLE_SIZES = { sm: 90, md: 115, lg: 150, xl: 210 } as const;

export function getBubbleRadius(size: BubbleConfig["size"]): number {
  return BUBBLE_SIZES[size];
}

/**
 * Bubble config: each bubble can be external (direct link), modal (overlay), or internal (full page).
 * Homepage is the main experience; most bubbles are direct portals.
 */
export const bubbles: BubbleConfig[] = [
  {
    id: "unreleased",
    label: "Unreleased",
    href: "#",
    type: "modal",
    modalType: "unreleased",
    size: "lg",
    priority: 1,
    description: "Demos, snippets, secret drops",
  },
  {
    id: "listen",
    label: "Listen Now",
    href: "#",
    type: "modal",
    modalType: "listen",
    size: "lg",
    priority: 2,
    description: "Music hub — Spotify, Apple Music, more",
  },
  {
    id: "history",
    label: "History",
    href: "#",
    type: "modal",
    modalType: "history",
    size: "md",
    priority: 3,
    description: "Artist lore, timeline, archive",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: site.twitterUrl ?? "https://twitter.com/bennybellson",
    type: "external",
    size: "sm",
    priority: 4,
    description: "Social",
    externalIcon: true,
    openInNewTab: true,
  },
  {
    id: "bb",
    label: "BB",
    href: "/",
    type: "internal",
    size: "xl",
    priority: 10,
    description: "Home",
    accent: true,
  },
  {
    id: "shows",
    label: "Shows",
    href: site.bandsintownUrl ?? "#",
    type: "modal",
    modalType: "shows",
    size: "lg",
    priority: 5,
    description: "Tour dates, events",
  },
  {
    id: "watch",
    label: "Watch",
    href: site.youtubeUrl ?? "https://youtube.com/@bennybellson",
    type: "external",
    size: "sm",
    priority: 6,
    description: "Videos, music videos",
    openInNewTab: true,
  },
  {
    id: "merch",
    label: "Merch",
    href: site.merchStoreUrl ?? "#",
    type: "external",
    size: "lg",
    priority: 7,
    description: "Store",
    openInNewTab: true,
  },
  {
    id: "info",
    label: "Info",
    href: "#",
    type: "modal",
    modalType: "info",
    size: "sm",
    priority: 8,
    description: "Contact, management, press",
  },
  {
    id: "tnl",
    label: "TNL",
    href: "#",
    type: "modal",
    modalType: "tnl",
    size: "lg",
    priority: 9,
    description: "Twisted n Luv — collective",
    accent: true,
  },
];
