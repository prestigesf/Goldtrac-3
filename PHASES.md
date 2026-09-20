# Phases

## Phase 0 — claim
GoldTrac is the spine. Four apps sit on one receipt. Not a pile of scripts.

## Phase 1 — lattice only (11 Sep 2026)
prestige-mcp: mintGoldTracReceipt export fixed (ff364ac, 8f7082e).
CLI: npx tsx src/goldtrac-cli-mint.ts --demo
alg = ML-DSA-65. No ECDSA on the live mint path.

## Phase 2 — witness
witness/public-key.json, tip.json, revoke.json.
sign_backend: SOFTWARE. fips_140_module: false.

## Phase 3 — one schema
GoldTracReceiptV1 nine fields.
Deadline UNSIGNED envelope is not a leaf until sig exists.

## Phase 4 — public face (19 Sep 2026)
Field landing. Outlined GoldTrac. Leaf mark 18px. Verify / Spec / Leaf.

## Phase 5 — operator surface
PrestigeMCP page. Proxy is still a process.

## Not a phase yet
HSM. FIPS 140-3 module. TSA live. Browser ML-DSA verify.
