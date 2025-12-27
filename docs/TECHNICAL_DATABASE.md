# Database Schema Documentation

## Overview

The application uses a PostgreSQL database with 18 tables, managed through Supabase with Row Level Security (RLS) policies.

---

## Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   profiles   │     │   projects   │     │    rooms     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │◄────│ created_by   │     │ id (PK)      │
│ full_name    │     │ assigned_to  │◄────│ project_id   │
│ role         │     │ id (PK)      │     │ room_type    │
│ phone        │     │ name         │     │ current_phase│
│ is_active    │     │ client_name  │     │ selected_style│
└──────────────┘     │ city         │     └──────┬───────┘
                     │ status       │            │
                     └──────────────┘            │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ room_analysis│◄────│  room_images │     │  job_queue   │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │     │ id (PK)      │     │ id (PK)      │
│ room_id (FK) │     │ room_id (FK) │     │ room_id (FK) │
│ dimensions   │     │ storage_path │     │ project_id   │
│ window_count │     │ image_type   │     │ job_type     │
│ suggested_   │     │ phase        │     │ status       │
│   styles     │     └──────────────┘     │ payload      │
└──────────────┘                          └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ budget_items │     │   vendors    │     │vendor_matches│
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │     │ id (PK)      │     │ id (PK)      │
│ project_id   │     │ business_name│     │ vendor_id(FK)│
│ room_id      │     │ categories[] │     │budget_item_id│
│ category     │     │ city         │     │ match_score  │
│ rate, qty    │     │ rating       │     │ status       │
│ vendor_id    │     │ is_curated   │     └──────────────┘
└──────────────┘     └──────────────┘
```

---

## Tables Reference

### 1. profiles

User profile information linked to auth.users.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | - | PK, matches auth.users.id |
| full_name | text | Yes | null | Display name |
| role | user_role | Yes | 'renderer' | User role enum |
| phone | text | Yes | null | Contact number |
| avatar_url | text | Yes | null | Profile image |
| is_active | boolean | Yes | true | Account status |
| created_at | timestamptz | Yes | now() | Creation time |
| updated_at | timestamptz | Yes | now() | Last update |

**RLS Policies:**
- Users can view their own profile
- Users can update their own profile
- Admins can view all profiles

---

### 2. projects

Main project entity.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| name | text | No | - | Project name |
| description | text | Yes | null | Project details |
| client_name | text | Yes | null | Client name |
| client_email | text | Yes | null | Client contact |
| city | city_enum | Yes | null | Project city |
| status | project_status | Yes | 'draft' | Current status |
| current_phase | integer | Yes | 1 | Overall phase |
| deadline | date | Yes | null | Target date |
| estimated_budget | numeric | Yes | null | Budget estimate |
| actual_cost | numeric | Yes | null | Actual spend |
| max_rooms | integer | Yes | 7 | Room limit |
| total_rooms | integer | Yes | 0 | Room count |
| created_by | uuid | Yes | null | Creator FK |
| assigned_to | uuid | Yes | null | Assignee FK |
| created_at | timestamptz | Yes | now() | Creation time |
| updated_at | timestamptz | Yes | now() | Last update |

**Enums:**
- project_status: draft, in_progress, review, approved, completed, cancelled
- city_enum: Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, Surat, Lucknow

**RLS Policies:**
- Authenticated users can create projects
- Users can view/update/delete projects they created
- Users can view/update projects assigned to them
- Admins have full access

---

### 3. rooms

Individual room within a project.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| project_id | uuid | No | - | FK to projects |
| room_number | integer | No | - | Room sequence |
| room_name | text | Yes | null | Custom name |
| room_type | room_type_enum | Yes | null | Type category |
| current_phase | integer | Yes | 1 | Processing phase |
| phase_1_completed | boolean | Yes | false | Upload done |
| phase_2_completed | boolean | Yes | false | Analysis done |
| phase_3_completed | boolean | Yes | false | Cleaning done |
| phase_4_completed | boolean | Yes | false | Customize done |
| phase_5_completed | boolean | Yes | false | Generate done |
| selected_style | text | Yes | null | Design style |
| smart_default_id | uuid | Yes | null | FK to defaults |
| length_feet | numeric | Yes | null | Room length |
| width_feet | numeric | Yes | null | Room width |
| height_feet | numeric | Yes | null | Room height |
| final_quality_score | numeric | Yes | null | Render score |
| retry_count | integer | Yes | 0 | Retry attempts |
| created_at | timestamptz | Yes | now() | Creation time |
| updated_at | timestamptz | Yes | now() | Last update |

**Enums:**
- room_type_enum: living_room, master_bedroom, bedroom, kitchen, dining_room, balcony, study_room, kids_room, guest_room, pooja_room, home_office, gym, entertainment_room, utility_room

---

### 4. room_analysis

AI analysis results for a room.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| room_id | uuid | No | - | FK to rooms |
| detected_length_feet | numeric | Yes | null | Detected length |
| detected_width_feet | numeric | Yes | null | Detected width |
| detected_height_feet | numeric | Yes | null | Detected height |
| measurement_confidence | numeric | Yes | null | Confidence 0-1 |
| window_count | integer | Yes | 0 | Windows found |
| window_positions | jsonb | Yes | [] | Window details |
| door_count | integer | Yes | 0 | Doors found |
| door_positions | jsonb | Yes | [] | Door details |
| ceiling_fan_count | integer | Yes | 0 | Fans found |
| outlet_count | integer | Yes | 0 | Outlets found |
| other_features | jsonb | Yes | [] | Other features |
| suggested_styles | jsonb | Yes | [] | AI suggestions |
| selected_style | text | Yes | null | Chosen style |
| is_verified | boolean | Yes | false | User verified |
| verified_at | timestamptz | Yes | null | Verification time |
| verified_by | uuid | Yes | null | Verifier FK |
| raw_analysis_data | jsonb | Yes | null | Full AI response |
| created_at | timestamptz | Yes | now() | Creation time |
| updated_at | timestamptz | Yes | now() | Last update |

---

### 5. room_images

Images stored for each room.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| room_id | uuid | No | - | FK to rooms |
| storage_path | text | No | - | Supabase path |
| file_name | text | No | - | Original name |
| file_size | integer | Yes | null | Size in bytes |
| image_type | text | No | - | original/cleaned/render |
| phase | integer | No | - | Phase number |
| resolution | text | No | - | Width x Height |
| created_at | timestamptz | No | now() | Upload time |
| updated_at | timestamptz | No | now() | Last update |

---

### 6. budget_items

Line items in project budget/BOQ.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| project_id | uuid | No | - | FK to projects |
| room_id | uuid | Yes | null | FK to rooms |
| item_name | text | No | - | Material/product |
| category | text | No | - | Item category |
| specification | text | Yes | null | Quality details |
| quantity | numeric | No | 1 | Amount needed |
| unit | text | No | 'nos' | Measurement unit |
| rate | numeric | No | 0 | Price per unit |
| amount | numeric | Yes | computed | qty × rate |
| gst_percent | numeric | No | 18 | Tax percentage |
| gst_amount | numeric | Yes | computed | Tax amount |
| total | numeric | Yes | computed | With tax |
| assigned_vendor_id | uuid | Yes | null | FK to vendors |
| vendor_name | text | Yes | null | Vendor display |
| status | text | No | 'pending' | pending/approved |
| sort_order | integer | Yes | null | Display order |
| created_at | timestamptz | No | now() | Creation time |
| updated_at | timestamptz | No | now() | Last update |

---

### 7. vendors

Vendor/supplier database.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| business_name | text | No | - | Company name |
| categories | text[] | No | [] | Product categories |
| city | text | Yes | null | Operating city |
| contact_name | text | Yes | null | Primary contact |
| phone | text | Yes | null | Phone number |
| email | text | Yes | null | Email address |
| address | text | Yes | null | Physical address |
| rating | numeric | Yes | 0 | Average rating |
| total_reviews | integer | Yes | 0 | Review count |
| projects_completed | integer | Yes | 0 | Past projects |
| on_time_percentage | numeric | Yes | 0 | Delivery rate |
| discount_percentage | numeric | Yes | 0 | Standard discount |
| min_order_amount | numeric | Yes | 0 | Minimum order |
| lead_time_days | integer | Yes | 7 | Delivery days |
| is_verified | boolean | No | false | Credential check |
| is_curated | boolean | No | false | Preferred status |
| created_at | timestamptz | No | now() | Creation time |
| updated_at | timestamptz | No | now() | Last update |

---

### 8. vendor_matches

Matching between budget items and vendors.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| budget_item_id | uuid | No | - | FK to budget_items |
| vendor_id | uuid | No | - | FK to vendors |
| match_score | integer | No | 0 | Compatibility 0-100 |
| status | text | No | 'pending' | pending/selected |
| price_quote | numeric | Yes | null | Quoted price |
| notes | text | Yes | null | Match notes |
| created_at | timestamptz | No | now() | Creation time |
| updated_at | timestamptz | No | now() | Last update |

---

### 9. job_queue

Async job processing queue.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| project_id | uuid | No | - | FK to projects |
| room_id | uuid | No | - | FK to rooms |
| job_type | text | No | - | analysis/cleaning/generation |
| status | text | No | 'pending' | pending/processing/completed/failed |
| priority | integer | No | 5 | 1-10, higher = first |
| payload | jsonb | Yes | {} | Input parameters |
| result | jsonb | Yes | null | Output data |
| error_message | text | Yes | null | Failure reason |
| retry_count | integer | No | 0 | Attempt number |
| max_retries | integer | No | 3 | Retry limit |
| scheduled_at | timestamptz | No | now() | When to run |
| started_at | timestamptz | Yes | null | Processing start |
| completed_at | timestamptz | Yes | null | Processing end |
| created_by | uuid | Yes | null | Submitter FK |
| created_at | timestamptz | No | now() | Creation time |
| updated_at | timestamptz | No | now() | Last update |

---

### 10. notifications

User notifications.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| user_id | uuid | No | - | FK to auth.users |
| title | text | No | - | Notification title |
| message | text | No | - | Body text |
| type | text | No | 'info' | info/success/warning/error |
| link | text | Yes | null | Navigation URL |
| is_read | boolean | No | false | Read status |
| created_at | timestamptz | No | now() | Creation time |

---

### 11. api_logs

API call tracking for cost monitoring.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| project_id | uuid | Yes | null | FK to projects |
| room_id | uuid | Yes | null | FK to rooms |
| service | text | No | - | API service name |
| endpoint | text | No | - | API endpoint |
| model | text | Yes | null | AI model used |
| input_tokens | integer | Yes | null | Input token count |
| output_tokens | integer | Yes | null | Output token count |
| cost_usd | numeric | No | 0 | Cost in USD |
| latency_ms | integer | Yes | null | Response time |
| status | text | No | 'success' | success/error |
| error_message | text | Yes | null | Error details |
| metadata | jsonb | Yes | null | Extra data |
| created_by | uuid | Yes | null | User FK |
| created_at | timestamptz | No | now() | Log time |

---

### 12. smart_defaults

Preset configurations by room type.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| name | text | No | - | Default name |
| room_type | room_type_enum | Yes | null | Room type |
| default_style | text | Yes | null | Design style |
| default_settings | jsonb | Yes | null | Configuration |
| created_at | timestamptz | Yes | now() | Creation time |

---

### 13. pricing_reference

Base pricing database.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| item_name | text | No | - | Item name |
| category | text | No | - | Category |
| specification | text | Yes | null | Quality details |
| base_rate | numeric | No | - | Base price |
| unit | text | No | 'nos' | Measurement |
| city_multipliers | jsonb | Yes | default | City factors |
| created_at | timestamptz | No | now() | Creation time |

---

### 14. bulk_operations

Track bulk action results.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| operation_type | bulk_op_type | No | - | Operation type |
| project_id | uuid | No | - | FK to projects |
| affected_rooms | uuid[] | Yes | [] | Room IDs |
| total_count | integer | No | 0 | Items processed |
| success_count | integer | No | 0 | Successful |
| failed_count | integer | No | 0 | Failed |
| status | bulk_op_status | No | 'pending' | Current status |
| error_message | text | Yes | null | Error details |
| created_by | uuid | Yes | null | User FK |
| created_at | timestamptz | No | now() | Start time |
| completed_at | timestamptz | Yes | null | End time |

---

### 15. change_events

Audit log for real-time sync.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| entity_type | text | No | - | Table name |
| entity_id | uuid | No | - | Record ID |
| project_id | uuid | Yes | null | FK to projects |
| room_id | uuid | Yes | null | FK to rooms |
| change_type | text | No | - | created/updated/deleted |
| changed_fields | jsonb | Yes | [] | Modified fields |
| old_values | jsonb | Yes | null | Previous values |
| new_values | jsonb | Yes | null | New values |
| changed_by | uuid | Yes | null | User FK |
| created_at | timestamptz | No | now() | Change time |

---

### 16. user_sessions

Active user session tracking.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| user_id | uuid | No | - | FK to auth.users |
| client_id | text | Yes | null | Browser ID |
| current_project_id | uuid | Yes | null | Active project |
| current_room_id | uuid | Yes | null | Active room |
| is_active | boolean | No | true | Session status |
| session_started_at | timestamptz | No | now() | Session start |
| last_active_at | timestamptz | No | now() | Last activity |
| created_at | timestamptz | No | now() | Creation time |
| updated_at | timestamptz | No | now() | Last update |

---

### 17. optimistic_updates

Pending optimistic updates.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | uuid | No | gen_random_uuid() | Primary key |
| user_id | uuid | No | - | FK to auth.users |
| client_id | text | No | - | Browser ID |
| entity_type | text | No | - | Table name |
| entity_id | uuid | No | - | Record ID |
| operation | text | No | - | create/update/delete |
| optimistic_data | jsonb | No | - | Pending data |
| status | text | No | 'pending' | pending/confirmed/failed |
| error_message | text | Yes | null | Failure reason |
| expires_at | timestamptz | No | now()+5min | Expiration |
| confirmed_at | timestamptz | Yes | null | Confirmation time |
| created_at | timestamptz | No | now() | Creation time |

---

## Indexes

### Performance Indexes

```sql
-- Projects by user
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_assigned_to ON projects(assigned_to);
CREATE INDEX idx_projects_status ON projects(status);

-- Rooms by project
CREATE INDEX idx_rooms_project_id ON rooms(project_id);
CREATE INDEX idx_rooms_current_phase ON rooms(current_phase);

-- Job queue performance
CREATE INDEX idx_job_queue_status ON job_queue(status);
CREATE INDEX idx_job_queue_scheduled ON job_queue(scheduled_at);
CREATE INDEX idx_job_queue_project ON job_queue(project_id);

-- Budget items
CREATE INDEX idx_budget_items_project ON budget_items(project_id);
CREATE INDEX idx_budget_items_category ON budget_items(category);

-- API logs by project and date
CREATE INDEX idx_api_logs_project ON api_logs(project_id);
CREATE INDEX idx_api_logs_created ON api_logs(created_at);
```

---

## Database Functions

See `<db-functions>` section in context for full list of:
- `claim_job()` - Claim job for processing
- `complete_job()` - Mark job complete
- `fail_job()` - Mark job failed
- `get_next_job()` - Get highest priority pending job
- `approve_all_analysis()` - Bulk approve
- `apply_style_to_all_rooms()` - Bulk style
- `auto_assign_best_vendors()` - Auto vendor matching
- And more...
