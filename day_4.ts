import { useData } from "./useData.ts";

const { fetchData } = useData();

const data = await fetchData(2025, 4);
const formattedData: string[] = data.trim().split("\n");

const convertToArr = (row: string): string[] => row.split(""); 

let papers: string[][] = formattedData.map(d => convertToArr(d)); 
let length: number = papers.length

const isDot = (c: string): boolean => c === '.'; 

const getCheckingPositions = (idx: number, rowIdx: number, rowLength: number): Record<number, number[]> => {
    let rowsIdxs: number[] 
    let chIdxs: number[]
    let pos: Record<number, number[]> = {}
    if (rowIdx === length - 1) rowsIdxs = [rowIdx - 1, rowIdx]
    else if (rowIdx === 0) rowsIdxs = [rowIdx, rowIdx + 1]
    else rowsIdxs = [rowIdx - 1, rowIdx, rowIdx + 1]
    if (idx === rowLength - 1) chIdxs = [idx - 1, idx]
    else if (idx === 0) chIdxs = [idx, idx + 1]
    else chIdxs = [idx - 1, idx, idx + 1]
    rowsIdxs.forEach(i => i !== rowIdx ? pos[i] = chIdxs : pos[i] = chIdxs.filter(ci => ci !== idx))
    return pos
}

const isRemovable = (pos: Record<number, number[]>): boolean => {
    const items = Object.keys(pos).flatMap(k => {
        const key = Number(k)
        const row = papers[key]
        return pos[key].flatMap(r => row[r])
    })
    return items.filter(item => item === "@").length < 4
}

const getAmount = () => {
    let acc: number = 0
    
    for (let i = 0; i < length; i++) {
        const row = papers[i]; 
        row.forEach((ch: string, index: number) => {
            if (isDot(ch)) return 
            let positions = getCheckingPositions(index, i, row.length); 
            if (isRemovable(positions)) {
                // for deleting 
                papers[i][index] = "."
                acc++
            }
        })
    }
    console.log(acc)
    return acc
}

const getAmountLoop = () => {
    let prev: number = -1
    let curr: number = 0 

    while (prev < curr) {
        console.log(prev, curr)
        prev = curr
        curr = curr + getAmount()
    }
}

getAmountLoop()