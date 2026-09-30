# Brief — Implement `cartTotal(items, options)`

## Task

Implement the exported function `cartTotal(items, options)` in `src/cart.js`.
The function calculates the total cost of a shopping cart including VAT and shipping fee.

---

## Files allowed to modify

| File                | Purpose                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| `src/cart.js`       | Implement the function here (replace the `throw new Error('not implemented')` stub) |
| `test/cart.test.js` | Add more test cases here                                                            |

Do **not** touch `package.json`, `RULES.md`, `.github/`, or any other file.

---

## Function signature

```js
export function cartTotal(items, options) { ... }
```

**Parameters:**

- `items` — array of objects, each with:
  - `name` (string) — product name, not used in calculation
  - `price` (number) — unit price in VND, must be ≥ 0
  - `qty` (number) — quantity, must be a positive integer (1, 2, 3, …)

- `options` — object with:
  - `vatRate` (number) — e.g. `0.08` means 8% VAT
  - `freeShipFrom` (number) — subtotal threshold for free shipping
  - `shipFee` (number) — shipping fee when subtotal is below threshold

**Return value:** a `number` (not a string), rounded to the nearest whole đồng.

---

## Formula

```
subtotal = sum of (price × qty) for each item
VAT      = subtotal × vatRate
shipping = 0        if subtotal >= freeShipFrom
           shipFee  otherwise
result   = subtotal + VAT + shipping   ← round to integer, return as number
```

---

## Edge cases and error handling

| Case                                                 | Expected behaviour                                      |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `items` is an empty array `[]`                       | Return `0` immediately — no VAT, no shipping            |
| `price < 0` (negative price)                         | Throw `RangeError`                                      |
| `qty` is not a positive integer (0, -1, 1.5, NaN, …) | Throw `RangeError`                                      |
| `subtotal === freeShipFrom` exactly                  | Shipping = 0 (free at the threshold, not just above it) |

---

## Hard constraints

- **No dependencies** — do not `import` anything from `node_modules`; only built-in Node.js modules are allowed (and none are needed here)
- **Return a `number`** — do not use `.toFixed()`, which returns a string; use `Math.round()` instead
- Plain JavaScript only — no TypeScript, no JSX

---

## Worked example (must pass)

```js
const items = [
  { name: "Áo thun", price: 180000, qty: 2 },
  { name: "Sổ tay", price: 45000, qty: 1 },
];
const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };

cartTotal(items, options); // → 467400
```

Calculation:

- subtotal = 180000 × 2 + 45000 × 1 = **405 000**
- VAT = 405 000 × 0.08 = **32 400**
- shipping = 30 000 (405 000 < 500 000, so not free)
- total = 405 000 + 32 400 + 30 000 = **467 400**

---

## Tests to add in `test/cart.test.js`

At minimum, cover:

1. The worked example above → `467400`
2. Empty cart → `0`
3. Free shipping threshold — subtotal exactly at `freeShipFrom` → shipping = `0`
4. Negative price → throws `RangeError`
5. Non-integer qty (e.g. `1.5`) → throws `RangeError`
