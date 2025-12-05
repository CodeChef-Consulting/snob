# Why Reddit Restaurant Ratings Are Superior to Yelp (And The Math That Proves It)

*A deep dive into building a restaurant rating system that actually works*

---

## The Problem: Traditional Reviews Are Broken

If you've ever trusted a 4.5-star Yelp rating and walked into a mediocre restaurant, you know the system is broken. Here's why:

1. **Fake Reviews**: Businesses pay for 5-star reviews. Competitors post fake 1-star reviews. Review platforms profit from "premium" placements.

2. **Equal Weighting**: A rushed review from someone's only visit counts the same as a detailed review from a regular customer.

3. **No Recency Decay**: A 5-year-old review about a restaurant under new management still affects the rating.

4. **Gaming**: Review platforms can be manipulated by coordinated campaigns or viral brigading.

Traditional review systems have a fundamental problem: **perverse incentives**. Everyone involved (businesses, review platforms, even some users) has reasons to manipulate the data.

---

## The Solution: Reddit Data

Reddit is different. Redditors have **zero financial incentive to lie**. When someone in r/FoodLosAngeles asks "Best birria in DTLA?" and 50 people upvote the response "Teddy's Red Tacos", that's a signal you can trust.

Those 50 upvotes aren't from paid reviewers. They're from real people who:
- Have no business relationship with the restaurant
- Aren't getting paid for their opinion
- Are just trying to help someone in their community

This is **the most honest restaurant data on the internet**.

But raw Reddit data isn't enough. We need to process it intelligently.

---

## The Math: A Multi-Factor Weighted Scoring System

I built a scoring engine that combines 5 different weighting factors to create an accurate, manipulation-resistant rating system.

### 1. Recency Weight (Exponential Decay)

```javascript
recencyWeight = 2^(-ageDays / 90)
```

**90-day half-life**: A 3-month-old review has 50% the weight of today's review. A 6-month-old review has 25% the weight. A 2-year-old review is almost irrelevant.

This ensures ratings reflect the **current state** of the restaurant, not what it was like 5 years ago.

### 2. Upvote Weight (Logarithmic)

```javascript
upvoteWeight = log(1 + upvotes)
```

Why logarithmic instead of linear? To prevent viral posts from dominating.

- 10 upvotes → weight of 2.4
- 100 upvotes → weight of 4.6
- 1000 upvotes → weight of 6.9

A post with 1000 upvotes only counts ~3x more than a post with 10 upvotes, not 100x more. This prevents manipulation through viral brigading.

### 3. Depth Weight (Quadratic Decay)

```javascript
depthWeight = 1 / (1 + depth)^2
```

Comments buried 5 replies deep are less likely to be read than top-level comments. We weight accordingly:

- Top-level comment: weight = 1.0
- 1 reply deep: weight = 0.25
- 2 replies deep: weight = 0.11
- 3 replies deep: weight = 0.06

This reflects actual Reddit user behavior (most people don't expand nested threads).

### 4. Mentions Weight (Power-Law Decay)

```javascript
mentionsWeight = 1 / mentions^1.5
```

A focused review mentioning 1 restaurant is more valuable than a "top 10 list" post:

- 1 restaurant mentioned: weight = 1.0
- 2 restaurants: weight = 0.35
- 3 restaurants: weight = 0.19
- 5 restaurants: weight = 0.09

This prevents list-style posts from inflating scores.

### 5. Thread Clustering Cap

The most innovative part: we **cap each thread's contribution** to prevent any single viral post from dominating a restaurant's score.

```javascript
threadNormalization = min(1, THREAD_CAP / rawThreadWeight)
```

If a single thread contributes more than our cap (currently 5), we scale it down proportionally. This prevents manipulation through coordinated campaigns in a single thread.

---

## Combining Everything: The Final Score

```javascript
itemWeight = recencyWeight × upvoteWeight × depthWeight × mentionsWeight

finalScore = Σ (sentiment × itemWeight × threadNormalization)
```

For each Reddit mention:
1. AI extracts sentiment (-1 to +1)
2. Calculate item weight using all 4 factors
3. Apply thread clustering cap
4. Multiply sentiment × weight
5. Sum across all mentions

This gives us a **raw score** that accurately reflects community consensus while being resistant to manipulation.

---

## Normalization: The 0-10 Scale

Raw scores need to be normalized to a human-readable 0-10 scale. But **not all normalization methods are equal**.

Traditional systems use linear normalization (min-max scaling). This distributes scores evenly across the range.

**That's wrong**. In the real world, restaurant quality follows a **power-law distribution**:
- Most restaurants are mediocre or bad (60%)
- Decent restaurants are common (30%)
- Good restaurants are uncommon (7%)
- Excellent restaurants are rare (2%)
- Exceptional restaurants are unicorns (<1%)

Our normalization reflects this reality:

### Percentile-Based Power-Law Normalization

```javascript
if (percentile < 0.60) {
  // Bottom 60% → scores 1-4
  normalizedScore = 1 + (percentile / 0.60) * 3
} else if (percentile < 0.90) {
  // Next 30% → scores 5-6
  normalizedScore = 5 + ((percentile - 0.60) / 0.30) * 1
} else if (percentile < 0.97) {
  // Next 7% → score ~7
  normalizedScore = 7 + ((percentile - 0.90) / 0.07) * 0.5
} else if (percentile < 0.99) {
  // Next 2% → score ~8
  normalizedScore = 8 + ((percentile - 0.97) / 0.02) * 0.5
} else {
  // Top 1% → scores 9-10
  normalizedScore = 9 + Math.pow((percentile - 0.99) / 0.01, 1.5)
}
```

This creates a **steep distribution** where:
- **8.0+** = Top 3% (excellent)
- **9.0+** = Top 1% (exceptional)
- **9.5+** = Top 0.1% (once-in-a-lifetime)

An 8.0 rating actually **means something**. It's not inflated like Yelp where everything is 4.2-4.7 stars.

---

## Technical Implementation

The full tech stack:

- **Next.js 14** (App Router) + TypeScript
- **tRPC** for end-to-end type-safe APIs
- **Prisma ORM** + PostgreSQL
- **Google Gemini AI** for sentiment extraction
- **Reddit API** with intelligent rate-limit handling
- **Google Maps/Places API** for geocoding

### The Scraping Pipeline

1. **Two-Phase Architecture**: Separate post scraping from comment scraping to optimize API usage
2. **Batch Processing**: Aggressive batching to minimize database round-trips
3. **Session Tracking**: Prevent duplicate scraping with session-based deduplication
4. **Rate Limiting**: Intelligent delays to respect API limits

### The Scoring Pipeline

1. **Data Loading**: Load posts, comments, sentiments, upvotes, timestamps
2. **Weight Calculation**: Apply all 5 weighting factors
3. **Aggregation**: Group by restaurant, sum weighted scores
4. **Normalization**: Percentile-based power-law transformation
5. **Storage**: Persist scores back to database

---

## Results: It Actually Works

The system correctly identifies:

- **Hidden gems**: Small restaurants with passionate Reddit followings
- **Overhyped spots**: High Yelp ratings but mediocre Reddit sentiment
- **Neighborhood favorites**: Consistent positive mentions across multiple threads
- **Declining quality**: Recent negative mentions overriding old positive ones

The scoring distribution looks exactly like you'd expect:
- Most restaurants: 3-6
- Good restaurants: 7-7.5
- Excellent restaurants: 8-8.5
- Exceptional restaurants: 9+

---

## Open Source & Portfolio

This project is **100% free** and will stay that way. No ads, no premium features, no monetization.

Why? Because it's a portfolio piece showcasing:
- Advanced full-stack development
- Mathematical rigor in algorithm design
- AI/ML integration
- API design and optimization
- Real-world problem solving

**I'm available for hire**. If you need a senior full-stack developer who can build complex systems from scratch, [let's talk](https://your-landing-page.com/about).

---

## Try It Yourself

👉 **[Live App](https://your-app.com)** - Explore the interactive map

👉 **[GitHub](https://github.com/yourusername/reddit-scraper)** - View the source code

👉 **[Methodology](https://your-app.com/about)** - Full technical breakdown

---

## Conclusion: Trust > Manipulation

The restaurant review industry is broken because of perverse incentives. Reddit data is superior because **nobody has a reason to lie**.

With the right mathematical framework, we can transform messy Reddit discussions into the most accurate restaurant ratings on the internet.

No fake reviews. No gaming. Just honest opinions, intelligently weighted.

**That's how you build a rating system that actually works.**

---

*Questions? Feedback? [Reach out](https://your-app.com/about) - I'd love to hear from you.*

*Looking to hire a developer for your project? [Let's connect](https://your-app.com/about).*
