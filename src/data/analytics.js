export const kpis = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: 128430,
    change: 12.5,
    comparison: 'vs last month',
    icon: 'dollar',
    accent: 'brand',
  },
  {
    id: 'orders',
    label: 'Orders',
    value: 2847,
    change: 8.2,
    comparison: 'vs last month',
    icon: 'cart',
    accent: 'emerald',
  },
  {
    id: 'customers',
    label: 'New Customers',
    value: 1268,
    change: -3.1,
    comparison: 'vs last month',
    icon: 'users',
    accent: 'amber',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: 3.42,
    change: 1.9,
    comparison: 'vs last month',
    icon: 'trending',
    accent: 'rose',
  },
]

export const revenueByRange = {
  '7d': [
    { label: 'Mon', date: 'Aug 25', revenue: 12800 },
    { label: 'Tue', date: 'Aug 26', revenue: 15400 },
    { label: 'Wed', date: 'Aug 27', revenue: 11200 },
    { label: 'Thu', date: 'Aug 28', revenue: 18900 },
    { label: 'Fri', date: 'Aug 29', revenue: 22100 },
    { label: 'Sat', date: 'Aug 30', revenue: 17600 },
    { label: 'Sun', date: 'Aug 31', revenue: 15800 },
  ],
  '30d': [
    { label: 'W1', date: 'Aug 1-7', revenue: 68200 },
    { label: 'W2', date: 'Aug 8-14', revenue: 74100 },
    { label: 'W3', date: 'Aug 15-21', revenue: 71800 },
    { label: 'W4', date: 'Aug 22-31', revenue: 80400 },
  ],
  '6m': [
    { label: 'Apr', date: 'April', revenue: 84200 },
    { label: 'May', date: 'May', revenue: 91200 },
    { label: 'Jun', date: 'June', revenue: 88900 },
    { label: 'Jul', date: 'July', revenue: 96700 },
    { label: 'Aug', date: 'August', revenue: 102400 },
    { label: 'Sep', date: 'September', revenue: 98400 },
  ],
  '1y': [
    { label: 'Q1', date: 'Q1', revenue: 254000 },
    { label: 'Q2', date: 'Q2', revenue: 278000 },
    { label: 'Q3', date: 'Q3', revenue: 291000 },
    { label: 'Q4', date: 'Q4', revenue: 312000 },
  ],
}

export const monthlySales = [
  { month: 'Oct', sales: 4120, target: 3800 },
  { month: 'Nov', sales: 4460, target: 4000 },
  { month: 'Dec', sales: 5080, target: 4500 },
  { month: 'Jan', sales: 4740, target: 4600 },
  { month: 'Feb', sales: 4390, target: 4600 },
  { month: 'Mar', sales: 5210, target: 4800 },
  { month: 'Apr', sales: 5480, target: 5000 },
  { month: 'May', sales: 5720, target: 5200 },
  { month: 'Jun', sales: 5360, target: 5400 },
  { month: 'Jul', sales: 5890, target: 5600 },
  { month: 'Aug', sales: 6120, target: 5800 },
  { month: 'Sep', sales: 6340, target: 6000 },
]

export const customerGrowth = [
  { month: 'Apr', customers: 8420 },
  { month: 'May', customers: 8760 },
  { month: 'Jun', customers: 9210 },
  { month: 'Jul', customers: 9980 },
  { month: 'Aug', customers: 10540 },
  { month: 'Sep', customers: 11320 },
]

export const conversionByPeriod = [
  { month: 'Apr', conversion: 2.8 },
  { month: 'May', conversion: 3.1 },
  { month: 'Jun', conversion: 2.9 },
  { month: 'Jul', conversion: 3.4 },
  { month: 'Aug', conversion: 3.6 },
  { month: 'Sep', conversion: 3.42 },
]

export const trafficSources = [
  { source: 'Organic Search', value: 42.5, color: '#3f68ec', visits: 48210 },
  { source: 'Direct', value: 26.8, color: '#10b981', visits: 30420 },
  { source: 'Referral', value: 15.4, color: '#f59e0b', visits: 17460 },
  { source: 'Social Media', value: 9.7, color: '#f43f5e', visits: 11020 },
  { source: 'Email', value: 5.6, color: '#8b5cf6', visits: 6340 },
]
