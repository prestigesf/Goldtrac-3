// Key custody for GoldTrac. v0 is SOFTWARE. ENCLAVE/HSM are explicit backends.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import type { GoldTracCustody, GoldTracFips140 } from "./goldtrac-receipt.ts";
export const DEFAULT_CUSTODY: GoldTracCustody = "SOFTWARE";
export const DEFAULT_FIPS_140: GoldTracFips140 = "NOT_CLAIMED";
export function kidFromPublicKey(publicKey: Uint8Array): string {
  const fromEnv = process.env.GOLDTRAC_KID?.trim();
  if (fromEnv) return fromEnv;
  const digest = createHash("sha256").update(publicKey).digest("hex");
  return `gt-${digest.slice(0, 16)}`;
}
export function currentCustody(): GoldTracCustody {
  const raw = (process.env.GOLDTRAC_CUSTODY ?? "SOFTWARE").trim().toUpperCase();
  if (raw === "ENCLAVE" || raw === "HSM") return raw;
  return "SOFTWARE";
}
export function currentFips140(): GoldTracFips140 {
  const raw = (process.env.GOLDTRAC_FIPS_140_3 ?? "NOT_CLAIMED").trim().toUpperCase();
  if (raw === "IN_PROCESS" || raw === "CERTIFIED") return raw;
  return "NOT_CLAIMED";
}
export function defaultRevokeFile(): string {
  return process.env.GOLDTRAC_REVOKE_FILE?.trim() || "witness/revoke.json";
}
export function externalSignCommand(): string | null {
  return process.env.GOLDTRAC_SIGN_CMD?.trim() || null;
}
