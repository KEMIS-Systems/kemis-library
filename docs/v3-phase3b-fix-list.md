# Phase 3b PrimeReact 10 / React 19 Fix List

Generated from `npx tsc --noEmit` after the major bump (commit 7bc5d90).
Consumed by Tasks 3–9 and DELETED at end of Phase 3b.

## Summary

- Total error count: 4
- Files affected: 2

## Files

### src/components/Form/Dropdown/index.tsx (2 errors)
- TS2503: Cannot find namespace 'JSX' — line 24
- TS2503: Cannot find namespace 'JSX' — line 25

### src/components/KemisProvider/refs.ts (1 error)
- TS2322: Type 'RefObject<Toast | null>' is not assignable to type 'RefObject<Toast>' — line 11
  - Type 'Toast | null' is not assignable to type 'Toast'
  - Type 'null' is not assignable to type 'Toast'
