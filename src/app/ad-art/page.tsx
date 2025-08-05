import Image from 'next/image'

export default function ADArtPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section dengan Gambar */}
      <div className="relative h-96 w-full">
        <Image
          src="/pondok.jpg"
          alt="Pondok Pesantren Barokatul Qur'an"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AD-ART
            </h1>
            <p className="text-xl md:text-2xl">
              Pondok Pesantren Tahfidz & Bahasa &quot;Barokatul Qur&apos;an&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ANGGARAN DASAR (AD)
            </h2>
            <h3 className="text-xl text-gray-700 mb-2">
              PONDOK PESANTREN TAHFIDZ & BAHASA &quot;BAROKATUL QUR&apos;AN&quot;
            </h3>
            <p className="text-gray-600">
              MUNGGANG, KALIBEBER, MOJOTENGAH, WONOSOBO
            </p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 1</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Nama, Tempat dan Kedudukan</h4>
              <div className="space-y-3">
                <p>1. Pondok Pesantren ini bernama &quot;Pondok Pesantren Tahfidz & Bahasa Barokatul Qur&apos;an&quot;, berdiri tahun 2017 dan dikukuhkan sebagai pondok pesantren pada tanggal 12 September 2018 oleh Kementerian Agama Wonosobo.</p>
                <p>2. Pondok Pesantren ini bertempat dan berkedudukan di dusun Jambean Kelurahan Kalibeber Kecamatan Mojotengah Kabupaten Wonosobo Propinsi Jawa Tengah.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 2</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Aqidah</h4>
              <p>Pondok Pesantren ini beraqidah Islam menurut faham Ahlussunah Wal Jama&apos;ah dengan mengikuti salah satu madzhab fiqih yang empat, yaitu Maliki, Hanafi, Syafi&apos;i dan Hanbali.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 3</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Visi, Misi dan Tujuan</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Visi Pesantren adalah mendorong terwujudnya generasi bangsa yang berakhlakul karimah, mandiri, berpengetahuan luas yang berlandaskan iman dan takwa sesuai Al-Qur&apos;an.</p>
                <p><strong>b.</strong> Misi Pesantren adalah:</p>
                <div className="ml-6 space-y-2">
                  <p>1. Mengembangkan potensi santri yang berakhlakul karimah, mandiri dan berpengetahuan luas yang berlandaskan iman dan takwa.</p>
                  <p>2. Memberdayakan santri dalam mewujudkan kesalehan individu dan kepekaan sosial melalui pemahaman ajaran Islam berdasarkan Al-Qur&apos;an dan Hadits Nabi Muhammad SAW.</p>
                </div>
                <p><strong>c.</strong> Tujuan Pesantren adalah mencetak manusia yang beriman, bertaqwa, berilmu, beramal, dan berakhlakul karimah sesuai Al-Qur&apos;an.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 4</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Arti Lambang</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Sudut luar berjumlah lima sebagai simbol rukun Islam.</p>
                <p><strong>b.</strong> Jumlah bintang secara keseluruhan ada sembilan, hal ini mempunyai makna walisongo (9 ulama penyebar agama Islam).</p>
                <p><strong>c.</strong> Tiga kubah sebagai wujud penenang dan pengayom umat.</p>
                <p><strong>d.</strong> Tulisan Barokatul Qur&apos;an dalam bahasa Arab bermakna berkah Al-Qur&apos;an, hal ini melambangkan bahwa adanya Pondok Pesantren Tahfidz & Bahasa &quot;Barokatul Qur&apos;an&quot; supaya bisa menjadi berkah dan kesejahteraan umat terutama para santri.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 5</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Arti Warna</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Warna putih bermakna kesucian, ketulusan dalam menggalang persatuan dan kesatuan masyarakat sesuai dengan syariat Islam.</p>
                <p><strong>b.</strong> Warna dasar hijau bermakna kedamaian, kesuburan dan kemakmuran bumi Nusantara dan Pondok Pesantren Tahfidz & Bahasa &quot;Barokatul Qur&apos;an&quot; sesuai dengan dambaan hati dan romantika hidup dan kehidupan di masyarakat.</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 6</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Kegiatan Pesantren</h4>
              <p className="mb-3">Bidang Pendidikan yang sudah berjalan:</p>
              <div className="space-y-3">
                <p><strong>1.</strong> Pendidikan Formal:</p>
                <div className="ml-6">
                  <p><strong>a)</strong> Madrasah Diniyah</p>
                </div>
                <p><strong>2.</strong> Pendidikan Nonformal:</p>
                <div className="ml-6 space-y-1">
                  <p><strong>a)</strong> Kursus bahasa Inggris</p>
                  <p><strong>b)</strong> Kursus bahasa Arab</p>
                  <p><strong>c)</strong> Kaligrafi</p>
                  <p><strong>d)</strong> Qiro&apos;ah</p>
                  <p><strong>e)</strong> Khitobah</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 7</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Santri</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Setiap orang yang menyatakan menjadi santri dan sanggup mematuhi anggaran Dasar dan Anggaran Rumah Tangga serta memenuhi syarat-syarat administrasi</p>
                <p><strong>b.</strong> Prosedur pendaftaran dan pemberhentian sebagai santri diatur dalam Anggaran Rumah Tangga</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 8</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Kepengurusan</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Pesantren dipimpin oleh seorang pengasuh</p>
                <p><strong>b.</strong> Dalam pelaksanaan tugas sehari-hari, pengasuh dibantu oleh pengurus</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 9</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Struktur Pengurus</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Pengurus pesantren terdiri atas Pengurus Harian dan Bidang</p>
                <p><strong>b.</strong> Pengurus Harian terdiri atas ketua, sekretaris, dan bendahara.</p>
                <p><strong>c.</strong> Bidang dipimpin oleh kepala bidang</p>
                <p><strong>d.</strong> Susunan bidang diatur dalam Anggaran Rumah Tangga</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 10</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Pengangkatan dan Pemberhentian Pengurus</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Pengurus pesantren diangkat dan diberhentikan oleh pengasuh</p>
                <p><strong>b.</strong> Jabatan struktural di bawah bidang dibentuk oleh kepala bidang yang bersangkutan sesuai kebutuhan atas persetujuan pengasuh</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 11</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Macam-macam Rapat</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Rapat-rapat di dalam pesantren terdiri atas:</p>
                <div className="ml-6 space-y-1">
                  <p>1. Rapat Badan Pengurus Lembaga Harian Pondok Pesantren</p>
                  <p>2. Rapat Pleno Pengurus Pondok Pesantren</p>
                </div>
                <p><strong>b.</strong> Tata cara dan ketentuan rapat diatur dalam Anggaran Rumah Tangga</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 12</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Keuangan</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Keuangan pesantren diperoleh dari:</p>
                <div className="ml-6 space-y-1">
                  <p>1. Syahriah Santri</p>
                  <p>2. Sumbangan lain yang tidak mengikat serta usaha-usaha lain yang halal</p>
                </div>
                <p><strong>b.</strong> Pengelolaan keuangan pesantren diatur dalam Anggaran Rumah Tangga</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 13</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Perubahan</h4>
              <p>Anggaran Dasar ini hanya dapat dirubah oleh keputusan rapat pengurus lengkap yang dihadiri sekurang-kurangnya 2/3 pengurus lengkap dan disetujui oleh 2/3 jumlah anggota yang hadir dengan persetujuan pengasuh.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pasal 14</h3>
              <h4 className="text-lg font-medium text-gray-800 mb-3">Penutup</h4>
              <div className="space-y-3">
                <p><strong>a.</strong> Segala sesuatu yang belum diatur dalam Anggaran Dasar ini, akan diatur dalam Anggaran Rumah Tangga.</p>
                <p><strong>b.</strong> Anggaran Dasar ini mulai berlaku sejak tanggal ditetapkan</p>
              </div>
            </section>

            <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">Ditetapkan di : Wonosobo</p>
              <p className="text-gray-600 mb-4">Pada Tanggal : 20 Juli 2017</p>
              <p className="font-semibold text-gray-800">Pengasuh</p>
              <p className="text-gray-700 mt-2">Ust. Al Faqir Moh. Faesholi, M.Pd.I.</p>
            </div>
          </div>

          {/* ART Section */}
          <div className="mt-16 pt-16 border-t-2 border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ANGGARAN RUMAH TANGGA (ART)
              </h2>
              <h3 className="text-xl text-gray-700 mb-2">
                PONDOK PESANTREN TAHFIDZ & BAHASA &quot;BAROKATUL QUR&apos;AN&quot;
              </h3>
              <p className="text-gray-600">
                MUNGGANG, KALIBEBER, MOJOTENGAH, WONOSOBO
              </p>
            </div>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h4 className="text-xl font-medium text-gray-800 mb-4">KETENTUAN KEWAJIBAN, HAK DAN LARANGAN SANTRI</h4>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Pasal 1</h5>
                    <h6 className="text-md font-medium text-gray-800 mb-2">Ketentuan Umum</h6>
                    <p className="mb-3">Yang dimaksud:</p>
                    <div className="space-y-2">
                      <p><strong>a.</strong> Pengasuh pesantren adalah pimpinan tertinggi pondok pesantren</p>
                      <p><strong>b.</strong> Pengurus pesantren adalah pengurus harian dan kepala bidang</p>
                      <p><strong>c.</strong> Santri adalah setiap orang yang terdaftar sebagai santri dan bertempat tinggal di asrama dalam kompleks pondok pesantren.</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Pasal 2</h5>
                    <h6 className="text-md font-medium text-gray-800 mb-2">Pendaftaran Sebagai Santri</h6>
                    <p className="mb-3">Tata cara pendaftaran sebagai santri:</p>
                    <div className="space-y-2">
                      <p>1. Calon santri diantarkan oleh orang tua/walinya atau orang yang diberi kuasa oleh orang tua/walinya untuk diserahkan kepada pengasuh pesantren</p>
                      <p>2. Calon santri tidak berstatus sebagai santri pondok pesantren lain</p>
                      <p>3. Calon santri bebas dari berbagai daerah di Indonesia atau mancanegara yang beragama Islam atau hendak masuk Islam</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Pasal 3</h5>
                    <h6 className="text-md font-medium text-gray-800 mb-2">Kewajiban Santri</h6>
                    <p className="mb-3">Kewajiban santri adalah:</p>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2"><strong>a.</strong> Kewajiban Bersama</p>
                        <p className="mb-2">1. Kewajiban bersama bagi santri putra dan putri adalah:</p>
                        <div className="ml-6 space-y-1">
                          <p>a) Tarhim</p>
                          <p>b) Jama&apos;ah Sholat Fardhu terutama Subuh, Maghrib dan Isya&apos;.</p>
                          <p>c) Istighosah bersama ba&apos;da Sholat Subuh.</p>
                          <p>d) Semua santri wajib menetap di lingkungan Pondok</p>
                          <p>e) Mengikuti kegiatan Pondok dan Madrasah yang telah ditentukan</p>
                          <p>f) Menjaga nama baik Pondok Pesantren</p>
                          <p>g) Menjaga keamanan, ketertiban dan kebersihan Pondok</p>
                          <p>h) Membaca Asmaul Husna setiap ba&apos;da shalat fardhu</p>
                          <p>i) Khataman Qur&apos;an setiap Kamis sore.</p>
                          <p>j) Membaca diba&apos; maulid Nabi Muhammad dan simtudduror marawis setiap malam Jum&apos;at.</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-2"><strong>b.</strong> Kewajiban Perorangan</p>
                        <p className="mb-2">Setiap santri putra dan putri mempunyai kewajiban:</p>
                        <div className="ml-6 space-y-1">
                          <p>1. Bertempat tinggal di asrama dalam kompleks pondok pesantren.</p>
                          <p>2. Mengutamakan kewajiban-kewajiban agama</p>
                          <p>3. Shalat Jama&apos;ah</p>
                          <p>4. Mematuhi peraturan pesantren</p>
                          <p>5. Menjaga kebersihan</p>
                          <p>6. Mengikuti pengajian</p>
                          <p>7. Rajin masuk Madrasah atau Sekolah bagi yang menempuh pendidikan formal</p>
                          <p>8. Sopan santun terhadap siapapun</p>
                          <p>9. Menjaga nama baik pesantren</p>
                          <p>10. Menghadiri ceramah, kursus, pelatihan, pengajian, dan lain-lain majelis yang ditentukan oleh pengasuh/pengurus.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Pasal 4</h5>
                    <h6 className="text-md font-medium text-gray-800 mb-2">Hak-hak Santri</h6>
                    <p className="mb-3">Setiap santri mempunyai hak:</p>
                    <div className="space-y-2">
                      <p><strong>a.</strong> Menggunakan fasilitas yang disediakan oleh pesantren</p>
                      <p><strong>b.</strong> Mendapatkan bimbingan, pelayanan, dan pendidikan</p>
                      <p><strong>c.</strong> Memilih dan dipilih sebagai pengurus atau jabatan lain yang ditetapkan oleh pesantren</p>
                      <p><strong>d.</strong> Mengeluarkan pendapat, baik secara tulisan maupun lisan dengan berakhlaqul karimah</p>
                      <p><strong>e.</strong> Mengadakan pembelaan atas keputusan terhadap dirinya dengan cara yang baik dan sopan</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Pasal 5</h5>
                    <h6 className="text-md font-medium text-gray-800 mb-2">Gugurnya Hak Santri</h6>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2"><strong>a.</strong> Santri dinyatakan gugur haknya karena berhenti:</p>
                        <div className="ml-6 space-y-1">
                          <p>1. Atas permintaan orang tua/wali</p>
                          <p>2. Diberhentikan oleh pesantren setelah yang bersangkutan terbukti melanggar peraturan pondok pesantren setelah melalui tahapan pembinaan dari pengurus dan pengasuh</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-2"><strong>b.</strong> Tata cara berhenti:</p>
                        <div className="ml-6 space-y-1">
                          <p>1. Tidak mempunyai tanggungan apapun kepada, lembaga, santri lain, tetangga, atau pihak lain.</p>
                          <p>2. Dipamitkan oleh orang tua/wali atau orang yang diberi kuasa oleh orang tua/ wali.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-3">Pasal 6</h5>
                    <h6 className="text-md font-medium text-gray-800 mb-2">Larangan-larangan Santri</h6>
                    <div className="space-y-2">
                      <p><strong>a.</strong> Melanggar larangan-larangan agama</p>
                      <p><strong>b.</strong> Melanggar AD/ART dan peraturan pondok pesantren</p>
                      <p><strong>c.</strong> Membawa, menyimpan dan menggunakan hand phone tanpa izin pengasuh/pengurus</p>
                      <p><strong>d.</strong> Menggunakan listrik untuk kepentingan pribadi tanpa izin pengasuh/pengurus</p>
                      <p><strong>e.</strong> Melakukan kekerasan di dalam dan di luar komplek pesantren</p>
                      <p><strong>f.</strong> Bepergian melewati batas santri tanpa izin pengasuh atau yang mewakilinya</p>
                      <p><strong>g.</strong> Melihat pertunjukan yang mengandung maksiat</p>
                      <p><strong>h.</strong> Melakukan hal-hal yang merusak tatanan, seperti:</p>
                      <div className="ml-6 space-y-1">
                        <p>1. Merusak barang orang lain</p>
                        <p>2. Merusak fasilitas pondok pesantren dan lingkungan</p>
                        <p>3. Membuang sampah tidak pada tempatnya</p>
                        <p>4. Dan lain-lain yang dipandang menodai etika dan kehormatan pondok pesantren</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-2">Ditetapkan di : Wonosobo</p>
                <p className="text-gray-600 mb-4">Pada Tanggal : 20 Juli 2017</p>
                <p className="font-semibold text-gray-800">Pengasuh</p>
                <p className="text-gray-700 mt-2">Ust. Al Faqir Moh. Faesholi, M.Pd.I.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 