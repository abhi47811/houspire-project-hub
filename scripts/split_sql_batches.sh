#!/bin/bash

# Split comprehensive_pricing_import.sql into manageable batches
# Each batch will have approximately 1000 lines

INPUT_FILE="/home/user/webapp/CITYWISE_DATA/comprehensive_pricing_import.sql"
OUTPUT_DIR="/home/user/webapp/CITYWISE_DATA/batches"
BATCH_SIZE=5000  # 5000 lines per batch (~300-400 inserts)

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Get total lines
TOTAL_LINES=$(wc -l < "$INPUT_FILE")
echo "Total lines: $TOTAL_LINES"

# Calculate number of batches
NUM_BATCHES=$(( ($TOTAL_LINES + $BATCH_SIZE - 1) / $BATCH_SIZE ))
echo "Creating $NUM_BATCHES batches..."

# Extract header (first 10 lines with comments)
head -10 "$INPUT_FILE" > "$OUTPUT_DIR/header.sql"

# Split the file
CURRENT_LINE=11  # Start after header
BATCH_NUM=1

while [ $CURRENT_LINE -le $TOTAL_LINES ]; do
    BATCH_FILE="$OUTPUT_DIR/batch_$(printf "%02d" $BATCH_NUM).sql"
    
    # Add header to each batch
    cat "$OUTPUT_DIR/header.sql" > "$BATCH_FILE"
    echo "" >> "$BATCH_FILE"
    echo "-- ========================================" >> "$BATCH_FILE"
    echo "-- BATCH $BATCH_NUM of $NUM_BATCHES" >> "$BATCH_FILE"
    echo "-- Lines: $CURRENT_LINE to $(( $CURRENT_LINE + $BATCH_SIZE - 1 ))" >> "$BATCH_FILE"
    echo "-- ========================================" >> "$BATCH_FILE"
    echo "" >> "$BATCH_FILE"
    
    # Extract batch lines
    sed -n "${CURRENT_LINE},$((CURRENT_LINE + BATCH_SIZE - 1))p" "$INPUT_FILE" >> "$BATCH_FILE"
    
    echo "Created $BATCH_FILE"
    
    CURRENT_LINE=$(( $CURRENT_LINE + $BATCH_SIZE ))
    BATCH_NUM=$(( $BATCH_NUM + 1 ))
done

echo ""
echo "✅ Done! Created $NUM_BATCHES batch files in $OUTPUT_DIR"
echo ""
echo "Import order:"
ls -1 "$OUTPUT_DIR"/batch_*.sql | nl
echo ""
echo "To import all batches:"
echo "for f in $OUTPUT_DIR/batch_*.sql; do echo \"Importing \$f...\"; psql < \"\$f\"; done"
