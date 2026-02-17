"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/context/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";

interface Testimonial {
  id: number;
  nameKey: string;
  roleKey: string;
  textKey: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameKey: "testimonials.testimonial1Name",
    roleKey: "testimonials.testimonial1Role",
    textKey: "testimonials.testimonial1Text",
    rating: 5,
    image: "👨‍💼",
  },
  {
    id: 2,
    nameKey: "testimonials.testimonial2Name",
    roleKey: "testimonials.testimonial2Role",
    textKey: "testimonials.testimonial2Text",
    rating: 5,
    image: "👩‍🏫",
  },
  {
    id: 3,
    nameKey: "testimonials.testimonial3Name",
    roleKey: "testimonials.testimonial3Role",
    textKey: "testimonials.testimonial3Text",
    rating: 5,
    image: "👨‍⚕️",
  },
  {
    id: 4,
    nameKey: "testimonials.testimonial4Name",
    roleKey: "testimonials.testimonial4Role",
    textKey: "testimonials.testimonial4Text",
    rating: 4,
    image: "👩‍💼",
  },
  {
    id: 5,
    nameKey: "testimonials.testimonial5Name",
    roleKey: "testimonials.testimonial5Role",
    textKey: "testimonials.testimonial5Text",
    rating: 5,
    image: "🧑‍💼",
  },
];

export default function TestimonialsCarousel() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Auto-scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-cyan-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            {t("testimonials.subtitle")}
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-cyan-700 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-96">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 h-full flex flex-col justify-between border-2 border-cyan-100 dark:border-slate-700"
            >
              {/* Stars */}
              <div className="flex gap-1 justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed text-center mb-8 flex-1">
                &ldquo;{t(testimonials[currentIndex].textKey)}&rdquo;
              </p>

              {/* Author */}
              <div className="text-center border-t border-slate-200 dark:border-slate-700 pt-6">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {testimonials[currentIndex].image}{" "}
                  {t(testimonials[currentIndex].nameKey)}
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {t(testimonials[currentIndex].roleKey)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 z-10 p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 z-10 p-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 w-8"
                  : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16"
        >
          <div className="text-center p-6 bg-cyan-50 dark:bg-slate-800 rounded-xl border border-cyan-200 dark:border-slate-700">
            <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
              4.9/5
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-medium mt-2">
              {t("testimonials.avgRating")}
            </p>
          </div>
          <div className="text-center p-6 bg-cyan-50 dark:bg-slate-800 rounded-xl border border-cyan-200 dark:border-slate-700">
            <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
              5000+
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-medium mt-2">
              {t("testimonials.happyPatients")}
            </p>
          </div>
          <div className="text-center p-6 bg-cyan-50 dark:bg-slate-800 rounded-xl border border-cyan-200 dark:border-slate-700">
            <p className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
              98%
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-medium mt-2">
              {t("testimonials.satisfactionRate")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
