'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createUser, updateUser, type CreateUserState } from '../actions'

const initialState: CreateUserState = {}

export function UserForm({
  user, //get this form edit page parameter 
        //   user={{ 
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     isActive: user.isActive ?? false,
        //   }}
        // />
}: {
  user?: { id: number; name: string; email: string; isActive: boolean }
}) {
  const isEdit = Boolean(user)  //Boolean(user) คือการแปลงค่า user ให้เป็น true/false ถ้า user มีค่า ผลลัพธ์จะเป็น true 
  const action = isEdit ? updateUser : createUser //ถ้า edit = true ใช้ updateUser 
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {user && <input type="hidden" name="id" defaultValue={user.id} />}
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={user?.name}
          placeholder="Jakkarin"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-300"
        />
        {state.fieldErrors?.name && (
          <p className="text-sm text-red-600">{state.fieldErrors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={user?.email}
          placeholder="example@email.com"
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-300"
        />
        {state.fieldErrors?.email && (
          <p className="text-sm text-red-600">{state.fieldErrors.email}</p>
        )}
      </div>

      {/* isActive */}
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={user ? user.isActive : true}
          className="h-4 w-4 rounded border-zinc-300"
        />
        New Account
      </label>

      {/* General error */}
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40">
          {state.error}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {pending ? 'Save…' : isEdit ? 'Save Change' : 'Create'}
        </button>
        <Link
          href="/users"
          className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
