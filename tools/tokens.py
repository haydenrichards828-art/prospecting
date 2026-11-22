#!/usr/bin/env python3
"""Snap Prospect's styles to one standard set of values.

Text sizes  -> 12 13 14 16 20 28 44
Weights     -> 400 600 700
Corners     -> 4 (controls, cards) 8 (sheets, panels) and round (dots, pills)
Control heights (buttons, fields, switches) -> 24 32 36 44 56
Near-duplicate text colours merged into the palette.

Run: python3 tools/tokens.py            (report what would change)
     python3 tools/tokens.py --write    (rewrite v2.css, index.html, v2.js)
Run tools/tokens.py again after big changes to keep the set tight.
"""
import re, sys

FS = [12, 13, 14, 16, 20, 28, 44]
FS_MAP = {10: 12, 11: 12, 15: 14, 17: 16, 18: 20, 19: 20, 21: 20, 22: 20, 23: 20,
          24: 28, 25: 28, 26: 28, 27: 28, 30: 28, 32: 28, 34: 28, 36: 44, 38: 44, 40: 44, 42: 44, 48: 44, 52: 44, 54: 44, 56: 44, 64: 44}
FW_MAP = {'100': '400', '200': '400', '300': '400', '500': '600', '800': '700', '900': '700'}
HEIGHTS = [24, 32, 36, 44, 56]
COLOURS = {'#9ba4b2': '#a3acb9', '#34d399': '#7ee2a8', '#99f6e4': '#5eead4', '#9aa3ad': '#a3acb9', '#9ca3af': '#a3acb9'}
CONTROL = re.compile(r'button|\.b2\b|input|select|\.seg|\.vseg|\.ib[23]?\b|\.cl3?\b|\.tsearch|\.num2|\.ends2|\.fqb2|\.dfb|\.mctl5|\.vbk5|\.bs5|\.ad3|\.pri\b|\.ghost')

changes = {'font-size': 0, 'font-weight': 0, 'border-radius': 0, 'height': 0, 'colour': 0}


def snap_fs(m):
    v = float(m.group(2)); iv = int(round(v))
    if iv in FS and v == iv: return m.group(0)
    new = FS_MAP.get(iv) or min(FS, key=lambda f: abs(f - v))
    changes['font-size'] += 1
    return f'{m.group(1)}{new}px'


def snap_fw(m):
    v = m.group(2)
    if v in FW_MAP:
        changes['font-weight'] += 1
        return m.group(1) + FW_MAP[v]
    return m.group(0)


def snap_radius_val(val):
    out = []
    for tok in val.split():
        mm = re.fullmatch(r'(\d+(?:\.\d+)?)px', tok)
        if not mm: out.append(tok); continue
        v = float(mm.group(1))
        if v == 0 or v >= 100: out.append(tok); continue
        new = 4 if v <= 6 else 8
        if v != new: changes['border-radius'] += 1
        out.append(f'{new}px')
    return ' '.join(out)


def snap_h(v):
    v = float(v)
    if v < 20 or v > 64: return None
    return min(HEIGHTS, key=lambda h: (abs(h - v), h))


def css_pass(css):
    css = re.sub(r'(font-size:\s*)(\d+(?:\.\d+)?)px', snap_fs, css)
    css = re.sub(r'(font-weight:\s*)(\d00)\b', snap_fw, css)
    css = re.sub(r'(border-radius:\s*)([^;}!]+)', lambda m: m.group(1) + snap_radius_val(m.group(2)), css)
    def rule(m):
        sel, body = m.group(1), m.group(2)
        if not CONTROL.search(sel): return m.group(0)
        def hh(mm):
            n = snap_h(mm.group(2))
            if n is None or float(mm.group(2)) == n: return mm.group(0)
            changes['height'] += 1
            return f'{mm.group(1)}{n}px'
        body = re.sub(r'((?<![-\w])(?:min-)?height:\s*)(\d+(?:\.\d+)?)px', hh, body)
        return sel + '{' + body + '}'
    css = re.sub(r'([^{}@]+)\{([^{}]*)\}', rule, css)
    for a, b in COLOURS.items():
        n = len(re.findall(re.escape(a), css, re.I)); changes['colour'] += n
        css = re.sub(re.escape(a), b, css, flags=re.I)
    return css


def inline_pass(src):
    # style="..." attributes inside JS template strings and HTML: sizes, weights, corners, colours
    def st(m):
        s = m.group(2)
        s = re.sub(r'(font-size:\s*)(\d+(?:\.\d+)?)px', snap_fs, s)
        s = re.sub(r'(font-weight:\s*)(\d00)\b', snap_fw, s)
        s = re.sub(r'(border-radius:\s*)([^;"]+)', lambda mm: mm.group(1) + snap_radius_val(mm.group(2)), s)
        for a, b in COLOURS.items(): s = re.sub(re.escape(a), b, s, flags=re.I)
        return m.group(1) + s + m.group(3)
    return re.sub(r'(style=["\'])([^"\']*)(["\'])', st, src)


def main():
    write = '--write' in sys.argv
    css = open('v2.css').read(); new_css = css_pass(css)
    html = open('index.html').read()
    new_html = re.sub(r'(<style(?![^>]*id="icons")[^>]*>)(.*?)(</style>)', lambda m: m.group(1) + css_pass(m.group(2)) + m.group(3), html, flags=re.S)
    new_html = inline_pass(new_html)
    js = open('v2.js').read(); new_js = inline_pass(js)
    print(changes)
    if write:
        open('v2.css', 'w').write(new_css); open('index.html', 'w').write(new_html); open('v2.js', 'w').write(new_js)
        print('written')


if __name__ == '__main__':
    main()
