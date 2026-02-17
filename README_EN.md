# 🏥 Clinck Dental Management System

A comprehensive dental clinic management system built with Next.js and Laravel.

**العربية**: [README_AR.md](README_AR.md)

---

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [How to Add & Modify](#how-to-add--modify)
- [Documentation](#documentation)

---

## ✨ Features

### 🎯 Frontend
- ✅ **Advanced Booking System**: Interactive UI for appointment scheduling
- ✅ **Admin Dashboard**: Full appointment and patient management
- ✅ **Multi-Language Support**: Arabic and English (RTL/LTR)
- ✅ **Dark Mode**: Eye-friendly interface
- ✅ **Real-time Interaction**: Fast UI with Framer Motion
- ✅ **WhatsApp Integration**: Direct booking confirmations

### 🔧 Backend
- ✅ **Patient Management**: Complete CRUD operations
- ✅ **Smart Appointment Booking**: Prevents double-booking
- ✅ **Dynamic Availability**: Real-time slot checking
- ✅ **Error Handling**: Clear, actionable messages
- ✅ **Complete API Documentation**: Easy to use
- ✅ **Optimized Database**: Secure and efficient

---

## 🏗️ Architecture

### Frontend Structure

```
components/
├── Booking/                    # Booking System Component
│   ├── index.tsx              # Main Container
│   ├── BookingProgress.tsx    # Progress Bar
│   ├── ServiceSelector.tsx    # Service Selection
│   ├── DateTimeSelector.tsx   # Date & Time Selection
│   └── BookingSuccess.tsx     # Success Screen
├── Admin/                      # Admin Dashboard
│   ├── Dashboard.tsx          # Main Page
│   ├── StatsCard.tsx          # Stat Cards
│   ├── AppointmentFilters.tsx # Appointment Filters
│   └── AppointmentTable.tsx   # Appointments Table
├── BookingForm.tsx            # Patient Information Form
└── ...                        # Other Components
```

### Backend Structure

```
app/Http/Controllers/Api/
├── PatientController.php      # Patient Management
└── AppointmentController.php  # Appointment Management

database/
├── migrations/               # Database Migrations
└── factories/                # Test Data Factories
```

---

## 🚀 Quick Start

### Requirements

- **Node.js**: v18+
- **PHP**: v8.1+
- **MySQL**: v8.0+
- **Composer**: v2.0+

### Frontend Setup

```bash
cd c:\xampp\htdocs\Clinck

# Install dependencies
npm install

# Start development server
npm run dev

# Access at: http://localhost:3000
```

### Backend Setup

```bash
cd c:\xampp\htdocs\clinck-api

# Install dependencies
composer install

# Create environment file
cp .env.example .env

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate

# Start development server
php artisan serve

# Access at: http://localhost:8000
```

---

## 💻 Frontend

### Technology Stack

- **Next.js 16**: Modern React framework
- **TypeScript**: Safe and reliable code
- **Tailwind CSS**: Fast beautiful design
- **Framer Motion**: Smooth animations
- **React Hook Form**: Form management

### Folder Structure

```
app/
├── [locale]/              # Dynamic routing for languages
│   ├── booking/           # Booking page
│   ├── admin/             # Admin page
│   └── layout.tsx         # Layout template
├── layout.tsx             # Root layout
└── page.tsx               # Home page

lib/
├── api.ts                 # All API calls
└── ...

components/
├── Booking/               # Booking components
├── Admin/                 # Admin components
├── ui/                    # Reusable UI components
└── ...                    # Other components

context/
├── ThemeContext.tsx       # Dark mode management
└── TranslationContext.tsx # Language management

messages/
├── ar.json                # Arabic translations
└── en.json                # English translations
```

### How to Add & Modify

#### Adding a New Component

```typescript
// components/NewComponent.tsx
'use client';

import { useTranslation } from '@/context/TranslationContext';

export default function NewComponent() {
  const { t, locale } = useTranslation();
  
  return <div>{t('key.name')}</div>;
}
```

#### Adding a New Translation

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

#### Making API Calls

```typescript
// Using in a component
const response = await api.getAppointments();
const appointments = Array.isArray(response) ? response : [];
```

---

## 🔌 Backend

### Technology Stack

- **Laravel 11**: Modern PHP framework
- **MySQL**: Powerful database
- **Eloquent ORM**: Easy database interaction
- **Laravel Migrations**: Database version control

### Models & Migrations

#### Patient Model

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

#### Appointment Model

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

### How to Add & Modify

#### Creating a New Migration

```bash
php artisan make:migration create_new_table
```

#### Creating a New Controller

```bash
php artisan make:controller Api/NewController
```

#### Creating a New Model

```bash
php artisan make:model NewModel -m
```

---

## 📡 API Endpoints

### Base Path: `/api/v1`

### Patients

| Method | Path | Description |
|--------|------|-------------|
| GET | `/patients` | Get all patients |
| GET | `/patients/{id}` | Get specific patient |
| POST | `/patients` | Create new patient |
| PUT | `/patients/{id}` | Update patient |
| DELETE | `/patients/{id}` | Delete patient |

### Appointments

| Method | Path | Description |
|--------|------|-------------|
| GET | `/appointments` | Get all appointments |
| GET | `/appointments/{id}` | Get specific appointment |
| POST | `/appointments` | Create new appointment |
| PUT | `/appointments/{id}` | Update appointment |
| DELETE | `/appointments/{id}` | Delete appointment |
| GET | `/appointments/status/{status}` | Filter by status |
| GET | `/appointments/booked-slots?date=YYYY-MM-DD` | Get booked times |

### Other

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/verify-admin` | Verify admin permissions |

---

### Example Request (Create Patient)

```bash
curl -X POST http://localhost:8000/api/v1/patients \
  -H "X-Admin-Token: your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Mohammed",
    "email": "ahmed@example.com",
    "phone": "01001234567",
    "date_of_birth": "1990-01-15",
    "gender": "M"
  }'
```

### Example Response

```json
{
  "id": 1,
  "name": "Ahmed Mohammed",
  "email": "ahmed@example.com",
  "phone": "01001234567",
  "date_of_birth": "1990-01-15",
  "gender": "M",
  "created_at": "2026-02-17T10:00:00.000Z"
}
```

---

## 🔄 How to Add & Modify

### Adding a New Feature

#### 1️⃣ **Frontend**

a) Create new component:
```typescript
// components/Feature/NewFeature.tsx
"use client";

export default function NewFeature() {
  return <div>New content</div>;
}
```

b) Import in page:
```typescript
// app/[locale]/page.tsx
import NewFeature from '@/components/Feature/NewFeature';

export default function Page() {
  return <NewFeature />;
}
```

#### 2️⃣ **Backend**

a) Create controller:
```bash
php artisan make:controller Api/FeatureController
```

b) Add routes:
```php
// routes/api.php
Route::apiResource('features', FeatureController::class);
```

#### 3️⃣ **Integration**

a) Add API method:
```typescript
// lib/api.ts
getFeatures: async () => {
  const response = await fetch(`${API_BASE_URL}/features`);
  if (!response.ok) throw new Error('Failed to fetch features');
  return response.json();
}
```

b) Use in component:
```typescript
const data = await api.getFeatures();
```

---

## 📚 Additional Documentation

### Configuration Files

| File | Description |
|------|-------------|
| `.env.local` | Frontend environment variables |
| `.env` | Backend environment variables |
| `next.config.ts` | Next.js configuration |
| `tailwind.config.ts` | Tailwind configuration |
| `tsconfig.json` | TypeScript configuration |

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ADMIN_TOKEN=your-secure-token
NEXT_PUBLIC_CLINIC_PHONE=+201110215455
```

#### Backend (.env)

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

## 🐛 Troubleshooting

### Issue: Bookings not showing in admin dashboard

**Solution:**
```bash
# Clear cache
php artisan cache:clear
php artisan route:clear

# In frontend, open Developer Tools (F12) and check:
# 1. Network tab - Is request reaching API?
# 2. Console - Any errors?
```

### Issue: Time slots not updating dynamically

**Solution:**
```typescript
// Make sure you have:
1. api.getBookedSlots() in lib/api.ts
2. getBookedSlots() in AppointmentController.php
3. Route in routes/api.php
```

---

## 📞 Contact Information

- **Email**: support@clinck.com
- **Phone**: +201110215455
- **Website**: www.clinck-dental.com

---

## 📄 License

All rights reserved © 2026 Clinck Dental Clinic

---

## 🎯 Next Steps

- [ ] Add payment system
- [ ] Implement automatic backups
- [ ] SMS notification system
- [ ] Comprehensive reports
- [ ] Mobile app

---

**Last Updated**: 2026-02-17
