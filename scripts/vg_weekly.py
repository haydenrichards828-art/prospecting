# Pulls the latest NSW Valuer General weekly sales file (public, CC BY) and keeps Wollongong district (103) sales.
import urllib.request, zipfile, io, datetime, re, sys, os
out = []
today = datetime.date.today()
got = None
for back in range(0, 15):
    d = today - datetime.timedelta(days=back)
    if d.weekday() != 0: continue
    for host in ("https://www.valuergeneral.nsw.gov.au/__psi", "https://valuation.property.nsw.gov.au/__psi"):
        try:
            req = urllib.request.Request(f"{host}/weekly/{d:%Y%m%d}.zip", headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=60).read()
            if data[:2] == b"PK": got = (d, data); break
        except Exception as e: print(host, d, e, file=sys.stderr)
    if got: break
if not got: sys.exit("no weekly file found")
def walk(b):
    z = zipfile.ZipFile(io.BytesIO(b))
    for n in z.namelist():
        if n.lower().endswith(".zip"): walk(z.read(n))
        elif os.path.basename(n).upper().startswith("103"):
            for line in z.read(n).decode("latin1").splitlines():
                f = line.split(";")
                if not line.startswith("B;") or len(f) < 19 or f[1] != "103": continue
                cd = f[13].strip()
                if not re.fullmatch(r"\d{8}", cd) or not f[7].strip() or not f[8].strip(): continue
                area = f[11].strip()
                try: area = str(round(float(area) * (10000 if f[12].strip() == "H" else 1), 1))
                except: area = ""
                out.append("|".join([f[6].strip(), f[7].strip(), f[8].strip().title(), f[9].strip().title(), f[10].strip(),
                                     f"{cd[:4]}-{cd[4:6]}-{cd[6:]}", f[15].strip(), area, f[16].strip(), f[17].strip(), f[18].strip()[:30]]))
walk(got[1])
os.makedirs("data", exist_ok=True)
open("data/vg_weekly.psv", "w").write(f"#{got[0]:%Y-%m-%d}\n" + "\n".join(sorted(set(out))))
print("file", got[0], "rows", len(out))
