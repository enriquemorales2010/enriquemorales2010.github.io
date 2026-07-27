import os
import sys
from pathlib import Path

try:
    from PyPDF2 import PdfReader
except Exception as exc:
    print(f'PyPDF2 unavailable: {exc}')
    sys.exit(1)

folder = Path(r"c:\Users\Just Me\Desktop\Perfil Pro\portafolio")
files = sorted([p for p in folder.glob('*.pdf')])

if not files:
    print('No PDF files found.')
    sys.exit(0)

for pdf_path in files:
    print(f'===== {pdf_path.name} =====')
    reader = PdfReader(str(pdf_path))
    text = '\n'.join((page.extract_text() or '') for page in reader.pages)
    out_path = folder / f"{pdf_path.stem}_extracted.txt"
    out_path.write_text(text, encoding='utf-8')
    print(text[:12000])
    print(f'\n[Saved to {out_path.name}]\n')
