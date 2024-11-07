import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { User } from '@/core/user'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export type SessionPayload = {
  id: string,
  email: string,
  role: string,
  expiresAt: Date
}

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    }) 
    return payload as SessionPayload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const sessionPayload: SessionPayload = {
    id: user.id,
    email: user.email,
    expiresAt: expiresAt,
    role: user.role
  }
  const session = await encrypt(sessionPayload);
  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt
  })
}