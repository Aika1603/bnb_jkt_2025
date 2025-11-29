import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { appearance, updateAppearance } = useAppearance();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            if (appearance === 'dark') {
                setIsDark(true);
            } else if (appearance === 'light') {
                setIsDark(false);
            } else {
                // system mode
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDark(prefersDark);
            }
        };

        checkDarkMode();

        if (appearance === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                setIsDark(mediaQuery.matches);
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [appearance]);

    const toggleTheme = () => {
        if (isDark) {
            updateAppearance('light');
        } else {
            updateAppearance('dark');
        }
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <div className="mb-2 flex items-center justify-start px-2">
                <Button
                    variant={isDark ? 'outline' : 'ghost'}
                    size="sm"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDark ? (
                        <>
                            <Sun className="h-4 w-4 text-yellow-400" />
                            <span className="font-medium text-sm">Light&nbsp;Mode</span>
                        </>
                    ) : (
                        <>
                            <Moon className="h-4 w-4 text-blue-400" />
                            <span className="font-medium text-sm">Dark&nbsp;Mode</span>
                        </>
                    )}
                </Button>
            </div>
            <SidebarGroupLabel>Powered by Gemini AI</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(
                                resolveUrl(item.href),
                            )}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
