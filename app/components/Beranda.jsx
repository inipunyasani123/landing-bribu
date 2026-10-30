import Link from 'next/link';
import { BANDING, BRIEF, FAQ as DAFTAR, KATEGORI, LANGKAH, briefBertanggal, rp } from '@/lib/papan';
import { KartuBrief, Sketsa } from './Papan';

const contoh = BRIEF.find((b) => b.kode === 'BR-0409');

export function Hero() {
  const papan = briefBertanggal();
  const aktif = papan.filter((b) => b.status !== 'selesai').length;
  return (
    <section className="board-grid px-6 pt-24 pb-14 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <p className="slug text-pin">Papan brief desain · bukan kontes</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.02] text-board sm:text-6xl">Tiga desainer dibayar untuk sketsa. Anda tinggal memilih.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed md:mt-6">
            Pasang brief, kurator memilih tiga desainer dari portofolionya, dan masing-masing dibayar untuk menggambar satu arah. Tidak ada kerja gratis, tidak ada seratus desain yang harus Anda saring.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-9">
            <Link href="#pasang" className="inline-flex justify-center bg-pin px-7 py-4 font-semibold text-white hover:bg-board">Pasang brief gratis</Link>
            <Link href="/papan" className="inline-flex justify-center border-2 border-board px-7 py-4 font-semibold text-board hover:bg-board hover:text-chalk">Lihat papan ({aktif} aktif)</Link>
          </div>
        </div>
        {/* Dua pengumuman yang sedang tertempel. Di ponsel berjajar menyamping (geser) supaya tidak menumpuk setinggi dua layar. */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pt-2 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
          <div className="w-[84%] shrink-0 snap-center sm:w-auto">
            <KartuBrief b={papan.find((b) => b.kode === 'BR-0415')} judul="p" className="sm:-rotate-1" />
          </div>
          <div className="w-[84%] shrink-0 snap-center sm:w-auto">
            <KartuBrief b={papan.find((b) => b.kode === 'BR-0412')} judul="p" className="sm:mt-10 sm:rotate-1" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cara() {
  return (
    <section id="cara" className="scroll-mt-16 bg-board px-6 py-16 text-chalk md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="slug text-tack">Cara kerja</p>
        <h2 className="mt-4 max-w-2xl text-[2.2rem] leading-[1.06] text-chalk md:text-5xl">Empat langkah, satu kode brief</h2>
        <ol className="mt-10 grid gap-px bg-chalk/15 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {LANGKAH.map(([j, w, d], i) => (
            <li key={j} className="bg-board p-5 md:p-6 md:pr-8">
              <span className="slug text-tack">Langkah {i + 1} · {w}</span>
              <h3 className="mt-3 text-2xl text-chalk">{j}</h3>
              <p className="mt-3 leading-relaxed text-chalk/80">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid items-center gap-6 md:mt-14 md:gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="slug text-chalk/80">Contoh dari papan · {contoh.kode}</p>
            <p className="mt-3 text-2xl font-semibold text-chalk">{contoh.usaha}, {contoh.kota}</p>
            <p className="mt-3 leading-relaxed text-chalk/80">Tiga desainer, tiga arah. Klien memilih arah B; dua sketsa lainnya tetap milik desainernya — dan tetap dibayar.</p>
            <Link href={`/papan/${contoh.kode.toLowerCase()}`} className="slug mt-3 inline-flex min-h-11 items-center border-b-2 border-tack text-chalk">Buka brief lengkap</Link>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {contoh.arah.map(([d, gaya], i) => (
              <li key={gaya} className={`relative p-1.5 ${i === contoh.terpilih ? 'bg-tack' : 'bg-chalk/10'}`}>
                <Sketsa b={contoh} gaya={gaya} label={`Sketsa arah ${'ABC'[i]} untuk ${contoh.usaha}`} />
                <span className={`slug mt-1.5 block px-1 ${i === contoh.terpilih ? 'text-board' : 'text-chalk/80'}`}>Arah {'ABC'[i]}{i === contoh.terpilih ? ' · terpilih' : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Banding() {
  return (
    <section className="bg-paper px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="slug text-pin">Mengapa bukan kontes</p>
        <h2 className="mt-4 max-w-2xl text-[2.2rem] leading-[1.06] text-board md:text-5xl">Lebih sedikit pilihan, lebih banyak yang dipikirkan</h2>
        <dl className="mt-8 divide-y divide-board/12 border-y-2 border-board md:hidden">
          {BANDING.baris.map(([b, ...nilai]) => (
            <div key={b} className="py-4">
              <dt className="slug text-board">{b}</dt>
              <dd className="mt-2 bg-pin/8 px-3 py-2 font-semibold text-board">
                <span className="slug mr-2 text-pin">Bribu</span>
                {nilai[3]}
              </dd>
              <dd className="mt-2 grid grid-cols-3 gap-2 text-xs leading-snug">
                {BANDING.kolom.slice(0, 3).map((k, i) => (
                  <span key={k}>
                    <span className="block font-semibold text-board">{k}</span>
                    {nilai[i]}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 hidden overflow-x-auto md:block" tabIndex={0} role="region" aria-label="Tabel perbandingan cara mendapatkan desain">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">Perbandingan kontes terbuka, freelancer, agensi, dan Bribu</caption>
            <thead>
              <tr className="border-b-2 border-board">
                <td className="py-3 pr-4" />
                {BANDING.kolom.map((k, i) => (
                  <th key={k} scope="col" className={`slug px-4 py-3 ${i === 3 ? 'bg-pin text-white' : 'text-board'}`}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BANDING.baris.map(([b, ...nilai]) => (
                <tr key={b} className="border-b border-board/12">
                  <th scope="row" className="py-4 pr-4 text-sm font-semibold text-board">{b}</th>
                  {nilai.map((n, i) => <td key={i} className={`px-4 py-4 text-sm leading-relaxed ${i === 3 ? 'bg-pin/8 font-semibold text-board' : ''}`}>{n}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm">Gambaran umum cara kerja tiap pilihan, bukan data pasar.</p>
      </div>
    </section>
  );
}

export function Paket() {
  return (
    <section id="paket" className="scroll-mt-16 border-t border-board/10 bg-paper-2 px-6 py-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="slug text-pin">Paket & biaya</p>
        <h2 className="mt-4 max-w-2xl text-[2.2rem] leading-[1.06] text-board md:text-5xl">Harga paket sudah termasuk uang sketsa ketiga desainer</h2>
        <ul className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {Object.entries(KATEGORI).map(([k, c]) => (
            <li key={k} className="board-card flex w-[82%] shrink-0 snap-center flex-col p-6 md:w-auto">
              <h3 className="text-xl text-board">{c.nama}</h3>
              <p className="mt-4 text-3xl font-bold tracking-tight text-board">{rp(c.paket)}</p>
              <p className="mt-1 text-sm">termasuk 3 × {rp(c.sketsa)} uang sketsa</p>
              <ul className="mt-5 space-y-2 border-t border-board/10 pt-5 text-sm">
                {c.isi.map((i) => <li key={i} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-pin" />{i}</li>)}
              </ul>
              <p className="slug mt-5 text-muted">{c.hari} hari kerja · 2 putaran revisi</p>
              <Link href={`/?kategori=${k}#pasang`} className="mt-auto inline-block py-3 text-sm font-semibold text-pin hover:text-board">Pasang brief {c.nama.toLowerCase()} →</Link>
            </li>
          ))}
        </ul>
        <p className="slug mt-3 text-muted md:hidden" aria-hidden="true">Geser untuk paket lain →</p>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="bg-paper px-6 py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 md:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="slug text-pin">Pertanyaan</p>
          <h2 className="mt-4 text-[2.2rem] leading-[1.06] text-board md:text-5xl">Sebelum memasang brief</h2>
        </div>
        <div className="border-t-2 border-board">
          {DAFTAR.map((f) => (
            <details key={f.t} className="group border-b border-board/12">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-board [&::-webkit-details-marker]:hidden">
                {f.t}
                <span aria-hidden="true" className="slug text-pin group-open:hidden">Buka</span>
                <span aria-hidden="true" className="slug hidden text-pin group-open:inline">Tutup</span>
              </summary>
              <p className="pb-6 leading-relaxed">{f.j}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
