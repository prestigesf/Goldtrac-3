# GoldTrac receipt v1

One receipt for every vertical. If the fields differ, GoldTrac is a story again.

GoldTrac signs events with **ML-DSA-65 (FIPS 204) only**. Not ECDSA-P256. Not a FIPS 140 module. Keys are **SOFTWARE** until an ENCLAVE or HSM backend is wired.

Required: kid, alg, payload_hash, chain_root, smt_root, sig, tsa, tsa_time, app.

```
npx tsx src/cli.ts verify-chain data/goldtrac-chain.jsonl
npx tsx src/cli.ts mint-receipt --app deadlinesf --payload evidence.json
```
