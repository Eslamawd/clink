# 🏥 Clinck Dental Management System

نظام إدارة العيادة السنية الشامل - قائم على Next.js و Laravel.

**English**: [README.md](README.md)

---

## 📋 جدول المحتويات

- [المميزات](#المميزات)
- [البنية المعمارية](#البنية-المعمارية)
- [البداية السريعة](#البداية-السريعة)
- [الفرونت اند](#الفرونت-اند)
- [الباك اند](#الباك-اند)
- [API Endpoints](#api-endpoints)
- [كيفية الإضافة والتعديل](#كيفية-الإضافة-والتعديل)
- [التوثيق](#التوثيق)

---

## ✨ المميزات

### 🎯 الفرونت اند
- ✅ **نظام الحجز المتقدم**: واجهة تفاعلية لحجز المواعيد
- ✅ **لوحة تحكم الأدمن**: إدارة كاملة للمواعيد والمرضى
- ✅ **دعم اللغات**: العربية والإنجليزية (RTL/LTR)
- ✅ **الوضع المظلم**: واجهة مريحة للعين
- ✅ **تفاعل فوري**: UI سريع مع Framer Motion
- ✅ **WhatsApp Integration**: إرسال تأكيدات مباشرة

### 🔧 الباك اند
- ✅ **إدارة المرضى**: CRUD كامل لبيانات المرضى
- ✅ **إدارة المواعيد**: حجز ذكي وتجنب الحجوزات المكررة
- ✅ **التحقق من التوفر**: الأوقات المتاحة ديناميكياً
- ✅ **معالجة الأخطاء**: رسائل خطأ واضحة
- ✅ **وثائق API**: كاملة وسهلة الاستخدام
- ✅ **قاعدة بيانات**: تصميم محسّن وآمن

---

## 🏗️ البنية المعمارية

### بنية الفرونت اند

```
components/
├── Booking/                    # مكون نظام الحجز
│   ├── index.tsx              # الحاوية الرئيسية
│   ├── BookingProgress.tsx    # شريط التقدم
│   ├── ServiceSelector.tsx    # اختيار الخدمة
│   ├── DateTimeSelector.tsx   # اختيار التاريخ والوقت
│   └── BookingSuccess.tsx     # شاشة النجاح
├── Admin/                      # لوحة التحكم
│   ├── Dashboard.tsx          # الصفحة الرئيسية
│   ├── StatsCard.tsx          # بطاقات الإحصائيات
│   ├── AppointmentFilters.tsx # تصفية المواعيد
│   └── AppointmentTable.tsx   # جدول المواعيد
├── BookingForm.tsx            # نموذج بيانات المريض
└── ...                        # مكونات أخرى
```

### بنية الباك اند

```
app/Http/Controllers/Api/
├── PatientController.php      # إدارة المرضى
└── AppointmentController.php  # إدارة المواعيد

database/
├── migrations/               # التحديثات التدريجية
└── factories/                # بيانات وهمية للاختبار
```

---

## 🚀 البداية السريعة

### المتطلبات

- **Node.js**: v18+
- **PHP**: v8.1+
- **MySQL**: v8.0+
- **Composer**: v2.0+

### تثبيت الفرونت اند

```bash
cd c:\xampp\htdocs\Clinck

# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# الدخول على: http://localhost:3000
```

### تثبيت الباك اند

```bash
cd c:\xampp\htdocs\clinck-api

# تثبيت الحزم
composer install

# إنشاء ملف البيئة
cp .env.example .env

# توليد المفتاح
php artisan key:generate

# تشغيل الهجرات
php artisan migrate

# تشغيل خادم التطوير
php artisan serve

# الدخول على: http://localhost:8000
```

---

## 💻 الفرونت اند

### التكنولوجيا المستخدمة

- **Next.js 16**: React framework حديث
- **TypeScript**: كود آمن وموثوق
- **Tailwind CSS**: تصميم سريع وجميل
- **Framer Motion**: رسوميات سلسة
- **React Hook Form**: معالجة النماذج

### هيكل المجلد

```
app/
├── [locale]/              # Dynamic routing للغات
│   ├── booking/           # صفحة الحجز
│   ├── admin/             # صفحة الأدمن
│   └── layout.tsx         # التخطيط
├── layout.tsx             # التخطيط الرئيسي
└── page.tsx               # الصفحة الرئيسية

lib/
├── api.ts                 # جميع طلبات API
└── ...

components/
├── Booking/               # مكونات الحجز
├── Admin/                 # مكونات الأدمن
├── ui/                    # مكونات عامة معاد استخدامها
└── ...                    # مكونات أخرى

context/
├── ThemeContext.tsx       # إدارة الوضع المظلم
└── TranslationContext.tsx # إدارة اللغات

messages/
├── ar.json                # الترجمات العربية
└── en.json                # الترجمات الإنجليزية
```

### كيفية الإضافة والتعديل

#### إضافة مكون جديد

```typescript
// components/NewComponent.tsx
'use client';

import { useTranslation } from '@/context/TranslationContext';

export default function NewComponent() {
  const { t, locale } = useTranslation();
  
  return <div>{t('key.name')}</div>;
}
```

#### إضافة ترجمة جديدة

```json
// messages/ar.json
{
  "new": {
    "key": "القيمة العربية"
  }
}

// messages/en.json
{
  "new": {
    "key": "English value"
  }
}
```

#### استدعاء API

```typescript
// استخدام في مكون
const response = await api.getAppointments();
const appointments = Array.isArray(response) ? response : [];
```

---

## 🔌 الباك اند

### التكنولوجيا المستخدمة

- **Laravel 11**: PHP framework حديث
- **MySQL**: قاعدة بيانات قوية
- **Eloquent ORM**: التعامل مع DB بسهولة
- **Laravel Migrations**: إدارة البيانات

### المودل والهجرات

#### نموذج المريض (Patient)

```php
// app/Models/Patient.php
class Patient extends Model {
    protected $fillable = [
        'name', 'email', 'phone',
        'date_of_birth', 'gender', 'address',
        'medical_history', 'allergies'
    ];
    
    public function appointments() {
        return $this->hasMany(Appointment::class);
    }
}
```

#### نموذج الموعد (Appointment)

```php
// app/Models/Appointment.php
class Appointment extends Model {
    protected $fillable = [
        'patient_id', 'service', 'appointment_date',
        'appointment_time', 'status', 'notes'
    ];
    
    public function patient() {
        return $this->belongsTo(Patient::class);
    }
}
```

### كيفية الإضافة والتعديل

#### إضافة migration جديدة

```bash
php artisan make:migration create_new_table
```

#### إضافة Controller جديد

```bash
php artisan make:controller Api/NewController
```

#### إضافة نموذج جديد

```bash
php artisan make:model NewModel -m
```

---

## 📡 API Endpoints

### المسار الأساسي: `/api/v1`

### المرضى (Patients)

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| GET | `/patients` | جلب جميع المرضى |
| GET | `/patients/{id}` | جلب مريض معين |
| POST | `/patients` | إنشاء مريض جديد |
| PUT | `/patients/{id}` | تحديث بيانات مريض |
| DELETE | `/patients/{id}` | حذف مريض |

### المواعيد (Appointments)

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| GET | `/appointments` | جلب جميع المواعيد |
| GET | `/appointments/{id}` | جلب موعد معين |
| POST | `/appointments` | إنشاء موعد جديد |
| PUT | `/appointments/{id}` | تحديث موعد |
| DELETE | `/appointments/{id}` | حذف موعد |
| GET | `/appointments/status/{status}` | تصفية حسب الحالة |
| GET | `/appointments/booked-slots?date=YYYY-MM-DD` | الأوقات المحجوزة |

### أخرى

| الطريقة | المسار | الوصف |
|--------|--------|-------|
| GET | `/health` | فحص صحة الخادم |
| POST | `/verify-admin` | تحقق من صلاحيات الأدمن |

---

### مثال الطلب (POST Patient)

```bash
curl -X POST http://localhost:8000/api/v1/patients \
  -H "X-Admin-Token: your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "01001234567",
    "date_of_birth": "1990-01-15",
    "gender": "M"
  }'
```

### مثال الاستجابة

```json
{
  "id": 1,
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "01001234567",
  "date_of_birth": "1990-01-15",
  "gender": "M",
  "created_at": "2026-02-17T10:00:00.000Z"
}
```

---

## 🔄 كيفية الإضافة والتعديل

### إضافة ميزة جديدة

#### 1️⃣ **الفرونت اند**

أ) إنشاء مكون جديد:
```typescript
// components/Feature/NewFeature.tsx
"use client";

export default function NewFeature() {
  return <div>محتوى جديد</div>;
}
```

ب) استيراده في الصفحة:
```typescript
// app/[locale]/page.tsx
import NewFeature from '@/components/Feature/NewFeature';

export default function Page() {
  return <NewFeature />;
}
```

#### 2️⃣ **الباك اند**

أ) إنشاء controller جديد:
```bash
php artisan make:controller Api/FeatureController
```

ب) إضافة routes:
```php
// routes/api.php
Route::apiResource('features', FeatureController::class);
```

#### 3️⃣ **الربط بينهما**

أ) إضافة دالة API:
```typescript
// lib/api.ts
getFeatures: async () => {
  const response = await fetch(`${API_BASE_URL}/features`);
  if (!response.ok) throw new Error('Failed to fetch features');
  return response.json();
}
```

ب) استخدامها في المكون:
```typescript
const data = await api.getFeatures();
```

---

## 📚 التوثيق الإضافية

### ملفات التكوين

| الملف | الوصف |
|------|-------|
| `.env.local` | متغيرات البيئة الفرونت اند |
| `.env` | متغيرات البيئة الباك اند |
| `next.config.ts` | تكوين Next.js |
| `tailwind.config.ts` | تكوين Tailwind |
| `tsconfig.json` | تكوين TypeScript |

### متغيرات البيئة

#### الفرونت اند (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ADMIN_TOKEN=your-secure-token
NEXT_PUBLIC_CLINIC_PHONE=+201110215455
```

#### الباك اند (.env)

```env
APP_NAME=Clinck
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=clinck_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🐛 استكشاف الأخطاء

### مشكلة: الحجوزات لا تظهر في لوحة التحكم

**الحل:**
```bash
# تنظيف الكاش
php artisan cache:clear
php artisan route:clear

# في الفرونت اند، افتح Developer Tools (F12) وتحقق من:
# 1. Network tab - هل الطلب يصل للـ API؟
# 2. Console - هل فيه errors؟
```

### مشكلة: الأوقات لا تتحدث ديناميكياً

**الحل:**
```typescript
// تأكد من وجود:
1. api.getBookedSlots() في lib/api.ts
2. getBookedSlots() في AppointmentController.php
3. الـ route في routes/api.php
```

---

## 📞 معلومات التواصل

- **البريد الإلكتروني**: support@clinck.com
- **الهاتف**: +201110215455
- **الموقع**: www.clinck-dental.com

---

## 📄 الترخيص

جميع الحقوق محفوظة © 2026 Clinck Dental Clinic

---

## 🎯 الخطوات القادمة

- [ ] إضافة نظام الدفع
- [ ] النسخ الاحتياطية التلقائية
- [ ] نظام المراسلات النصية
- [ ] تقارير شاملة
- [ ] تطبيق موبايل

---

**آخر تحديث**: 17-02-2026
