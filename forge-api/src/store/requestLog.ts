import { Log } from "../types"

const Max = 100
const logs: Log[] = []

export function addLog(entry: Log) {
    logs.push(entry)
    if (logs.length >= Max) {
        logs.shift()
    }
}


export function getLogs(limit = 50): Log[] {
    return logs.slice(-limit).reverse()
}