# Snob Methodology: How We Rate Restaurants

## Overview

Snob is an AI-powered restaurant rating system that analyzes thousands of authentic Reddit discussions to generate unbiased, data-driven restaurant scores. Unlike traditional 5-star rating systems that suffer from review manipulation and selection bias, Snob employs a multi-stage analytical pipeline that mirrors how a discerning foodie would research and evaluate restaurants.

## The Problem with Traditional Ratings

Traditional restaurant rating platforms face several critical issues:

1. **Rating Inflation**: Businesses pressure customers for 5-star reviews, leading to inflated scores
2. **Selection Bias**: Only extremely satisfied or dissatisfied customers leave reviews
3. **Fake Reviews**: Paid reviews and bot manipulation distort ratings
4. **Context Collapse**: A single number cannot capture the nuance of dining experiences
5. **Recency Blindness**: Old reviews carry equal weight to recent ones, missing quality changes

## Our Solution: The Foodie-Simulated Approach

Snob treats restaurant evaluation as foodies actually do it: by scouring community discussions, weighing source credibility, and synthesizing qualitative insights into actionable recommendations.

### Phase 1: Data Collection

#### Reddit as the Source of Truth

We scrape restaurant discussions from Reddit's Los Angeles food communities because:

- **Authentic Discourse**: Users discuss restaurants naturally in context, not just to leave a review
- **Community Moderation**: Spam and fake content are downvoted or removed
- **Detailed Narratives**: Redditors share specific experiences, not just star ratings
- **Long-term Memory**: Discussion threads capture restaurant evolution over time

#### Scraping Architecture

Our two-phase scraping system:

1. **Post Collection**: Fetch posts in batches of 100 (up to 1,000 total) across multiple modes:
   - New posts (recent discussions)
   - Top posts (highly upvoted content)
   - Controversial posts (polarizing opinions)
   - Search queries (targeted restaurant mentions)

2. **Comment Extraction**: Recursively collect all nested comment replies to capture full discussions

This separation allows us to:
- Quickly gather broad coverage of restaurant mentions
- Selectively deep-dive into high-value discussions
- Avoid Reddit API rate limits

### Phase 2: Natural Language Processing

#### Restaurant Entity Recognition

We use **Gemini AI** with sophisticated prompt engineering to:

1. **Extract Restaurant Mentions**: Identify restaurant names from unstructured text
2. **Normalize Names**: Resolve variations ("Joe's Pizza" vs "Joe's Pizzeria")
3. **Geocode Locations**: Match restaurants to physical addresses using Google Places API
4. **Group Locations**: Link multiple locations of the same restaurant (e.g., chain restaurants)

#### Sentiment and Context Analysis

For each restaurant mention, our AI evaluates:

- **Sentiment Polarity**: Positive, negative, or neutral opinion
- **Aspect-Based Analysis**: What specifically is praised or criticized (food quality, service, ambiance, value)
- **Intensity**: How strongly the opinion is expressed
- **Context**: Whether the mention is substantive or tangential

### Phase 3: Signal Weighting

Not all mentions carry equal weight. We employ an **orthogonal weighting system** that considers multiple independent factors:

#### Temporal Weighting
- **Recency Decay**: Recent mentions weighted more heavily than old ones
- **Exponential Falloff**: Weight decreases exponentially with age
- **Rationale**: Restaurant quality changes over time (new chef, ownership change, etc.)

#### Visibility Weighting
- **Upvote Count**: Highly upvoted comments indicate community agreement
- **Thread Position**: Top-level comments vs. deeply nested replies
- **Subreddit Size**: Discussions in larger communities reach more people
- **Rationale**: Popular opinions reflect broader consensus

#### Controversy Weighting
- **Upvote/Downvote Ratio**: Controversial posts indicate polarizing experiences
- **Reply Count**: Active discussions suggest nuanced opinions worth examining
- **Mixed Sentiment**: Posts with both praise and criticism provide balanced views
- **Rationale**: Controversy reveals important context about what to expect

#### Source Credibility
- **User History**: Accounts with food expertise weighted higher
- **Detail Level**: Specific, detailed reviews vs. vague opinions
- **Media Evidence**: Posts with photos/videos weighted higher
- **Rationale**: Informed opinions are more valuable than casual mentions

### Phase 4: Score Synthesis

#### Raw Score Calculation

For each restaurant, we compute:

```
raw_score = Σ(sentiment_polarity × temporal_weight × visibility_weight × controversy_weight × credibility_weight)
```

Where:
- `sentiment_polarity` ranges from -1 (very negative) to +1 (very positive)
- Each weight factor ranges from 0 to 1
- The sum is taken across all mentions of the restaurant

#### Normalization

Raw scores are normalized to a **0-10 scale** to ensure:
- Comparability across restaurants with different mention counts
- Intuitive interpretation (10 = exceptional, 0 = avoid)
- Visual clarity on our color-coded map (red → yellow → green gradient)

The normalization process:

1. **Statistical Normalization**: Apply z-score normalization across all restaurants
2. **Percentile Mapping**: Map z-scores to 0-10 using percentile distribution
3. **Confidence Adjustment**: Reduce scores for restaurants with few mentions (high uncertainty)

#### Minimum Mention Threshold

To appear on the map, restaurants must have:
- At least **5 distinct mentions** across different posts/comments
- At least **3 different Reddit users** mentioning the restaurant
- A **normalized score ≥ 8.0** (top-tier only)

This filters out:
- Random one-off mentions
- Astroturfing attempts (same user repeatedly mentioning a place)
- Low-quality or poorly-reviewed restaurants

### Phase 5: Continuous Updates

Restaurant ratings are not static:

- **Daily Scraping**: New Reddit posts and comments are collected daily
- **Incremental Updates**: Scores recalculated as new data arrives
- **Decay Function**: Old mentions gradually lose influence
- **Re-scoring Events**: Major events (ownership change, renovation) trigger full re-evaluation

## Why This Works

### Advantages Over Traditional Systems

1. **Manipulation-Resistant**: Can't pay for Reddit upvotes at scale; community self-moderates
2. **Context-Rich**: Captures *why* people like/dislike a restaurant, not just *that* they do
3. **Naturally Balanced**: Discussions include both positive and negative perspectives
4. **Longitudinal**: Tracks restaurant quality changes over time
5. **Scalable**: AI processes thousands of discussions faster than human analysts

### Alignment with Human Foodie Behavior

Our methodology mirrors what discerning diners actually do:

| Human Foodie | Snob System |
|-------------|-------------|
| Asks "Best pho in LA?" on Reddit | Scrapes Reddit for restaurant discussions |
| Skeptical of 5-star ratings | Ignores pre-existing star ratings entirely |
| Judges source credibility | Weights by user history and detail level |
| Considers recency | Applies temporal decay to old mentions |
| Synthesizes multiple opinions | Aggregates weighted sentiment scores |
| Remembers detailed experiences | Stores full text for context retrieval |

## Limitations and Ongoing Improvements

### Current Limitations

1. **Reddit Bias**: Represents tech-savvy, younger, English-speaking demographics
2. **Coverage Gaps**: New restaurants may lack sufficient mentions
3. **Geographic Focus**: Currently optimized for Los Angeles only
4. **Language Barrier**: Non-English discussions not yet analyzed
5. **Subjectivity**: AI interpretation of sentiment may miss sarcasm/nuance

### Roadmap

- **Multi-Platform Integration**: Incorporate Yelp, Google Reviews, Instagram for broader coverage
- **Cuisine-Specific Models**: Tailored analysis for different food types (fine dining vs. casual)
- **Personalization**: User preference learning for customized recommendations
- **Explainability**: Show which specific mentions contributed most to a restaurant's score
- **Real-Time Updates**: Streaming pipeline for instant score updates

## Technical Stack

- **Scraping**: Node.js/TypeScript with Reddit API
- **Database**: PostgreSQL with Prisma ORM
- **AI Analysis**: Google Gemini AI (batch processing for cost efficiency)
- **Geocoding**: Google Places API
- **Backend**: tRPC for type-safe API
- **Frontend**: Next.js 14 with React 19
- **Mapping**: Google Maps with custom color-coded markers

## Open Source & Collaboration

We believe in transparent rating systems. The core methodology is documented here, and we welcome:

- **Methodology Feedback**: Suggest improvements to our weighting system
- **Data Scientists**: Help optimize our normalization algorithms
- **Local Experts**: Validate our ratings against ground truth
- **Developers**: Contribute to our open-source codebase

Contact: Built by Jeremy at [CodeChef Consulting](https://codechefconsulting.com)

---

**Last Updated**: January 2025
**Version**: 1.0
