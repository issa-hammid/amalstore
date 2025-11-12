"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header.jsx';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const { addToCartWithQuantity, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleAddToCart = (product) => {
    addToCartWithQuantity(product, null, product.image, 1);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                نتائج البحث عن: {query}
              </h1>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 rounded-xl h-48 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">
                  تم العثور على {products.length} منتج
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div key={product._id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-rose-200">
                      <Link href={`/products/${product._id}`}>
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className={`absolute top-2 left-2 text-white px-2 py-1 rounded text-xs ${
                            product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {product.stock > 0 ? 'متوفر' : 'غير متوفر'}
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <Link href={`/products/${product._id}`}>
                          <h3 className="font-semibold text-gray-800 mb-2 hover:text-rose-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-green-600">
                            ₪{product.price}
                          </span>
                          {product.oldPrice && product.oldPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₪{product.oldPrice}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock <= 0}
                          className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                            product.stock <= 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-rose-500 text-white hover:bg-rose-600'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          أضف للسلة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-gray-500 mb-6">
                  لم نتمكن من العثور على أي منتج يتطابق مع {query}
                </p>
                <Link 
                  href="/"
                  className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors inline-block"
                >
                  تصفح جميع المنتجات
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}