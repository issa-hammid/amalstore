// "use client";
// import { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// export default function HeroSection() {
//   const swiperRef = useRef(null);

//   const slides = [
//     {
//       id: 1,
//       image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=2000&q=80",
//       title: "أحدث الهواتف الذكية",
//       subtitle: "خصم يصل إلى 30% على الموديلات الجديدة",
//       buttonText: "تسوق الآن",
//       buttonLink: "/category/phones",
//     },
//     {
//       id: 2,
//       image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=2000&q=80",
//       title: "أجهزة اللابتوب",
//       subtitle: "أقوى المواصفات بأفضل الأسعار",
//       buttonText: "اكتشف المزيد",
//       buttonLink: "/category/laptops",
//     },
//     {
//       id: 3,
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2000&q=80",
//       title: "إكسسوارات التقنية",
//       subtitle: "كل ما تحتاجه لإكمال تجربتك التقنية",
//       buttonText: "عرض الإكسسوارات",
//       buttonLink: "/category/accessories",
//     },
//   ];

//   return (
//     <section className="relative h-[60vh] md:h-[70vh] w-full mt-4">
//       {/* ✅ نفس container و padding الي في الهيدر */}
//       <div className="container mx-auto px-4 h-full">
//         <Swiper
//           ref={swiperRef}
//           spaceBetween={0}
//           centeredSlides
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           navigation
//           modules={[Autoplay, Pagination, Navigation]}
//           className="h-full w-full rounded-2xl shadow-xl hero-swiper"
//         >
//           {slides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               <div className="relative w-full h-full">
//                 {/* الصورة - محفوظة النسب */}
//                 <img
//                   src={slide.image}
//                   alt={slide.title}
//                   className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
//                 />

//                 {/* طبقة شفافة خفيفة فقط لتحسين قراءة النص */}
//                 <div className="absolute inset-0 bg-black/30 rounded-2xl" />

//                 {/* المحتوى */}
//                 <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
//                   <h2 className="text-4xl font-bold text-rose-600 mb-4  drop-shadow-2xl leading-snug">
//                     {slide.title}
//                   </h2>
//                   <p className="text-lg md:text-2xl text-gray-300 mb-8 drop-shadow-md max-w-2xl">
//                     {slide.subtitle}
//                   </p>
//                   <button
//                     onClick={() => (window.location.href = slide.buttonLink)}
//                     className="bg-amber-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-rose-500 hover:text-amber-100 transition hover:scale-105"
//                   >
//                     {slide.buttonText}
//                   </button>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* تخصيص الأسهم والنقاط */}
//       <style jsx global>{`
//         /* ✅ الأسهم - وردي */
//         .hero-swiper .swiper-button-next,
//         .hero-swiper .swiper-button-prev {
//           color: #ec4899 !important;
//         //   background: rgba(255, 255, 255, 0.9) !important;
//           width: 45px !important;
//           height: 45px !important;
//         //   border-radius: 50% !important;
//         //   border: 2px solid #ec4899 !important;
//           margin: 0 10px !important;
//         //   backdrop-filter: blur(10px);
//         }
        
//         .hero-swiper .swiper-button-next:hover,
//         .hero-swiper .swiper-button-prev:hover {
//           background: #ec4899 !important;
//           color: white !important;
//           transform: scale(1.1) !important;
//         }
        
//         .hero-swiper .swiper-button-next:after,
//         .hero-swiper .swiper-button-prev:after {
//           font-size: 20px !important;
//           font-weight: bold !important;
//         }

//         /* ✅ النقاط - وردي */
//         .hero-swiper .swiper-pagination-bullet {
//           background: #ec4899 !important;
//           opacity: 0.6 !important;
//           width: 12px !important;
//           height: 12px !important;
//           transition: all 0.3s ease !important;
//         }
        
//         .hero-swiper .swiper-pagination-bullet-active {
//           background: #ec4899 !important;
//           opacity: 1 !important;
//           transform: scale(1.3) !important;
//           box-shadow: 0 0 12px rgba(236, 72, 153, 0.8) !important;
//         }

//         /* ✅ تحديد موقع الباجينيشن */
//         .hero-swiper .swiper-pagination {
//           bottom: 20px !important;
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";
import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSection() {
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب بيانات الهيرو من API
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const res = await fetch("/api/hero");
        const data = await res.json();
        
        if (res.ok && data.heroes) {
          setSlides(data.heroes);
        } else {
          // استخدام بيانات افتراضية إذا فشل الجلب
console.log("test")   
     }
      } catch (err) {
        console.error("Failed to fetch hero slides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSlides();
  }, []);

  // بيانات افتراضية للطوارئ
  // const getDefaultSlides = () => [
  //   {
  //     _id: 1,
  //     image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=2000&q=80",
  //     title: "أحدث الهواتف الذكية",
  //     subtitle: "خصم يصل إلى 30% على الموديلات الجديدة",
  //     buttonText: "تسوق الآن",
  //     buttonLink: "/category/phones",
  //   }
  // ];

  if (loading) {
    return (
      <section className="relative h-[60vh] md:h-[70vh] w-full mt-4">
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل ...</p>
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null; // لا تعرض anything إذا ما في شرائح
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full mt-4">
      <div className="container mx-auto px-4 h-full">
        <Swiper
          ref={swiperRef}
          spaceBetween={0}
          centeredSlides
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full rounded-2xl shadow-xl hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide._id}>
              <div className="relative w-full h-full">
                {/* الصورة - محفوظة النسب */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
                />

                {/* طبقة شفافة خفيفة فقط لتحسين قراءة النص */}
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />

                {/* المحتوى */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-4xl font-bold text-rose-400 mb-4  drop-shadow-2xl leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-300 mb-8 drop-shadow-md max-w-2xl">
                    {slide.subtitle}
                  </p>
                  {slide.buttonText !== "" && (<button
                    onClick={() => (window.location.href = slide.buttonLink)}
                    className="bg-amber-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-rose-400 hover:text-amber-100 transition hover:scale-105"
                  >
                    {slide.buttonText}
                  </button>)}
                  
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* تخصيص الأسهم والنقاط */}
      <style jsx global>{`
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: #ec4899 !important;
          width: 45px !important;
          height: 45px !important;
          margin: 0 10px !important;
        }
        
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: #ec4899 !important;
          color: white !important;
          transform: scale(1.1) !important;
        }
        
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          background: #ec4899 !important;
          opacity: 0.6 !important;
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          background: #ec4899 !important;
          opacity: 1 !important;
          transform: scale(1.3) !important;
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.8) !important;
        }

        .hero-swiper .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
    </section>
  );
}