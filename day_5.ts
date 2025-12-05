import { useData } from "./useData.ts";
import { writeFileSync } from "fs";

type Range = [bigint, bigint]

const { fetchData } = useData();

const data = await fetchData(2025, 5);
const formattedData: string[] = data.trim().split("\n");

// writeFileSync("dump-5.json", JSON.stringify(formattedData, null, 2));

const splitArrs = (arr: string[]): {arr1: string[], arr2: string[]} => {
    const idx = arr.findIndex(v => v === ""); 
    console.log(idx)
    return {
        arr1: arr.slice(0, idx),
        arr2: arr.slice(idx + 1)
    }
}

let {arr1: ranges, arr2: products} = splitArrs(formattedData); 
// writeFileSync("ranges.json", JSON.stringify(ranges, null, 2));
// writeFileSync("products.json", JSON.stringify(products, null, 2));

const convertToBigInt = (v: string): bigint => BigInt(v)
const getRange = (r: string): bigint[] => r.split("-").map(convertToBigInt)
const convertRanges = () => ranges.map(getRange)
const convertProducts = () => products.map(convertToBigInt)
const isInRange = (p: bigint, r: bigint[]) => p >= r[0] && p <= r[1]

let numRanges = convertRanges(); 
let numProducts = convertProducts()

const getFreshCount = () => {
    const count = numProducts.reduce((acc: bigint, p: bigint) => {
        return numRanges.some(v => isInRange(p, v)) ? acc = acc + 1n : acc = acc + 0n
    }, 0n)
    console.log(count)
}

const getAllFreshCount = () => {
    if (!numRanges.length) return 0n;

  const sorted = [...numRanges].sort((a, b) => (a[0] < b[0] ? -1 : 1));

  const merged: Range[] = [];
  let current: Range = [...sorted[0]] as Range;

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    if (start <= current[1] + 1n) {
      current[1] = current[1] > end ? current[1] : end;
    } else {
      merged.push(current);
      current = [start, end];
    }
  }
  merged.push(current);
  return merged.reduce((acc, [s, e]) => acc + (e - s + 1n), 0n);
} 

getFreshCount()

const allfresh = getAllFreshCount()

console.log(allfresh)








