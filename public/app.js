// Ikon dipilih bergiliran karena data layanan di database tidak menyimpan ikon.
const IKON_LAYANAN = ["💻", "📱", "💡", "📈", "🎨", "⚙️"];

async function muatLayanan() {
  const wadah = document.querySelector("#daftar-layanan");
  try {
    const res = await fetch("/api/services");
    if (!res.ok) throw new Error("Gagal memuat layanan");
    const data = await res.json();

    wadah.innerHTML = "";
    if (data.length === 0) wadah.textContent = "Belum ada layanan.";
    data.forEach((item, i) => {
      const kartu = document.createElement("article");
      kartu.className = "kartu kartu-layanan";

      const ikon = document.createElement("span");
      ikon.className = "ikon";
      ikon.setAttribute("aria-hidden", "true");
      ikon.textContent = IKON_LAYANAN[i % IKON_LAYANAN.length];

      // textContent, bukan innerHTML: teks dari database tidak dijalankan sebagai HTML (cegah XSS).
      const judul = document.createElement("h3");
      judul.textContent = item.nama;
      const isi = document.createElement("p");
      isi.textContent = item.deskripsi ?? "";

      kartu.append(ikon, judul, isi);
      wadah.append(kartu);
    });
  } catch (err) {
    wadah.textContent = "Maaf, layanan belum bisa ditampilkan.";
  }
}

// Menu HP: tombol garis tiga membuka/menutup navigasi.
const tombolMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

function aturMenu(buka) {
  menu.classList.toggle("terbuka", buka);
  tombolMenu.setAttribute("aria-expanded", String(buka));
  tombolMenu.setAttribute("aria-label", buka ? "Tutup menu" : "Buka menu");
}

tombolMenu.addEventListener("click", () =>
  aturMenu(!menu.classList.contains("terbuka")),
);
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") aturMenu(false);
});

document.querySelector("#tahun").textContent = new Date().getFullYear();
muatLayanan();
