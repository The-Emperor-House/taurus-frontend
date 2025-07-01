import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Prompt } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'My Website',
  description: 'Created with Next.js 15',
  icons: {
    icon: '/logo.webp',
  },
}

const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${prompt.className}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-100 overflow-x-hidden font-prompt flex flex-col">
        <Navbar />
        <main className="flex-grow h-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
