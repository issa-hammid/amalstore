
import {Tajawal , Cairo} from 'next/font/google';
import "./globals.css";
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer"
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-tajawal',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cairo',
});

export const metadata = {
  title: "متجر أمل - هدايا وفناجين وملابس وديكور منزلي | غزة فلسطين",
  description: "متجر أمل متجر في غزة ☕ متخصص في هدايا، فناجين، ملابس، شنط، ديكور منزلي وكوزماتكس. توصيل لجميع أنحاء غزة. تواصل عبر الواتساب: +972568803133",
  keywords: "هدايا غزة, فناجين, ملابس, شنط, ديكور منزلي, كوزماتكس, متجر هدايا غزة, تسوق غزة",
  authors: [{ name: "أمل متجر" }],
  creator: "أمل متجر",
  publisher: "أمل متجر",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'), // غير الرابط لرابط متجرك
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "متجر أمل - هدايا وفناجين وملابس وديكور منزلي | غزة فلسطين",
    description: "متجر أمل متجر في غزة ☕ متخصص في هدايا، فناجين، ملابس، شنط، ديكور منزلي وكوزماتكس",
    url: 'https://yourdomain.com',
    siteName: 'أمل متجر',
    images: [
      {
        url: '/og-image.jpg', // ضع صورة جميلة للمتجر
        width: 1200,
        height: 630,
        alt: 'أمل متجر - متجر هدايا وفناجين',
      },
    ],
    locale: 'ar_PS',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "أمل متجر - هدايا وفناجين وملابس وديكور منزلي",
    description: "متجر أمل متجر في غزة ☕ متخصص في هدايا، فناجين، ملابس، شنط، ديكور منزلي وكوزماتكس",
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'أمل ستور',
  description: 'متجر متخصص في هدايا، فناجين، ملابس، شنط، ديكور منزلي وكوزماتكس في غزة فلسطين',
  url: 'https://yourdomain.com',
  telephone: '+972568803133',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'غزة',
    addressCountry: 'PS',
    addressRegion: 'غزة'
  },
  openingHours: 'Mo-Su 09:00-22:00',
  sameAs: [
    'https://www.instagram.com/amal.store163',
    'https://www.facebook.com/amal.doha.7777'
  ],
  priceRange: "5 شيكل",
  areaServed: "غزة فلسطين"
}
export default function RootLayout({ children }) {
  
  return (
     <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body className="font-cairo">
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <CartProvider>
          {children} 
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}