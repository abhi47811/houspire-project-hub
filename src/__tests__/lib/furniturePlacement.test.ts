import { describe, it, expect } from 'vitest';
import {
  getRoomFurniturePlacementRules,
  calculateFurnitureLayout,
  validatePlacement,
  getTrafficFlowPaths,
  type FurniturePlacementRule,
  type RoomLayout
} from '../../../lib/furniturePlacement';

describe('Furniture Placement Rules', () => {
  describe('getRoomFurniturePlacementRules', () => {
    it('should return rules for living room', () => {
      const rules = getRoomFurniturePlacementRules('living_room');

      expect(rules).toBeDefined();
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some(r => r.furnitureType.includes('sofa'))).toBe(true);
    });

    it('should return rules for all 6 room types', () => {
      const roomTypes = [
        'living_room',
        'bedroom',
        'kitchen',
        'dining',
        'bathroom',
        'study'
      ];

      roomTypes.forEach(roomType => {
        const rules = getRoomFurniturePlacementRules(roomType);
        expect(rules).toBeDefined();
        expect(Array.isArray(rules)).toBe(true);
        expect(rules.length).toBeGreaterThan(0);
      });
    });

    it('should include clearance requirements', () => {
      const rules = getRoomFurniturePlacementRules('living_room');

      rules.forEach(rule => {
        expect(rule).toHaveProperty('minClearance');
        expect(typeof rule.minClearance).toBe('number');
        expect(rule.minClearance).toBeGreaterThan(0);
      });
    });

    it('should specify placement relative to room features', () => {
      const rules = getRoomFurniturePlacementRules('living_room');

      expect(rules.some(r => r.relativePosition === 'against_wall')).toBe(true);
      expect(rules.some(r => r.relativePosition === 'center')).toBe(true);
    });

    it('should handle invalid room type gracefully', () => {
      const rules = getRoomFurniturePlacementRules('invalid_room' as any);

      expect(rules).toBeDefined();
      expect(Array.isArray(rules)).toBe(true);
    });
  });

  describe('calculateFurnitureLayout', () => {
    it('should generate layout for standard living room', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 450,
          width: 350,
          height: 270
        },
        doors: [
          { position: 'north', width: 90 }
        ],
        windows: [
          { position: 'east', width: 150, height: 120 }
        ],
        furniture: [
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } },
          { type: 'coffee_table', dimensions: { length: 120, width: 60, height: 45 } },
          { type: 'tv_unit', dimensions: { length: 180, width: 45, height: 60 } }
        ]
      };

      const layout = calculateFurnitureLayout(roomLayout);

      expect(layout).toBeDefined();
      expect(layout.placements.length).toBe(roomLayout.furniture.length);
      expect(layout.isValid).toBe(true);
    });

    it('should respect minimum clearances', () => {
      const roomLayout: RoomLayout = {
        roomType: 'bedroom',
        dimensions: {
          length: 400,
          width: 350,
          height: 270
        },
        doors: [{ position: 'west', width: 90 }],
        windows: [{ position: 'north', width: 120, height: 120 }],
        furniture: [
          { type: 'bed', dimensions: { length: 200, width: 180, height: 50 } },
          { type: 'wardrobe', dimensions: { length: 240, width: 60, height: 210 } }
        ]
      };

      const layout = calculateFurnitureLayout(roomLayout);

      layout.placements.forEach(placement => {
        expect(placement.clearances.front).toBeGreaterThanOrEqual(0);
        expect(placement.clearances.back).toBeGreaterThanOrEqual(0);
        expect(placement.clearances.left).toBeGreaterThanOrEqual(0);
        expect(placement.clearances.right).toBeGreaterThanOrEqual(0);
      });
    });

    it('should maintain traffic flow paths', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 500,
          width: 400,
          height: 270
        },
        doors: [
          { position: 'north', width: 90 },
          { position: 'south', width: 90 }
        ],
        windows: [],
        furniture: [
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } }
        ]
      };

      const layout = calculateFurnitureLayout(roomLayout);

      expect(layout.trafficFlowPaths).toBeDefined();
      expect(layout.trafficFlowPaths.length).toBeGreaterThan(0);
    });

    it('should create focal points appropriately', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 450,
          width: 350,
          height: 270
        },
        doors: [{ position: 'north', width: 90 }],
        windows: [{ position: 'east', width: 150, height: 120 }],
        furniture: [
          { type: 'tv_unit', dimensions: { length: 180, width: 45, height: 60 } },
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } }
        ]
      };

      const layout = calculateFurnitureLayout(roomLayout);

      expect(layout.focalPoints).toBeDefined();
      expect(layout.focalPoints.length).toBeGreaterThan(0);
    });

    it('should handle small rooms appropriately', () => {
      const smallRoom: RoomLayout = {
        roomType: 'bedroom',
        dimensions: {
          length: 300,
          width: 280,
          height: 270
        },
        doors: [{ position: 'west', width: 80 }],
        windows: [{ position: 'north', width: 100, height: 100 }],
        furniture: [
          { type: 'bed', dimensions: { length: 190, width: 150, height: 50 } }
        ]
      };

      const layout = calculateFurnitureLayout(smallRoom);

      expect(layout.isValid).toBe(true);
      expect(layout.placements.length).toBe(1);
    });

    it('should detect overcrowding', () => {
      const overcrowdedRoom: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 300,
          width: 250,
          height: 270
        },
        doors: [{ position: 'north', width: 90 }],
        windows: [{ position: 'east', width: 120, height: 120 }],
        furniture: [
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } },
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } },
          { type: 'coffee_table', dimensions: { length: 120, width: 60, height: 45 } },
          { type: 'tv_unit', dimensions: { length: 180, width: 45, height: 60 } },
          { type: 'bookshelf', dimensions: { length: 120, width: 30, height: 180 } }
        ]
      };

      const layout = calculateFurnitureLayout(overcrowdedRoom);

      expect(layout.warnings).toBeDefined();
      expect(layout.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('validatePlacement', () => {
    it('should validate correct furniture placement', () => {
      const placement = {
        furnitureType: 'sofa',
        position: { x: 100, y: 100 },
        dimensions: { length: 210, width: 90, height: 85 },
        clearances: { front: 90, back: 30, left: 60, right: 60 }
      };

      const roomDimensions = {
        length: 450,
        width: 350,
        height: 270
      };

      const isValid = validatePlacement(placement, roomDimensions, []);

      expect(isValid).toBe(true);
    });

    it('should detect furniture exceeding room boundaries', () => {
      const placement = {
        furnitureType: 'sofa',
        position: { x: 400, y: 300 },
        dimensions: { length: 210, width: 90, height: 85 },
        clearances: { front: 90, back: 30, left: 60, right: 60 }
      };

      const roomDimensions = {
        length: 450,
        width: 350,
        height: 270
      };

      const isValid = validatePlacement(placement, roomDimensions, []);

      expect(isValid).toBe(false);
    });

    it('should detect furniture collisions', () => {
      const placement1 = {
        furnitureType: 'sofa',
        position: { x: 100, y: 100 },
        dimensions: { length: 210, width: 90, height: 85 },
        clearances: { front: 90, back: 30, left: 60, right: 60 }
      };

      const placement2 = {
        furnitureType: 'coffee_table',
        position: { x: 120, y: 120 },
        dimensions: { length: 120, width: 60, height: 45 },
        clearances: { front: 60, back: 60, left: 60, right: 60 }
      };

      const roomDimensions = {
        length: 450,
        width: 350,
        height: 270
      };

      const isValid = validatePlacement(placement2, roomDimensions, [placement1]);

      expect(isValid).toBe(false);
    });

    it('should validate minimum clearances', () => {
      const placement = {
        furnitureType: 'sofa',
        position: { x: 10, y: 10 },
        dimensions: { length: 210, width: 90, height: 85 },
        clearances: { front: 30, back: 10, left: 10, right: 10 }
      };

      const roomDimensions = {
        length: 450,
        width: 350,
        height: 270
      };

      const isValid = validatePlacement(placement, roomDimensions, [], { minWallClearance: 20 });

      expect(isValid).toBe(false);
    });
  });

  describe('getTrafficFlowPaths', () => {
    it('should generate traffic paths for room with multiple doors', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 450,
          width: 350,
          height: 270
        },
        doors: [
          { position: 'north', width: 90 },
          { position: 'south', width: 90 }
        ],
        windows: [],
        furniture: []
      };

      const paths = getTrafficFlowPaths(roomLayout);

      expect(paths).toBeDefined();
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should ensure minimum path width', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 450,
          width: 350,
          height: 270
        },
        doors: [
          { position: 'north', width: 90 },
          { position: 'south', width: 90 }
        ],
        windows: [],
        furniture: [
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } }
        ]
      };

      const paths = getTrafficFlowPaths(roomLayout);

      paths.forEach(path => {
        expect(path.width).toBeGreaterThanOrEqual(75); // Minimum traffic path width
      });
    });

    it('should avoid furniture obstacles', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 450,
          width: 350,
          height: 270
        },
        doors: [
          { position: 'north', width: 90 },
          { position: 'south', width: 90 }
        ],
        windows: [],
        furniture: [
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } },
          { type: 'coffee_table', dimensions: { length: 120, width: 60, height: 45 } }
        ]
      };

      const paths = getTrafficFlowPaths(roomLayout);

      expect(paths).toBeDefined();
      expect(paths.every(path => path.isBlocked === false)).toBe(true);
    });
  });

  describe('Ergonomic Guidelines', () => {
    it('should enforce ergonomic spacing for dining furniture', () => {
      const rules = getRoomFurniturePlacementRules('dining');
      const diningChairRule = rules.find(r => r.furnitureType.includes('chair'));

      expect(diningChairRule).toBeDefined();
      expect(diningChairRule?.minClearance).toBeGreaterThanOrEqual(75); // Pull-out space
    });

    it('should enforce TV viewing distance', () => {
      const rules = getRoomFurniturePlacementRules('living_room');
      const tvRule = rules.find(r => r.furnitureType.includes('tv'));

      expect(tvRule).toBeDefined();
      expect(tvRule?.minClearance).toBeGreaterThanOrEqual(180); // Viewing distance
    });

    it('should enforce kitchen work triangle', () => {
      const rules = getRoomFurniturePlacementRules('kitchen');

      const workZones = rules.filter(r => 
        r.furnitureType.includes('counter') || 
        r.furnitureType.includes('sink') || 
        r.furnitureType.includes('stove')
      );

      expect(workZones.length).toBeGreaterThan(0);
    });
  });

  describe('Code Compliance', () => {
    it('should maintain minimum doorway clearance', () => {
      const rules = getRoomFurniturePlacementRules('living_room');

      rules.forEach(rule => {
        if (rule.relativePosition === 'near_door') {
          expect(rule.minClearance).toBeGreaterThanOrEqual(90);
        }
      });
    });

    it('should ensure accessibility paths', () => {
      const roomLayout: RoomLayout = {
        roomType: 'living_room',
        dimensions: {
          length: 450,
          width: 350,
          height: 270
        },
        doors: [{ position: 'north', width: 90 }],
        windows: [],
        furniture: [
          { type: 'sofa', dimensions: { length: 210, width: 90, height: 85 } }
        ]
      };

      const layout = calculateFurnitureLayout(roomLayout);

      expect(layout.trafficFlowPaths.some(path => path.width >= 90)).toBe(true);
    });
  });
});
