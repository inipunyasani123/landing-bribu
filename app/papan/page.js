import { SITE, STATUS, briefBertanggal } from '@/lib/papan';
import PapanSaring from '../components/PapanSaring';

export const metadata = {
  title: 'Papan Brief',
  description: 'Brief desain yang sedang dikurasi, digambar, dan sudah selesai di Bribu — logo, kemasan, templat media sosial, dan ilustrasi untuk usaha kecil.',
  alternates: { canonical: `${SITE}/papan` },
};

export default function Papan() {
  return (
    <main className="board-grid px-6 pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="slug text-pin">Papan brief</p>
        <h1 className="mt-4 max-w-3xl text-[2.6rem] leading-[1.02] text-board md:text-6xl">Apa yang sedang digambar minggu ini</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed">Setiap brief punya kode dan tiga slot desainer. Sketsa yang belum dipilih hanya terlihat oleh kliennya.</p>
        <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.values(STATUS).map((s) => (
            <div key={s.nama} className="border-l-2 border-pin pl-3">
              <dt className="slug text-board">{s.nama}</dt>
              <dd className="mt-1 text-sm">{s.ket}</dd>
            </div>
          ))}
        </dl>
        <PapanSaring brief={briefBertanggal()} />
      </div>
    </main>
  );
}
