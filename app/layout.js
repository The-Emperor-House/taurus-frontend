import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'My Website',
  description: 'Created with Next.js 15',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 overflow-x-hidden">
        <Navbar />
          {children}
      </body>
    </html>
  )
}