// Application constants
export const APP_NAME = 'ReWear';
export const APP_DESCRIPTION = 'Community Clothing Exchange';

// API endpoints (for future use)
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Feature categories
export const FEATURE_CATEGORIES = {
  UPLOAD: 'upload',
  SWAP: 'swap',
  POINTS: 'points'
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

// Item status
export const ITEM_STATUS = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  SWAPPED: 'swapped',
  REMOVED: 'removed'
}; 