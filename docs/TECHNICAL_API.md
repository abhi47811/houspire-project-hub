# API Documentation

## Overview

This document covers all backend Edge Functions, their endpoints, request/response formats, and authentication requirements.

---

## Authentication

### All requests require authentication

```typescript
// Header format
Authorization: Bearer <SUPABASE_ANON_KEY>

// For authenticated users, include JWT
Authorization: Bearer <USER_JWT_TOKEN>
```

### Getting User JWT

```typescript
import { supabase } from '@/integrations/supabase/client';

const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;
```

---

## Edge Functions

### 1. Vision AI (`/functions/v1/vision-ai`)

Handles all GPT-4 Vision based analysis.

#### Actions

##### `analyzeRoom`

Analyze a room image for interior design renovation.

**Request:**
```json
{
  "action": "analyzeRoom",
  "imageUrl": "https://storage.example.com/room.jpg",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "dimensions": {
      "length_feet": 15,
      "width_feet": 12,
      "height_feet": 10
    },
    "window_count": 2,
    "window_positions": [
      { "wall": "north", "size": "large" }
    ],
    "door_count": 1,
    "door_positions": [
      { "wall": "east", "type": "single" }
    ],
    "ceiling_features": ["fan", "beam"],
    "outlet_count": 4,
    "architectural_features": ["bay_window"],
    "suggested_styles": ["modern", "contemporary"]
  },
  "usage": {
    "inputTokens": 1500,
    "outputTokens": 500,
    "costUsd": 0.025
  }
}
```

##### `validateCleaning`

Validate that cleaning preserved architectural elements.

**Request:**
```json
{
  "action": "validateCleaning",
  "originalUrl": "https://storage.example.com/original.jpg",
  "cleanedUrl": "https://storage.example.com/cleaned.jpg",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "valid": true,
    "issues": [],
    "preservedElements": ["windows", "doors", "flooring"],
    "qualityScore": 92
  },
  "usage": { ... }
}
```

##### `validateFinalRender`

Quality assessment of generated renders.

**Request:**
```json
{
  "action": "validateFinalRender",
  "renderUrl": "https://storage.example.com/render.jpg",
  "requirements": {
    "style": "modern",
    "room_type": "living_room"
  },
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "architecturalPreservation": 95,
    "designStyleAccuracy": 88,
    "photorealism": 92,
    "furnitureProportions": 85,
    "overallMagazineQuality": 90,
    "overallScore": 90,
    "issues": ["slight color mismatch on walls"]
  },
  "usage": { ... }
}
```

##### `itemizeBudget`

Extract materials and furniture from renders for BOQ.

**Request:**
```json
{
  "action": "itemizeBudget",
  "imageUrls": ["url1", "url2"],
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": [
    {
      "item_name": "L-shaped Sectional Sofa",
      "category": "Furniture",
      "specification": "Premium fabric, 7-seater",
      "quantity": 1,
      "unit": "nos"
    },
    {
      "item_name": "Wooden Flooring",
      "category": "Flooring",
      "specification": "Oak engineered",
      "quantity": 180,
      "unit": "sqft"
    }
  ],
  "usage": { ... }
}
```

##### `generatePrompt`

Generate optimized prompt for image generation.

**Request:**
```json
{
  "action": "generatePrompt",
  "roomData": {
    "room_type": "living_room",
    "dimensions": { "length": 15, "width": 12 }
  },
  "smartDefaults": {
    "style": "modern_minimalist"
  },
  "analysis": {
    "window_count": 2,
    "natural_light": "high"
  },
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "prompt": "Photorealistic interior design of a modern minimalist living room, 15x12 feet, natural lighting from large windows...",
    "negativePrompt": "cluttered, old furniture, dark, low quality...",
    "styleKeywords": ["clean lines", "neutral palette", "minimal decor"]
  },
  "usage": { ... }
}
```

---

### 2. Image Processing (`/functions/v1/image-processing`)

Handles image manipulation via Replicate models.

##### `cleanRoom`

Remove furniture using LaMa Cleaner.

**Request:**
```json
{
  "action": "cleanRoom",
  "imageUrl": "https://storage.example.com/room.jpg",
  "mask": "base64_encoded_mask_or_url",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "output": "https://replicate.delivery/cleaned.jpg",
    "predictionId": "abc123"
  },
  "usage": {
    "costUsd": 0.05
  }
}
```

##### `retryCleanup`

Retry with fallback model.

**Request:**
```json
{
  "action": "retryCleanup",
  "imageUrl": "...",
  "mask": "...",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

##### `upscaleImage`

Upscale to 4K using Real-ESRGAN.

**Request:**
```json
{
  "action": "upscaleImage",
  "imageUrl": "https://storage.example.com/render.jpg",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "output": "https://replicate.delivery/upscaled.jpg"
  },
  "usage": {
    "costUsd": 0.10
  }
}
```

---

### 3. Generate AI (`/functions/v1/generate-ai`)

Handles AI image generation via Lovable AI Gateway.

##### `generateRender`

Generate photorealistic interior render.

**Request:**
```json
{
  "action": "generateRender",
  "cleanedImageUrl": "https://storage.example.com/cleaned.jpg",
  "prompt": "Modern minimalist living room with neutral tones...",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "imageUrl": "https://storage.example.com/generated.jpg",
    "generationTime": 45.2
  },
  "usage": {
    "costUsd": 0.15
  }
}
```

##### `quickAnalysis`

Lightweight room analysis.

**Request:**
```json
{
  "action": "quickAnalysis",
  "imageUrl": "https://storage.example.com/room.jpg",
  "projectId": "uuid",
  "roomId": "uuid"
}
```

**Response:**
```json
{
  "result": {
    "room_type": "living_room",
    "approximate_size": "medium",
    "natural_light": "high",
    "current_style": "traditional"
  },
  "usage": { ... }
}
```

---

### 4. Process Room Phase (`/functions/v1/process-room-phase`)

Job queue processor for async operations.

##### `submit`

Submit a single job.

**Request:**
```json
{
  "action": "submit",
  "jobType": "analysis",
  "projectId": "uuid",
  "roomId": "uuid",
  "payload": {
    "imageUrl": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "jobId": "uuid"
}
```

##### `submitBulk`

Submit jobs for all rooms.

**Request:**
```json
{
  "action": "submitBulk",
  "jobType": "cleaning",
  "projectId": "uuid"
}
```

##### `process`

Claim and process next job (internal).

##### `status`

Get job status.

**Request:**
```json
{
  "action": "status",
  "jobId": "uuid"
}
```

**Response:**
```json
{
  "status": "completed",
  "result": { ... },
  "completedAt": "2024-01-15T10:30:00Z"
}
```

##### `retry`

Retry failed job.

**Request:**
```json
{
  "action": "retry",
  "jobId": "uuid"
}
```

##### `cancel`

Cancel pending job.

**Request:**
```json
{
  "action": "cancel",
  "jobId": "uuid"
}
```

---

### 5. Generate Budget (`/functions/v1/generate-budget`)

Generate BOQ from renders.

**Request:**
```json
{
  "projectId": "uuid",
  "city": "Mumbai"
}
```

**Response:**
```json
{
  "success": true,
  "itemCount": 45,
  "totalValue": 450000
}
```

---

## Error Codes

| Code | Meaning | Resolution |
|------|---------|------------|
| 400 | Bad Request | Check request format |
| 401 | Unauthorized | Verify auth token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Contact support |
| 503 | Service Unavailable | Retry later |

### Error Response Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Vision AI | 60 req | 1 minute |
| Image Processing | 30 req | 1 minute |
| Generate AI | 20 req | 1 minute |
| Process Phase | 100 req | 1 minute |
| Generate Budget | 10 req | 1 minute |

### Rate Limit Headers

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1673784000
```

---

## Webhooks (Future)

Coming soon: webhooks for job completion events.

---

## SDK Usage

### TypeScript Client

```typescript
import { visionService } from '@/services/api/visionService';
import { imageProcessingService } from '@/services/api/imageProcessingService';
import { generateService } from '@/services/api/generateService';

// Analyze room
const analysis = await visionService.analyzeRoom(imageUrl, projectId, roomId);

// Clean room
const cleaned = await imageProcessingService.cleanRoomWithRetry(
  imageUrl, mask, projectId, roomId
);

// Generate render
const render = await generateService.generateRenderWithRetry(
  cleanedUrl, prompt, projectId, roomId
);
```

---

## API Logging

All API calls are logged to `api_logs` table:

```sql
SELECT * FROM api_logs 
WHERE project_id = 'uuid'
ORDER BY created_at DESC;
```

Fields logged:
- service, endpoint
- input/output tokens
- cost_usd
- latency_ms
- status, error_message
