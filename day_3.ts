import { useData } from "./useData.ts";

const { fetchData } = useData();

const data = await fetchData(2025, 3);
const formattedData: string[] = data.trim().split("\n");

const convertToArr = (row: string): number[] => row.split("").map(Number)

const findLargestDigits = (row: number[]) => {
    let firstMax = Math.max(...row); 
    let firstMaxIndex = row.indexOf(firstMax); 
    let secondMax: number
    if (firstMaxIndex === row.length - 1) {
        secondMax = firstMax; 
        firstMax = Math.max(...row.slice(0, firstMaxIndex))
    } else secondMax = Math.max(...row.slice(firstMaxIndex + 1))
    console.log(firstMax, secondMax)
    return {
        f: firstMax,
        s: secondMax
    }
}

const findLargestSubsequence = (row: number[], k: number): string => {
    const stack: number[] = [];
    let toDrop = row.length - k; // Скільки цифр ми можемо "безкарно" викинути

    for (const num of row) {
        // Поки можемо викидати, стек не порожній, і поточна цифра більша за ту, що в стеку
        while (toDrop > 0 && stack.length > 0 && stack[stack.length - 1] < num) {
            stack.pop();
            toDrop--;
        }
        stack.push(num);
    }

    // Беремо тільки перші k цифр (бо стек може бути довшим, якщо ми не витратили всі toDrop)
    return stack.slice(0, k).join("");
};

const addNumbers = (x: number, y: number) => Number(x.toString() + y.toString())

const getSum = (arr: number[]) => arr.reduce((acc: number, value: number) => acc + value, 0)

const findBatterySum = () => {
    const numbers = formattedData.map(r => {
        console.log(r)
        const arr = convertToArr(r); 
        const { f, s } = findLargestDigits(arr); 
        return addNumbers(f, s); 
    })
    console.log(numbers)
    console.log(getSum(numbers))
}

const findBatterySumPart2 = () => {
    let totalSum = 0n; 

    for (const r of formattedData) {
        const arr = convertToArr(r);
        const bestNumberStr = findLargestSubsequence(arr, 12);
        totalSum += BigInt(bestNumberStr);
    }

    console.log("Total Output Joltage (Part 2):", totalSum.toString());
};

// findBatterySum()
findBatterySumPart2()