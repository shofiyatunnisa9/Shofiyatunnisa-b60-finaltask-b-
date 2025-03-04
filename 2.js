const bubbleSort = (arr) => {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    console.log(`Iterasi ${i + 1}:`);
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      console.log(`Langkah ${j + 1}:`, [...arr]);
    }
    console.log(`Hasil setelah iterasi ${i + 1}:`, [...arr], `\n`);
  }
  return arr;
};

let arr = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];

console.log("Proses buble sort step by step:");
bubbleSort(arr);

console.log("Array setelah diurutkan:", arr);
