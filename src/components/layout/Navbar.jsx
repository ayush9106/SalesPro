import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Package,
  AlertTriangle,
  CreditCard,
  UserPlus,
  Search,
} from 'lucide-react'
import { notifications } from '../../data/notifications'
import { formatRelativeTime } from '../../utils/format'
import Avatar from '../ui/Avatar'
import { cn } from '../../utils/cn'

const typeIcons = {
  order: Package,
  stock: AlertTriangle,
  payment: CreditCard,
  customer: UserPlus,
}

const typeStyles = {
  order: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
  stock: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  payment:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  customer: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
}

const pageTitles = {
  '/': 'Dashboard',
  '/orders': 'Orders',
  '/products': 'Products',
  '/customers': 'Customers',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

export default function Navbar({ onMenuClick, isDark, onToggleTheme, pathname }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useClickOutside(notifRef, () => setNotifOpen(false))
  useClickOutside(profileRef, () => setProfileOpen(false))

  const unread = notifications.filter((n) => !n.read).length
  const title = pageTitles[pathname] || 'Dashboard'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-900/80">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <h1 className="hidden text-lg font-semibold text-gray-900 sm:block dark:text-gray-100">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        <div className="relative hidden md:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="w-40 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:w-56 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 lg:w-48 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            isDark ? 'Switch to light mode' : 'Switch to dark mode'
          }
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          {isDark ? (
            <Sun className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((o) => !o)
              setProfileOpen(false)
            }}
            aria-label={`Notifications ${unread > 0 ? `(${unread} unread)` : ''}`}
            aria-expanded={notifOpen}
            className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Notifications
                </p>
                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                  {unread} new
                </span>
              </div>
              <ul className="max-h-80 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
                {notifications.map((n) => {
                  const Icon = typeIcons[n.type]
                  return (
                    <li
                      key={n.id}
                      className={cn(
                        'flex gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800',
                        !n.read && 'bg-brand-50/40 dark:bg-brand-500/5'
                      )}
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          typeStyles[n.type]
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                          {n.title}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {n.message}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                          {formatRelativeTime(n.time)}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen((o) => !o)
              setNotifOpen(false)
            }}
            aria-label="Open user menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-2.5 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Avatar name="Alex Morgan" size="sm" />
            <span className="hidden text-left md:block">
              <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                Alex Morgan
              </span>
              <span className="block text-xs text-gray-400 dark:text-gray-500">
                Admin
              </span>
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
              <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Alex Morgan
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  alex.morgan@example.com
                </p>
              </div>
              <ul className="p-1.5 text-sm">
                <li>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    Profile
                  </button>
                </li>
                <li>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                    Settings
                  </button>
                </li>
                <li>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10">
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
