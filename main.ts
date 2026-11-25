import * as fs from "node:fs";
import * as path from "node:path";

const MAX_ENTRY_CHARS = 140;
const ENTRY_TEXT: string =
  "3:04 AM status: compressor fine, crisper humid, and the spinach you bought to become a better person is soup now.";

function validateEntry(text: string): string {
  if (text.trim().length === 0 || text.length > MAX_ENTRY_CHARS || /[\r\n]/.test(text)) {
    throw new Error(`Invalid entry text length or format: ${text.length} chars`);
  }
  return text;
}

function writeEntry(): void {
  const payload = validateEntry(ENTRY_TEXT);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outputPath = path.join(outputDir, "entry.txt");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, payload, { encoding: "utf8", mode: 0o644 });
  fs.chmodSync(outputPath, 0o644);
}

try {
  writeEntry();
} catch {
  process.exit(1);
}
