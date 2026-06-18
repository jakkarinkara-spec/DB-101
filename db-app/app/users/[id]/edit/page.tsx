import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { UserForm } from '../../components/user-form'


export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const userId = Number(id)
  if (!Number.isInteger(userId)) notFound()

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (!user) notFound()

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Edit User
        </h1>
        <UserForm 
          user={{ // send this object to user form default value in field  ---> user-form.tsx
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive ?? false,
          }}
        />
      </main>
    </div>
  )
}
