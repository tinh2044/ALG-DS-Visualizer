import { AVLOperationType } from '@/types/avlTree';

export const AVL_TREE_CONFIG = {
  // Tree visualization settings
  tree: {
    orientation: 'vertical' as const,
    translate: { x: 400, y: 50 },
    pathFunc: 'diagonal' as const,
    separation: { siblings: 1.5, nonSiblings: 2.5 },
    nodeSize: { x: 60, y: 60 },
    transitionDuration: 500,
  },

  // Node styles
  node: {
    radius: 20,
    colors: {
      default: '#4B5563',
      highlight: '#3B82F6',
      active: '#10B981',
      error: '#EF4444',
      success: '#059669',
      rotation: '#8B5CF6', // New color for rotation operations
      balanced: '#10B981', // Balanced node
      unbalanced: '#EF4444', // Unbalanced node
    },
    stroke: {
      width: 2,
      color: '#1F2937',
    },
    text: {
      color: '#FFFFFF',
      size: 14,
      weight: 'bold',
    },
  },

  // Edge styles
  edge: {
    stroke: {
      width: 2,
      color: '#6B7280',
    },
    colors: {
      default: '#6B7280',
      highlight: '#3B82F6',
      active: '#10B981',
      rotation: '#8B5CF6', 
      error: '#EF4444',
      success: '#059669',
    },
  },

  // Animation settings
  animation: {
    duration: 500,
    easing: 'ease-in-out',
    rotationDuration: 800, // Longer duration for rotation animations
  },

  // Operation colors
  operationColors: {
    INSERT: '#10B981',
    COMPARE: '#3B82F6',
    FOUND: '#059669',
    NOT_FOUND: '#EF4444',
    DELETE: '#EF4444',
    VISIT: '#8B5CF6',
    DUPLICATE: '#F59E0B',
    NODE_FOUND_FOR_DELETE: '#EF4444',
    UPDATE_HEIGHT: '#10B981',
    CHECK_BALANCE: '#3B82F6',
    ROTATE: '#8B5CF6',
  } as Record<AVLOperationType, string>,

  // Balance factor colors
  balanceFactorColors: {
    balanced: '#10B981', // -1, 0, 1
    unbalanced: '#EF4444', // < -1 or > 1
  },

  // Rotation settings
  rotation: {
    animationDuration: 800,
    leftRight: {
      color: '#8B5CF6',
      description: 'Left-Right Rotation',
    },
    rightLeft: {
      color: '#8B5CF6',
      description: 'Right-Left Rotation',
    },
    left: {
      color: '#8B5CF6',
      description: 'Left Rotation',
    },
    right: {
      color: '#8B5CF6',
      description: 'Right Rotation',
    },
  },

  // Control panel settings
  controls: {
    input: {
      min: 0,
      max: 100,
      step: 1,
    },
    speed: {
      min: 0.5,
      max: 5,
      step: 0.1,
      default: 1,
    },
  },

  // Traversal settings
  traversal: {
    delay: 1000,
    highlightDuration: 500,
  },

  // Responsive settings
  responsive: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    nodeSize: {
      sm: { x: 40, y: 40 },
      md: { x: 50, y: 50 },
      lg: { x: 60, y: 60 },
      xl: { x: 70, y: 70 },
    },
    fontSize: {
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
    },
  },
}; 