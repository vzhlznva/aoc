import { useData } from "./useData.ts";

const { fetchData } = useData();

let acc = 0;

const data = await fetchData(2025, 2);
const formattedData = data.split(",");

const getRangeLimits = (rangeStr: string): number[] =>
  rangeStr.split("-").map(Number);

const getRange = (limits: number[]): number[] =>
  Array.from(
    { length: limits[1] - limits[0] },
    (_, i) => limits[0] + i
  );

const splitParts = (item: string, length: number) => {
  const mid = length / 2;
  return {
    first: item.slice(0, mid),
    second: item.slice(mid)
  };
};

const compareSplitParts = (l: string, r: string) => {
  if (l[0] === "0" && r[0] === "0") return false;
  return l === r;
};

const hasMatchingSequences = (item: number) => {
  const itemStr = item.toString();
  // part 2
  if (isRepeatedPattern(item)) return true;
  if (itemStr.length % 2 !== 0) return false;

  const { first: leftPart, second: rightPart } = splitParts(
    itemStr,
    itemStr.length
  );

  if (compareSplitParts(leftPart, rightPart)) {
    return true;
  }

  return false;
};
// part 2 
const isRepeatedPattern = (item: number) => {
    const s = item.toString();

    for (let size = 1; size <= s.length / 2; size++) {
        if (s.length % size !== 0) continue;

        const first = s.slice(0, size);
        const repeated = first.repeat(s.length / size);

        if (repeated === s) return true;
    }

    return false;
};

const mainF = () => {
  const ranges: number[][] = formattedData.map(getRangeLimits);

  ranges.forEach(rangeLimits => {
    const range = getRange(rangeLimits);

    const sum = range
      .filter(hasMatchingSequences)
      .reduce((acc, curr) => acc + curr, 0);

    acc += sum;

    console.log("acc", acc);
  });
};

mainF();
