const d = [0, 2, 5, -4, 6, 22, -9, -12, ,13, 78];
let even = [];
let odd = [];
for (const key in d) {
    if (key % 2 === 0) {
        even.push(key)
    } else odd.push(key)
}
console.log(even)