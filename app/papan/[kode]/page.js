import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRIEF, DESAINER, KATEGORI, LANGKAH, SITE, STATUS, briefBertanggal, briefByKode, rp, tanggal } from '@/lib/papan';
import { KartuBrief, Sketsa } from '../../components/Papan';

/* Deskripsi meta maksimal 155 karakter, dipotong di batas kata. */
const ringkas = (t, n = 155) => (t.length <= n ? t : `${t.slice(0, t.lastIndexOf(' ', n - 1)).replace(/[,.;:]$/, '')}…`);

export function generateStaticParams() {
  return BRIEF.map((b) => ({ kode: b.kode.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { kode } = await params;
  const b = briefByKode(kode);
  if (!b) return {};
  return {
    title: `${b.kode} · ${b.usaha}`,
    description: ringkas(`Brief ${KATEGORI[b.kategori].nama.toLowerCase()} untuk ${b.usaha}, ${b.kota}: ${b.ringkas}`),
    alternates: { canonical: `${SITE}/papan/${b.kode.toLowerCase()}` },
  };
}

const TAHAP = ['kurasi', 'sketsa', 'pilih', 'selesai'];

export default async function DetailBrief({ params }) {
  const { kode } = await params;
  const papan = briefBertanggal();
  const b = papan.find((x) => x.kode.toLowerCase() === String(kode).toLowerCase());
  if (!b) notFound();
  const k = KATEGORI[b.kategori];
  const tahap = TAHAP.indexOf(b.status);
  const lihat = b.status === 'pilih' || b.status === 'selesai';
  const lain = papan.filter((x) => x.kode !== b.kode && x.kategori === b.kategori).slice(0, 2);

  return (
    <main className="bg-paper px-6 pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Remah roti" className="slug flex flex-wrap gap-2 text-muted">
          <Link href="/papan" className="inline-block py-3 text-pin hover:text-board">Papan brief</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{b.kode}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div>
            <p className="slug text-pin">{b.kode} · {k.nama} · dipasang {tanggal(b.dipasang)}</p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.02] text-board md:text-6xl">{b.usaha}</h1>
            <p className="mt-2 text-lg">{b.kota}</p>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-board">{b.ringkas}</p>

            <ol aria-label="Tahap brief" className="mt-10 grid grid-cols-4 gap-1">
              {TAHAP.map((t, i) => (
                <li key={t} aria-current={i === tahap ? 'step' : undefined}>
                  <span className={`block h-1.5 ${i <= tahap ? 'bg-pin' : 'bg-board/15'}`} />
                  <span className={`slug mt-2 block ${i === tahap ? 'text-board' : 'text-muted'}`}>{STATUS[t].nama}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm">
              {b.status === 'selesai'
                ? 'Brief selesai; hak cipta arah terpilih sudah berpindah ke klien.'
                : `${STATUS[b.status].ket} — tahap “${LANGKAH[tahap + 1][0].toLowerCase()}” biasanya ${LANGKAH[tahap + 1][1]}.`}
            </p>
          </div>

          <aside aria-label="Ringkasan brief" className="board-card self-start p-6">
            <dl className="space-y-4 text-sm">
              <div><dt className="slug text-muted">Paket</dt><dd className="mt-1 text-2xl font-bold text-board">{rp(k.paket)}</dd></div>
              <div><dt className="slug text-muted">Termasuk uang sketsa</dt><dd className="mt-1 font-semibold text-board">3 × {rp(k.sketsa)}</dd></div>
              <div><dt className="slug text-muted">Waktu pengerjaan</dt><dd className="mt-1 font-semibold text-board">{k.hari} hari kerja</dd></div>
            </dl>
            <Link href={`/?kategori=${b.kategori}#pasang`} className="mt-6 flex justify-center bg-pin px-5 py-3.5 text-sm font-semibold text-white hover:bg-board">Pasang brief serupa</Link>
          </aside>
        </div>

        <section aria-labelledby="isi" className="mt-12 grid gap-8 border-t-2 border-board pt-8 md:mt-16 md:grid-cols-3 md:pt-10">
          <h2 id="isi" className="sr-only">Isi brief</h2>
          <div>
            <h3 className="slug text-board">Yang dibutuhkan</h3>
            <ul className="mt-4 space-y-2">
              {b.butuh.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-pin" />{x}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="slug text-board">Rasa yang dicari</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {b.rasa.map((x) => <li key={x} className="border border-board/20 bg-white px-3 py-1.5 text-board">{x}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="slug text-board">Yang dihindari</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {b.hindari.map((x) => <li key={x} className="border border-dashed border-board/30 px-3 py-1.5 line-through decoration-board/40">{x}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="arah" className="mt-12 md:mt-16">
          <h2 id="arah" className="text-3xl text-board">Tiga slot desainer</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const a = b.arah[i];
              const d = a && DESAINER[a[0]];
              const pilih = b.status === 'selesai' && b.terpilih === i;
              return (
                <li key={i} className={`flex flex-col border bg-white ${pilih ? 'border-pin ring-2 ring-pin' : 'border-board/12'}`}>
                  {a && lihat ? (
                    <Sketsa b={b} gaya={a[1]} label={`Sketsa arah ${'ABC'[i]} untuk ${b.usaha} oleh ${d.nama}`} />
                  ) : (
                    <div className="flex aspect-[16/7] items-center justify-center border-b border-dashed border-board/20 bg-paper-2 p-6 text-center text-sm sm:aspect-[4/3]">
                      {a ? (a[2] === 'Sketsa masuk' ? 'Sketsa masuk — hanya terlihat oleh klien sampai tiga sketsa lengkap' : 'Sedang menggambar') : 'Menunggu kurasi'}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="slug text-pin">Arah {'ABC'[i]}{pilih ? ' · terpilih' : ''}</p>
                    {d ? (
                      <>
                        <p className="mt-2 font-semibold text-board">{d.nama} · {d.kota}</p>
                        <p className="text-sm">{d.bidang}</p>
                        <p className="mt-3 text-sm leading-relaxed">{a[2]}</p>
                      </>
                    ) : (
                      <p className="mt-2 text-sm">Kurator sedang memilih dari portofolio.</p>
                    )}
                    <p className="slug mt-auto pt-4 text-muted">{a && b.status !== 'kurasi' ? `Uang sketsa ${rp(k.sketsa)} · dibayar` : 'Slot kosong'}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {lain.length > 0 && (
          <section aria-labelledby="lain" className="mt-20">
            <h2 id="lain" className="text-3xl text-board">Brief {k.nama.toLowerCase()} lainnya</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {lain.map((x) => <li key={x.kode}><KartuBrief b={x} /></li>)}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
