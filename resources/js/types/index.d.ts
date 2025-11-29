import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PotentialDanger {
    id: number;
    hiarc_id: number;
    description: string | null;
    factors: string | null;
    impact: string | null;
    current_controls: string | null;
    risk_score: number | null;
    opportunity_for_improvement: string | null;
    created_at: string;
    updated_at: string;
}

export interface Hiarc {
    id: number;
    code: string | null;
    activity: string | null;
    work_unit: string | null;
    location: string | null;
    recommendation: string | null;
    score: number | null;
    created_at: string;
    updated_at: string;
    potential_dangers?: PotentialDanger[];
}
