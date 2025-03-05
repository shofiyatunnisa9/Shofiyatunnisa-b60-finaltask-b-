document.addEventListener("DOMContentLoaded", function () {
  const formProvinsi = document.getElementById("form-provinsi");
  const listProvinsi = document.getElementById("list-provinsi");

  formProvinsi.addEventListener("submit", async function (event) {
    event.preventDefault(); // Mencegah pengiriman form default

    // Ambil nilai dari input fields
    const nama = document.getElementById("nama").value.trim();
    const diresmikan = document.getElementById("diresmikan").value;
    const photo = document.getElementById("photo").files[0];
    const pulau = document.getElementById("pulau").value.trim();

    // Validasi input
    if (!nama || !diresmikan || !photo || !pulau) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(photo.type)) {
      alert("Format gambar harus JPG, JPEG, atau PNG!");
      return;
    }

    // Buat FormData untuk mengirim file
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("diresmikan", diresmikan);
    formData.append("photo", photo);
    formData.append("pulau", pulau);

    try {
      const response = await fetch("/add-provinsi", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan provinsi");
      }

      alert("Provinsi berhasil ditambahkan!");
      formProvinsi.reset();
      fetchProvinsi(); // Reload data dari server
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambahkan provinsi.");
    }
  });

  async function fetchProvinsi() {
    try {
      const response = await fetch("/list-provinsi");
      const provinsis = await response.json();

      listProvinsi.innerHTML = "";
      provinsis.forEach((provinsi) => {
        listProvinsi.innerHTML += `
            <article>
                <div class="list-index" style="display: flex; gap: 20px; padding: 20px;">
                    <div class="col-md-3">
                        <div class="card shadow-sm">
                            <img src="${provinsi.photo}" class="card-img-top" alt="photo">
                            <div class="card-body text-center">
                                <h5 class="card-title">${provinsi.nama}</h5>
                                <p class="card-text" style="color: gray;">${provinsi.diresmikan}</p>
                                <a href="/detail-provinsi/${provinsi.id}" class="btn btn-primary">Detail</a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>`;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      listProvinsi.innerHTML = "<p>Gagal mengambil data provinsi.</p>";
    }
  }

  // Panggil saat halaman dimuat
  fetchProvinsi();
});

// document.addEventListener("DOMContentLoaded", function () {
//   const formProvinsi = document.getElementById("form-provinsi");
//   const listProvinsi = document.getElementById("list-provinsi");
//   let provinsis = [];

//   formProvinsi.addEventListener("submit", function (event) {
//     event.preventDefault(); // Mencegah pengiriman form default

//     // Ambil nilai dari input fields
//     const nama = document.getElementById("nama").value.trim();
//     const diresmikan = document.getElementById("diresmikan").value;
//     const photo = document.getElementById("photo").files[0];
//     const pulau = document.getElementById("pulau").value.trim();

//     // Validasi input
//     if (!nama || !diresmikan || !photo || !pulau) {
//       alert("Semua kolom wajib diisi!");
//       return;
//     }

//     // Validasi tipe file
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(photo.type)) {
//       alert("Format gambar harus JPG, JPEG, atau PNG!");
//       return;
//     }

//     // Buat URL objek untuk gambar
//     const photoURL = URL.createObjectURL(photo);

//     // Tambahkan data ke array provinsis
//     const newProvinsi = {
//       id: provinsis.length + 1,
//       nama: nama,
//       diresmikan: diresmikan,
//       photo: photoURL,
//       pulau: pulau,
//       postedAt: new Date(),
//     };
//     provinsis.push(newProvinsi);

//     // Render ulang daftar provinsi
//     renderProvinsi();
//   });

//   function renderProvinsi() {
//     listProvinsi.innerHTML = "";

//     provinsis.forEach((provinsi) => {
//       listProvinsi.innerHTML += `
//             <article>
//                 <div class="list-index" style="display: flex; gap: 20px; padding: 20px;">
//                     <div class="col-md-3">
//                         <div class="card shadow-sm">
//                             <img src="${provinsi.photo}" class="card-img-top" alt="photo">
//                             <div class="card-body text-center">
//                                 <h5 class="card-title">${provinsi.nama}</h5>
//                                 <p class="card-text" style="color: gray;">${provinsi.diresmikan}</p>
//                                 <a href="/detail-provinsi/${provinsi.id}" class="btn btn-primary">Detail</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </article>`;
//     });
//   }
// });

// let provinsis = [];

// function addProvinsi(event) {
//   event.preventDefault();

//   let nama = document.getElementById("nama").value;
//   let diresmikan = document.getElementById("diresmikan").value;
//   let photo = document.getElementById("photo").files[0];
//   let pulau = document.getElementById("pulau").value;

//   let newProvinsi = {
//     nama: nama,
//     diresmikan: diresmikan,
//     photo: photo,
//     pulau: pulau,
//     postedAt: new Date(),
//   };

//   provinsis.push(newProvinsi);

//   console.log(provinsis);

//   renderProvinsi();
// }

// function renderProvinsi() {
//   let formProvinsi = document.getElementById("list-provinsi");

//   formProvinsi.innerHTML = firstProvinsiContent();

//   for (let index = 0; index < provinsis.length; index++) {
//     console.log(provinsis[index]);

//     formProvinsi.innerHTML += `
//     <article>
//     <div action="/list-provinsi" class="list-index" style="display: flex; gap: 20px; padding: 20px;">
//         <div class="col-md-3">
//             <div class="card shadow-sm">
//                 <img src=${provinsis[index].photo} class="card-img-top" alt="photo">
//                 <div class="card-body text-center">
//                     <h5 class="card-title">${provinsis[index].nama}</h5>
//                     <p class="card-text" style="color: gray;">${provinsis[index].diresmikan}</p>
//                     <a href="/detail-provinsi/{{id}}" class="btn btn-primary">Detail</a>
//                 </div>
//             </div>
//         </div>
//         </div>
//         </article>

//         `;
//   }
// }
