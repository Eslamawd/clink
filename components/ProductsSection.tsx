"use client";

import { useTranslation } from "@/context/TranslationContext";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";

interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: string;
  image: string;
  rating: number;
  benefitsKeys: string[];
}

const products: Product[] = [
  {
    id: "toothpaste",
    nameKey: "products.toothpasteName",
    descriptionKey: "products.toothpasteDesc",
    price: "85 ج.م",
    image: "🪥",
    rating: 5,
    benefitsKeys: [
      "products.toothpasteBenefit1",
      "products.toothpasteBenefit2",
      "products.toothpasteBenefit3",
    ],
  },
  {
    id: "mouthwash",
    nameKey: "products.mouthwashName",
    descriptionKey: "products.mouthwashDesc",
    price: "120 ج.م",
    image: "💧",
    rating: 5,
    benefitsKeys: [
      "products.mouthwashBenefit1",
      "products.mouthwashBenefit2",
      "products.mouthwashBenefit3",
    ],
  },
  {
    id: "toothbrush",
    nameKey: "products.toothbrushName",
    descriptionKey: "products.toothbrushDesc",
    price: "350 ج.م",
    image: "⚡",
    rating: 4.9,
    benefitsKeys: [
      "products.toothbrushBenefit1",
      "products.toothbrushBenefit2",
      "products.toothbrushBenefit3",
    ],
  },
  {
    id: "floss",
    nameKey: "products.flossName",
    descriptionKey: "products.flossDesc",
    price: "45 ج.م",
    image: "🧵",
    rating: 5,
    benefitsKeys: [
      "products.flossBenefit1",
      "products.flossBenefit2",
      "products.flossBenefit3",
    ],
  },
  {
    id: "whitening",
    nameKey: "products.whiteningName",
    descriptionKey: "products.whiteningDesc",
    price: "250 ج.م",
    image: "✨",
    rating: 5,
    benefitsKeys: [
      "products.whiteningBenefit1",
      "products.whiteningBenefit2",
      "products.whiteningBenefit3",
    ],
  },
  {
    id: "vitamin",
    nameKey: "products.vitaminName",
    descriptionKey: "products.vitaminDesc",
    price: "180 ج.م",
    image: "💊",
    rating: 4.8,
    benefitsKeys: [
      "products.vitaminBenefit1",
      "products.vitaminBenefit2",
      "products.vitaminBenefit3",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("products.title")} 🛍️
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {t("products.subtitle")}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-cyan-700 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ translateY: -10 }}
              className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg p-6 border-2 border-cyan-100 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all"
            >
              {/* Product Image / Icon */}
              <div className="text-6xl mb-4 text-center">{product.image}</div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                ))}
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-2">
                  ({product.rating})
                </span>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-right">
                {t(product.nameKey)}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-right text-sm">
                {t(product.descriptionKey)}
              </p>

              {/* Benefits */}
              <div className="mb-6 space-y-2">
                {product.benefitsKeys.map((benefitKey, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-right">
                    <span className="text-cyan-600 dark:text-cyan-400 text-sm">
                      {t(benefitKey)}
                    </span>
                    <span className="text-cyan-500 dark:text-cyan-400">✓</span>
                  </div>
                ))}
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-cyan-100 dark:border-slate-600">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">{t("products.buy")}</span>
                </motion.button>
                <div className="text-right">
                  <p className="text-cyan-600 dark:text-cyan-400 font-bold text-2xl">
                    {product.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border-2 border-cyan-200 dark:border-slate-600 text-right"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            💡 {t("products.goldenTip")}
          </h3>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {t("products.tipText")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
