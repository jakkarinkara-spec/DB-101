import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db/index'
import { users } from '@/lib/db/schema'

export default async function UsersPage() {
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt))

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 p-6 dark:bg-black">
      <main className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            ผู้ใช้ทั้งหมด ({allUsers.length})
          </h1>
          <Link
            href="/users/new"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            + เพิ่มผู้ใช้
          </Link>
        </div>

        {allUsers.length === 0 ? (
          <p className="text-zinc-500">ยังไม่มีผู้ใช้ — กด “เพิ่มผู้ใช้” เพื่อเริ่มต้น</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {allUsers.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{u.name}</p>
                  <p className="text-sm text-zinc-500">{u.email}</p>
                </div>
                <span
                  className={
                    u.isActive
                      ? 'rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400'
                      : 'rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800'
                  }
                >
                  {u.isActive ? 'Active' : 'Inactive'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
