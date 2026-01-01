// COMPREHENSIVE Excel Processor - ALL 3 SHEETS
// Extracts pricing data from ALL sheets in each Excel file

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const BASE_DIR = './STYLE_PRICING_DATA/Houspire-Individual Style Staging';

function processAllSheets() {
  const allData = {
    sheet1_specifications: [],  // Design specifications and materials
    sheet2_items: [],            // Item checklist (already extracted)
    sheet3_finishes: []          // Finish combinations and pricing
  };
  
  const styles = fs.readdirSync(BASE_DIR).filter(f => {
    const stat = fs.statSync(path.join(BASE_DIR, f));
    return stat.isDirectory() && f !== '.DS_Store';
  });
  
  console.log('='.repeat(70));
  console.log('EXTRACTING ALL 3 SHEETS FROM 169 EXCEL FILES');
  console.log('='.repeat(70));
  
  for (const styleName of styles) {
    const styleDir = path.join(BASE_DIR, styleName);
    const files = fs.readdirSync(styleDir).filter(f => f.endsWith('.xlsx'));
    
    console.log(`\n📁 ${styleName}: ${files.length} files`);
    
    for (const file of files) {
      const filePath = path.join(styleDir, file);
      
      try {
        const workbook = XLSX.readFile(filePath);
        const roomMatch = file.match(/^(.+?)-/i) || file.match(/^(.+?)\.xlsx$/i);
        const roomType = roomMatch ? roomMatch[1].toLowerCase().replace(/\s+/g, '_') : 'unknown';
        const style = styleName.toLowerCase().replace(/\s+/g, '_');
        
        // SHEET 1: Main Specification (Materials, Rates, Guidelines)
        if (workbook.SheetNames[0]) {
          const sheet1 = workbook.Sheets[workbook.SheetNames[0]];
          const data1 = XLSX.utils.sheet_to_json(sheet1, {header: 1});
          
          // Look for rows with RATE/PRICE/MATERIAL data
          data1.forEach((row, idx) => {
            const rowStr = row.join(' ').toLowerCase();
            if (rowStr.includes('₹') || 
                rowStr.includes('rate') || 
                rowStr.includes('price') ||
                (rowStr.includes('material') && row.length > 3)) {
              
              allData.sheet1_specifications.push({
                style,
                roomType,
                sourceFile: file,
                sheetName: workbook.SheetNames[0],
                rowIndex: idx,
                data: row
              });
            }
          });
        }
        
        // SHEET 3: Finish Combinations (CRITICAL PRICING DATA)
        if (workbook.SheetNames[2]) {
          const sheet3 = workbook.Sheets[workbook.SheetNames[2]];
          const data3 = XLSX.utils.sheet_to_json(sheet3, {header: 1});
          
          // Find header row
          let headerRow = -1;
          for (let i = 0; i < Math.min(5, data3.length); i++) {
            const row = data3[i];
            if (row.some(cell => String(cell).toUpperCase().includes('FINISH') || 
                               String(cell).toUpperCase().includes('PRICE'))) {
              headerRow = i;
              break;
            }
          }
          
          if (headerRow !== -1) {
            const headers = data3[headerRow];
            const finishIdx = headers.findIndex(h => String(h).toUpperCase().includes('FINISH'));
            const priceIdx = headers.findIndex(h => String(h).toUpperCase().includes('PRICE'));
            const ratingIdx = headers.findIndex(h => String(h).toUpperCase().includes('RATING'));
            
            // Process finish rows
            for (let i = headerRow + 1; i < data3.length; i++) {
              const row = data3[i];
              
              // Skip group headers
              if (row[0] && typeof row[0] === 'string' && row[0].includes('(')) continue;
              
              const finish = finishIdx !== -1 ? row[finishIdx] : null;
              const price = priceIdx !== -1 ? row[priceIdx] : null;
              const rating = ratingIdx !== -1 ? row[ratingIdx] : null;
              
              if (finish && price) {
                allData.sheet3_finishes.push({
                  style,
                  roomType,
                  sourceFile: file,
                  sheetName: workbook.SheetNames[2],
                  finish_name: String(finish).trim(),
                  price_tier: String(price).trim(),
                  rating: rating ? String(rating).trim() : null,
                  full_row: row
                });
              }
            }
          }
        }
        
      } catch (error) {
        console.log(`  ❌ ${file}: ${error.message}`);
      }
    }
  }
  
  return allData;
}

// Process all sheets
console.log('\nProcessing...\n');
const allData = processAllSheets();

console.log('\n' + '='.repeat(70));
console.log('EXTRACTION COMPLETE');
console.log('='.repeat(70));

console.log(`\nSheet 1 (Specifications with Rates/Materials): ${allData.sheet1_specifications.length} rows`);
console.log(`Sheet 3 (Finish Combinations): ${allData.sheet3_finishes.length} finish options`);

// Save to files
fs.writeFileSync('./sheet1_specifications.json', JSON.stringify(allData.sheet1_specifications, null, 2));
fs.writeFileSync('./sheet3_finishes.json', JSON.stringify(allData.sheet3_finishes, null, 2));

console.log('\n✓ Saved to sheet1_specifications.json');
console.log('✓ Saved to sheet3_finishes.json');

// Show samples
console.log('\n' + '='.repeat(70));
console.log('SAMPLE DATA FROM SHEET 3 (FINISH OPTIONS)');
console.log('='.repeat(70));

const sampleFinishes = allData.sheet3_finishes.slice(0, 10);
sampleFinishes.forEach(f => {
  console.log(`\n${f.style} | ${f.roomType} | ${f.finish_name}`);
  console.log(`  Price Tier: ${f.price_tier} | Rating: ${f.rating || 'N/A'}`);
});

console.log('\n' + '='.repeat(70));
console.log('NEXT STEPS');
console.log('='.repeat(70));
console.log('1. Review sheet1_specifications.json for material/rate data');
console.log('2. Review sheet3_finishes.json for finish pricing');
console.log('3. Integrate this data with existing 2,723 items');
console.log('4. Generate comprehensive pricing database');
