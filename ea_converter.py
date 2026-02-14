#!/usr/bin/env python3
"""Simple EA converter for common MQL4 -> MQL5 API calls.

This tool performs text-based conversion intended to speed up migration.
It does not guarantee a fully-compilable MQL5 EA and should be reviewed manually.
"""

from __future__ import annotations

import argparse
from pathlib import Path
import re

REPLACEMENTS = [
    (r"\bOrderSend\s*\(", "trade.Buy("),
    (r"\bOrderClose\s*\(", "trade.PositionClose("),
    (r"\bAsk\b", "SymbolInfoDouble(_Symbol, SYMBOL_ASK)"),
    (r"\bBid\b", "SymbolInfoDouble(_Symbol, SYMBOL_BID)"),
    (r"\bPoint\b", "_Point"),
    (r"\bDigits\b", "_Digits"),
    (r"\bMarketInfo\s*\(([^,]+),\s*MODE_SPREAD\)", r"(int)SymbolInfoInteger(\1, SYMBOL_SPREAD)"),
    (r"\bOrderSelect\s*\(", "HistoryOrderSelect("),
]

HEADER_SNIPPET = """#include <Trade/Trade.mqh>
CTrade trade;
"""


def convert_source(content: str) -> str:
    converted = content
    for pattern, replacement in REPLACEMENTS:
        converted = re.sub(pattern, replacement, converted)

    if "CTrade trade;" not in converted:
        converted = HEADER_SNIPPET + "\n" + converted

    note = "// NOTE: auto-converted from MQL4 style; verify logic before live trading.\n"
    if not converted.startswith("// NOTE:"):
        converted = note + converted

    return converted


def convert_file(input_path: Path, output_path: Path) -> None:
    source = input_path.read_text(encoding="utf-8")
    converted = convert_source(source)
    output_path.write_text(converted, encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert common MQL4 EA snippets to MQL5-style code.")
    parser.add_argument("input", type=Path, help="Path to input .mq4/.mq5 source")
    parser.add_argument("-o", "--output", type=Path, help="Path for converted output file")
    args = parser.parse_args()

    output = args.output or args.input.with_name(args.input.stem + "_converted.mq5")
    convert_file(args.input, output)
    print(f"Converted file written to: {output}")
