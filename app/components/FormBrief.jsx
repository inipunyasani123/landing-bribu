'use client';

import { useEffect, useState } from 'react';
import { BRIEF, KATEGORI, rp } from '@/lib/papan';
import { KartuBrief } from './Papan';

const KODE = `BR-${String(Math.max(...BRIEF.map((b) => Number(b.kode.slice(3)))) + 1).padStart(4, '0')}`;

export default function FormBrief() {
  const [d, setD] = useState({ usaha: '', kota: '', kategori: 'logo', ringkas: '', rasa: '' });
  const [selesai, setSelesai] = useState(false);
  const ubah = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.value }));

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('kategori');
    if (k && KATEGORI[k]) setD((x) => ({ ...x, kategori: k }));
  }, []);

  const draf = { ...d, kode: KODE, status: 'draf', arah: [] };
  const input = 'w-full border border-board/20 bg-white px-4 py-3 text-board focus:border-pin focus:outline-none';

  return (
    <section id="pasang" className="scroll-mt-16 board-grid px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="slug text-pin">Pasang brief</p>
        <h2 className="mt-4 max-w-2xl text-[2.2rem] leading-[1.06] text-board md:text-5xl">Tulis brief Anda, lihat kartunya di papan</h2>
        <p className="mt-5 max-w-xl leading-relaxed">Gratis. Anda baru membayar setelah melihat tiga desainer pilihan kurator.</p>

        <div className="mt-8 grid gap-8 md:mt-12 md:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {selesai ? (
            <div role="status" className="board-card p-8">
              <p className="slug text-pin">{KODE} · tercatat</p>
              <p className="mt-4 text-2xl font-bold text-board">Brief {d.usaha} masuk antrean kurasi.</p>
              <p className="mt-3 leading-relaxed">Ini purwarupa desain: tidak ada brief yang benar-benar dipasang dan tidak ada data yang dikirim.</p>
              <button type="button" onClick={() => setSelesai(false)} className="slug mt-6 border border-board/25 px-4 py-3 text-board hover:border-pin">Ubah brief</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSelesai(true); }} className="space-y-5 bg-white p-6 shadow-[0_1px_0_rgb(16_24_32/0.06)] sm:p-8">
              <fieldset>
                <legend className="slug mb-3 text-board">Kategori</legend>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(KATEGORI).map(([k, c]) => (
                    <label key={k} className={`flex cursor-pointer flex-col justify-between gap-1 border px-3 py-2.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pin sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3 ${d.kategori === k ? 'border-pin bg-pin/8' : 'border-board/15'}`}>
                      <input type="radio" name="kategori" value={k} checked={d.kategori === k} onChange={ubah('kategori')} className="sr-only" />
                      <span className="text-sm leading-snug font-semibold text-board sm:text-base">{c.nama}</span>
                      <span className="text-xs whitespace-nowrap sm:text-sm">{rp(c.paket)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="usaha" className="slug mb-2 block text-board">Nama usaha</label>
                  <input id="usaha" required maxLength={40} value={d.usaha} onChange={ubah('usaha')} autoComplete="organization" className={input} />
                </div>
                <div>
                  <label htmlFor="kota" className="slug mb-2 block text-board">Kota</label>
                  <input id="kota" required maxLength={30} value={d.kota} onChange={ubah('kota')} autoComplete="address-level2" className={input} />
                </div>
              </div>
              <div>
                <label htmlFor="ringkas" className="slug mb-2 block text-board">Ceritakan usaha & kebutuhan Anda</label>
                <textarea id="ringkas" required rows={3} maxLength={160} value={d.ringkas} onChange={ubah('ringkas')} aria-describedby="ringkas-n" className={input} />
                <span id="ringkas-n" className="mt-1 block text-right text-xs">{d.ringkas.length}/160</span>
              </div>
              <div>
                <label htmlFor="rasa" className="slug mb-2 block text-board">Tiga kata untuk rasanya</label>
                <input id="rasa" value={d.rasa} onChange={ubah('rasa')} placeholder="mis. hangat, jujur, lugas" className={input} />
              </div>
              <div>
                <label htmlFor="surel" className="slug mb-2 block text-board">Surel</label>
                <input id="surel" type="email" required autoComplete="email" className={input} />
              </div>
              <button type="submit" className="w-full bg-pin py-4 font-semibold text-white hover:bg-board">Pasang brief {KODE}</button>
              <p className="text-xs leading-relaxed">Purwarupa desain — formulir ini tidak mengirim data ke mana pun.</p>
            </form>
          )}

          <div className="order-first lg:sticky lg:top-24 lg:order-none lg:self-start">
            <p className="slug mb-4 text-muted md:mb-5" aria-hidden="true">Pratinjau di papan</p>
            <div>
              <KartuBrief b={draf} judul="p" tautan={false} />
            </div>
            {d.rasa && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Kata kunci rasa">
                {d.rasa.split(',').map((r) => r.trim()).filter(Boolean).slice(0, 3).map((r) => <li key={r} className="slug border border-board/20 bg-white px-2.5 py-1.5 text-board">{r}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
