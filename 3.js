function drawImage(n) {
  if (n % 2 === 0) {
    console.log("Parameter harus ganjil!");
    return;
  }

  for (let i = 0; i < n; i++) {
    // Loop untuk setiap baris
    let row = "";
    for (let j = 0; j < n; j++) {
      // Loop untuk setiap kolom
      if ((i + j) % 2 === 0) {
        row += "# ";
      } else {
        row += "* ";
      }
    }
    console.log(row.trim()); // Cetak hasil setiap baris
  }
}

drawImage(5);
console.log("\n");
drawImage(7);
