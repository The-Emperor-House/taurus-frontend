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
      <body className="min-h-screen bg-[#404040] overflow-x-hidden font-prompt flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow h-full pt-20 md:pt-28">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
