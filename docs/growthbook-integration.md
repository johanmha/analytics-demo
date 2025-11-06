# GrowthBook Integration Guide

Complete guide to connect GrowthBook to Umami for automated A/B test analysis.

## Step 1: Connect GrowthBook to Umami Database

**Navigation:** Data Sources → Add Data Source

1. **Type:** PostgreSQL
2. **Connection Settings:**
   ```
   Host: host.docker.internal (Mac/Windows) or 172.17.0.1 (Linux)
   Port: 5432
   Database: umami
   User: umami
   Password: umami
   ```
3. Click **Test Connection** → Should succeed
4. Click **Save**

---

## Step 2: Create hero_event_id Identifier Type

**Navigation:** Data Sources → Umami → Identifier Types

1. Click **"Add Identifier"**
2. **Key:** `hero_event_id`
3. **Description:** `Hero event identifier (one user per hero button click)`
4. Click **Save**

**Why hero_event_id?** Uses hero_event_id to simulate one user per hero button click for local testing. In production, you would use session_id instead.

---

## Step 3: Add Experiment Assignment Query

**Navigation:** Data Sources → Umami → Experiment Assignment Queries

This query tells GrowthBook which variation each user was assigned to.

1. Click **"Add Assignment Query"**
2. **Query Name:** `Hero Test Assignments`
3. **SQL Query:**

```sql
SELECT
  event_id as hero_event_id,
  created_at as timestamp,
  'hero-test' as experiment_id,
  CASE
    WHEN event_name = 'hero_click_control' THEN 'control'
    WHEN event_name = 'hero_click_variant' THEN 'variant'
  END as variation_id
FROM
  website_event
WHERE
  website_id = '817bcb3e-1a56-4273-9ed2-ae7aeda45fb9'
  AND event_name IN ('hero_click_control', 'hero_click_variant')
  AND event_type = 2
  AND created_at >= '{{ startDate }}'::timestamptz
  AND created_at <= '{{ endDate }}'::timestamptz
```

4. **Column Mappings:**

   - **Identifier Type:** `hero_event_id` (must match the identifier type from Step 2)

5. Click **Save** → **Run Query** to verify

**Important:** Replace `website_id` value with your actual Website ID from `.env` (VITE_UMAMI_WEBSITE_ID)

---

## Step 4: Create the Fact Table

**Navigation:** Settings → Fact Tables → Create Fact Table

### Basic Configuration:

- **Name:** `Umami Events`
- **Description:** `All custom events from Umami analytics`
- **Data Source:** Select your Umami PostgreSQL connection

### SQL Query:

```sql
 WITH hero_clicks AS (
    SELECT
      event_id,
      visit_id,
      created_at,
      CASE
        WHEN event_name = 'hero_click_control' THEN 'control'
        WHEN event_name = 'hero_click_variant' THEN 'variant'
      END as variant
    FROM website_event
    WHERE event_type = 2
      AND event_name IN ('hero_click_control', 'hero_click_variant')
      AND created_at >= '{{ startDate }}'::timestamptz
      AND created_at <= '{{ endDate }}'::timestamptz
  )
  SELECT
    e.event_id as id,
    (
      SELECT hc.event_id
      FROM hero_clicks hc
      WHERE hc.visit_id = e.visit_id
        AND hc.created_at <= e.created_at
      ORDER BY hc.created_at DESC
      LIMIT 1
    ) as hero_event_id,
    e.created_at as timestamp,
    e.website_id,
    e.event_name,
    (
      SELECT hc.variant
      FROM hero_clicks hc
      WHERE hc.visit_id = e.visit_id
        AND hc.created_at <= e.created_at
      ORDER BY hc.created_at DESC
      LIMIT 1
    ) as experiment_variant
  FROM website_event e
  WHERE e.event_type = 2
    AND e.created_at >= '{{ startDate }}'::timestamptz
    AND e.created_at <= '{{ endDate }}'::timestamptz
```

**What this does:**

- Simulates each hero_click as a new user session to generate test data locally
- Should use session_id in prod
- Properly casts dates with `::timestamptz`

### Column Mappings:

- **Identifier Column:** `id`
- **User ID Column:** `hero_event_id`
  - **Identifier Type:** `hero_event_id`
- **Timestamp Column:** `timestamp`

### Filters (Optional):

- **Column:** `website_id`
- **Type:** `string`
- **Default Value:** Your website ID from `.env`

Click **Save** → **Preview Data** to verify it works.

---

## Step 5: Create Metrics

**Navigation:** Settings → Metrics → Create Metric

Create these 4 metrics:

### 1. Hero Clicks

- **Name:** `Hero Clicks`
- **Type:** `Proportion`
- **Fact Table:** `Umami Events`
- **Filters:** `event_name` IN `hero_click_control,hero_click_variant`

### 2. Add to Cart

- **Name:** `Add to Cart`
- **Type:** `Proportion`
- **Fact Table:** `Umami Events`
- **Conversion Window:** `24 hours`
- **Filters:** `event_name` = `add_to_cart`

### 3. Checkout Started

- **Name:** `Checkout Started`
- **Type:** `Proportion`
- **Fact Table:** `Umami Events`
- **Conversion Window:** `24 hours`
- **Filters:** `event_name` = `checkout_start`

### 4. Purchase Conversion

- **Name:** `Purchase Conversion`
- **Type:** `Proportion`
- **Fact Table:** `Umami Events`
- **Conversion Window:** `7 days`
- **Filters:** `event_name` = `purchase_complete`
