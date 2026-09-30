# AI-LOG.md

## Tool used

- Antigravity (Claude Sonnet 4.6)
- Gemini 3.1 Pro

---

## Bối cảnh

Bài tập yêu cầu implement `cartTotal(items, options)` trong `src/cart.js` bằng plain JavaScript, không được dùng dependencies ngoài.
Tôi dùng AI assistant để hỗ trợ từng bước theo quy trình được hướng dẫn: dựng harness trước, viết brief, rồi mới implement.

---

## Những gì AI tạo ra

| File                       | Nội dung AI tạo                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `RULES.md`                 | Rules file: stack, commands, gate, 4 quy tắc "never"                                        |
| `package.json`             | Thêm 2 scripts: `format` và `format:check` (Prettier)                                       |
| `.prettierignore`          | Bỏ qua `node_modules`                                                                       |
| `.github/workflows/ci.yml` | CI chạy `format:check` + `npm test` trên mọi push                                           |
| `src/cart.js`              | Implementation: validate → empty check → subtotal → VAT → shipping → `Math.round`           |
| `test/cart.test.js`        | 8 test cases: happy path, empty cart, threshold, shipping fee, 3 × RangeError, typeof check |

---

## Những gì tôi đã làm

- Tôi tự viết toàn bộ nội dung gốc file `BRIEF.md` (task, files, formula, edge cases, constraints, worked example) và nội dung trong file `AI-LOG.md`, AI chỉ format lại định dạng markdown cho đẹp, nội dung không thay đổi.

- Sau mỗi lần AI sinh code, tôi đọc toàn bộ diff trước khi commit file **`src/cart.js`**:
  - Validation đặt trước `items.length === 0` check: đúng vì nếu có item với price âm thì vẫn phải throw, dù chỉ có 1 item.
  - `!Number.isInteger(item.qty) || item.qty < 1`: bắt được cả `1.5`, `NaN`, `0`, số âm - đủ theo spec.
  - `subtotal >= options.freeShipFrom` dùng `>=` không phải `>`: đúng với edge case "free at the threshold".
  - `Math.round(...)` thay vì `toFixed()`: trả về `number`, không phải `string`.
  - Không có `import` nào từ `node_modules`: đúng ràng buộc "no dependencies".

- File **`test/cart.test.js`** được tôi kiểm tra từng test:
  - Mỗi test chỉ assert một điều (không assert mock).
  - Tên test đủ mô tả để khi fail biết ngay lý do.
  - Số kỳ vọng (`467400`, `540000`, `138000`) tôi tính lại để xác nhận đúng.
- Toàn bộ code AI sinh ra không gặp lỗi và khớp với spec, do đó tôi không cần sửa hay từ chối phần nào sau khi đã đọc và xác nhận như trên.
