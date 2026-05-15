import { storage } from '../../../utils/storage';

export interface Post {
  id: string;
  communityId: string;
  communityName: string;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
}

type PostsDB = Record<string, Post[]>;

const DB_KEY = 'POSTS_DB';

const getDB = (): PostsDB => {
  const raw = storage.getString(DB_KEY);
  return raw ? JSON.parse(raw) : {};
};

const saveDB = (db: PostsDB) => {
  storage.set(DB_KEY, JSON.stringify(db));
};

const ago = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

const MOCK_POSTS: Post[] = [
  { id: 'm1',  communityId: '1',  communityName: 'React Native Devs',   authorName: 'Alex M.',    title: 'New Architecture is finally stable',           content: 'Been running Fabric + JSI in production for 3 months. Zero bridge crashes. Highly recommend the migration.',      createdAt: ago(8)    },
  { id: 'm2',  communityId: '7',  communityName: 'Fitness',              authorName: 'Jordan K.',  title: 'Hit a 200kg deadlift today',                   content: 'Two years of consistent training. Never skip your accessory work.',                                               createdAt: ago(22)   },
  { id: 'm3',  communityId: '2',  communityName: 'TypeScript Wizards',   authorName: 'Priya S.',   title: 'Why I stopped using `any` everywhere',          content: 'Migrated a 40k-line codebase to strict mode. The errors were painful but every single one was a real bug.',        createdAt: ago(45)   },
  { id: 'm4',  communityId: '10', communityName: 'Coffee Enthusiasts',   authorName: 'Liam T.',    title: 'V60 vs Chemex — the definitive answer',         content: 'Spoiler: it depends on your grind size and water temp. Here\'s my full comparison across 7 origins.',             createdAt: ago(90)   },
  { id: 'm5',  communityId: '13', communityName: 'Gaming',               authorName: 'Maya R.',    title: 'Finished Elden Ring at 200 hours',              content: 'Finally got the true ending. Shadow of the Erdtree DLC hit different after completing the main quest.',            createdAt: ago(130)  },
  { id: 'm6',  communityId: '25', communityName: 'Hiking',               authorName: 'Chris D.',   title: 'PCT section J report — August conditions',      content: 'Water sources are lower than usual. Bring extra capacity past Forester Pass. Trail is in great shape otherwise.',  createdAt: ago(200)  },
  { id: 'm7',  communityId: '4',  communityName: 'Personal Finance',     authorName: 'Sofia L.',   title: 'Paid off $40k in student loans in 18 months',  content: 'Aggressive budgeting + side income. Happy to share the exact spreadsheet I used.',                               createdAt: ago(280)  },
  { id: 'm8',  communityId: '40', communityName: 'Dogs',                 authorName: 'Noah B.',    title: 'My rescue dog learned "place" in one week',    content: 'E-collar-free, purely marker training. Consistency and high-value treats are everything.',                         createdAt: ago(360)  },
  { id: 'm9',  communityId: '3',  communityName: 'Self Hosted',          authorName: 'Alex M.',    title: 'Replaced Google Photos with Immich',           content: 'Running on an old mini PC with 4TB. Face recognition works better than I expected on local hardware.',            createdAt: ago(480)  },
  { id: 'm10', communityId: '11', communityName: 'Home Cooking',         authorName: 'Priya S.',   title: 'Sunday meal prep for the whole week — $38',    content: 'Grain bowls, sheet-pan chicken, and three different sauces. Full breakdown in the comments.',                    createdAt: ago(600)  },
  { id: 'm11', communityId: '20', communityName: 'Guitar',               authorName: 'Jordan K.',  title: 'Finally nailed the Comfortably Numb solo',     content: 'Three months of slow practice with a metronome. The bends in bar 12 were the hardest part.',                     createdAt: ago(720)  },
  { id: 'm12', communityId: '28', communityName: 'Space',                authorName: 'Liam T.',    title: 'Webb just imaged a planet forming in real time', content: 'The resolution is insane. We\'re watching a Jupiter-class planet accrete material around a T Tauri star.',        createdAt: ago(900)  },
];

export const fetchPosts = (communityId: string): Promise<Post[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const db = getDB();
      const userPosts = (db[communityId] ?? []).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      resolve(userPosts);
    }, 400);
  });

export const fetchAllPosts = (): Promise<Post[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const db = getDB();
      const userPosts = Object.values(db).flat();
      const all = [...MOCK_POSTS, ...userPosts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      resolve(all);
    }, 600);
  });

export const createPost = (communityId: string, communityName: string, title: string, content: string): Promise<Post> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const post: Post = {
        id: Math.random().toString(36).substring(2, 9),
        communityId,
        communityName,
        authorName: 'You',
        title,
        content,
        createdAt: new Date().toISOString(),
      };

      const db = getDB();
      if (!db[communityId]) db[communityId] = [];
      db[communityId].push(post);
      saveDB(db);

      resolve(post);
    }, 600);
  });
