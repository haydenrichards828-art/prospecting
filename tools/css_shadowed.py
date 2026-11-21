#!/usr/bin/env python3
"""Remove CSS declarations that can never apply.

A declaration is dead when a LATER rule with the exact same selector, inside the
exact same @media/@supports context, sets the same property with equal or higher
importance. Same selector means same specificity, so the later one always wins.
Fallback pairs (new units like dvh, newer colour functions) are left alone.

Usage: python3 tools/css_shadowed.py v2.css          (report only)
       python3 tools/css_shadowed.py v2.css --write  (rewrite file)
"""
import re, sys

FALLBACK = re.compile(r'dvh|svh|lvh|dvw|color-mix|oklch|oklab|lch\(|-webkit-|-moz-|env\(|min\(|max\(|clamp\(', re.I)


def tokenize(css):
    """Yield (kind, ctx, selector, body, start, end) for every style rule."""
    i, n, stack, out = 0, len(css), [], []
    while i < n:
        if css.startswith('/*', i):
            j = css.find('*/', i + 2); i = n if j < 0 else j + 2; continue
        if css[i] == '}':
            if stack: stack.pop()
            i += 1; continue
        if css[i].isspace() or css[i] == ';':
            i += 1; continue
        j = i
        while j < n and css[j] not in '{};':
            if css.startswith('/*', j):
                k = css.find('*/', j + 2); j = n if k < 0 else k + 2; continue
            j += 1
        if j >= n: break
        if css[j] == ';':  # @import / @charset
            i = j + 1; continue
        head = css[i:j].strip()
        if head.startswith('@'):
            if re.match(r'@(media|supports|container|layer)\b', head):
                stack.append(re.sub(r'\s+', ' ', head).replace('( ', '(').replace(' )', ')').replace(': ', ':'))
                i = j + 1; continue
            # keyframes, font-face etc: skip whole block
            depth, k = 0, j
            while k < n:
                if css[k] == '{': depth += 1
                elif css[k] == '}':
                    depth -= 1
                    if depth == 0: break
                k += 1
            i = k + 1; continue
        k = css.find('}', j)
        out.append((tuple(stack), head, css[j + 1:k], i, k + 1))
        i = k + 1
    return out


def decls(body):
    parts, cur, depth = [], '', 0
    for ch in body:
        if ch == '(': depth += 1
        elif ch == ')': depth -= 1
        if ch == ';' and depth == 0:
            parts.append(cur); cur = ''
        else:
            cur += ch
    parts.append(cur)
    res = []
    for p in parts:
        if ':' not in p or not p.strip(): continue
        prop, val = p.split(':', 1)
        prop = prop.strip().lower()
        imp = '!important' in val.replace(' ', '')
        res.append((prop, val.strip(), imp, p))
    return res


def main():
    path = sys.argv[1]; write = '--write' in sys.argv
    css = open(path).read()
    rules = tokenize(css)
    # single-selector keys only; selector lists are split so each part is checked
    later = {}  # (ctx, sel, prop) -> best importance seen later
    kill = {}   # rule index -> set of decl indexes to drop
    for ri in range(len(rules) - 1, -1, -1):
        ctx, head, body, s, e = rules[ri]
        sels = [re.sub(r'\s+', ' ', x.strip()) for x in head.split(',')]
        ds = decls(body)
        seen_here = {}
        for di in range(len(ds) - 1, -1, -1):
            prop, val, imp, raw = ds[di]
            if prop.startswith('--'):
                pass
            dead = False
            if not FALLBACK.search(val):
                # dead only if every selector in the list is overridden later
                if all((ctx, sl, prop) in later and later[(ctx, sl, prop)] >= imp for sl in sels):
                    dead = True
                # duplicate inside the same rule
                if prop in seen_here and seen_here[prop] >= imp:
                    dead = True
            if dead:
                kill.setdefault(ri, set()).add(di)
            else:
                seen_here[prop] = max(seen_here.get(prop, False), imp)
        for prop, val, imp, raw in ds:
            for sl in sels:
                k = (ctx, sl, prop)
                later[k] = max(later.get(k, False), imp)
    total = sum(len(v) for v in kill.values())
    emptied = sum(1 for ri, v in kill.items() if len(v) == len(decls(rules[ri][2])))
    print(f'{total} dead declarations, {emptied} rules become empty')
    if not write: return
    pieces, last = [], 0
    for ri, (ctx, head, body, s, e) in enumerate(rules):
        if ri not in kill: continue
        ds = decls(body)
        keep = [d[3].strip() for i, d in enumerate(ds) if i not in kill[ri]]
        pieces.append(css[last:s])
        if keep:
            pieces.append(head + '{' + ';'.join(keep) + '}')
        last = e
    pieces.append(css[last:])
    new = ''.join(pieces)
    new = re.sub(r'\n{3,}', '\n\n', new)
    open(path, 'w').write(new)
    print(f'{len(css)} -> {len(new)} bytes')


if __name__ == '__main__':
    main()
