'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/TranslationContext';
import { motion } from 'framer-motion';

export default function NotFound() {
  const { t, locale } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            404
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
        >
          {locale === 'ar'
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة.'
            : 'Sorry, the page you are looking for does not exist.'}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={locale === 'ar' ? '/ar' : '/en'}
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            {locale === 'ar' ? 'الرجوع للصفحة الرئيسية' : 'Go to Home'}
          </Link>

          <Link
            href={locale === 'ar' ? '/ar/booking' : '/en/booking'}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            {locale === 'ar' ? 'احجز موعد' : 'Book Appointment'}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <p className="text-gray-500 dark:text-gray-500">
            {locale === 'ar'
              ? 'إذا استمرت المشكلة، تواصل معنا على +201110215455'
              : 'If the problem persists, contact us at +201110215455'}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
