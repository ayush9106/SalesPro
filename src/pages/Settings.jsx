import { useState } from 'react'
import { User, Shield, Bell, Palette, Save } from 'lucide-react'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../utils/cn'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'preferences', label: 'Preferences', icon: Palette },
]

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [toast, setToast] = useState(null)

  const [profileForm, setProfileForm] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@salespro.com',
    phone: '+1 (555) 234-5678',
    company: 'SalesPro Inc.',
    role: 'Admin',
  })
  const [profileErrors, setProfileErrors] = useState({})

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  const [notifSettings, setNotifSettings] = useState({
    emailOrders: true,
    emailStock: true,
    emailMarketing: false,
    pushOrders: true,
    pushStock: false,
    pushMarketing: false,
    weeklyReport: true,
  })

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MMM d, yyyy',
  })

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  function validateProfile() {
    const errors = {}
    if (!profileForm.firstName.trim()) errors.firstName = 'First name is required'
    if (!profileForm.lastName.trim()) errors.lastName = 'Last name is required'
    if (!profileForm.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email))
      errors.email = 'Enter a valid email address'
    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  function saveProfile() {
    if (validateProfile()) showToast('Profile updated successfully')
  }

  function validatePassword() {
    const errors = {}
    if (!passwordForm.currentPassword) errors.currentPassword = 'Current password is required'
    if (!passwordForm.newPassword) errors.newPassword = 'New password is required'
    else if (passwordForm.newPassword.length < 8) errors.newPassword = 'Must be at least 8 characters'
    if (passwordForm.confirmPassword !== passwordForm.newPassword)
      errors.confirmPassword = 'Passwords do not match'
    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  function savePassword() {
    if (validatePassword()) {
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setPasswordErrors({})
      showToast('Password changed successfully')
    }
  }

  function saveNotifications() {
    showToast('Notification preferences saved')
  }

  function savePreferences() {
    showToast('Preferences saved')
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="flex lg:w-56 shrink-0 flex-row overflow-x-auto lg:flex-col" aria-label="Settings tabs">
          <div className="flex gap-1 lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                    activeTab === tab.id
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                  )}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <section className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Update your personal details.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <Avatar name={`${profileForm.firstName} ${profileForm.lastName}`} size="lg" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {profileForm.firstName} {profileForm.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profileForm.role}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="First Name"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                  error={profileErrors.firstName}
                />
                <Input
                  label="Last Name"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                  error={profileErrors.lastName}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  error={profileErrors.email}
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
                <Input
                  label="Company"
                  value={profileForm.company}
                  onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                />
                <Select
                  label="Role"
                  options={[
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Manager', label: 'Manager' },
                    { value: 'Viewer', label: 'Viewer' },
                  ]}
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={saveProfile}>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save Changes
                </Button>
              </div>
            </section>
          )}

          {activeTab === 'account' && (
            <section className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Change Password
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ensure your account stays secure.
              </p>

              <div className="mt-6 max-w-md space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  error={passwordErrors.currentPassword}
                  autoComplete="current-password"
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  error={passwordErrors.newPassword}
                  hint="Must be at least 8 characters"
                  autoComplete="new-password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  error={passwordErrors.confirmPassword}
                  autoComplete="new-password"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={savePassword}>
                  <Shield className="h-4 w-4" aria-hidden="true" />
                  Update Password
                </Button>
              </div>

              <hr className="my-8 border-gray-200 dark:border-gray-800" />

              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Delete Account
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and all associated data.
              </p>
              <div className="mt-4">
                <Button variant="danger">Delete Account</Button>
              </div>
            </section>
          )}

          {activeTab === 'notifications' && (
            <section className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Notification Preferences
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose what notifications you receive.
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Email Notifications
                  </h3>
                  <div className="mt-3 space-y-3">
                    {[
                      { key: 'emailOrders', label: 'New orders' },
                      { key: 'emailStock', label: 'Low stock alerts' },
                      { key: 'emailMarketing', label: 'Marketing updates' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={notifSettings[key]}
                          onChange={(e) =>
                            setNotifSettings({ ...notifSettings, [key]: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Push Notifications
                  </h3>
                  <div className="mt-3 space-y-3">
                    {[
                      { key: 'pushOrders', label: 'New orders' },
                      { key: 'pushStock', label: 'Low stock alerts' },
                      { key: 'pushMarketing', label: 'Marketing updates' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          checked={notifSettings[key]}
                          onChange={(e) =>
                            setNotifSettings({ ...notifSettings, [key]: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Reports
                  </h3>
                  <div className="mt-3">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notifSettings.weeklyReport}
                        onChange={(e) =>
                          setNotifSettings({ ...notifSettings, weeklyReport: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Weekly summary report
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={saveNotifications}>
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  Save Preferences
                </Button>
              </div>
            </section>
          )}

          {activeTab === 'preferences' && (
            <section className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Preferences
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Customize your dashboard experience.
              </p>

              <div className="mt-6 max-w-md space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => theme !== 'light' && toggleTheme()}
                      className={cn(
                        'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
                        theme === 'light'
                          ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-400'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                      )}
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => theme !== 'dark' && toggleTheme()}
                      className={cn(
                        'flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
                        theme === 'dark'
                          ? 'border-brand-500 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-400'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                      )}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                <Select
                  label="Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                  ]}
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                />

                <Select
                  label="Timezone"
                  options={[
                    { value: 'America/New_York', label: 'Eastern Time (ET)' },
                    { value: 'America/Chicago', label: 'Central Time (CT)' },
                    { value: 'America/Denver', label: 'Mountain Time (MT)' },
                    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                    { value: 'Europe/London', label: 'London (GMT)' },
                  ]}
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                />

                <Select
                  label="Currency"
                  options={[
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'EUR', label: 'EUR (\u20ac)' },
                    { value: 'GBP', label: 'GBP (\u00a3)' },
                  ]}
                  value={preferences.currency}
                  onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                />

                <Select
                  label="Date Format"
                  options={[
                    { value: 'MMM d, yyyy', label: 'Sep 2, 2026' },
                    { value: 'd/MM/yyyy', label: '02/09/2026' },
                    { value: 'yyyy-MM-dd', label: '2026-09-02' },
                  ]}
                  value={preferences.dateFormat}
                  onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={savePreferences}>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save Preferences
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
