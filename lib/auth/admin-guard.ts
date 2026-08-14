import { getStoredUser } from '@/lib/storage/local-store';

export function isUserAdmin(): boolean {
  try {
    const user = getStoredUser();
    return user && user.role === 'admin' && user.status === 'active';
  } catch {
    return false;
  }
}
