'use client';

import { useState } from 'react';
import { KATEGORI, STATUS } from '@/lib/papan';
import { KartuBrief } from './Papan';

/* Daftar brief (sudah bertanggal) datang dari server lewat props, supaya hidrasi cocok. */
export default function PapanSaring({ brief }) {
  const [kat, setKat] = useState('semua');
  const [st, setSt] = useState('semua');
  const tampil = brief.filter((b) => (kat === 'semua' || b.kategori === kat) && (st === 'semua' || b.status === st));
  const tombol = (aktif) => `slug shrink-0 border px-3 py-2.5 ${aktif ? 'border-board bg-board text-chalk' : 'border-board/20 bg-white text-board hover:border-board'}`;

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 border-y border-board/12 py-4 md:mt-10 md:gap-4 md:py-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Saring kategori" className="-mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {[['semua', 'Semua kategori'], ...Object.entries(KATEGORI).map(([k, c]) => [k, c.nama])].map(([k, n]) => (
            <button key={k} type="button" aria-pressed={kat === k} onClick={() => setKat(k)} className={tombol(kat === k)}>{n}</button>
          ))}
        </div>
        <div role="group" aria-label="Saring status" className="-mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {[['semua', 'Semua status'], ...Object.entries(STATUS).map(([k, s]) => [k, s.nama])].map(([k, n]) => (
            <button key={k} type="button" aria-pressed={st === k} onClick={() => setSt(k)} className={tombol(st === k)}>{n}</button>
          ))}
        </div>
      </div>
      <p className="slug mt-6 text-muted" role="status">{tampil.length} brief</p>
      {tampil.length ? (
        <ul className="mt-6 grid gap-x-6 gap-y-8 md:mt-8 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
          {tampil.map((b) => <li key={b.kode}><KartuBrief b={b} judul="h2" /></li>)}
        </ul>
      ) : (
        <p className="mt-8 border border-dashed border-board/25 p-8 text-center">Belum ada brief dengan saringan ini.</p>
      )}
    </>
  );
}
