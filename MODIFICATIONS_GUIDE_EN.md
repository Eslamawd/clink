# 📝 Quick Modification Guide - Clinck

This guide explains how to easily modify common things in the Clinck system.

---

## 📦 Monthly Subscriptions / Services

### Current Location

```
components/TreatmentsSection.tsx
```

### How to Modify

#### 1️⃣ **Add a New Service**

Go to `components/TreatmentsSection.tsx` and add to the array:

```typescript
const treatments = [
  {
    id: 5,                        // Unique ID
    nameAr: "اسم الخدمة",
    nameEn: "Service Name",
    descriptionAr: "وصف الخدمة",
    descriptionEn: "Service description",
    price: 500,                   // Price in Egyptian Pounds
    icon: "🦷"                    // Emoji icon
  }
];
```

#### 2️⃣ **Modify Service Price**

Find the service by `id` and change the `price`:

```typescript
{
  id: 3,
  nameEn: "Teeth Cleaning",
  price: 150  // ✏️ Edit here
}
```

#### 3️⃣ **Delete a Service**

Find the service by `id` and remove the entire object:

```typescript
// Before
const treatments = [
  { id: 1, ... },
  { id: 2, ... },  // ❌ Delete this
  { id: 3, ... }
];

// After
const treatments = [
  { id: 1, ... },
  { id: 3, ... }
];
```

#### 4️⃣ **Change Service Name**

```typescript
{
  id: 1,
  nameAr: "اسم جديد",             // ✏️ Edit here
  nameEn: "New Name",              // ✏️ And here
  ...
}
```

---

## 🎨 Colors & Design

### Change Primary Colors

```
tailwind.config.ts
```

```typescript
colors: {
  primary: '#your-color',    // Primary color
  secondary: '#your-color',  // Secondary color
  accent: '#your-color'      // Accent color
}
```

---

## 🌍 Languages & Translations

### Add New Translation

#### Arabic file:

```json
// messages/ar.json
{
  "new": {
    "term": "الترجمة العربية"
  }
}
```

#### English file:

```json
// messages/en.json
{
  "new": {
    "term": "English translation"
  }
}
```

#### Use in component:

```typescript
const { t } = useTranslation();
<p>{t('new.term')}</p>
```

---

## 📱 Available Services

### Current Services

| Code | Service | Price |
|------|---------|-------|
| teeth-cleaning | Teeth Cleaning | 150 EGP |
| whitening | Teeth Whitening | 500 EGP |
| filling | Teeth Filling | 300 EGP |
| root-canal | Root Canal Treatment | 800 EGP |
| extraction | Tooth Extraction | 400 EGP |

### Add New Service to Booking Form

#### 1. Frontend:

Go to `components/Booking/ServiceSelector.tsx` and add the service:

```typescript
const services = [
  {
    id: 'new-service',
    nameAr: 'اسم الخدمة',
    nameEn: 'Service Name',
    icon: '🦷'
  }
];
```

#### 2. Backend:

Go to `app/Http/Controllers/Api/AppointmentController.php` and add validation:

```php
'service' => 'required|in:teeth-cleaning,whitening,filling,root-canal,extraction,new-service'
```

---

## 🔐 Contact Information & Phone

### Clinic Data Location

```
Stored in:
- lib/api.ts (API_BASE_URL)
- .env.local (NEXT_PUBLIC_CLINIC_PHONE)
```

### Change WhatsApp Number

In `.env.local`:

```env
NEXT_PUBLIC_CLINIC_PHONE=+201110215455
```

Change to your new number.

---

## 🗓️ Working Hours & Appointment Times

### Change Available Time Slots

Go to `components/Booking/DateTimeSelector.tsx`:

```typescript
const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  // Add or remove times here
];
```

### Disable Booking on Specific Days

In `DateTimeSelector.tsx`:

```typescript
const disabledDates = [
  new Date(2026, 1, 20),  // February 20, 2026
  new Date(2026, 1, 21),  // February 21, 2026
];

// In the DatePicker:
disabled={(date) => 
  disabledDates.some(d => isSameDay(d, date))
}
```

---

## 💰 Pricing & Revenue

### Calculate Expected Revenue

In `components/Admin/Dashboard.tsx`:

```typescript
const PRICES = {
  'teeth-cleaning': 150,
  'whitening': 500,
  'filling': 300,
  'root-canal': 800,
  'extraction': 400
};

// Revenue is automatically calculated from these prices
```

To change a price, update the value in this object.

---

## 🔧 API & Backend Communication

### Add New API Function

In `lib/api.ts`:

```typescript
const api = {
  // ...existing endpoints
  
  newFeature: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/new-endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': process.env.NEXT_PUBLIC_ADMIN_TOKEN || ''
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to create');
    return response.json();
  }
};
```

### Use in Component:

```typescript
const response = await api.newFeature(data);
```

---

## 🐛 Common Issues & Solutions

### Issue: Bookings Not Showing

**Solution:**
```bash
# Open Developer Tools (F12)
# 1. Go to Network tab
# 2. Check if `/api/v1/appointments` returns 200
# 3. If error, check Console tab for details
```

### Issue: Translations Not Working

**Solution:**
```typescript
// Make sure the key exists in both ar.json and en.json
// Added a new key? Clear cache and reload
```

### Issue: Booked Slots Not Disappearing

**Solution:**
```bash
# In backend, ensure:
php artisan migrate
# Restart server
php artisan serve
```

---

## 📊 Statistics & Analytics

### View Patient Statistics

In `components/Admin/Dashboard.tsx`, we calculate:
- Total appointments
- Confirmed appointments
- Pending appointments
- Expected revenue

To change calculation, modify the `fetchAppointments()` function.

---

## 🎯 After Making Changes

### Steps to follow:

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Check in browser:**
   - http://localhost:3000

3. **If there are errors:**
   - Press F12 to open Developer Tools
   - Look in Console tab for errors

4. **When done:**
   ```bash
   git add .
   git commit -m "Modify: describe your change"
   git push
   ```

---

## 🔗 Important Links

- [Arabic README](README_AR.md) - Complete Arabic documentation
- [English README](README_EN.md) - Complete English documentation
- [Main README](README.md) - Quick navigation

---

**Last Updated**: February 17, 2026
