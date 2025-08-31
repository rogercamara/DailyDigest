
import crypto from "node:crypto";
export function urlHash(u: string) {
  return crypto.createHash("sha256").update(u.trim().toLowerCase()).digest("hex");
}
