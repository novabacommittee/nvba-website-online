---
description: Apply modern fonts to Saraswati Puja 2026 page
---

# Apply Modern Fonts to Saraswati Puja 2026

This workflow applies the modern Poppins + Playfair Display font combination to the Saraswati Puja 2026 page.

## Steps to Apply Modern Fonts

1. **Update SCSS file**: Add comprehensive font rules with !important declarations
2. **Target specific elements**: Handle nested elements in tables and mixed content
3. **Force overrides**: Use maximum specificity to override existing styles
4. **Test and verify**: Hard refresh browser to see changes

## Key Changes Made

### Font Variables
```scss
$font-primary: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-secondary: 'Playfair Display', Georgia, serif;
```

### Comprehensive Font Rules
- All headings (h1-h6): Playfair Display
- All text elements (p, span, div, a, td, th): Poppins
- Nested elements: Specific overrides for h6 p, h6 a, etc.
- Table elements: Specific targeting for #activities table

### Specific Problem Solved
The page had mixed font usage where:
- Some headings used old fonts
- Nested elements in tables had conflicting styles
- Some paragraphs inside headings weren't updated

## Files Modified
- `src/app/pages/saraswatipuja2026/saraswatipuja2026.component.scss`

## Verification
After applying changes, refresh the page with Ctrl+F5 to see the modern fonts applied consistently across all elements.