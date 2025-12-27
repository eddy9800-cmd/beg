```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Belgrade Tram 2L Guide',
  description: 'Tourist route from Hilton Hotel - February 2, 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      {children}
    
  )
}
```
