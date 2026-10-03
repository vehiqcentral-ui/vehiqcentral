'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Bell, Search, Menu, ChevronDown, User, Settings, LogOut, HelpCircle } from 'lucide-react';

export function TopBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const userName = session?.user?.name ?? 'Usuario';
  const userCompany = session?.user?.company ?? '';
  const userRole = session?.user?.role === 'ADMIN' ? 'Administrador' : 'Usuario';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-brand-border flex items-center justify-between px-6">
      {/* Mobile menu button */}
      <button className="lg:hidden p-2 text-brand-muted hover:text-brand-indigo">
        <Menu size={24} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
          />
          <input
            type="text"
            placeholder="Buscar matrícula, VIN, marca o modelo..."
            className="input pl-10 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-brand-muted hover:text-brand-indigo transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 bg-brand-indigo rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-brand-navy leading-tight">
                {userName}
              </p>
              <p className="text-xs text-brand-muted leading-tight">
                {userCompany ? `${userCompany} · ` : ''}{userRole}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`hidden sm:block text-brand-muted transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-brand-border py-1 z-50">
              {/* User info (mobile) */}
              <div className="sm:hidden px-4 py-3 border-b border-brand-border">
                <p className="text-sm font-semibold text-brand-navy">{userName}</p>
                <p className="text-xs text-brand-muted">{userCompany}</p>
              </div>

              <div className="py-1">
                <a
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-body hover:bg-gray-50 transition-colors"
                >
                  <User size={16} className="text-brand-muted" />
                  Mi perfil
                </a>
                <a
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-body hover:bg-gray-50 transition-colors"
                >
                  <Settings size={16} className="text-brand-muted" />
                  Configuración
                </a>
                <a
                  href="/help"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-body hover:bg-gray-50 transition-colors"
                >
                  <HelpCircle size={16} className="text-brand-muted" />
                  Centro de ayuda
                </a>
              </div>

              <div className="border-t border-brand-border py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
