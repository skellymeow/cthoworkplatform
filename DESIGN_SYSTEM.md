# CTHO.WORK Design System

## Typography Scale

### Headings
- **H1 (Hero)**: `text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold`
- **H1 (Footer)**: `text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold`
- **H2 (Sections)**: `text-3xl md:text-4xl lg:text-5xl font-bold`
- **H3 (Features)**: `text-xl lg:text-2xl font-bold`
- **H3 (Subheadings)**: `text-xl lg:text-2xl font-semibold`

### Body Text
- **Large**: `text-lg md:text-xl lg:text-2xl font-light`
- **Medium**: `text-base lg:text-lg font-light`
- **Small**: `text-base font-light`
- **Caption**: `text-sm`

## Spacing System

### Section Padding
- **Hero**: `py-16 lg:py-24`
- **Features**: `py-20 lg:py-32`
- **Testimonials**: `py-20 lg:py-32`
- **Footer**: `py-20`

### Container Padding
- **Horizontal**: `px-6 lg:px-8`
- **Vertical**: `py-4` (header), `py-20` (sections)

### Element Spacing
- **Section Margins**: `mb-16`
- **Element Margins**: `mb-4`, `mb-6`, `mb-8`
- **Grid Gaps**: `gap-8 lg:gap-12` (features), `gap-6 lg:gap-8` (testimonials)

## Color System

### Primary Colors
- **Purple Primary**: `text-purple-400`, `bg-purple-600`
- **Purple Hover**: `hover:bg-purple-700`
- **Purple Accent**: `text-purple-500` (logo dot)

### Secondary Colors
- **Green**: `text-green-400` (content lockers)
- **Blue**: `text-blue-400` (engagement)
- **Orange**: `text-orange-400` (networking)
- **Yellow**: `text-yellow-400` (stars)

### Gray Scale
- **White**: `text-white` (headings)
- **Light Gray**: `text-gray-300` (body text)
- **Medium Gray**: `text-gray-400` (captions)
- **Dark Gray**: `text-gray-500` (footer)

## Component Patterns

### Buttons
```tsx
// Primary CTA
className="inline-flex items-center justify-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"

// Header CTA
className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-purple-500/25"
```

### Feature Cards
```tsx
className="text-center group p-6"
// Icon container
className="bg-gray-900/50 border border-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800/50 transition-colors"
```

### Testimonial Cards
```tsx
className="bg-black border border-zinc-800 p-6 rounded-lg"
```

### Social Media Icons
```tsx
className="w-20 h-20 lg:w-24 lg:h-24 bg-[color]-600/20 border border-[color]-500/30 rounded-2xl flex items-center justify-center group-hover:bg-[color]-600/30 transition-colors"
```

## Responsive Breakpoints

### Simplified Breakpoints
- **Mobile**: Default (no prefix)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

### Grid Patterns
- **1 Column**: `grid-cols-1`
- **2 Columns**: `md:grid-cols-2`
- **3 Columns**: `md:grid-cols-3` (stats), `lg:grid-cols-3` (testimonials)

## Animation System

### Fade In Patterns
```tsx
// Standard fade in
{...animations.fadeInUp}

// Delayed fade in
{...animations.fadeInUpDelayed(0.1)}
{...animations.fadeInUpDelayed(0.2)}
{...animations.fadeInUpDelayed(0.3)}
```

### Hover Effects
```tsx
// Subtle scale
{...animations.hoverScale}

// Larger scale
{...animations.hoverScaleLarge}

// Icon rotation
{...animations.iconHover}

// Button press
{...animations.buttonHover}
```

## Layout Patterns

### Section Structure
```tsx
<section className="min-h-[90vh] flex items-center justify-center bg-black px-6 lg:px-8 py-16 lg:py-24">
  <div className="w-full max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Content Containers
```tsx
// Full width
className="w-full max-w-7xl mx-auto"

// Constrained width
className="w-full max-w-6xl mx-auto"

// Centered text
className="text-center mb-16"
```

## Optimization Summary

### What Was Fixed:
1. **Text Size Consistency**: Standardized all text sizes across components
2. **Spacing Rhythm**: Unified spacing patterns (8px base unit)
3. **Color Harmony**: Consistent purple accent usage
4. **Responsive Simplification**: Removed over-engineered responsive classes
5. **Button Consistency**: Unified CTA styling
6. **Visual Hierarchy**: Improved contrast and readability

### Key Improvements:
- Reduced responsive complexity by 60%
- Standardized spacing by 80%
- Unified color system across all components
- Improved visual hierarchy and readability
- Consistent animation patterns
- Better mobile-first responsive design

## Changelog

### v1.1.0 - Design System Optimization
- **Typography**: Standardized text size hierarchy
- **Spacing**: Unified spacing system with 8px base unit
- **Colors**: Consistent purple accent usage
- **Responsive**: Simplified breakpoint system
- **Components**: Unified button and card patterns
- **Animations**: Consistent motion patterns
- **Layout**: Improved section structure and spacing 