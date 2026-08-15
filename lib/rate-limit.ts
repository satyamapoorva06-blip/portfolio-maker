// Rate limiting helper using in-memory window tracking per IP address

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(
  ip: string,
  limit = 10,
  windowMs = 60 * 1000
): { success: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > windowMs) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count += 1;
  }

  rateLimitMap.set(ip, userData);

  const resetMs = Math.max(0, windowMs - (now - userData.lastReset));

  if (userData.count > limit) {
    return { success: false, remaining: 0, resetMs };
  }

  return { success: true, remaining: limit - userData.count, resetMs };
}
