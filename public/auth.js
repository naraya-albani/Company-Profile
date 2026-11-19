const form = document.getElementById("form-auth");
const tombol = document.getElementById("tombol-kirim");
const status = document.getElementById("status-form");
const mode = form.dataset.mode;

// Kalau sudah login, langsung ke halaman admin
fetch("/api/auth/me").then((res) => {
  if (res.ok) location.replace("/admin.html");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "";
  status.textContent = "";
  tombol.disabled = true;

  try {
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.pesan || "Terjadi kesalahan, coba lagi.");

    status.className = "berhasil";
    status.textContent = data.pesan;
    location.href = "/admin.html";
  } catch (err) {
    status.className = "gagal";
    status.textContent = err.message;
    tombol.disabled = false;
  }
});
