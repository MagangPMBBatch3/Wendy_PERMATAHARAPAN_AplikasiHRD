# Navbar Usage Guide

## Overview

The navbar is a responsive navigation component that provides access to all 18 modules of the HRD application. It automatically appears on every page through the main layout template.

## Navigation Structure

### Desktop Navigation
- **Horizontal menu bar** with dropdown categories
- **Hover-activated dropdowns** for sub-menu visibility
- **User profile button** in top-right corner
- **Responsive design** that adapts to screen size

### Mobile Navigation
- **Hamburger menu button** (☰) on the right
- **Slide-out menu** with all navigation links
- **Single-column layout** for easy mobile access

## Menu Categories

### 📊 Dashboard
Direct link to the main dashboard page.

### 👥 HR Management
Manages staff and organizational structure:
- **Staff** - Employee records and management
- **Levels** - Job levels and hierarchies
- **Users** - System user accounts
- **User Profiles** - Extended user information

### 📁 Projects
Manages projects and related tasks:
- **Projects** - Project creation and tracking
- **Tasks** - Task management and assignment
- **Performance** - Performance evaluations

### ⏰ Attendance
Tracks employee attendance:
- **Attendance** - Daily attendance records
- **Overtime** - Overtime tracking

### 💰 Payroll
Manages salary and compensation:
- **Payroll** - Payroll creation and processing
- **Detail Payroll** - Detailed payroll information
- **Allowances** - Additional benefits and allowances
- **Deductions** - Salary deductions
- **Late Deductions** - Late/penalty deductions

### 📢 More
Additional modules and features:
- **Requests** - Employee requests (leave, etc.)
- **Announcements** - Company announcements
- **Activity Log** - System activity log (read-only)

### 👤 User Account (Top-Right)
- **My Profile** - View/edit user profile
- **Logout** - Sign out of the application

## Features

### Responsive Design
- Adapts automatically to screen size
- Desktop: Full horizontal menu with dropdowns
- Mobile: Hamburger menu with vertical layout

### Interactive Hover Effects
- Dropdown menus appear on hover (desktop)
- Smooth transitions between states
- Color changes on hover

### Accessibility
- All links are properly labeled
- Keyboard navigation supported
- CSRF protection on logout

### Mobile Menu Toggle
- Click hamburger icon to show/hide menu
- Menu closes when navigating
- Full list of all links available

## How Links Work

Each navbar link points to a specific route:

```
/dashboard          → Dashboard home
/staff              → Staff management
/level              → Levels management
/user               → Users management
/userprofile        → User profile
/proyek             → Projects management
/tasks              → Tasks management
/kinerja            → Performance management
/absensi            → Attendance management
/overtime           → Overtime management
/payroll            → Payroll management
/detailpayroll      → Detail payroll
/tunjangan          → Allowances
/pengurangan        → Deductions
/pengurangantelat   → Late deductions
/permintaan         → Requests
/pengumuman         → Announcements
/activitylog        → Activity log
/logout             → Logout (POST)
```

## Visual Design

### Colors
- **Background**: Blue gradient (from-blue-600 to-blue-800)
- **Text**: Light gray when inactive (text-gray-200)
- **Hover**: Blue-700 background with white text
- **Active User Button**: Darker blue (bg-blue-700)

### Typography
- **Font Size**: Small to base (text-sm to base)
- **Font Weight**: Medium to bold (font-medium to font-bold)
- **Logo Size**: Extra large (text-2xl)

### Spacing
- **Horizontal Padding**: 3-4 units (px-3, px-4)
- **Vertical Padding**: 2 units (py-2)
- **Height**: 16 units (h-16) = 64px

### Transitions
- **Duration**: 200ms (transition duration-200)
- **Effect**: Smooth opacity and visibility changes
- **On Hover**: Fade-in dropdown menus

## Mobile Usage

### Accessing the Mobile Menu
1. On mobile devices, click the hamburger button (☰) in top-right
2. Menu slides down showing all navigation options
3. Click any link to navigate
4. Menu automatically closes

### Mobile Menu Benefits
- Full vertical menu for easier touch navigation
- All 18+ links accessible in one place
- No nested dropdowns (all links visible)
- User account links at the bottom

## Customization Options

### Add New Links
Edit `/resources/views/layouts/navbar.blade.php`:
```blade
<a href="/new-page" class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
    New Module
</a>
```

### Change Colors
Modify the Tailwind classes:
- Change `from-blue-600 to-blue-800` for background color
- Change `hover:bg-blue-700` for hover color
- Change `text-gray-200` for text color

### Modify Menu Structure
Reorganize dropdown categories by moving `<div class="relative group">` sections around.

### Adjust Responsive Breakpoint
- `hidden md:block` → Changes at medium (768px) breakpoint
- Use `hidden lg:block` for larger breakpoint
- Use `hidden sm:block` for smaller breakpoint

## Troubleshooting

### Dropdown menus not appearing
- Check that CSS is properly loaded
- Verify Tailwind CSS is included in head
- Ensure no z-index conflicts with other elements

### Mobile menu not toggling
- Check JavaScript console for errors
- Verify the ID `mobile-menu-btn` exists
- Check that `mobile-menu` div ID is correct

### Links not working
- Verify routes are defined in `routes/web.php`
- Check controllers exist for each route
- Verify authentication middleware is working

### Styling looks different
- Clear browser cache
- Rebuild Tailwind CSS
- Check that no conflicting CSS is loaded

## Best Practices

1. **Keep it organized** - Group related items in dropdowns
2. **Label clearly** - Use descriptive names for menu items
3. **Test responsiveness** - Check on multiple device sizes
4. **Maintain consistency** - Use same styling for all links
5. **User feedback** - Provide hover/active states

## Performance Tips

1. **Minimal JavaScript** - Only for mobile menu toggle
2. **CSS-only dropdowns** - Uses hover without JavaScript
3. **Fast navigation** - No API calls for menu rendering
4. **Lightweight HTML** - Minimal DOM elements

---

**Component Location**: `/resources/views/layouts/navbar.blade.php`

**Layout Integration**: Automatically included in `/resources/views/layouts/app.blade.php`

**Mobile Toggle Script**: Lines 119-123 in navbar.blade.php

**Tested**: All 18 routes and responsive design verified
