// Implement cartTotal here. See README.md for the specification.
export function cartTotal(items, options) {
  // 1. Validate mỗi item trước khi tính toán
  //    - price âm → RangeError
  //    - qty không phải số nguyên dương → RangeError
  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError(`price must be >= 0, got ${item.price}`);
    }
    if (!Number.isInteger(item.qty) || item.qty < 1) {
      throw new RangeError(`qty must be a positive integer, got ${item.qty}`);
    }
  }

  // 2. Giỏ hàng rỗng → trả về 0 ngay, không tính VAT hay shipping
  if (items.length === 0) return 0;

  // 3. Tính subtotal = tổng (price × qty) của mỗi item
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 4. Tính VAT
  const vat = subtotal * options.vatRate;

  // 5. Tính phí ship: miễn phí nếu subtotal >= ngưỡng freeShipFrom
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee;

  // 6. Trả về tổng, làm tròn thành số nguyên (Math.round trả về number, không dùng toFixed)
  return Math.round(subtotal + vat + shipping);
}
