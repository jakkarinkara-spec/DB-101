import { UserForm } from '../components/user-form'

export default function NewUserPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Add New User
        </h1>
        <UserForm />
      </main>
    </div>
  )
}
