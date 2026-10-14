#!/usr/bin/env node
/**
 * Fails if registry components use Tailwind arbitrary values (e.g. bg-[#fff], p-[13px])
 * or hardcoded colors. Everything must go through Glow tokens.
 *
 * Usage: node scripts/check-arbitrary-values.mjs <dir>
 * Escape hatch for a justified case: put `glow-allow-arbitrary` in a comment on the same line.
 */
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, extname } from "node:path"

const root = process.argv[2] ?? "registry"
const exts = new Set([".ts", ".tsx"])

const rules = [
  { name: "arbitrary value", re: /\b[\w:-]+-\[[^\]]+\]/g },
  { name: "hex color", re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: "rgb/hsl/oklch color", re: /\b(rgba?|hsla?|oklch)\(/g },
]

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : exts.has(extname(p)) ? [p] : []
  })
}

const problems = []
for (const file of walk(root)) {
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    if (line.includes("glow-allow-arbitrary")) return
    for (const { name, re } of rules) {
      for (const m of line.matchAll(re)) problems.push(`${file}:${i + 1}  ${name}: ${m[0]}`)
    }
  })
}

if (problems.length) {
  console.error(`✖ ${problems.length} value(s) bypass Glow tokens:\n` + problems.join("\n"))
  process.exit(1)
}
console.log("✔ No arbitrary values or hardcoded colors in components")
