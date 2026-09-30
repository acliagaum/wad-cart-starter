# Project Rules

## Stack

- **Runtime**: Node.js (≥ 18) — built-in `node:test` and `node:assert/strict` only
- **Language**: Plain JavaScript, ES Modules (`"type": "module"`)
- **No test framework**: do not install jest, vitest, mocha, or any external test runner

## Commands

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm test`             | Run all tests with Node's built-in runner                |
| `npm run format:check` | Check code style with Prettier (must pass before commit) |
| `npm run format`       | Auto-fix formatting                                      |

## Gate (must be green before every commit)

1. `npm test` — all tests pass
2. `npm run format:check` — no formatting violations

Both gates run automatically on every push via GitHub Actions (see `.github/workflows/ci.yml`).

## Never

- **Never** add a runtime dependency to `package.json` — `cartTotal` must be plain JavaScript with zero imports from `node_modules`
- **Never** use `toFixed()` on the return value — it returns a string, not a number
- **Never** swallow errors with an empty `catch {}` or `catch (e) { console.log(e) }`
- **Never** commit a failing test

## File layout

```
src/cart.js          ← only file you implement
test/cart.test.js    ← add test cases here
RULES.md             ← this file
```

Only `src/cart.js` and `test/cart.test.js` should be modified for the implementation.
