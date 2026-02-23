
import { ReactNode } from "react";

export type ViewState = 'landing' | 'login' | 'signup' | 'dashboard' | 'forgot-password' | 'reset-password';

export interface NavigationProps {
  onNavigate: (view: ViewState) => void;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  annualTotal: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface SocialProfile {
  id: string;
  network: 'Instagram' | 'TikTok' | 'Facebook' | 'LinkedIn' | 'X' | 'YouTube' | 'Kwai' | 'Reddit';
  displayName: string;
  username: string;
  status: 'active' | 'expired' | 'error';
}

export interface ScheduledPost {
    id: string;
    title: string;
    networks: string[];
    date: string;
    time: string;
    status: 'scheduled' | 'published';
    imageUrl?: string;
    mediaType?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
