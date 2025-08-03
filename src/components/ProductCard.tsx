import { Product } from '@/types/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { currentTheme } = useTheme();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  
  const formatOriginalPrice = (price: number, discount?: number) => {
    if (discount) {
      const originalPrice = price / (1 - discount / 100);
      return `$${originalPrice.toFixed(2)}`;
    }
    return `$${(price * 1.3).toFixed(2)}`;
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : currentTheme === 'theme2' 
              ? 'fill-slate-600 text-slate-600'
              : currentTheme === 'theme3'
                ? 'fill-purple-200 text-purple-200'
                : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  const getProductFeatures = () => {
    const features = [];
    if (product.brand) features.push(product.brand);
    if (product.stock && product.stock > 0) features.push('In Stock');
    if (product.rating.rate > 4) features.push('Top Rated');
    return features.slice(0, 2);
  };

  // Theme-specific classes with mobile-first responsive design
  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'theme1':
        return {
          card: 'bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-slate-300',
          badge: 'bg-gradient-to-r from-slate-800 to-slate-700 text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-md',
          title: 'text-slate-900 text-sm sm:text-base font-semibold tracking-tight',
          category: 'text-slate-500 text-[10px] sm:text-xs font-medium uppercase tracking-wide',
          description: 'text-slate-600 text-[10px] sm:text-xs leading-relaxed',
          feature: 'bg-slate-50 text-slate-600 border border-slate-200 text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md font-medium',
          priceNow: 'text-slate-900 text-base sm:text-lg font-bold',
          priceWas: 'text-slate-400 text-[10px] sm:text-xs line-through',
          button: 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium hover:-translate-y-0.5 hover:shadow-md',
          meta: 'border-t border-slate-100',
          ratingCount: 'text-slate-500 text-[10px] sm:text-xs',
          stock: 'text-emerald-600 text-[10px] sm:text-xs font-semibold'
        };
      
      case 'theme2':
        return {
          card: 'bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1 hover:border-slate-600',
          badge: 'bg-gradient-to-r from-blue-400 to-purple-400 text-slate-900 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-md',
          title: 'text-slate-100 text-sm sm:text-base font-semibold tracking-tight',
          category: 'text-slate-300 text-[10px] sm:text-xs font-medium uppercase tracking-wide',
          description: 'text-slate-400 text-[10px] sm:text-xs leading-relaxed',
          feature: 'bg-slate-700 text-slate-300 border border-slate-600 text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md font-medium',
          priceNow: 'text-slate-100 text-base sm:text-lg font-bold',
          priceWas: 'text-slate-500 text-[10px] sm:text-xs line-through',
          button: 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-cyan-400 hover:to-blue-400 text-slate-900 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium hover:-translate-y-0.5 hover:shadow-md',
          meta: 'border-t border-slate-700',
          ratingCount: 'text-slate-300 text-[10px] sm:text-xs',
          stock: 'text-emerald-400 text-[10px] sm:text-xs font-semibold'
        };
      
      case 'theme3':
        return {
          card: 'bg-white border-2 border-purple-200 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-purple-300 hover:shadow-purple-500/20',
          badge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-md',
          title: 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-sm sm:text-base font-semibold tracking-tight',
          category: 'text-purple-600 text-[10px] sm:text-xs font-medium uppercase tracking-wide',
          description: 'text-gray-600 text-[10px] sm:text-xs leading-relaxed',
          feature: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200 text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md font-medium',
          priceNow: 'bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent text-base sm:text-lg font-bold',
          priceWas: 'text-gray-400 text-[10px] sm:text-xs line-through',
          button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium hover:-translate-y-0.5 hover:shadow-md',
          meta: 'border-t border-purple-100',
          ratingCount: 'text-purple-600 text-[10px] sm:text-xs',
          stock: 'text-emerald-600 text-[10px] sm:text-xs font-semibold'
        };
      
      default:
        return getThemeClasses();
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div 
      className={`w-full relative transition-all duration-500 ease-out font-theme animate-fade-in ${themeClasses.card}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Premium Badge */}
      <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-10 ${themeClasses.badge}`}>
        {product.discountPercentage ? `${Math.round(product.discountPercentage)}% OFF` : 'Premium'}
      </div>
      
      {/* Product Image */}
      <div className="aspect-w-1 aspect-h-1 h-40 sm:h-44 overflow-hidden relative bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-contain rounded-xl"
          loading="lazy"
        />
      </div>
      
      {/* Product Information */}
      <div className="p-4 lg:p-5 relative">
        <div className={`mb-1 ${themeClasses.category}`}>
          {product.category}
        </div>
        
        <h2 className={`mb-1.5 sm:mb-2 leading-tight ${themeClasses.title}`}>
          {truncateText(product.title, window.innerWidth < 640 ? 30 : 40)}
        </h2>
        
        <div className="mb-2 sm:mb-3">
          <p className={themeClasses.description}>
            {truncateText(product.description, window.innerWidth < 640 ? 50 : 70)}
          </p>
        </div>
        
        {/* Product Features - Hidden on very small screens */}
        {getProductFeatures().length > 0 && (
          <div className="hidden xs:flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            {getProductFeatures().slice(0, window.innerWidth < 640 ? 1 : 2).map((feature, idx) => (
              <span key={idx} className={themeClasses.feature}>
                {feature}
              </span>
            ))}
          </div>
        )}
        
        {/* Price and Button */}
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <div className="flex flex-col">
            {product.discountPercentage && (
              <span className={themeClasses.priceWas}>
                {formatOriginalPrice(product.price, product.discountPercentage)}
              </span>
            )}
            <span className={themeClasses.priceNow}>
              {formatPrice(product.price)}
            </span>
          </div>
          <button className={`flex items-center gap-1 sm:gap-1.5 transition-all duration-300 ${themeClasses.button}`} disabled>
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Add</span>
            <span className="xs:hidden">+</span>
          </button>
        </div>
        
        {/* Rating and Stock */}
        <div className={`flex justify-between items-center pt-2 sm:pt-3 ${themeClasses.meta}`}>
          <div className="flex items-center gap-0.5 sm:gap-1">
            {renderStars(product.rating.rate)}
            <span className={`ml-1 ${themeClasses.ratingCount}`}>
              ({product.rating.count})
            </span>
          </div>
          
          <div className={themeClasses.stock}>
            {product.stock && product.stock > 0 ? 'In Stock' : 'Limited'}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ProductCard;