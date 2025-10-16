import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { GoogleGenAI, createUserContent } from '@google/genai';

// Test cases with problematic sentiment scores
const TEST_CASES = [
  {
    id: 1,
    type: 'comment',
    text: 'breakfast burrito stand on Santa Monica and Vine, in the gas station parking lot.',
    postTitle: 'Best breakfast spot?',
    expectedIssue: 'Scored 0 - should be mildly positive (0.3-0.5) as a recommendation',
    currentScore: 0
  },
  {
    id: 2,
    type: 'comment',
    text: 'Clark st',
    postTitle: 'Best breakfast spot?',
    expectedIssue: 'Scored 0 - context-less recommendation, arguably correct but could be 0.3',
    currentScore: 0
  },
  {
    id: 3,
    type: 'comment',
    text: 'Superba',
    postTitle: 'Best breakfast spot?',
    expectedIssue: 'Scored 0 - one-word recommendation, should be mildly positive (0.3-0.4)',
    currentScore: 0
  },
  {
    id: 4,
    type: 'comment',
    text: 'Griddle Cafe in West Hollywood.',
    postTitle: 'Best breakfast spot?',
    expectedIssue: 'Scored 0 - clear recommendation, should be 0.3-0.5',
    currentScore: 0
  },
  {
    id: 5,
    type: 'comment',
    text: 'Clark Street Diner',
    postTitle: 'Best breakfast spot?',
    expectedIssue: 'Scored 0 - recommendation, should be 0.3-0.5',
    currentScore: 0
  },
  {
    id: 6,
    type: 'post',
    text: 'I moved permanently to LA a few years ago (West LA) and despite the absolute richness of food on offer, I\'ve never managed to overcome that craving for a cheeky Nandos, or a Wagamama, or even the easy convenience of a Greggs sausage roll!',
    title: 'UK chain food equivalents in LA? Wagamama, Nando\'s etc...',
    expectedIssue: 'Scored -0.7 - expressing nostalgia/craving, not criticism. Should be neutral (0) or slightly positive about those chains',
    currentScore: -0.7
  },
  {
    id: 7,
    type: 'post',
    text: '(Not sure if this is the right flair, sorry!)\n\nThe last 2 times I went to Sun Nong Dan (K-town and Rowland) which was May-June 2024, the kimchi was pretty bland and didn\'t have any depth of flavor.',
    title: 'Sun Nong Dan Kimchi Still good?',
    expectedIssue: 'Scored 1 - describing bland food, should be negative (-0.3 to -0.6)',
    currentScore: 1
  },
  {
    id: 8,
    type: 'post',
    text: 'I can eat anything. Asian, American, Mexican, I don\'t really mind. I would prefer to spend around $50, but am flexible if it\'s nice enough. Thanks.',
    title: 'Decently nice restaurant near the Northridge area to treat myself for my birthday?',
    expectedIssue: 'Scored 0 - this is correct, it\'s a question seeking recommendations',
    currentScore: 0
  },
  {
    id: 9,
    type: 'post',
    text: 'I\'m looking for an Italian flour pizza in LA — non-bleached, non-bromate…any recommendations?',
    title: 'Italian flour Pizza in LA recommendations',
    expectedIssue: 'Scored 0 - correct, seeking recommendations',
    currentScore: 0
  },
  {
    id: 10,
    type: 'post',
    text: 'I wanna make a sandwich for my wife.',
    title: 'Recommendations for fresh focaccia on the west side?',
    expectedIssue: 'Scored 0 - correct, seeking recommendations',
    currentScore: 0
  }
];

// Current prompt from prompts.ts
const SENTIMENT_INTRO = `You are a foodie browsing Reddit to find the best places to eat.`;

const SENTIMENT_SCORE_INSTRUCTIONS_V1 = `1) rawAiScore (-1 to 1): How positively the comment makes you want to visit the restaurant(s) mentioned?
   -1 = definitely avoid, 0 = neutral, 1 = definitely want to visit.
   Focus ONLY on an impression of **taste and quality of the food**. Ignore ambiance, service, hype, or other experiences.
   A comment saying a place is "overhyped" or "just okay" should lean negative (around -0.1 to -0.4).
   If sentiment is unclear or purely factual, score 0.`;

const SENTIMENT_GUIDELINES_V1 = `**Important:**
- Base your evaluation only on the text given.
- Assume that even if there isn't a restaurant mentioned in context, the comment is still about food.
- If the text seems irrelevant to restaurant opinions, set rawAiScore to 0.
- Round numeric values to two decimal places.
- Output exactly in this format (example): 0.45`;

// Test different prompt versions
async function testPromptVersion(
  versionName: string,
  scoreInstructions: string,
  guidelines: string
) {
  const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

  console.log('\n' + '='.repeat(80));
  console.log(`TESTING: ${versionName}`);
  console.log('='.repeat(80));
  console.log('\nPrompt Instructions:');
  console.log(scoreInstructions);
  console.log('\nGuidelines:');
  console.log(guidelines);
  console.log('\n' + '-'.repeat(80));

  const results: Array<{
    id: number;
    text: string;
    oldScore: number;
    newScore: number;
    expectedIssue: string;
  }> = [];

  for (const testCase of TEST_CASES) {
    let prompt: string;

    if (testCase.type === 'comment') {
      prompt = `${SENTIMENT_INTRO} Read the following Reddit comment on a food related post and output your sentiment evaluation.

Comment text: ${testCase.text}

Post title (use mainly for context): ${testCase.postTitle}

Output exactly one field:

${scoreInstructions}

${guidelines}`;
    } else {
      prompt = `${SENTIMENT_INTRO} Read the following food related post and output your sentiment evaluation.

Post title: ${testCase.title}
Post text: ${testCase.text}

Output exactly one field:

${scoreInstructions}

${guidelines}`;
    }

    try {
      const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: createUserContent([prompt])
      });
      const responseText = result.text?.trim() || '';
      const newScore = responseText === 'null' ? null : parseFloat(responseText);

      results.push({
        id: testCase.id,
        text: testCase.text.slice(0, 80) + (testCase.text.length > 80 ? '...' : ''),
        oldScore: testCase.currentScore,
        newScore: newScore,
        expectedIssue: testCase.expectedIssue
      });

      console.log(`\n[${testCase.id}] ${testCase.type.toUpperCase()}`);
      console.log(`Text: "${testCase.text.slice(0, 100)}${testCase.text.length > 100 ? '...' : ''}"`);
      console.log(`Old Score: ${testCase.currentScore} → New Score: ${newScore}`);
      console.log(`Issue: ${testCase.expectedIssue}`);

      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error processing test case ${testCase.id}:`, error);
    }
  }

  console.log('\n' + '-'.repeat(80));
  console.log('SUMMARY');
  console.log('-'.repeat(80));

  const improved = results.filter(r => {
    // Check if score moved in the right direction based on expected issue
    if (r.expectedIssue.includes('should be mildly positive')) {
      return r.newScore > 0 && r.newScore > r.oldScore;
    }
    if (r.expectedIssue.includes('should be negative')) {
      return r.newScore < 0;
    }
    if (r.expectedIssue.includes('Should be neutral')) {
      return Math.abs(r.newScore) < Math.abs(r.oldScore);
    }
    if (r.expectedIssue.includes('correct')) {
      return Math.abs(r.newScore - r.oldScore) < 0.3; // Allow small variation
    }
    return false;
  });

  console.log(`Improved: ${improved.length}/${results.length}`);
  console.log(`Accuracy: ${((improved.length / results.length) * 100).toFixed(1)}%`);

  return results;
}

async function main() {
  console.log('SENTIMENT PROMPT TESTING TOOL');
  console.log('Testing problematic sentiment scores with different prompt versions\n');

  // Test V1 (current)
  await testPromptVersion(
    'V1 (Current)',
    SENTIMENT_SCORE_INSTRUCTIONS_V1,
    SENTIMENT_GUIDELINES_V1
  );

  // V2: More nuanced scoring with explicit guidance on recommendations
  const SENTIMENT_SCORE_INSTRUCTIONS_V2 = `1) rawAiScore (-1 to 1): How positively this text makes you want to visit the restaurant(s) mentioned, based on FOOD QUALITY only.

**Scoring Guide:**
- **1.0**: Enthusiastic praise with specific positive details about food (e.g., "best I've ever had", "can't stop thinking about it")
- **0.6-0.8**: Clear positive sentiment with some details (e.g., "really good", "delicious", "great tacos")
- **0.3-0.5**: Simple recommendation without details (e.g., just naming a place, "try this spot")
- **0.0**: Neutral, asking questions, seeking recommendations, or unclear sentiment
- **-0.3 to -0.6**: Criticism or disappointment with food quality (e.g., "bland", "disappointing", "not worth it")
- **-1.0**: Strong negative sentiment (e.g., "terrible", "avoid at all costs")

**Important:**
- A simple restaurant name as an answer to "where should I go?" = 0.3-0.5 (mild positive)
- Questions seeking recommendations = 0.0 (neutral)
- Nostalgia/craving for a place = slight positive (0.3-0.5), NOT negative
- Describing bad food quality = negative score
- Focus ONLY on taste and food quality. Ignore price, ambiance, service, hype.`;

  await testPromptVersion(
    'V2 (Nuanced Scoring)',
    SENTIMENT_SCORE_INSTRUCTIONS_V2,
    SENTIMENT_GUIDELINES_V1
  );

  // V3: Test without SENTIMENT_GUIDELINES to see if it's necessary
  const SENTIMENT_SCORE_INSTRUCTIONS_V3 = `1) rawAiScore (-1 to 1): How positively this text makes you want to visit the restaurant(s) mentioned, based on FOOD QUALITY only.

**Scoring Guide:**
- **1.0**: Enthusiastic praise with specific details (e.g., "best I've ever had", "can't stop thinking about it")
- **0.6-0.8**: Clear positive sentiment with details (e.g., "really good", "delicious", "great tacos")
- **0.3-0.5**: Simple recommendation without details or nostalgia/craving (e.g., just naming a place)
- **0.0**: Neutral, asking questions, seeking recommendations, or unclear sentiment
- **-0.3 to -0.6**: Criticism about food quality (e.g., "bland", "disappointing", "not worth it")
- **-1.0**: Strong negative sentiment (e.g., "terrible", "avoid at all costs")

Focus ONLY on taste and food quality. Ignore price, ambiance, service, hype.
Output exactly one number, rounded to two decimal places (example): 0.45`;

  await testPromptVersion(
    'V3 (No Guidelines Section)',
    SENTIMENT_SCORE_INSTRUCTIONS_V3,
    '' // No guidelines
  );

  // V4: Test with null for irrelevant content, 0.0 = average food quality
  const SENTIMENT_SCORE_INSTRUCTIONS_V4 = `1) rawAiScore (-1 to 1): How positively this text makes you want to visit the restaurant(s) mentioned, based on FOOD QUALITY only.

**Scoring Guide:**
- **1.0**: Enthusiastic praise with specific details (e.g., "best I've ever had", "can't stop thinking about it")
- **0.6-0.8**: Clear positive sentiment with details (e.g., "really good", "delicious", "great tacos")
- **0.3-0.5**: Simple recommendation without details or nostalgia/craving (e.g., just naming a place)
- **0.0**: Average/okay food quality, nothing special (e.g., "it's fine", "decent", "standard")
- **-0.3 to -0.6**: Criticism about food quality (e.g., "bland", "disappointing", "not worth it")
- **-1.0**: Strong negative sentiment (e.g., "terrible", "avoid at all costs")
- **null**: Use null if text is irrelevant to food quality (questions, seeking recommendations, purely factual)

Focus ONLY on taste and food quality. Ignore price, ambiance, service, hype.
Output exactly one number rounded to two decimal places (example): 0.45, or output: null`;

  await testPromptVersion(
    'V4 (0=Average, null=Irrelevant)',
    SENTIMENT_SCORE_INSTRUCTIONS_V4,
    '' // No guidelines
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
