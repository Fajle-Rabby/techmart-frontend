import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const hasDiscount = product.special && product.special_raw > 0;
  const saveAmount = hasDiscount ? Math.round(product.price_raw - product.special_raw) : 0;
  const savePercent = hasDiscount ? Math.round((saveAmount / product.price_raw) * 100) : 0;

  return (
    <div className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col">
      {/* সেভ ব্যাজ + ছবি */}
      <Link href={`/products/${product.slug}?id=${product.id}`} className="relative">
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
            Save: {saveAmount.toLocaleString()}৳ (-{savePercent}%)
          </span>
        )}
        <div className="aspect-square bg-gray-50 overflow-hidden p-4">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-4xl">📷</div>
          )}
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* তথ্য */}
      <div className="p-3 flex flex-col flex-1">
        <Link href={`/products/${product.slug}?id=${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary transition mb-2">
            {product.name}
          </h3>
        </Link>

        {/* দাম */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 mb-3">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-primary">{product.special_raw?.toLocaleString()}৳</span>
                <span className="text-xs text-gray-400 line-through">{product.price_raw?.toLocaleString()}৳</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{product.price_raw?.toLocaleString()}৳</span>
            )}
          </div>

          {/* Buy Now */}
          <Link href={`/products/${product.slug}?id=${product.id}`}
            className="flex items-center justify-center gap-1.5 w-full py-2 border-2 border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5 transition">
            🛒 Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
