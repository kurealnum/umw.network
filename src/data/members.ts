/**
 * UMW NETWORK MEMBERS
 *
 * To add yourself to the network:
 * 1. Fork this repository
 * 2. Add your profile picture to /public/photos/ (see below)
 * 3. Add your entry to the members array below
 * 4. Submit a pull request
 *
 * Required fields:
 * - id: Your name with hyphens (e.g., "john-doe")
 * - name: Your full name
 * - website: Your personal website URL (required to be part of the network!)
 *
 * Optional fields:
 * - program: Your program at the University of Mary Washington
 * - year: Your graduation year
 * - roles: Tags for what you do (e.g., ["engineering", "design", "writer"])
 *          Options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc, cyber
 * - verticals: Tags for industries you're interested in (e.g., ["fintech", "ai", "climate"])
 *              Options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
 * - profilePic: Path to your photo (see instructions below)
 * - instagram: Full URL to your Instagram profile
 * - twitter: Full URL to your Twitter/X profile
 * - bluesky: Full URL to your Bluesky profile
 * - linkedin: Full URL to your LinkedIn profile
 * - connections: Names of friends with hyphens (e.g., ["john-doe", "jane-smith"])
 *
 * ADDING YOUR PROFILE PICTURE:
 * 1. Use a square image, ideally 400x400 pixels (your Twitter/X profile pic works great!)
 * 2. Save it as: public/photos/your-name.jpg (or .png)
 * 3. Set profilePic to: "/photos/your-name.jpg"
 */

import { errorToJSON } from "next/dist/server/render";

export interface Member {
  id: string;
  name: string;
  website: string;
  program?: string;
  year?: string;
  roles?: string[];
  verticals?: string[];
  profilePic?: string;
  instagram?: string;
  twitter?: string;
  bluesky?: string;
  linkedin?: string;
  connections?: string[];
}

export const ROLE_OPTIONS = [
  "engineering",
  "design",
  "product",
  "growth",
  "ai/ml",
  "research",
  "hardware",
  "quant",
  "software",
  "finance",
  "vc",
  "cyber",
] as const;

export const VERTICAL_OPTIONS = [
  "fintech",
  "ai",
  "climate",
  "healthcare",
  "edtech",
  "marketplaces",
  "robotics",
  "defense",
  "hard tech",
  "saas",
  "consumer",
  "creator tools",
] as const;

// Connection type for the network graph
export interface Connection {
  fromId: string;
  toId: string;
}

export const members: Member[] = [
  // ============================================
  // ADD YOUR ENTRY BELOW THIS LINE
  // ============================================

  // Example entry (copy this as a template):
  // {
  //   id: "john-doe",
  //   name: "John Doe",
  //   website: "https://johndoe.com",
  //   program: "Computer Science",
  //   year: "2026",
  //   // options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc, cyber
  //   roles: ["engineering", "design"],
  //   // options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
  //   verticals: ["fintech", "ai"],
  //   profilePic: "/photos/john-doe.jpg",
  //   instagram: "https://instagram.com/johndoe",
  //   twitter: "https://x.com/johndoe",
  //   bluesky: "https://bsky.app/profile/johndoe.bsky.social",
  //   linkedin: "https://linkedin.com/in/johndoe",
  //   connections: ["jane-smith", "bob-wilson"],
  // },

  {
    id: "oscar-gaske",
    name: "Oscar Gaske",
    website: "https://oscargaske.me",
    program: "Computer Science",
    // options: engineering, design, product, growth, ai/ml, research, hardware, quant, software, finance, vc, cyber
    roles: ["software", "product"],
    // options: fintech, ai, climate, healthcare, edtech, marketplaces, robotics, defense, hard tech, saas, consumer, creator tools
    verticals: ["saas", "consumer", "creator tools"],
    profilePic: "/photos/oscar-gaske.jpg",
    instagram: "https://www.instagram.com/oscar_g_cs/",
    twitter: "https://x.com/oscargaske",
    linkedin: "https://www.linkedin.com/in/oscar-gaske/",
    bluesky: "https://bsky.app/profile/kureal.bsky.social",
    connections: [],
  },
  {
    id: "CWagamanEure",
    name: "Cory Wagaman-Eure",
    website: "https://corywagamaneure.com",
    program: "Computer Science",
    roles: ["engineering", "research", "quant"],
    verticals: ["fintech", "web3"], 
    profilePic: "/photos/cory-wagaman-eure.jpg",
    instagram: "",
    twitter: "https://x.com/EureCory",
    linkedin: "https://www.linkedin.com/in/corywagamaneure/",
    bluesky: "",
    connections: [],
  },

  // ADD YOUR ENTRY ABOVE THIS LINE
  // ============================================
];

// Helper to get all connections for the network graph
export function getConnections(): Connection[] {
  const connections: Connection[] = [];

  members.forEach((member) => {
    if (member.connections) {
      member.connections.forEach((targetId) => {
        // Only add connection if target member exists
        if (members.some((m) => m.id === targetId)) {
          connections.push({
            fromId: member.id,
            toId: targetId,
          });
        }
      });
    }
  });

  return connections;
}

// Helper to get the next and previous members for network navigation
export function getWebringNavigation(currentWebsite: string): {
  prev: Member | null;
  next: Member | null;
} {
  const index = members.findIndex((m) => m.website === currentWebsite);
  if (index === -1) {
    return { prev: null, next: null };
  }

  const prevIndex = (index - 1 + members.length) % members.length;
  const nextIndex = (index + 1) % members.length;

  return {
    prev: members[prevIndex],
    next: members[nextIndex],
  };
}

// Get a random member (useful for the network widget)
export function getRandomMember(): Member {
  return members[Math.floor(Math.random() * members.length)];
}
