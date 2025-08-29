import { promises as fs } from "fs"
import path from "path"

export type StoredUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // hashed
  verified: boolean
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const USERS_FILE = path.join(DATA_DIR, "users.json")

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(USERS_FILE)
  } catch {
    const seedUsers: StoredUser[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        // bcrypt hash for "password"
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        verified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
        verified: true,
        createdAt: new Date().toISOString(),
      },
    ]
    await fs.writeFile(USERS_FILE, JSON.stringify(seedUsers, null, 2), "utf8")
  }
}

export async function readUsers(): Promise<StoredUser[]> {
  await ensureDataFile()
  const raw = await fs.readFile(USERS_FILE, "utf8")
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : []
  } catch {
    return []
  }
}

export async function writeUsers(users: StoredUser[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8")
}

export async function getUserByEmail(email: string): Promise<StoredUser | undefined> {
  const users = await readUsers()
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export async function getUserById(id: string): Promise<StoredUser | undefined> {
  const users = await readUsers()
  return users.find((u) => u.id === id)
}

export async function createUser(newUser: Omit<StoredUser, "id" | "createdAt">): Promise<StoredUser> {
  const users = await readUsers()
  const user: StoredUser = {
    ...newUser,
    id: (users.length + 1).toString(),
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  await writeUsers(users)
  return user
}


