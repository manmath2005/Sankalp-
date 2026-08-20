const fs = require('fs');
const PDFDocument = require('pdfkit');

// Check if pdfkit is installed or create standalone HTML generator for clean PDF printing
console.log("Checking PDF generator tools...");
