import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";

// ─── Options dùng chung cho nhiều test ──────────────────────────────────────
const opts = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };

// ─── 1. Happy path: ví dụ từ slide ──────────────────────────────────────────
test("the example from the slides", () => {
  const items = [
    { name: "Áo thun", price: 180000, qty: 2 },
    { name: "Sổ tay", price: 45000, qty: 1 },
  ];
  // subtotal=405000, VAT=32400, ship=30000 → 467400
  assert.equal(cartTotal(items, opts), 467400);
});

// ─── 2. Giỏ hàng rỗng → trả về 0, không tính VAT hay shipping ───────────────
test("empty cart returns 0", () => {
  assert.equal(cartTotal([], opts), 0);
});

// ─── 3. Free shipping: subtotal đúng bằng ngưỡng → ship = 0 ─────────────────
test("free shipping when subtotal equals the threshold", () => {
  // 500000 × 1 = subtotal 500000 = freeShipFrom → shipping = 0
  const items = [{ name: "X", price: 500000, qty: 1 }];
  // subtotal=500000, VAT=40000, ship=0 → 540000
  assert.equal(cartTotal(items, opts), 540000);
});

// ─── 4. Shipping bình thường khi subtotal dưới ngưỡng ───────────────────────
test("shipping fee applied when subtotal is below threshold", () => {
  const items = [{ name: "Y", price: 100000, qty: 1 }];
  // subtotal=100000, VAT=8000, ship=30000 → 138000
  assert.equal(cartTotal(items, opts), 138000);
});

// ─── 5. RangeError: price âm ─────────────────────────────────────────────────
test("negative price throws RangeError", () => {
  const items = [{ name: "Bad", price: -1, qty: 1 }];
  assert.throws(() => cartTotal(items, opts), RangeError);
});

// ─── 6. RangeError: qty là số thập phân ──────────────────────────────────────
test("fractional qty throws RangeError", () => {
  const items = [{ name: "Bad", price: 1000, qty: 1.5 }];
  assert.throws(() => cartTotal(items, opts), RangeError);
});

// ─── 7. RangeError: qty = 0 (không phải số nguyên dương) ────────────────────
test("qty of zero throws RangeError", () => {
  const items = [{ name: "Bad", price: 1000, qty: 0 }];
  assert.throws(() => cartTotal(items, opts), RangeError);
});

// ─── 8. Kết quả phải là number, không phải string ───────────────────────────
test("result is a number, not a string", () => {
  const items = [{ name: "Áo thun", price: 180000, qty: 2 }];
  assert.equal(typeof cartTotal(items, opts), "number");
});
