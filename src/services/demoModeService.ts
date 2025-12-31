// Demo Mode Service - Provides mock AI responses for testing without API keys

export const DEMO_MODE = false; // Set to true to enable demo mode without API keys

export async function mockGenerateRender(roomData: {
  doors?: number;
  windows?: number;
  roomType?: string;
  style?: string;
}) {
  console.log('🎭 DEMO MODE: Using mock render generation');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock render URL (using a placeholder image)
  return {
    success: true,
    renderUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    message: 'Mock render generated (Demo Mode)',
    preservationData: {
      doors: roomData.doors || 1,
      windows: roomData.windows || 1,
      doorsPreserved: true,
      windowsPreserved: true,
    },
  };
}

export async function mockAnalyzeRoom(imageUrl: string) {
  console.log('🎭 DEMO MODE: Using mock room analysis for', imageUrl);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    analysis: {
      doors: 1,
      windows: 2,
      doorPositions: [{ wall: 'left', position: 'center', width: 'standard' }],
      windowPositions: [
        { wall: 'front', position: 'left', size: 'large' },
        { wall: 'front', position: 'right', size: 'large' },
      ],
      dimensions: {
        estimatedLength: 12,
        estimatedWidth: 10,
        estimatedHeight: 9,
        unit: 'feet',
        confidence: 0.75,
      },
      lighting: {
        naturalLight: 'high',
        artificialLight: 'medium',
        lightSources: 3,
      },
      suggestions: [
        'Good natural light from 2 windows',
        'Single door provides good access',
        'Room dimensions suitable for living space',
      ],
    },
  };
}

export async function mockCleanImage(imageUrl: string) {
  console.log('🎭 DEMO MODE: Using mock image cleaning for', imageUrl);
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return same image or a cleaned version placeholder
  return {
    success: true,
    cleanedUrl: imageUrl,
    message: 'Mock cleaning complete (Demo Mode)',
  };
}

export async function mockGenerateRecommendations(roomType: string, style?: string) {
  console.log('🎭 DEMO MODE: Using mock recommendations for', roomType);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    recommendations: [
      {
        style: style || 'Modern Minimalist',
        confidence: 0.85,
        description: 'Clean lines with neutral tones work well for this space',
      },
      {
        style: 'Contemporary Indian',
        confidence: 0.75,
        description: 'Blend of traditional elements with modern functionality',
      },
      {
        style: 'Scandinavian',
        confidence: 0.70,
        description: 'Light woods and cozy textiles create a warm atmosphere',
      },
    ],
  };
}
