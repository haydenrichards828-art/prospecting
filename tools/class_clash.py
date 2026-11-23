#!/usr/bin/env python3
"""Find class names that two different screens both use and that the CSS styles
without scoping. That is how the call list broke on 21 Nov: the Leads table and
the call list both used .lg3, and a later rule for one squashed the other.

Shared kit classes (buttons, pills, sheets) are expected to be shared, so they are
listed in KIT and skipped. Run before pushing: python3 tools/class_clash.py
Exit code 1 when a new clash appears.
"""
import re, sys
from collections import defaultdict

KIT = set('''b2 pri sec ghost on hide-phone key2 pill2 seg2 mini ic2 empty2 emptyline sel done h go cl
row2 sub2 sheet2 field2 lbl2 tag2 chip2 dim wide2 muted ok warn bad hint2 x2 t2 t3 grow sm lg'''.split())


def funcs(js):
    """Map each top level function or window wrapper to its source text."""
    marks = [(m.start(), m.group(1) or m.group(2)) for m in
             re.finditer(r'^(?:async\s+)?function\s+(\w+)|^window\.(\w+)\s*=', js, re.M)]
    marks.append((len(js), None))
    for (s, name), (e, _) in zip(marks, marks[1:]):
        yield name, js[s:e]


def main():
    js = ''.join(open('js/'+f).read() for f in sorted(__import__('os').listdir('js')))   # the new design lives in js/, in load order
    css = open('v2.css').read()
    users = defaultdict(set)
    for name, src in funcs(js):
        for attr in re.findall(r'class="([^"]*)"', src):
            for c in re.sub(r'\$\{[^}]*\}', ' ', attr).split():
                if re.fullmatch(r'[A-Za-z][\w-]*', c):
                    users[c].add(name)
    # classes styled by a rule whose selector STARTS with that class (unscoped)
    unscoped = set(re.findall(r'(?:^|[},])\s*\.([A-Za-z][\w-]*)', css))
    # group functions into screens by wrapper name: wrappers of the same base
    # function are one screen
    bad = []
    for c, fs in sorted(users.items()):
        if c in KIT or c not in unscoped:
            continue
        if len(fs) > 1:
            bad.append((c, sorted(fs)))
    for c, fs in bad:
        print(f'.{c}: used by {", ".join(fs)}')
    print(f'{len(bad)} classes shared across functions with unscoped styles')
    base = set(open('tools/class_clash.ok').read().split()) if __import__('os').path.exists('tools/class_clash.ok') else set()
    new = [c for c, _ in bad if c not in base]
    if '--accept' in sys.argv:
        open('tools/class_clash.ok', 'w').write('\n'.join(c for c, _ in bad) + '\n')
        print('accepted current list as the baseline')
        return
    if new:
        print('NEW since baseline:', ' '.join(new))
        sys.exit(1)


if __name__ == '__main__':
    main()
