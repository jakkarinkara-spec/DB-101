'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db/index'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export type CreateUserState = {
  error?: string
  fieldErrors?: {
    name?: string
    email?: string
  }
}

  //----- create ---
  
export async function createUser(
  _prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const isActive = formData.get('isActive') === 'on'

  // 1) Validate
  const fieldErrors: CreateUserState['fieldErrors'] = {}
  if (!name) fieldErrors.name = 'กรุณากรอกชื่อ'
  if (!email) {
    fieldErrors.email = 'กรุณากรอกอีเมล'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors }
  }

  // 2) Insert
  try {
    await db.insert(users).values({ name, email, isActive })
  } catch (err: unknown) {
    // Postgres unique violation = duplicate email
    if (err instanceof Error && err.message.includes('duplicate key')) {
      return { fieldErrors: { email: 'อีเมลนี้ถูกใช้งานแล้ว' } }
    }
    return { error: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่' }
  }

  // 3) Refresh cache + redirect
  revalidatePath('/users')
  redirect('/users')
}


// ---------- UPDATE ----------
export async function updateUser(
  _prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  const id = Number(formData.get('id') ?? '')
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const isActive = formData.get('isActive') === 'on'

  if (!id) return { error: 'ไม่พบรหัสผู้ใช้' }

  const fieldErrors: CreateUserState['fieldErrors'] = {}
  if (!name) fieldErrors.name = 'กรุณากรอกชื่อ'
  if (!email) {
    fieldErrors.email = 'กรุณากรอกอีเมล'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors }
  }

  try {
    await db
      .update(users)
      .set({ name, email, isActive })
      .where(eq(users.id, id))
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('duplicate key')) {
      return { fieldErrors: { email: 'อีเมลนี้ถูกใช้งานแล้ว' } }
    }
    return { error: 'เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่' }
  }

  revalidatePath('/users')
  redirect('/users')
}