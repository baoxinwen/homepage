import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  description?: string;
  primary?: boolean;
}
