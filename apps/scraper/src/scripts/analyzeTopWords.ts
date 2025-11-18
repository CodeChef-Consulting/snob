import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

async function analyzeTopPosts(subreddits: string[] = ['FoodLosAngeles']) {
  console.log(`Analyzing top 1000 posts from: ${subreddits.join(', ')}\n`);

  const posts = await prisma.post.findMany({
    where: {
      subreddit: {
        in: subreddits,
      },
    },
    take: 1000,
    orderBy: { score: 'desc' },
    select: {
      title: true,
      body: true,
      subreddit: true,
    }
  });

  const allText = posts
    .map((p) => `${p.title || ''} ${p.body || ''}`.toLowerCase())
    .join(' ');

  const stopWords = new Set([
    'the',
    'a',
    'an',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'from',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'can',
    'this',
    'that',
    'these',
    'those',
    'i',
    'you',
    'he',
    'she',
    'it',
    'we',
    'they',
    'what',
    'which',
    'who',
    'when',
    'where',
    'why',
    'how',
    'my',
    'your',
    'their',
    'our',
    'me',
    'him',
    'her',
    'them',
    'us',
    'if',
    'so',
    'as',
    'up',
    'out',
    'just',
    'now',
    'get',
    'got',
    'go',
    'going',
    'any',
    'some',
    'all',
    'like',
    'looking',
    'know',
    'need',
    'want',
    'amp',
    'quot',
    'gt',
    'lt',
    'im',
    'ive',
    'dont',
    'didnt',
    'cant',
    'wont',
    'isnt',
    'arent',
    'wasnt',
    'werent',
  ]);

  const words = allText
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && stopWords.has(w) === false);

  const wordCount: Record<string, number> = {};
  for (const word of words) {
    wordCount[word] = (wordCount[word] || 0) + 1;
  }

  const sorted = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 150);

  console.log('TOP 150 WORDS in top 1000 posts:\n');
  sorted.forEach(([word, count], i) => {
    console.log(`${(i + 1).toString().padStart(3)}. ${word.padEnd(20)} ${count}`);
  });

  await prisma.$disconnect();
}

// Get subreddits from command line args or use default
const subreddits = process.argv.slice(2);
if (subreddits.length === 0) {
  analyzeTopPosts(); // Uses default ['FoodLosAngeles']
} else {
  analyzeTopPosts(subreddits);
}
