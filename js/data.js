/**
 * STRUKTUR DATA — 2 LEVEL
 * ------------------------------------------------------------------
 * PROJECTS = daftar kawasan/cluster (mis. "Rumah Sadewa Kalisegoro UNNES")
 *   -> setiap project punya `units` = daftar rumah dengan spesifikasi
 *      berbeda-beda (mis. "Rumah Sadewa 1" s/d "Rumah Sadewa 5")
 *
 * URL yang dihasilkan otomatis oleh router (js/main.js):
 *   /project/{project.slug}                     -> daftar unit dalam project itu
 *                                                    (kalau cuma 1 unit, langsung
 *                                                     lompat ke halaman detail unit)
 *   /project/{project.slug}/{unit.slug}          -> halaman detail 1 rumah
 *
 * CARA MENAMBAH UNIT BARU DI PROJECT YANG SUDAH ADA:
 *   Copy salah satu object di dalam array `units`, ganti isinya, lalu ganti
 *   `slug` unit (unik di dalam project itu saja, boleh sama dengan project
 *   lain). Menu, grid, dropdown akan otomatis ter-update.
 *
 * CARA MENAMBAH PROJECT/CLUSTER BARU:
 *   Copy salah satu object level atas (di dalam array PROJECTS), ganti
 *   `slug`, `nama`, dst, lalu isi array `units` dengan minimal 1 unit.
 */

const PROJECTS = [
  {
    slug: "rumah-sadewa-kalisegoro-unnes",
    nama: "RUMAH SADEWA KALISEGORO UNNES",
    lokasi: "Kalisegoro, Kec. Gn. Pati, Kota Semarang, Jawa Tengah 50229",
    tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
    deskripsi: "Rumah sangat strategis selangkah ke Jalan Raya Utama, dekat Universitas Negeri Semarang, kawasan Pertokoan dan kuliner Dalam Pemukiman yang tenang dan nyaman serta tidak jauh dari fasilitas umum seperti Masjid, Sekolah dan Klinik kesehatan Mudah dijangkau akses mobil sampai lokasi dan dekat dengan transportasi umum feeder BRT Semarang",
    heroImage: "assets/images/sadewa/sadewa-1/sadewa-1.png",

    units: [
      {
        slug: "rumah-sadewa-kalisegoro-unnes-1",
        nama: "RUMAH SADEWA 1",
        subnama: "UNNES Kalisegoro Semarang",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Rumah Sadewa Kalisegoro Unnes 1 hadir sebagai pilihan hunian yang mengutamakan kualitas bangunan, kenyamanan, dan kemudahan akses. Berada di kawasan Kalisegoro, Semarang, perumahan ini menawarkan lingkungan yang tenang dengan akses yang mudah menuju pusat pendidikan, fasilitas umum, serta berbagai kebutuhan sehari-hari. Dengan jumlah unit yang terbatas, setiap rumah dirancang secara optimal untuk memberikan ruang yang nyaman bagi keluarga. Didukung legalitas SHM dan spesifikasi bangunan yang berkualitas, Rumah Sadewa Kalisegoro Unnes 1 menjadi pilihan tepat bagi Anda yang mencari tempat tinggal maupun investasi properti dengan prospek yang menjanjikan.",
        heroImage: "assets/images/sadewa/sadewa-1/sadewa-1.png",
        images: [
          "assets/images/sadewa/sadewa-1/sadewa-1.png",
          "assets/images/sadewa/sadewa-1/sadewa-2.png",
          "assets/images/sadewa/sadewa-1/sadewa-3.png",
          "assets/images/sadewa/sadewa-1/sadewa-4.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "80/120" },
          { label: "Luas Kavling", value: "120 m²" },
          { label: "Luas Bangunan", value: "80 m²" },
          { label: "Jumlah Kamar Tidur", value: "3 Kamar" },
          { label: "Jumlah Kamar Mandi", value: "2 Kamar" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "700 Juta-an" }
        ],
        fasilitas: [
          "4 Menit ke Universitas Negeri Semarang",
          "Dalam Pemukiman dan lingkungan kos kosan",
          "Masjid / musala",
          "Ruko & area komersial",
          "3 menit ke Klinik Pengobatan",
          "Saluran drainase tertutup",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          nama: "Tim Marketing Griya Tumbuh Asri",
          peran: "Sales Consultant TumbuhLand",
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      },

      {
        slug: "rumah-sadewa-kalisegoro-unnes-2",
        nama: "RUMAH SADEWA 2",
        subnama: "UNNES Kalisegoro Semarang",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Hunian eksklusif dengan desain modern di kawasan berkembang Semarang. Rumah Sadewa Kalisegoro UNNES 2 merupakan pengembangan terbaru dari TumbuhLand yang menghadirkan hunian modern dengan desain elegan, tata ruang yang fungsional, serta kualitas bangunan yang terjamin. Berlokasi di kawasan Kalisegoro, dekat Universitas Negeri Semarang (UNNES), perumahan ini menawarkan lingkungan yang nyaman dengan akses mudah menuju pusat kota, fasilitas pendidikan, dan berbagai kebutuhan sehari-hari. Dirancang untuk memenuhi gaya hidup keluarga masa kini, setiap unit mengedepankan kenyamanan, pencahayaan alami, dan sirkulasi udara yang optimal. Didukung legalitas yang jelas serta potensi pertumbuhan kawasan yang terus berkembang, Rumah Sadewa Kalisegoro UNNES 2 menjadi pilihan tepat bagi Anda yang mencari hunian berkualitas sekaligus investasi properti yang menjanjikan.",
        heroImage: "assets/images/sadewa/sadewa-2/A344F222-6728-44F4-89C5-C8F26FDA417F.png",
        images: [
          "assets/images/sadewa/sadewa-2/A344F222-6728-44F4-89C5-C8F26FDA417F.png",
          "assets/images/sadewa/sadewa-2/388AD2EC-AA40-4FE1-A573-C82B534D7D5A.png",
          "assets/images/sadewa/sadewa-2/48F62673-2E0B-4534-9FC2-FE4F79E45E2E.png",
          "assets/images/sadewa/sadewa-2/62a33ccb-a953-41df-b204-b36d0208da7d.jpg",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "80/153" },
          { label: "Luas Kavling", value: "153 m²" },
          { label: "Luas Bangunan", value: "80 m²" },
          { label: "Jumlah Kamar Tidur", value: "3 Kamar" },
          { label: "Jumlah Kamar Mandi", value: "2 Kamar" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "665 Juta-an" }
        ],
        fasilitas: [
          "200 meter dari Jl Kalisegoro Raya",
          "Masjid / musala",
          "5 menit ke UNNES Universitas Negeri Semarang",
          "Dekat dengan area kuliner & perukoan",
          "3 menit ke Klinik Pengobatan",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      },

      {
        slug: "rumah-sadewa-kalisegoro-unnes-3",
        nama: "RUMAH SADEWA 3",
        subnama: "UNNES Kalisegoro Semarang",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Hunian eksklusif dengan desain modern di kawasan berkembang Semarang. Rumah Sadewa Kalisegoro UNNES 3 merupakan pengembangan terbaru dari TumbuhLand yang menghadirkan hunian modern dengan desain elegan, tata ruang yang fungsional, serta kualitas bangunan yang terjamin. Berlokasi di kawasan Kalisegoro, dekat Universitas Negeri Semarang (UNNES), perumahan ini menawarkan lingkungan yang nyaman dengan akses mudah menuju pusat kota, fasilitas pendidikan, dan berbagai kebutuhan sehari-hari. Dirancang untuk memenuhi gaya hidup keluarga masa kini, setiap unit mengedepankan kenyamanan, pencahayaan alami, dan sirkulasi udara yang optimal. Didukung legalitas yang jelas serta potensi pertumbuhan kawasan yang terus berkembang, Rumah Sadewa Kalisegoro UNNES 3 menjadi pilihan tepat bagi Anda yang mencari hunian berkualitas sekaligus investasi properti yang menjanjikan.",
        heroImage: "assets/images/sadewa/sadewa-3/jwdqwdnIWADjjefwfef.png",
        images: [
          "assets/images/sadewa/sadewa-3/jwdqwdnIWADjjefwfef.png",
          "assets/images/sadewa/sadewa-3/fefjqdkwedkqdnwqdq0.png",
          "assets/images/sadewa/sadewa-3/femfiwqdjqoowdq.png",
          "assets/images/sadewa/sadewa-3/wefpejfq=odmadjad.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "100/120" },
          { label: "Luas Kavling", value: "120 m²" },
          { label: "Luas Bangunan", value: "100 m²" },
          { label: "Jumlah Kamar Tidur", value: "4 Kamar" },
          { label: "Jumlah Kamar Mandi", value: "3 Kamar" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "700 Juta-an" }
        ],
        fasilitas: [
          "200 meter dari Jl Kalisegoro Raya",
          "Masjid / musala",
          "5 menit ke UNNES Universitas Negeri Semarang",
          "Dekat dengan area kuliner & perukoan",
          "3 menit ke Klinik Pengobatan",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      },

      {
        slug: "rumah-sadewa-kalisegoro-unnes-4",
        nama: "RUMAH SADEWA 4",
        subnama: "UNNES Kalisegoro Semarang",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Hunian eksklusif dengan desain modern di kawasan berkembang Semarang. Rumah Sadewa Kalisegoro UNNES 4 merupakan pengembangan terbaru dari TumbuhLand yang menghadirkan hunian modern dengan desain elegan, tata ruang yang fungsional, serta kualitas bangunan yang terjamin. Berlokasi di kawasan Kalisegoro, dekat Universitas Negeri Semarang (UNNES), perumahan ini menawarkan lingkungan yang nyaman dengan akses mudah menuju pusat kota, fasilitas pendidikan, dan berbagai kebutuhan sehari-hari. Dirancang untuk memenuhi gaya hidup keluarga masa kini, setiap unit mengedepankan kenyamanan, pencahayaan alami, dan sirkulasi udara yang optimal. Didukung legalitas yang jelas serta potensi pertumbuhan kawasan yang terus berkembang, Rumah Sadewa Kalisegoro UNNES 4 menjadi pilihan tepat bagi Anda yang mencari hunian berkualitas sekaligus investasi properti yang menjanjikan.",
        heroImage: "assets/images/sadewa/sadewa-4/FEQFQWDQJDWQDM.png",
        images: [
          "assets/images/sadewa/sadewa-4/FEQFQWDQJDWQDM.png",
          "assets/images/sadewa/sadewa-4/FQ7FCQ0DN201CNDQDFQDH.png",
          "assets/images/sadewa/sadewa-4/FQMU9DF1J0DJCQ9D12JCADAD.png",
          "assets/images/sadewa/sadewa-4/FQ,0IDJQ1DJ1DF23-FAOFNA.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "45/98" },
          { label: "Luas Kavling", value: "98 m²" },
          { label: "Luas Bangunan", value: "45 m²" },
          { label: "Jumlah Kamar Tidur", value: "2 Kamar" },
          { label: "Jumlah Kamar Mandi", value: "1 Kamar" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "450 Juta-an" }
        ],
        fasilitas: [
         "200 meter dari Jl Kalisegoro Raya",
          "Masjid / musala",
          "5 menit ke UNNES Universitas Negeri Semarang",
          "Dekat dengan area kuliner & perukoan",
          "3 menit ke Klinik Pengobatan",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      },

      {
        slug: "rumah-sadewa-kalisegoro-unnes-5",
        nama: "RUMAH SADEWA 5",
        subnama: "UNNES Kalisegoro Semarang",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Hunian eksklusif dengan desain modern di kawasan berkembang Semarang. Rumah Sadewa Kalisegoro UNNES 5 merupakan pengembangan terbaru dari TumbuhLand yang menghadirkan hunian modern dengan desain elegan, tata ruang yang fungsional, serta kualitas bangunan yang terjamin. Berlokasi di kawasan Kalisegoro, dekat Universitas Negeri Semarang (UNNES), perumahan ini menawarkan lingkungan yang nyaman dengan akses mudah menuju pusat kota, fasilitas pendidikan, dan berbagai kebutuhan sehari-hari. Dirancang untuk memenuhi gaya hidup keluarga masa kini, setiap unit mengedepankan kenyamanan, pencahayaan alami, dan sirkulasi udara yang optimal. Didukung legalitas yang jelas serta potensi pertumbuhan kawasan yang terus berkembang, Rumah Sadewa Kalisegoro UNNES 5 menjadi pilihan tepat bagi Anda yang mencari hunian berkualitas sekaligus investasi properti yang menjanjikan.",
        heroImage: "assets/images/sadewa/sadewa-5/WES12D1E91N9DJ12EFNWEF2.png",
        images: [
          "assets/images/sadewa/sadewa-5/WES12D1E91N9DJ12EFNWEF2.png",
          "assets/images/sadewa/sadewa-5/HDU9HD1D1-3JD23R.png",
          "assets/images/sadewa/sadewa-5/3ER2EMU1EH1EENOE1.png",
          "assets/images/sadewa/sadewa-5/1E1U29E1EJFFWF2J1E09.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "45/120" },
          { label: "Luas Kavling", value: "120 m²" },
          { label: "Luas Bangunan", value: "45 m²" },
          { label: "Jumlah Kamar Tidur", value: "2 Kamar" },
          { label: "Jumlah Kamar Mandi", value: "1 Kamar" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "450 Juta-an" }
        ],
        fasilitas: [
          "200 meter dari Jl Kalisegoro Raya",
          "Masjid / musala",
          "5 menit ke UNNES Universitas Negeri Semarang",
          "Dekat dengan area kuliner & perukoan",
          "3 menit ke Klinik Pengobatan",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      }
    ]
  },

  {
    slug: "cluster-kos-al-medina-unnes",
    nama: "CLUSTER KOS AL MEDINA UNNES",
    lokasi: "Kalisegoro, Kec. Gn. Pati, Kota Semarang, Jawa Tengah 50229",
    tagline: "Peluang investasi properti paling cerdas di Semarang!",
    deskripsi: "Cluster Kost Al Medina UNNES merupakan pilihan investasi kost modern di kawasan strategis dekat Universitas Negeri Semarang (UNNES). Dibangun dengan konsep minimalis, lingkungan yang nyaman, serta akses mudah ke kampus dan fasilitas umum, menjadikannya solusi tepat bagi Anda yang mencari properti dengan potensi investasi dan nilai yang terus bertumbuh.",
    heroImage: "assets/images/almedina/DJFJWEFOIEQJF-12R23.png",

    units: [
      {
        slug: "cluster-kos-al-medina-unnes",
        nama: "CLUSTER KOS AL MEDINA UNNES",
        tagline: "Investasi Kost Modern Dekat Kampus UNNES Semarang",
        deskripsi: "Cluster Kost Al Medina UNNES merupakan pilihan investasi kost modern di kawasan strategis dekat Universitas Negeri Semarang (UNNES). Dibangun dengan konsep minimalis, lingkungan yang nyaman, serta akses mudah ke kampus dan fasilitas umum, menjadikannya solusi tepat bagi Anda yang mencari properti dengan potensi investasi dan nilai yang terus bertumbuh.",
        heroImage: "assets/images/almedina/DJFJWEFOIEQJF-12R23.png",
        images: [
          "assets/images/almedina/DJFJWEFOIEQJF-12R23.png",
          "assets/images/almedina/FEWFJEWFU9H2F02.png",
          "assets/images/almedina/EFMQFUOEHNF202RHNOR23.png",
          "assets/images/almedina/2RK30IERJ310E1HHBF2.png",
          "assets/images/almedina/R23RJ29RH20R2RHUO.png",
          "assets/images/almedina/R32R3J2I3R2HJ3-RNR.png",
          "assets/images/almedina/RJ32RJ20RU293R2RH.png",
          "assets/images/almedina/HF3EE033CFJ29UF1-DF.png",
        ],
        imagesMap: [
          "assets/images/almedina/FMCWU9DBHWQUDJQDQBHDH.png", 
        ],
        imagesAkad: [
          "assets/images/almedina/FNJWEU9WEFWJEFIWJF-OWEF.png",
          "assets/images/almedina/FMWE9UFJ2-FJEOFJWFE.png",
          "assets/images/almedina/FNU9QDFHQI0DJQD02.png",
          "assets/images/almedina/HJDOWDOPQJDFJEFRHQODNQWD.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "100/120" },
          { label: "Luas Kavling", value: "120 m²" },
          { label: "Jumlah Unit", value: "8 Unit (Rumah Ready & Pesan Bangun)" },
          { label: "Jumlah Kamar", value: "Pilihan Opsi 5 - 8 kamar" },
          { label: "Kondisi Bangunan", value: "Baru gres (pesan bangun, kualitas material terjamin) " },
          { label: "Sistem Listrik", value: "Token mandiri per kamar (biaya listrik ditanggung penuh oleh penghuni kos)" },
          { label: "Sumber Air", value: "Artetis / PDAM & Tandon Air 1000 L" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "900 Juta-an" }
        ],
        fasilitas: [
          "Keamanan Maksimal: Menggunakan sistem One Gate System (satu pintu keluar masuk),",
          "Lingkungan tenang, aman, dan sangat disukai mahasiswa",
          "Ruko & area komersial",
          "Sangat Dekat Kampus: Hanya 4 menit saja menuju kampus Universitas Negeri Semarang (UNNES).",
          "Akses Mudah: Dekat dengan pusat kuliner, minimarket, laundry, dan fasilitas umum kebutuhan mahasiswa.",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          nama: "Tim Marketing Griya Tumbuh Asri",
          peran: "Sales Consultant TumbuhLand",
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      }
    ]
  },

  {
    slug: "perumahan-mangunsari-garden",
    nama: "PERUMAHAN MANGUNSARI GARDEN",
    lokasi: "Kalisegoro, Kec. Gn. Pati, Kota Semarang, Jawa Tengah 50229",
    tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
    deskripsi: "Ruang hidup yang dirancang untuk tumbuh bersama keluarga. Perumahan Mangunsari Garden menghadirkan konsep hunian yang mengedepankan keseimbangan antara kenyamanan, kepraktisan, dan lingkungan yang mendukung kualitas hidup.",
    heroImage: "assets/images/mangunsari/mangunsari-1.png",

    units: [
      {
        slug: "perumahan-mangunsari-garden",
        nama: "PERUMAHAN MANGUNSARI GARDEN",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Ruang hidup yang dirancang untuk tumbuh bersama keluarga. Perumahan Mangunsari Garden menghadirkan konsep hunian yang mengedepankan keseimbangan antara kenyamanan, kepraktisan, dan lingkungan yang mendukung kualitas hidup. Berlokasi di kawasan Mangunsari yang terus berkembang, perumahan ini menawarkan suasana yang lebih tenang tanpa mengorbankan kemudahan akses menuju pusat aktivitas, fasilitas pendidikan, pusat perbelanjaan, hingga layanan kesehatan. Setiap unit dibangun dengan desain yang modern dan tata ruang yang efisien sehingga mampu mengakomodasi kebutuhan keluarga masa kini. Didukung kualitas konstruksi yang baik serta lingkungan yang tertata rapi, Mangunsari Garden menjadi pilihan ideal bagi Anda yang menginginkan rumah untuk ditinggali maupun sebagai aset properti dengan potensi nilai yang terus bertumbuh.",
        heroImage: "assets/images/mangunsari/mangunsari-1.png",
        images: [
          "assets/images/mangunsari/mangunsari-1.png",
          "assets/images/mangunsari/mangunsari-2.png",
          "assets/images/mangunsari/mangunsari-3.png",
          "assets/images/mangunsari/mangunsari-4.png",
          "assets/images/mangunsari/mangunsari-5.png",
          "assets/images/mangunsari/mangunsari-6.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "70/120" },
          { label: "Luas Kavling", value: "120 m²" },
          { label: "Jumlah Unit", value: "10 unit Rumah Ready" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "700 Juta-an" }
        ],
        fasilitas: [
          "Taman bermain anak",
          "Jogging track",
          "Masjid / musala",
          "Ruko & area komersial",
          "Jalan lingkungan lebar 8 meter",
          "Saluran drainase tertutup",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          nama: "Tim Marketing Griya Tumbuh Asri",
          peran: "Sales Consultant TumbuhLand",
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      }
    ]
  },

  {
    slug: "perumahan-pakintelan-garden-1",
    nama: "PERUMAHAN PAKINTELAN GARDEN 1",
    lokasi: "Kalisegoro, Kec. Gn. Pati, Kota Semarang, Jawa Tengah 50229",
    tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
    deskripsi: "Hunian bernilai dengan lokasi yang mendukung mobilitas dan masa depan. Perumahan Pakintelan Garden dirancang untuk memberikan pengalaman tinggal yang nyaman di kawasan yang berkembang pesat.",
    heroImage: "assets/images/sadewa/sadewa-1.png",

    units: [
      {
        slug: "perumahan-pakintelan-garden-1",
        nama: "PERUMAHAN PAKINTELAN GARDEN 1",
        tagline: "Hunian aman dan nyaman di tepi perbukitan Semarang",
        deskripsi: "Hunian bernilai dengan lokasi yang mendukung mobilitas dan masa depan. Perumahan Pakintelan Garden dirancang untuk memberikan pengalaman tinggal yang nyaman di kawasan yang berkembang pesat. Berada di Pakintelan, Semarang, perumahan ini menawarkan perpaduan antara lingkungan yang asri, akses yang mudah, serta suasana yang mendukung kehidupan keluarga maupun aktivitas sehari-hari. Mengusung desain rumah yang sederhana namun tetap modern, setiap unit memaksimalkan fungsi ruang agar terasa lebih lega, terang, dan nyaman untuk ditempati. Lokasinya yang dekat dengan kawasan pendidikan, pusat kuliner, serta berbagai fasilitas umum menjadikan Pakintelan Garden pilihan tepat bagi Anda yang mengutamakan kemudahan hidup tanpa harus jauh dari ketenangan lingkungan.",
        heroImage: "assets/images/sadewa/sadewa-1.png",
        images: [
          "assets/images/sadewa/sadewa-1.png",
          "assets/images/sadewa/sadewa-2.png",
          "assets/images/sadewa/sadewa-3.png",
          "assets/images/sadewa/sadewa-4.png",
        ],
        spesifikasi: [
          { label: "Tipe Unit", value: "70/120" },
          { label: "Luas Kavling", value: "120 m²" },
          { label: "Jumlah Unit", value: "5 unit (Rumah Ready & Pesan Bangun)" },
          { label: "Struktur", value: "Beton bertulang, dinding bata ringan" },
          { label: "Listrik", value: "1300 Watt" },
          { label: "Sumber Air", value: "Artetis PAM Simas" },
          { label: "Status Tanah", value: "SHM (Sertifikat Hak Milik) Ready On Hand" },
          { label: "Harga", value: "700 Juta-an" }
        ],
        fasilitas: [
          "Taman bermain anak",
          "Jogging track",
          "Masjid / musala",
          "Ruko & area komersial",
          "Jalan lingkungan lebar 8 meter",
          "Saluran drainase tertutup",
          "Area resapan & ruang terbuka hijau"
        ],
        marketing: {
          nama: "Tim Marketing Griya Tumbuh Asri",
          peran: "Sales Consultant TumbuhLand",
          telepon: "+62 8121-5207-380",
          whatsapp: "6281215207380",
          email: "tumbuhland@gmail.com"
        }
      }
    ]
  }
];
