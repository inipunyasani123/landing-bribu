'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  ['/papan', 'Papan brief'],
  ['/#cara', 'Cara kerja'],
  ['/#paket', 'Paket'],
  ['/untuk-desainer', 'Untuk desainer'],
];

/* Navigasi utama + menu ponsel. Di ponsel panelnya berupa kartu pengumuman di papan: garis kiri biru, paku tekan kuning, dan kode ringkas di depan tiap tautan.
   Menu tertutup sendiri saat pindah halaman, menekan Escape (fokus kembali ke
   tombol), atau mengetuk di luar panel. */
export default function Navigasi({ children }) {
  const path = usePathname();
  const [buka, setBuka] = useState(false);
  const tombol = useRef(null);
  const panel = useRef(null);

  useEffect(() => setBuka(false), [path]);

  useEffect(() => {
    if (!buka) return undefined;
    const tutup = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape') return;
      if (e.type === 'pointerdown' && (panel.current?.contains(e.target) || tombol.current?.contains(e.target))) return;
      setBuka(false);
      if (e.type === 'keydown') tombol.current?.focus();
    };
    document.addEventListener('keydown', tutup);
    document.addEventListener('pointerdown', tutup);
    return () => {
      document.removeEventListener('keydown', tutup);
      document.removeEventListener('pointerdown', tutup);
    };
  }, [buka]);

  const aktif = (href) => (!href.includes('#') && href !== '/' && path.startsWith(href) ? 'page' : undefined);

  return (
    <>
      <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={aktif(href)} className="text-sm font-semibold text-muted hover:text-board aria-[current=page]:text-board aria-[current=page]:underline aria-[current=page]:decoration-pin aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {children}
        <button
          ref={tombol}
          type="button"
          aria-expanded={buka}
          aria-controls="menu-ponsel"
          onClick={() => setBuka((b) => !b)}
          className="slug inline-flex h-10 min-w-[4.75rem] items-center justify-center border border-board/25 px-3 text-board md:hidden"
        >
          {buka ? 'Tutup' : 'Menu'}
        </button>
      </div>
      <nav id="menu-ponsel" ref={panel} aria-label="Navigasi ponsel" hidden={!buka} className="absolute inset-x-0 top-full border-b border-board/10 bg-paper px-4 pt-3 pb-4 shadow-[0_18px_30px_-24px_rgb(16_24_32/0.5)] md:hidden">
        <ol className="board-card relative mx-auto max-w-6xl px-5 py-2 before:absolute before:-top-1.5 before:left-6 before:h-3 before:w-3 before:rounded-full before:bg-tack before:content-['']">
          {NAV.map(([href, label], i) => (
            <li key={href} className="border-b border-board/10 last:border-b-0">
              <Link href={href} onClick={() => setBuka(false)} aria-current={aktif(href)} className="flex items-baseline gap-4 py-3.5 text-board">
                <span className="slug w-14 text-pin">BR-0{i + 1}</span>
                <span className="font-[family-name:var(--font-intertight)] text-lg font-bold tracking-tight decoration-pin decoration-2 underline-offset-4 [[aria-current=page]_&]:underline">{label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
