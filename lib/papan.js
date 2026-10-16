/* ==========================================================================
   Bribu — papan brief desain. Klien memasang brief, kurator memilih tiga
   desainer, ketiganya DIBAYAR untuk satu sketsa, klien memilih satu untuk
   diselesaikan. Satu sumber isi untuk beranda, papan, dan halaman desainer.
   Semua usaha, desainer, harga, dan tanggal adalah contoh purwarupa desain.
   ========================================================================== */

export const SITE = 'https://landing-bribu.pintuweb.id';
export const rp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

export const KATEGORI = {
  logo: { nama: 'Logo & identitas', paket: 3900000, sketsa: 350000, hari: 12, isi: ['Logo utama + versi ikon', 'Dua warna utama dan satu huruf', 'Panduan ringkas 4 halaman', 'File master AI, SVG, PDF, PNG'] },
  kemasan: { nama: 'Kemasan', paket: 5400000, sketsa: 450000, hari: 15, isi: ['Desain satu varian kemasan', 'Dieline siap cetak', 'Tiruan 3D untuk katalog', 'File master AI dan PDF cetak'] },
  medsos: { nama: 'Templat media sosial', paket: 2800000, sketsa: 250000, hari: 10, isi: ['12 templat feed dan story', 'Bisa diedit di Figma atau Canva', 'Gaya foto dan ikon yang konsisten', 'Panduan pakai satu halaman'] },
  ilustrasi: { nama: 'Ilustrasi', paket: 1900000, sketsa: 200000, hari: 8, isi: ['Satu ilustrasi siap terbit', 'Ukuran cetak dan layar', 'Hak pakai komersial penuh', 'File berlapis untuk penyesuaian'] },
};

// Bagi hasil: setelah uang sketsa, desainer terpilih menerima 80% sisa paket.
export const BAGI = 0.8;
export const rincian = (k) => {
  const c = KATEGORI[k];
  const sisa = c.paket - 3 * c.sketsa;
  return { sketsaTotal: 3 * c.sketsa, sisa, terpilih: c.sketsa + Math.round(sisa * BAGI), bribu: Math.round(sisa * (1 - BAGI)) };
};

export const DESAINER = {
  dimas: { nama: 'Dimas R.', kota: 'Yogyakarta', bidang: 'Identitas merek' },
  nadia: { nama: 'Nadia P.', kota: 'Bandung', bidang: 'Kemasan' },
  yoga: { nama: 'Yoga S.', kota: 'Malang', bidang: 'Tipografi' },
  citra: { nama: 'Citra L.', kota: 'Denpasar', bidang: 'Ilustrasi' },
  fikri: { nama: 'Fikri H.', kota: 'Makassar', bidang: 'Media sosial' },
  ayu: { nama: 'Ayu W.', kota: 'Surabaya', bidang: 'Kemasan & label' },
  raka: { nama: 'Raka M.', kota: 'Jakarta', bidang: 'Identitas merek' },
  sekar: { nama: 'Sekar A.', kota: 'Semarang', bidang: 'Ilustrasi' },
};

export const STATUS = {
  kurasi: { nama: 'Kurasi', ket: 'Kurator memilih tiga desainer' },
  sketsa: { nama: 'Sketsa', ket: 'Desainer sedang menggambar' },
  pilih: { nama: 'Klien memilih', ket: 'Tiga sketsa sudah masuk' },
  selesai: { nama: 'Selesai', ket: 'Diselesaikan & diserahkan' },
};

// arah: [desainer, gaya sketsa, catatan]; terpilih = indeks arah (0–2).
export const BRIEF = [
  {
    kode: 'BR-0420', kategori: 'medsos', usaha: 'Studio Yoga Napas', kota: 'Denpasar', warna: ['#2f5d50', '#f2e8d8'], lalu: 0, status: 'kurasi',
    ringkas: 'Studio yoga kecil yang ingin jadwal kelasnya terbaca jelas di Instagram, bukan sekadar foto pose.',
    butuh: ['Templat jadwal mingguan', 'Templat pengumuman kelas baru', 'Templat kutipan pendek'], rasa: ['tenang', 'lapang', 'mudah dibaca'], hindari: ['siluet pose yoga', 'gradasi ungu'],
    arah: [],
  },
  {
    kode: 'BR-0418', kategori: 'logo', usaha: 'Roti Wiji', kota: 'Surakarta', warna: ['#7a4a22', '#f4ead9'], lalu: 1, status: 'kurasi',
    ringkas: 'Toko roti gandum rumahan yang pindah dari lapak pasar ke etalase kecil di depan rumah.',
    butuh: ['Logo utama dan versi ikon', 'Stiker segel kantong kertas', 'Papan nama 120 × 40 cm'], rasa: ['hangat', 'jujur', 'tidak terlalu manis'], hindari: ['ilustrasi bulir gandum emas', 'huruf sambung'],
    arah: [],
  },
  {
    kode: 'BR-0417', kategori: 'logo', usaha: 'Penerbit Tapak', kota: 'Yogyakarta', warna: ['#1d2a44', '#e9e2d0'], lalu: 3, status: 'sketsa',
    ringkas: 'Penerbit buku saku perjalanan; logonya akan tercetak kecil di punggung buku setebal 1 cm.',
    butuh: ['Logo yang terbaca di lebar 8 mm', 'Kolofon halaman judul', 'Cap untuk stempel karet'], rasa: ['ringkas', 'berjalan', 'sedikit jenaka'], hindari: ['ikon peta dan kompas', 'jejak kaki'],
    arah: [['raka', 'monogram', 'Sketsa masuk'], ['yoga', 'wordmark', 'Sedang menggambar'], ['dimas', 'emblem', 'Sedang menggambar']],
  },
  {
    kode: 'BR-0415', kategori: 'kemasan', usaha: 'Kopi Lereng', kota: 'Batu', warna: ['#3d2b1f', '#e2c48f'], lalu: 5, status: 'sketsa',
    ringkas: 'Kopi arabika petani di lereng gunung, dijual dalam kantong 200 g berjendela.',
    butuh: ['Label depan kantong 200 g', 'Stiker varian proses (natural, washed)', 'Kartu cerita petani'], rasa: ['tanah', 'teliti', 'tidak eksotis'], hindari: ['gambar biji kopi besar', 'hijau daun cerah'],
    arah: [['nadia', 'kantong', 'Sketsa masuk'], ['ayu', 'label', 'Sketsa masuk'], ['dimas', 'pita', 'Sedang menggambar']],
  },
  {
    kode: 'BR-0412', kategori: 'medsos', usaha: 'Bengkel Sepeda Rantai', kota: 'Bandung', warna: ['#1f1f1f', '#f2b134'], lalu: 8, status: 'pilih',
    ringkas: 'Bengkel sepeda yang ingin unggahan servis mingguan terlihat seperti catatan kerja, bukan iklan.',
    butuh: ['Templat sebelum–sesudah servis', 'Templat daftar harga', 'Templat jadwal gowes bersama'], rasa: ['mekanis', 'lugas', 'akrab'], hindari: ['foto atlet balap', 'efek kilat'],
    arah: [['fikri', 'kisi', 'Catatan kerja bergaris'], ['raka', 'pita', 'Papan bengkel kuning'], ['yoga', 'kolom', 'Tipografi besar']],
  },
  {
    kode: 'BR-0409', kategori: 'logo', usaha: 'Cuci Kiloan Ranum', kota: 'Malang', warna: ['#1f5fd0', '#eef2f6'], lalu: 21, status: 'selesai', terpilih: 1,
    ringkas: 'Laundry kiloan dekat kampus yang ingin dikenali dari kantong plastiknya.',
    butuh: ['Logo untuk sablon satu warna', 'Label nota', 'Papan nama'], rasa: ['bersih', 'cepat', 'ramah mahasiswa'], hindari: ['gelembung sabun', 'kaus terbang'],
    arah: [['dimas', 'monogram', 'Monogram KR dalam lingkaran'], ['yoga', 'wordmark', 'Huruf tebal dengan garis lipatan'], ['raka', 'emblem', 'Emblem cincin ganda dengan nama kota']],
  },
  {
    kode: 'BR-0406', kategori: 'ilustrasi', usaha: 'Buletin Kebun Kota', kota: 'Semarang', warna: ['#4f6b2f', '#f1ead8'], lalu: 27, status: 'selesai', terpilih: 2,
    ringkas: 'Buletin komunitas kebun kota butuh ilustrasi sampul edisi musim hujan.',
    butuh: ['Satu ilustrasi sampul A5', 'Versi persegi untuk unggahan'], rasa: ['basah', 'gotong royong', 'teduh'], hindari: ['tangan memegang tunas', 'bumi tersenyum'],
    arah: [['sekar', 'bukit', 'Petak kebun dari atas'], ['ayu', 'daun', 'Daun talas menampung hujan'], ['citra', 'hujan', 'Payung di antara bedengan']],
  },
  {
    kode: 'BR-0403', kategori: 'kemasan', usaha: 'Sambal Ronggo', kota: 'Sidoarjo', warna: ['#a3241b', '#f6e7cf'], lalu: 33, status: 'selesai', terpilih: 0,
    ringkas: 'Sambal bawang rumahan naik kelas dari plastik klip ke toples kaca 150 ml.',
    butuh: ['Label melingkar toples 150 ml', 'Segel tutup', 'Kardus isi enam'], rasa: ['pedas', 'rumahan', 'berani'], hindari: ['api menyala', 'cabai tersenyum'],
    arah: [['nadia', 'label', 'Label pita merah bata'], ['ayu', 'kantong', 'Label kertas cokelat'], ['fikri', 'pita', 'Tutup bercap']],
  },
];

export const briefByKode = (k) => BRIEF.find((b) => b.kode.toLowerCase() === String(k).toLowerCase());

export const tanggal = (iso) => new Date(`${iso}T00:00:00+07:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' });

/* Tanggal pasang bergulir. Setiap brief menyimpan "lalu" (berapa hari lalu
   dipasang), bukan tanggal mati, supaya papan selalu terlihat seperti minggu
   ini dan statusnya masuk akal (kurasi 1 hari kerja, sketsa 5 hari, dst.).
   Dihitung di server saat render (revalidate tiap jam di layout); komponen
   klien menerima hasilnya lewat props supaya hidrasi cocok. */
const WIB = 7 * 3600 * 1000;
export function briefBertanggal(sekarang = Date.now()) {
  const t = new Date(sekarang + WIB);
  const hariIni = Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate());
  return BRIEF.map((b) => ({ ...b, dipasang: new Date(hariIni - b.lalu * 86400000).toISOString().slice(0, 10) }));
}

export const LANGKAH = [
  ['Pasang brief', '10 menit, gratis', 'Ceritakan usaha Anda, apa yang dibutuhkan, dan apa yang ingin dihindari. Brief Anda mendapat kode di papan.'],
  ['Kurasi', '1 hari kerja', 'Kurator membaca brief dan memilih tiga desainer dari portofolio yang paling cocok — bukan yang paling cepat mengklik.'],
  ['Tiga sketsa dibayar', '5 hari kerja', 'Setiap desainer dibayar uang sketsa untuk menggambar satu arah. Tidak ada yang bekerja gratis.'],
  ['Pilih & selesaikan', 'sisa waktu paket', 'Anda memilih satu arah. Desainernya menyelesaikan dengan dua putaran revisi, lalu hak cipta penuh berpindah ke Anda.'],
];

export const BANDING = {
  kolom: ['Kontes terbuka', 'Freelancer langsung', 'Agensi', 'Bribu'],
  baris: [
    ['Jumlah arah desain', 'Banyak, mutunya beragam', 'Biasanya 1–2', 'Biasanya 2–3', '3 arah dari 3 orang'],
    ['Siapa yang dibayar', 'Hanya pemenang', 'Satu desainer', 'Tim agensi', 'Ketiga desainer, lalu yang terpilih'],
    ['Siapa yang menyaring', 'Siapa saja boleh ikut', 'Anda sendiri', 'Agensi', 'Kurator, dari portofolio'],
    ['Cocok untuk', 'Mencari banyak ide cepat', 'Hubungan jangka panjang', 'Kampanye dan sistem besar', 'Usaha kecil yang ingin memilih tanpa ribet'],
  ],
};

export const FAQ = [
  { t: 'Apa bedanya dengan kontes desain?', j: 'Di kontes, banyak desainer menggambar tanpa dibayar dan hanya pemenang yang menerima uang. Di Bribu hanya tiga desainer yang menggambar, dan ketiganya dibayar untuk sketsanya.' },
  { t: 'Bagaimana kalau tidak ada sketsa yang cocok?', j: 'Anda boleh meminta satu putaran sketsa baru dari tiga desainer lain, atau membatalkan. Bila membatalkan, biaya paket dikembalikan dikurangi uang sketsa yang sudah dibayarkan ke desainer.' },
  { t: 'Siapa pemilik hak cipta?', j: 'Hak cipta desain terpilih berpindah penuh ke Anda setelah pelunasan. Dua sketsa lain tetap milik desainernya dan tidak boleh Anda pakai.' },
  { t: 'Kapan saya membayar?', j: 'Setelah kurasi. Anda melihat profil tiga desainer yang dipilih kurator lebih dulu, baru membayar paket bila setuju.' },
  { t: 'Boleh memilih desainer sendiri?', j: 'Boleh mengusulkan satu nama dari papan; dua lainnya tetap dipilih kurator supaya arahnya beragam.' },
];
