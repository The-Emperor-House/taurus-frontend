import { AuthProvider } from './context/AuthContext';
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
};

const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${prompt.className}`}>
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
