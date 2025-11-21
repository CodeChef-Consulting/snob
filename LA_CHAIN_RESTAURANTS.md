# Suspected Multi-Location Restaurants in LA

Generated from database analysis of Restaurant table.

## National/International Chains (70+ locations total)

### Fast Food - Burgers
- **McDonald's** (83 locations total across spellings)
  - Variations: "Mcdonalds", "Mc Donalds", "McDonald's", "Mcdonalds Restaurant", "Mcdonald"
  - **Canonical**: `McDonald's`

- **Subway** (81 locations)
  - Variations: "Subway", "Subway Sandwiches"
  - **Canonical**: `Subway`

- **Jack in the Box** (53 locations)
  - **Canonical**: `Jack in the Box`

- **Burger King** (11 locations)
  - **Canonical**: `Burger King`

- **Fatburger** (6 locations)
  - **Canonical**: `Fatburger`

- **The Habit Burger Grill** (8 locations)
  - **Canonical**: `The Habit Burger Grill`

- **In-N-Out Burger** (15 locations)
  - Variations: "In N Out Burger", "In-N-Out Burger", "In N Out Burgers A California Corporation"
  - **Canonical**: `In-N-Out Burger`

- **Shake Shack**
  - **Canonical**: `Shake Shack`

### Fast Food - Mexican
- **Taco Bell** (21 locations)
  - **Canonical**: `Taco Bell`

- **Chipotle Mexican Grill** (32 locations)
  - **Canonical**: `Chipotle Mexican Grill`

- **Del Taco** (10 locations)
  - **Canonical**: `Del Taco`

- **Baja Fresh** (6 locations)
  - **Canonical**: `Baja Fresh`

### Fast Food - Chicken
- **El Pollo Loco** (43 locations)
  - **Canonical**: `El Pollo Loco`

- **Wingstop** (16 locations)
  - **Canonical**: `Wingstop`

- **Kentucky Fried Chicken** (8 locations)
  - Variations: "KFC", "Kentucky Fried Chicken"
  - **Canonical**: `Kentucky Fried Chicken`

- **Popeyes** (7 locations)
  - Variations: "Popeyes Chicken", "Popeyes Louisiana Kitchen"
  - **Canonical**: `Popeyes`

- **Church's Chicken** (8 locations)
  - Variations: "Churches Chicken Store"
  - **Canonical**: `Church's Chicken`

- **Zankou Chicken** (6 locations)
  - **Canonical**: `Zankou Chicken`

- **Chick-fil-A**
  - Variations: "Chick-Fil-A", "Chickfila", "Chick Fil A"
  - **Canonical**: `Chick-fil-A`

### Fast Food - Other
- **Panda Express** (36 locations)
  - **Canonical**: `Panda Express`

- **Carl's Jr** (19 locations)
  - Variations: "Carls Jr Restaurant"
  - **Canonical**: `Carl's Jr`

- **Beef Bowl** (9 locations)
  - **Canonical**: `Beef Bowl`

### Pizza
- **Domino's Pizza** (14 locations)
  - Variations: "Dominos Pizza"
  - **Canonical**: `Domino's Pizza`

- **Papa John's Pizza** (6 locations)
  - Variations: "Papa Johns Pizza"
  - **Canonical**: `Papa John's Pizza`

### Coffee
- **Starbucks** (42 locations)
  - Variations: "Starbucks Coffee"
  - **Canonical**: `Starbucks`

### Casual Dining
- **IHOP** (10 locations)
  - Variations: "Ihop"
  - **Canonical**: `IHOP`

- **Denny's** (21 locations total)
  - Variations: "Dennys", "Dennys Restaurant"
  - **Canonical**: `Denny's`

- **Sizzler** (6 locations)
  - **Canonical**: `Sizzler`

### Fast Casual
- **Jersey Mike's Subs** (7 locations)
  - Variations: "Jersey Mikes Subs"
  - **Canonical**: `Jersey Mike's Subs`

- **Corner Bakery Cafe** (7 locations)
  - **Canonical**: `Corner Bakery Cafe`

- **Le Pain Quotidien** (7 locations)
  - **Canonical**: `Le Pain Quotidien`

## Regional Chains (LA-Based, 6-14 locations)

### Fast Casual - Healthy
- **Tender Greens** (14 locations)
  - Local LA chain, farm-to-table
  - **Canonical**: `Tender Greens`

- **Waba Grill** (9 locations)
  - Asian fusion bowls
  - **Canonical**: `Waba Grill`

### Mexican - Regional
- **Guisados** (8 locations)
  - LA-based taco chain
  - **Canonical**: `Guisados`

- **King Taco** (7 locations)
  - Iconic LA Mexican chain
  - **Canonical**: `King Taco`

- **El Taco Llama** (8 locations)
  - **Canonical**: `El Taco Llama`

- **Tams Burgers** (6 locations)
  - **Canonical**: `Tams Burgers`

### Latin American
- **Pollo Campero** (8 locations)
  - Guatemalan fried chicken chain
  - **Canonical**: `Pollo Campero`

### Hawaiian
- **Ono Hawaiian BBQ** (8 locations)
  - Variations: "Ono Hawaiian BBQ", "Ono Hawaiian Bbq"
  - **Canonical**: `Ono Hawaiian BBQ`

### Mediterranean
- **Panini Kabob Grill** (6 locations)
  - **Canonical**: `Panini Kabob Grill`

### Hot Chicken
- **Main Chick Hot Chicken** (6 locations)
  - Nashville hot chicken chain
  - **Canonical**: `Main Chick Hot Chicken`

### Mexican Fusion
- **Kalaveras** (7 locations)
  - Modern Mexican
  - **Canonical**: `Kalaveras`

### Korean
- **Egg Tuck** (6 locations)
  - Korean egg sandwiches
  - **Canonical**: `Egg Tuck`

### Vietnamese
- **Ocha Classic Restaurant** (6 locations)
  - **Canonical**: `Ocha Classic Restaurant`

### Other
- **For The Win** (11 locations)
  - Variations: "For The Win", "For the Win"
  - **Canonical**: `For The Win`

## Corporate/Institutional (Not Customer-Facing)
- **Sodexo America LLC** (10 locations)
  - Institutional food service, not customer-facing chain
  - **Canonical**: `Sodexo`

- **Valley Taco Management LLC** (6 locations)
  - Likely a corporate entity managing multiple brands
  - **Canonical**: `Valley Taco Management`

## Consolidation Strategy

### Tier 1: Exact Match Groups (Automatic)
For each canonical name above, consolidate all variations:
- Case-insensitive matching
- Remove trailing numbers and store numbers
- Normalize spacing (single spaces, trim)

**Examples:**
- "Mcdonalds 123", "McDonald's", "Mc Donalds 456" → `McDonald's`
- "In N Out Burger 10", "In-N-Out Burger" → `In-N-Out Burger`
- "Subway 1234", "Subway Sandwiches 5678" → `Subway`

### Tier 2: Manual Review (Recommended)
Review these potential matches:
- "Denny's" vs "Denny's Restaurant" (same chain)
- "Popeyes" vs "Popeyes Louisiana Kitchen" (same chain)
- Single-word matches that might be different restaurants

### Tier 3: Keep Separate
- Local restaurants with same name in different neighborhoods (verify these are actually the same business)
- Franchises vs corporate locations (treat as same group for scoring)

## Implementation Notes

### Normalization Function
```typescript
function normalizeRestaurantName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+\d+$/, '') // Remove trailing numbers
    .replace(/\s+#\d+/, '') // Remove store numbers with hash
    .replace(/\s+/g, ' ') // Normalize spacing
    .replace(/['']/g, "'") // Normalize apostrophes
    .replace(/&/g, 'and'); // Normalize ampersands
}
```

### Canonical Name Mapping
Use a lookup table for known chains with multiple spellings:
```typescript
const canonicalNames: Record<string, string> = {
  'mcdonalds': "McDonald's",
  'mc donalds': "McDonald's",
  'mcdonald': "McDonald's",
  'in n out burger': 'In-N-Out Burger',
  'in-n-out burger': 'In-N-Out Burger',
  'subway': 'Subway',
  'subway sandwiches': 'Subway',
  // ... etc
};
```

## Statistics

- **Total multi-location groups identified**: ~60 chains
- **Largest chain**: McDonald's (83 locations)
- **Total locations in chains**: ~800+ (out of ~12,000 total restaurants)
- **Chain consolidation impact**: ~6-7% of restaurants are chains

## Scoring Impact

**Before consolidation:**
- Post: "McDonald's has the best fries!"
- Links to: 83 individual restaurant records
- Each location gets: 1/83rd of sentiment weight

**After consolidation:**
- Post: "McDonald's has the best fries!"
- Links to: 1 RestaurantGroup ("McDonald's")
- All 83 locations share: Full sentiment weight
- Score increases: ~83x stronger signal
