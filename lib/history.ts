import { promises as fs } from "fs"
import path from "path"

export type HistoryItem = {
  id: string
  userId: string
  emailContent: string
  tone: string
  reply: string
  createdAt: string
}

const HISTORY_DIR = path.join(process.cwd(), "data", "history")

async function ensureHistoryDir(): Promise<void> {
  await fs.mkdir(HISTORY_DIR, { recursive: true })
}

function historyFileForUser(userId: string): string {
  return path.join(HISTORY_DIR, `${userId}.json`)
}

export async function readUserHistory(userId: string): Promise<HistoryItem[]> {
  await ensureHistoryDir()
  const file = historyFileForUser(userId)
  try {
    const raw = await fs.readFile(file, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as HistoryItem[]) : []
  } catch {
    return []
  }
}

export async function appendHistoryItem(item: Omit<HistoryItem, "id" | "createdAt">): Promise<HistoryItem> {
  await ensureHistoryDir()
  const items = await readUserHistory(item.userId)
  const newItem: HistoryItem = {
    ...item,
    id: (items.length + 1).toString(),
    createdAt: new Date().toISOString(),
  }
  items.unshift(newItem)
  await fs.writeFile(historyFileForUser(item.userId), JSON.stringify(items, null, 2), "utf8")
  return newItem
}

// Alias for compatibility with the API
export async function getUserHistory(userId: string): Promise<HistoryItem[]> {
  return readUserHistory(userId)
}

export async function deleteHistoryItem(userId: string, itemId: string): Promise<boolean> {
  try {
    await ensureHistoryDir()
    const history = await readUserHistory(userId)
    const initialLength = history.length
    
    const filteredHistory = history.filter(item => item.id !== itemId)
    
    if (filteredHistory.length === initialLength) {
      // Item not found
      return false
    }
    
    const filePath = historyFileForUser(userId)
    await fs.writeFile(filePath, JSON.stringify(filteredHistory, null, 2), "utf8")
    
    return true
  } catch (error) {
    console.error("Error deleting history item:", error)
    throw error
  }
}

export async function clearUserHistory(userId: string): Promise<void> {
  try {
    await ensureHistoryDir()
    const filePath = historyFileForUser(userId)
    await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8")
  } catch (error) {
    console.error("Error clearing user history:", error)
    throw error
  }
}



