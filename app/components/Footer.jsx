"use client";
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  MessageCircle,
  Send,
  Heart,
  ShoppingBag,
  Gift,
  Shirt,
  Sparkles,
 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Wave Decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-12" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-rose-500"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              
              <h3 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
                Amal Store
              </h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              متجرك الموثوق لأحدث المنتجات والعروض المميزة. نقدم لكم أفضل المنتجات بأفضل الأسعار مع ضمان الجودة والخدمة المتميزة.
            </p>
            <div className="flex space-x-3">
              <Link href="https://www.facebook.com/amal.doha.7777/" className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition cursor-pointer">
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link href="https://www.instagram.com/amal.store163?igsh=MW0wYWQ5MGR5MGZtNA%3D%3D" className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition cursor-pointer">
                <Instagram className="w-4 h-4 text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition cursor-pointer">
                <Twitter className="w-4 h-4 text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition cursor-pointer">
                <MessageCircle className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-rose-400 flex items-center">
              <Sparkles className="w-5 h-5 ml-2" />
              روابط سريعة
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  عن المتجر
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-rose-400 flex items-center">
              <Gift className="w-5 h-5 ml-2" />
              التصنيفات
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/gifts" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  الهدايا
                </Link>
              </li>
              <li>
                <Link href="/category/cups" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  الفناجين
                </Link>
              </li>
              <li>
                <Link href="/category/clothes" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  الملابس
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-300 hover:text-amber-400 transition text-sm flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full ml-2 group-hover:scale-150 transition-transform"></span>
                  الإكسسوارات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-rose-400 flex items-center">
              <Phone className="w-5 h-5 ml-2" />
              معلومات الاتصال
            </h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 ml-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">فلسطين - غزة</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-amber-400 ml-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+972568803133</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-amber-400 ml-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@amalstore.com</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h5 className="text-amber-400 font-semibold mb-3 text-sm flex items-center">
                <Send className="w-4 h-4 ml-2" />
                اشترك في النشرة البريدية
              </h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-lg hover:from-rose-600 hover:to-amber-600 transition text-sm font-medium whitespace-nowrap flex items-center justify-center">
                  <Send className="w-4 h-4 ml-2" />
                  اشتراك
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-right flex items-center">
              <Heart className="w-4 h-4 text-rose-400 ml-2" />
              © 2026 Amal Store. جميع الحقوق محفوظة.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition flex items-center">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition flex items-center">
                الشروط والأحكام
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-amber-400 transition flex items-center">
                سياسة الإرجاع
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-amber-400 transition flex items-center">
                الشحن والتوصيل
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link 
          href="https://wa.me/972568803133" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition cursor-pointer animate-bounce"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Link>
      </div>
    </footer>
  );
}