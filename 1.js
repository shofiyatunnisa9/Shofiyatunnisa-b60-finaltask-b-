function hargaBarang(kualitasBarang, quantity) {
  let harga;
  let totalHarga;
  let totalBayar;
  let potongan = 0;

  if (kualitasBarang === "A") {
    harga = 4550;
    if (quantity > 13) {
      potongan = 231 * quantity;
      totalHarga = harga * quantity;
    }
    totalBayar = totalHarga - potongan;
  } else if (kualitasBarang === "B") {
    harga = 5330;
    if (quantity > 7) {
      potongan = (23 / 100) * quantity;
      totalHarga = harga * quantity;
    }
    totalBayar = totalHarga - potongan;
  } else if (kualitasBarang === "C") {
    harga = 8653;
    totalHarga = harga * quantity;
    totalBayar = totalHarga - potongan;
  } else {
    return "Kualitas barang tidak ada";
  }

  return { harga, totalHarga, potongan, totalBayar };
}
const resultA = hargaBarang("A", 16);
console.log(
  `Total harga barang : ${resultA.totalHarga}, Potongan : ${resultA.potongan}, Total Bayar : ${resultA.totalBayar}`
);

const resultB = hargaBarang("B", 9);
console.log(
  `Total harga barang : ${resultB.totalHarga}, Potongan : ${resultB.potongan}, Total Bayar : ${resultB.totalBayar}`
);

const resultC = hargaBarang("C", 7);
console.log(
  `Total harga barang : ${resultC.totalHarga}, Potongan : ${resultC.potongan}, Total Bayar : ${resultC.totalBayar}`
);
