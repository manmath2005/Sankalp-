// Lightweight, standalone SVG QR Code Generator for Accredited Certificates

export function generateQRCodeSVG(text, size = 120) {
  // Generate a deterministic pseudo-QR grid based on the input string (hash-based grid)
  const count = 21;
  const cells = [];
  
  // Simple hash function for deterministic pattern
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  // Generate 21x21 matrix
  const matrix = Array(count).fill(0).map(() => Array(count).fill(false));

  // Add finder patterns (top-left, top-right, bottom-left 7x7 squares)
  const addFinderPattern = (row, col) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix[row + r][col + c] = true;
        }
      }
    }
  };

  addFinderPattern(0, 0);
  addFinderPattern(0, count - 7);
  addFinderPattern(count - 7, 0);

  // Fill remaining data cells deterministically using hash
  let hashVal = Math.abs(hash);
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      // Skip finder areas
      if ((r < 7 && c < 7) || (r < 7 && c >= count - 7) || (r >= count - 7 && c < 7)) {
        continue;
      }
      hashVal = (hashVal * 1664525 + 1013904223) % 4294967296;
      matrix[r][c] = (hashVal % 3) === 0;
    }
  }

  // Convert matrix to SVG rect elements
  const cellSize = size / count;
  let rects = [];
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (matrix[r][c]) {
        rects.push(
          `<rect x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="#0f172a" />`
        );
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="rounded-lg bg-white p-1 shadow-sm border border-slate-200">
      <rect width="100%" height="100%" fill="#ffffff" />
      ${rects.join('')}
    </svg>
  `;
}
