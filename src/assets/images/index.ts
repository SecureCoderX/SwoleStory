// This creates a type-safe way to reference our images
export const images = {
    logo: require('./logo.png'),
  } as const;

  // TypeScript type for our images object
  export type ImageAssets = typeof images;
