export const colors = {
    // Primary Colors
    coral: '#FF6B6B',
    coralLight: '#FF8E8E',
    coralDark: '#E65252',
  
    // Background Colors
    background: '#1A1A1A',
    surface: '#2C2C2C',
    surfaceLight: '#3D3D3D',
  
    // Text Colors
    textPrimary: '#FAFAFA',
    textSecondary: '#B3B3B3',
    textDisabled: '#666666',
  
    // Semantic Colors
    success: '#4CAF50',
    error: '#EF5350',
    warning: '#FFB74D',
    info: '#42A5F5',
  
    // Gradient Colors
    gradientStart: '#FF6B6B',
    gradientEnd: '#FF8E8E'
  } as const;
  
  export type AppColors = typeof colors;