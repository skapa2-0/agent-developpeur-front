import { NextRequest, NextResponse } from 'next/server';

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'skapa2026';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('skapa-auth', 'authenticated', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    return NextResponse.json({ success: false, error: 'Identifiants invalides' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Requête invalide' }, { status: 400 });
  }
}
