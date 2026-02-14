# CWC-TRADERS-

EA-style converter utility for quickly migrating common MQL4 Expert Advisor snippets toward MQL5 syntax.

## What this includes
- `ea_converter.py`: Python converter that updates frequent MQL4 calls/variables to MQL5-style API usage.
- `sample_ea.mq4`: Small sample file you can test conversion against.

## Usage
```bash
python3 ea_converter.py sample_ea.mq4
```

or specify output:

```bash
python3 ea_converter.py sample_ea.mq4 -o sample_ea_converted.mq5
```

> Important: This is a starter converter. Review all converted code before compiling or trading live.
