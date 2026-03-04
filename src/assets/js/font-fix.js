// Force Modern Fonts - JavaScript Solution
// This script will force modern fonts after page load

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function forceModernFonts() {
        // Get all elements
        const allElements = document.querySelectorAll('*');
        
        // Font families - try different approaches
        const primaryFont = 'Poppins, sans-serif';
        const secondaryFont = 'Poppins, sans-serif';
        
        // Check if fonts are loaded
        console.log('Poppins loaded:', document.fonts.check('1em Poppins'));
        console.log('Poppins (secondary) loaded:', document.fonts.check('1em Poppins'));
        
        // Force font on all elements with multiple approaches
        allElements.forEach(element => {
            const tagName = element.tagName.toLowerCase();
            
            // Check if it's a heading
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                // Try multiple ways to set the font
                element.style.setProperty('font-family', secondaryFont, 'important');
                element.style.fontFamily = secondaryFont;
            } else {
                // Try multiple ways to set the font
                element.style.setProperty('font-family', primaryFont, 'important');
                element.style.fontFamily = primaryFont;
            }
        });
        
        // Force specific classes
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6');
        headings.forEach(element => {
            element.style.setProperty('font-family', secondaryFont, 'important');
            element.style.fontFamily = secondaryFont;
        });
        
        // Force text elements
        const textElements = document.querySelectorAll('p, span, div, a, button, input, textarea, select, label, li, td, th');
        textElements.forEach(element => {
            element.style.setProperty('font-family', primaryFont, 'important');
            element.style.fontFamily = primaryFont;
        });
        
        // Force specific problematic elements
        const problematicElements = document.querySelectorAll('.bread, .breadcrumbs, .slider-text, .ftco-animate, .orange, #activities, .text-center, .flex-center, .wrapper, .container, .row');
        problematicElements.forEach(element => {
            element.style.setProperty('font-family', primaryFont, 'important');
            element.style.fontFamily = primaryFont;
        });
        
        // Force headings within problematic elements
        problematicElements.forEach(element => {
            const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6');
            headings.forEach(heading => {
                heading.style.setProperty('font-family', secondaryFont, 'important');
                heading.style.fontFamily = secondaryFont;
            });
        });
        
        // Force table cells
        const tableCells = document.querySelectorAll('td, th');
        tableCells.forEach(element => {
            element.style.setProperty('font-family', primaryFont, 'important');
            element.style.fontFamily = primaryFont;
        });
        
        // Force headings in table cells
        tableCells.forEach(element => {
            const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach(heading => {
                heading.style.setProperty('font-family', secondaryFont, 'important');
                heading.style.fontFamily = secondaryFont;
            });
        });
        
        // Force inline styles
        const inlineStyledElements = document.querySelectorAll('[style*="font-family"]');
        inlineStyledElements.forEach(element => {
            const tagName = element.tagName.toLowerCase();
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                element.style.setProperty('font-family', secondaryFont, 'important');
                element.style.fontFamily = secondaryFont;
            } else {
                element.style.setProperty('font-family', primaryFont, 'important');
                element.style.fontFamily = primaryFont;
            }
        });
        
        // Test specific elements
        const testHeading = document.querySelector('h1');
        const testText = document.querySelector('p');
        
        if (testHeading) {
            console.log('Heading computed font:', getComputedStyle(testHeading).fontFamily);
            console.log('Heading inline font:', testHeading.style.fontFamily);
        }
        
        if (testText) {
            console.log('Text computed font:', getComputedStyle(testText).fontFamily);
            console.log('Text inline font:', testText.style.fontFamily);
        }
        
        // Force font loading
        document.fonts.load('1em Poppins').then(() => {
            console.log('Poppins fonts loaded successfully');
            forceModernFonts(); // Re-apply after fonts load
        });
        
        document.fonts.load('1em Poppins').then(() => {
            console.log('Poppins (secondary) fonts loaded successfully');
            forceModernFonts(); // Re-apply after fonts load
        });
        
        console.log('Modern fonts forced successfully');
    }
    
    // Run immediately and also after DOM is ready
    forceModernFonts();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceModernFonts);
    } else {
        // DOM is already ready, run again after a short delay
        setTimeout(forceModernFonts, 100);
    }
    
    // Also run after window loads to catch dynamically loaded content
    window.addEventListener('load', forceModernFonts);
    
    // Run periodically to catch any changes (but not too frequently)
    setInterval(forceModernFonts, 2000);
    
})();
