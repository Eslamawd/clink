# 🔧 How to Update Page Imports

هذا الملف يشرح كيفية تحديث ملفات الصفحات لاستخدام المكونات الجديدة المقسمة.

---

## 📄 Current vs New Imports

### الحالة القديمة (Old):
```typescript
// app/[locale]/booking/page.tsx
import BookingComponent from '@/components/BookingComponent';
```

### الحالة الجديدة (New):
```typescript
// app/[locale]/booking/page.tsx
import BookingComponent from '@/components/Booking';
```

---

## 🔄 Migration Guide

### 1️⃣ Booking Page

**File**: `app/[locale]/booking/page.tsx`

```typescript
// OLD (قديم) ❌
import BookingComponent from '@/components/BookingComponent';

// NEW (جديد) ✅
import BookingComponent from '@/components/Booking';

export default function BookingPage() {
  return (
    <div>
      <BookingComponent />
    </div>
  );
}
```

### 2️⃣ Admin Dashboard Page

**File**: `app/[locale]/admin/page.tsx`

```typescript
// OLD (قديم) ❌
import AdminDashboard from '@/components/AdminDashboard';

// NEW (جديد) ✅
import Dashboard from '@/components/Admin/Dashboard';

export default function AdminPage() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
```

---

## 📋 File Locations Reference

| Component | Old Location | New Location |
|-----------|--------------|--------------|
| Booking | `components/BookingComponent.tsx` | `components/Booking/index.tsx` |
| Admin | `components/AdminDashboard.tsx` | `components/Admin/Dashboard.tsx` |
| Service Selector | - | `components/Booking/ServiceSelector.tsx` |
| Date Time Selector | - | `components/Booking/DateTimeSelector.tsx` |
| Booking Progress | - | `components/Booking/BookingProgress.tsx` |
| Booking Success | - | `components/Booking/BookingSuccess.tsx` |
| Admin Stats | - | `components/Admin/StatsCard.tsx` |
| Admin Filters | - | `components/Admin/AppointmentFilters.tsx` |
| Admin Table | - | `components/Admin/AppointmentTable.tsx` |

---

## ✅ Step-by-Step Update Instructions

### For Booking Page:

1. Open: `app/[locale]/booking/page.tsx`
2. Find: `import BookingComponent from '@/components/BookingComponent';`
3. Replace with: `import BookingComponent from '@/components/Booking';`
4. Save file
5. Test: Visit booking page (should work same as before)

### For Admin Page:

1. Open: `app/[locale]/admin/page.tsx`
2. Find: `import AdminDashboard from '@/components/AdminDashboard';`
3. Replace with: `import Dashboard from '@/components/Admin/Dashboard';`
4. Find in JSX: `<AdminDashboard />`
5. Replace with: `<Dashboard />`
6. Save file
7. Test: Visit admin page (should work same as before)

---

## 🔍 Checking for Other References

Search your codebase for:

```bash
# Search for old BookingComponent imports
grep -r "BookingComponent" --include="*.tsx" --include="*.ts"

# Search for old AdminDashboard imports
grep -r "AdminDashboard" --include="*.tsx" --include="*.ts"
```

If you find any matches, update them using the new import paths.

---

## ⚠️ Important Notes

1. **The old files can stay**: The old `BookingComponent.tsx` and `AdminDashboard.tsx` files can remain for now, but they won't be used.

2. **Performance**: No performance impact from this change - it's just better code organization.

3. **Backwards compatible**: The new components have the exact same props and behavior as the old ones.

4. **All features included**: All functionality from the old components is preserved in the new split components.

---

## 🚀 Verification Checklist

After updating imports, verify:

- [ ] Booking page loads without errors
- [ ] Booking form works correctly
- [ ] Time slots update dynamically
- [ ] Admin dashboard loads without errors
- [ ] Admin can filter appointments
- [ ] WhatsApp button works
- [ ] Dark mode works on both pages
- [ ] Arabic/English language switch works

---

## 💡 Optional: Delete Old Files

If you want to clean up completely, you can delete the old files:

```bash
# Only if you've updated all imports
rm components/BookingComponent.tsx
rm components/AdminDashboard.tsx
```

But it's safe to keep them as backups.

---

## 📞 Troubleshooting

### Issue: Import errors after updating

**Solution**:
1. Clear Next.js cache: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+F5`

### Issue: Component not rendering

**Solution**:
1. Check file path is correct
2. Make sure index.tsx exists in the folder
3. Verify component name matches import name

### Issue: Props are undefined

**Solution**:
1. The new components have same props as old ones
2. Check TypeScript errors in console
3. Ensure no props are being passed incorrectly

---

**Last Updated**: February 17, 2026
