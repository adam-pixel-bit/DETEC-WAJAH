export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string;
  detection_sensitivity: 'low' | 'medium' | 'high';
  show_landmarks: boolean;
  show_bounding_box: boolean;
  mirrored_camera: boolean;
}
