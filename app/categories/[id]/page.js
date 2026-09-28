"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;
  
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        
        // 1. جلب بيانات التصنيف من الـ API الموجود
        const categoriesRes = await fetch('/api/categories');
        const categoriesData = await categoriesRes.json();
        
        const category = categoriesData.categories?.find(cat => cat._id === categoryId);
        
        if (!category) {
          setError('التصنيف غير موجود');
          return;
        }
        
        setCategory(category);

        // 2. جلب منتجات التصنيف من الـ API الموجود
        const productsRes = await fetch(`/api/categories/${categoryId}/products`);
        const productsData = await productsRes.json();
        
        if (productsData.success) {
          // إضافة الحالة الأولية للمنتجات
          const productsWithState = productsData.products.map(product => {
            const firstColor = product.colors?.find(c => c.image || c.stock > 0) || product.colors?.[0];
            const defaultImage = product.image || firstColor?.image || "";
            const defaultStock = product.image ? product.stock : (firstColor?.stock ?? product.stock);
            return {
              ...product,
              currentImage: defaultImage,
              currentStock: defaultStock,
              currentColor: product.image ? null : firstColor
            };
          });
          setProducts(productsWithState);
        } else {
          setError('فشل في جلب المنتجات');
        }

      } catch (err) {
        setError('حدث خطأ في الاتصال بالخادم');
        console.error('Error fetching category:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  const handleColorClick = (productId, color, isMainImage = false) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product._id === productId) {
          if (isMainImage && product.image) {
            return {
              ...product,
              currentImage: product.image,
              currentStock: product.stock,
              currentColor: null
            };
          } else if (color) {
            return {
              ...product,
              currentImage: color.image || product.image || (product.colors?.find(c => c.image)?.image) || "",
              currentStock: color.stock !== undefined ? color.stock : product.stock,
              currentColor: color
            };
          }
        }
        return product;
      })
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">جاري تحميل البيانات...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">التصنيف غير موجود</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* عنوان التصنيف */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* اسم التصنيف على اليمين */}
            <div className="text-right">
              <h1 className="text-4xl font-bold text-yellow-500 mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600 text-lg">
                {category.description || `جميع منتجات ${category.name}`}
              </p>
            </div>
            
            {/* عدد المنتجات على اليسار */}
            <div className="text-left">
              <span className="text-gray-500 text-sm">
                ({products.length} منتج)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* منتجات التصنيف */}
<section className="py-12">
  <div className="container mx-auto px-4">
    {products.length === 0 ? (
      <div className="text-center py-16">
        {/* <div className="text-gray-400 text-6xl mb-4">📦</div> */}
        <h3 className="text-2xl font-bold text-gray-600 mb-2">
          لا توجد منتجات
        </h3>
        <p className="text-gray-500">
          لم يتم إضافة منتجات لهذا التصنيف بعد
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onColorClick={handleColorClick}
          />
        ))}
      </div>
    )}
  </div>
</section>
    </div>
  );
}