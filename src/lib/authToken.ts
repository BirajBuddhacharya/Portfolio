// Bearer token from the backend lives in a cookie so the Next middleware can
// gate /admin server-side before any admin HTML is sent.

export const TOKEN_COOKIE = 'admin_token';

/** Reads the JWT `exp` claim. Returns true for anything unreadable — fail closed. */
export function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;
  const payload = token.split('.')[1];
  if (!payload) return true;
  try {
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(payload.length / 4) * 4, '=');
    const { exp } = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))));
    return typeof exp !== 'number' || exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function getToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${TOKEN_COOKIE}=`))
    ?.slice(TOKEN_COOKIE.length + 1);
}

export function setToken(token: string) {
  if (typeof document === 'undefined') return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${TOKEN_COOKIE}=${token}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${secure}`;
}

export function clearToken() {
  if (typeof document === 'undefined') return;
  document.cookie = `${TOKEN_COOKIE}=; Path=/; SameSite=Lax; Max-Age=0`;
}
