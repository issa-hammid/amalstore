"use client";
import { 
  Truck, 
  Shield, 
  Headphones, 
  Award, 
  Clock, 
  Heart 
} from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "شحن سريع ",
      description: "شحن سريع و امن  لجميع محافاظات قطاع غزة",
      color: "from-blue-500 to-cyan-500"
    },
    // {
    //   icon: Shield,
    //   title: "دفع آمن",
    //   description: "أنظمة دفع مشفرة وآمنة مع ضمان حماية بياناتك الشخصية",
    //   color: "from-green-500 to-emerald-500"
    // },
    {
      icon: Headphones,
      title: "دعم فني 24/7",
      description: "فريق دعم فني متاح على مدار الساعة لمساعدتك في أي استفسار",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "جودة مضمونة",
      description: "منتجات أصلية بجودة عالية",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Clock,
      title: "توصيل فوري",
      description: "خدمة توصيل فوري في نفس اليوم متاحة في معظم المناطق",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: Heart,
      title: "تجربة مخصصة",
      description: "توصيات منتجات مخصصة تناسب ذوقك واحتياجاتك الشخصية",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { number: "2000+", label: "عميل سعيد" },
    { number: "1,000+", label: "منتج مميز" },
    { number: "99%", label: "تقييم إيجابي" },
    { number: "24/7", label: "دعم فني" }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24 relative overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-rose-100 to-transparent rounded-full -translate-y-36 translate-x-36 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-100 to-transparent rounded-full translate-y-32 -translate-x-32 opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            لماذا تختار <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">متجر أمل</span>؟
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            نحن نؤمن بتجربة تسوق استثنائية تجمع بين الجودة، السرعة، والراحة 
            لضمان رضاكم التام في كل عملية شراء
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-200"
            >
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* المميزات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
            >
              {/* خلفية متحركة */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* أيقونة */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* المحتوى */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {feature.description}
              </p>

              {/* تأثير hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* قسم إضافي للثقة */}
        <div className="mt-20 bg-gradient-to-r from-rose-50 to-amber-50 rounded-3xl p-8 lg:p-12 text-center border border-rose-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
              ثقتكم <span className="text-rose-500">هدفي</span> ورضاكم <span className="text-amber-500">غايتي</span>
            </h3>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8">
              في متجر أمل، نعتبر كل عميل جزءاً من عائلتنا. نسعى جاهدين لتقديم أفضل تجربة تسوق 
              من خلال منتجات متميزة، أسعار تنافسية، وخدمة عملاء استثنائية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-gray-700">
                <Shield className="w-5 h-5 text-green-500 ml-2" />
                <span>ضمان جودة المنتجات</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Award className="w-5 h-5 text-amber-500 ml-2" />
                <span>أسعار تنافسية</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Heart className="w-5 h-5 text-rose-500 ml-2" />
                <span>رعاية ما بعد البيع</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}