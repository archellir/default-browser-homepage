export interface Link {
  name: string;
  url: string;
  description?: string;
}

export enum LinkSection {
  PERSONAL = 'Personal',
  TOOLS = 'Tools',
  BUSINESS = 'Business',
  CLOUD = 'Cloud Providers',
  FUN = 'Fun'
} 