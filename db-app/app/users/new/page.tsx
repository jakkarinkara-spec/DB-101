'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createUser, type CreateUserState } from '../actions'

const initialState: CreateUserState = {}

export default function NewUserPage() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          เพิ่มผู้ใช้ใหม่
        </h1>

        <form action={formAction} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              ชื่อ
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="เช่น สมชาย ใจดี"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-300"
            />
            {state.fieldErrors?.name && (
              <p className="text-sm text-red-600">{state.fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              อีเมล
            </label>
            <input
              id="email"
              name="email"
              type="email"
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
              defaultChecked
              className="h-4 w-4 rounded border-zinc-300"
            />
            เปิดใช้งานบัญชี
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
              {pending ? 'กำลังบันทึก…' : 'บันทึก'}
            </button>
            <Link
              href="/users"
              className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
