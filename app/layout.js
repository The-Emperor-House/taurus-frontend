import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'My Website',
  description: 'Created with Next.js 15',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-100 overflow-x-hidden font-prompt">
        <Navbar />
          {children}
      </body>
    </html>
  )
}