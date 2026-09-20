// Canonical GoldTrac receipt v1 — same fields for every vertical.
export const GOLDTRAC_RECEIPT_SPEC = "goldtrac-receipt-v1" as const;
export const GOLDTRAC_APPS = ["prestige-mcp", "deadlinesf", "billrosetta", "bopcart"] as const;
export type GoldTracApp = (typeof GOLDTRAC_APPS)[number];
export const GOLDTRAC_ALG = "ML-DSA-65" as const;
export type GoldTracCustody = "SOFTWARE" | "ENCLAVE" | "HSM";
export type GoldTracFips140 = "NOT_CLAIMED" | "IN_PROCESS" | "CERTIFIED";
export type GoldTracReceiptCore = {
  spec: typeof GOLDTRAC_RECEIPT_SPEC;
  kid: string;
  alg: typeof GOLDTRAC_ALG;
  payload_hash: string;
  chain_root: string;
  smt_root: string;
  sig: string;
  tsa: string | null;
  tsa_time: string | null;
  app: GoldTracApp;
};
export const REQUIRED_FIELDS = ["kid","alg","payload_hash","chain_root","smt_root","sig","tsa","tsa_time","app"] as const;
export function isGoldTracApp(value: unknown): value is GoldTracApp {
  return typeof value === "string" && (GOLDTRAC_APPS as readonly string[]).includes(value);
}
export function publicSentence(): string {
  return "GoldTrac signs events with ML-DSA-65 (FIPS 204) only. Not ECDSA-P256. Not a FIPS 140 module. Keys are SOFTWARE until an ENCLAVE or HSM backend is wired.";
}
export function missingSpineFields(value: unknown): string[] {
  if (!value || typeof value !== "object") return [...REQUIRED_FIELDS];
  const rec = value as Record<string, unknown>;
  const missing: string[] = [];
  for (const key of REQUIRED_FIELDS) {
    if (key === "tsa" || key === "tsa_time") {
      if (!Object.prototype.hasOwnProperty.call(rec, key)) missing.push(key);
      continue;
    }
    if (rec[key] === undefined || rec[key] === null || rec[key] === "") missing.push(key);
  }
  if (rec.alg !== GOLDTRAC_ALG && rec.signature_algorithm !== GOLDTRAC_ALG) {
    if (!missing.includes("alg")) missing.push("alg");
  }
  if (!isGoldTracApp(rec.app)) missing.push("app");
  return missing;
}
