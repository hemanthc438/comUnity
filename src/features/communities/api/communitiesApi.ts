export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  coverImage: string;
}

const MOCK_DATA: Community[] = [
  // Tech & Programming
  { id: '1', name: 'React Native Devs', description: 'Discuss the latest in React Native, Reanimated, and mobile architecture.', memberCount: 142000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop' },
  { id: '2', name: 'TypeScript Wizards', description: "Strict mode only. Generics, utility types, and compiler deep dives.", memberCount: 89000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop' },
  { id: '3', name: 'Self Hosted', description: 'Running your own servers, NAS boxes, home labs, and privacy-first tools.', memberCount: 310000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop' },

  // Finance & Investing
  { id: '4', name: 'Personal Finance', description: 'Budgeting, debt payoff, FIRE movement, and building wealth from scratch.', memberCount: 1800000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop' },
  { id: '5', name: 'Frugal Living', description: 'Coupons, meal prep, buy-nothing groups, and creative ways to spend less.', memberCount: 420000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=600&auto=format&fit=crop' },
  { id: '6', name: 'Crypto Talk', description: 'Market analysis, on-chain data, DeFi deep dives, and skeptic-friendly debate.', memberCount: 560000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600&auto=format&fit=crop' },

  // Health & Fitness
  { id: '7', name: 'Fitness', description: 'Lifting, running, nutrition, rest days, and progress pics that keep you going.', memberCount: 2100000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop' },
  { id: '8', name: 'Running', description: 'From couch to 5K, marathon training plans, gear reviews, and race reports.', memberCount: 730000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop' },
  { id: '9', name: 'Meditation', description: 'Guided sessions, breathwork tips, streak accountability, and beginner questions.', memberCount: 410000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop' },

  // Food & Drink
  { id: '10', name: 'Coffee Enthusiasts', description: 'Pour overs, espresso setups, bean origins, and dialing in the perfect shot.', memberCount: 380000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop' },
  { id: '11', name: 'Home Cooking', description: 'Weekly meal prep, recipe sharing, kitchen fails, and cooking on a budget.', memberCount: 870000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop' },
  { id: '12', name: 'Hot Sauce & Spice', description: 'Reviews, hot sauce making, pepper growing, and heat-seeker challenges.', memberCount: 91000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop' },

  // Gaming
  { id: '13', name: 'Gaming', description: 'News, reviews, memes, and heated debates about your favorite games.', memberCount: 3200000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop' },
  { id: '14', name: 'Indie Games', description: 'Celebrating small studios, hidden gems, and devs building games solo.', memberCount: 245000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop' },
  { id: '15', name: 'Retro Gaming', description: 'CRT setups, cartridge hunting, emulation talk, and the golden era of gaming.', memberCount: 178000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop' },

  // Creative & Art
  { id: '16', name: 'Digital Art', description: 'Illustrations, concept art, process videos, and critique threads.', memberCount: 520000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' },
  { id: '17', name: 'Film Photography', description: 'Analog shooters sharing rolls, darkroom tips, and gear.', memberCount: 164000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=600&auto=format&fit=crop' },
  { id: '18', name: 'Worldbuilding', description: 'Fantasy maps, constructed languages, lore threads, and collaborative universes.', memberCount: 210000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop' },

  // Music
  { id: '19', name: 'Music Production', description: 'DAW tips, sample packs, plugin chains, and feedback on your beats.', memberCount: 390000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop' },
  { id: '20', name: 'Guitar', description: 'Gear talk, tabs, tone chasing, and everything from beginner to shredder.', memberCount: 610000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600&auto=format&fit=crop' },
  { id: '21', name: 'Vinyl Records', description: 'Digs, finds, turntable setups, and the warmth of analog sound.', memberCount: 195000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop' },

  // Sports
  { id: '22', name: 'Soccer', description: 'Match threads, transfer rumors, tactics, and fan banter from every league.', memberCount: 1400000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1518605368461-1ee125225116?q=80&w=600&auto=format&fit=crop' },
  { id: '23', name: 'Basketball', description: 'NBA/WNBA highlights, analysis, fantasy, and pickup game stories.', memberCount: 980000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop' },
  { id: '24', name: 'Cycling', description: 'Road, MTB, gravel, commuting, and the eternal debate over saddle height.', memberCount: 290000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=600&auto=format&fit=crop' },

  // Outdoors & Travel
  { id: '25', name: 'Hiking', description: 'Trail reports, gear lists, Leave No Trace tips, and trip planning.', memberCount: 870000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop' },
  { id: '26', name: 'Van Life', description: 'Conversions, build tips, boondocking spots, and life on the road.', memberCount: 230000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?q=80&w=600&auto=format&fit=crop' },
  { id: '27', name: 'Travel Hacking', description: 'Points, miles, credit card stacking, and how to fly business for almost nothing.', memberCount: 445000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop' },

  // Science & Learning
  { id: '28', name: 'Space', description: 'Launches, discoveries, astrophotography, and the occasional existential crisis.', memberCount: 1600000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop' },
  { id: '29', name: 'History', description: 'Deep dives, obscure facts, primary sources, and "well, actually" corrections.', memberCount: 750000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=600&auto=format&fit=crop' },
  { id: '30', name: 'Learn A Language', description: 'Study streaks, grammar questions, immersion tips, and language exchange partners.', memberCount: 530000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&auto=format&fit=crop' },

  // Lifestyle & Hobbies
  { id: '31', name: 'Mechanical Keyboards', description: 'Thock or clack? Share builds, group buys, and switch reviews.', memberCount: 320000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop' },
  { id: '32', name: 'Minimalism', description: 'Decluttering your physical and digital life, one thing at a time.', memberCount: 270000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600&auto=format&fit=crop' },
  { id: '33', name: 'Gardening', description: 'Grow journals, pest control, seed swaps, and the quiet joy of dirt.', memberCount: 640000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=600&auto=format&fit=crop' },
  { id: '34', name: 'LEGO', description: 'MOCs, set reviews, storage solutions, and adult fans reclaiming their inner child.', memberCount: 490000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop' },
  { id: '35', name: 'Thrifting', description: 'Vintage finds, reselling tips, and the thrill of the charity shop hunt.', memberCount: 380000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop' },

  // Entertainment
  { id: '36', name: 'Movies', description: 'Reviews, recommendations, box office drama, and director deep dives.', memberCount: 2400000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop' },
  { id: '37', name: 'Books', description: 'Reading challenges, monthly picks, author AMAs, and shelf shaming.', memberCount: 1100000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop' },
  { id: '38', name: 'True Crime', description: 'Case discussions, podcast recommendations, and amateur sleuthing (responsibly).', memberCount: 870000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?q=80&w=600&auto=format&fit=crop' },
  { id: '39', name: 'Anime', description: 'Seasonal rankings, long series discussions, fan art, and recommendation threads.', memberCount: 1900000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop' },

  // Pets & Animals
  { id: '40', name: 'Dogs', description: 'Training tips, breed questions, vet advice, and an endless supply of good boys.', memberCount: 2700000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop' },
  { id: '41', name: 'Cats', description: 'Chaos agents, midnight zoomies, slow blinks, and the occasional cat tax.', memberCount: 3100000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop' },
  { id: '42', name: 'Aquariums', description: 'Planted tanks, reef builds, fish IDs, and the nitrogen cycle explained again.', memberCount: 210000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=600&auto=format&fit=crop' },

  // Career & Self Improvement
  { id: '43', name: 'Productivity', description: 'Systems, tools, time blocking, and the eternal quest to do less but better.', memberCount: 680000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop' },
  { id: '44', name: 'Career Advice', description: 'Resume help, negotiation scripts, job hunting stories, and quitting regrets.', memberCount: 920000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop' },
  { id: '45', name: 'Side Hustles', description: 'Freelancing, passive income experiments, and honest talk about what actually works.', memberCount: 540000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },

  // Home & DIY
  { id: '46', name: 'DIY Home Improvement', description: 'Weekend projects, tool recommendations, contractor horror stories, and before/afters.', memberCount: 730000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=600&auto=format&fit=crop' },
  { id: '47', name: 'Interior Design', description: 'Mood boards, room makeovers, thrift flips, and the ongoing debate about accent walls.', memberCount: 490000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop' },

  // Misc / Wholesome
  { id: '48', name: 'Astronomy', description: 'Telescope tips, astrophotography setups, and dark sky spots around the world.', memberCount: 370000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop' },
  { id: '49', name: 'Mental Health', description: 'A safe space for sharing struggles, coping strategies, and small wins.', memberCount: 1200000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop' },
  { id: '50', name: 'Mildly Interesting', description: 'The slightly unusual, the oddly satisfying, and the things you had to show someone.', memberCount: 4300000, isJoined: false, coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop' },
];

// ── Community Detail types & data ─────────────────────────────────────────────

export interface Post {
  id: string;
  author: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

const MOCK_POSTS: Post[] = [
  { id: '1', author: 'Alex M.',   time: '2h ago', content: "Just hit my first PR! Couldn't do it 8 months ago. Keep going everyone 🔥", likes: 284,  comments: 47  },
  { id: '2', author: 'Jordan K.', time: '5h ago', content: "Weekly check-in thread: What are you working on this week? I'm tackling a long-standing plateau.", likes: 132,  comments: 91  },
  { id: '3', author: 'Priya S.',  time: '1d ago', content: 'Honest question — is the hype actually worth it or just a trend? My results have been noticeably better but could be placebo.', likes: 67,   comments: 128 },
  { id: '4', author: 'Liam T.',   time: '2d ago', content: 'PSA: rest and recovery is part of the process. Stop skipping it and wondering why progress is slow.', likes: 1042, comments: 156 },
];

const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Alex M.',   avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Jordan K.', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Priya S.',  avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Liam T.',   avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Maya R.',   avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Chris D.',  avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Sofia L.',  avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '8', name: 'Noah B.',   avatar: 'https://i.pravatar.cc/150?img=8' },
];

export const COMMUNITY_RULES: string[] = [
  'Be kind and respectful to all members.',
  'No spam or self-promotion without mod approval.',
  'Keep content relevant to the community topic.',
  'Search before posting common questions.',
  'Credit original creators when sharing content.',
];

export const fetchCommunityPosts = (_communityId: string): Promise<Post[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MOCK_POSTS), 700));

export const fetchCommunityMembers = (_communityId: string): Promise<Member[]> =>
  new Promise((resolve) => setTimeout(() => resolve(MOCK_MEMBERS), 500));

// ── Community list ─────────────────────────────────────────────────────────────

export const fetchCommunities = async ({ pageParam = 0 }: { pageParam?: number }): Promise<{ data: Community[]; nextPage: number | null }> => {
  const PAGE_SIZE = 10;

  return new Promise((resolve) => {
    setTimeout(() => {
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const data = MOCK_DATA.slice(start, end);

      resolve({
        data,
        nextPage: end < MOCK_DATA.length ? pageParam + 1 : null,
      });
    }, 1000);
  });
};
