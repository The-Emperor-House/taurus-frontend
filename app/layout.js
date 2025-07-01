import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: 'My Website',
  description: 'Created with Next.js 15',
  icons: {
    icon: '/favicon.ico', // Add your favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth"> {/* Added smooth scrolling */}
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* Viewport meta */}
      </head>
      <body className="min-h-screen bg-gray-100 overflow-x-hidden font-prompt flex flex-col">
        <Navbar />
        <main className="flex-grow"> {/* Wrapped children in main for semantic HTML */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}