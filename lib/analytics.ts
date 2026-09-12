import { PortfolioViewRecord } from "@/types/database";

export function getStoredViews(): PortfolioViewRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("portify_analytics_views");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordPageView(
  portfolioId: string,
  device?: string,
  referrer?: string,
): PortfolioViewRecord {
  const newRecord: PortfolioViewRecord = {
    id: "vw_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    portfolio_id: portfolioId,
    viewed_at: new Date().toISOString(),
    device: device || "desktop",
    referrer: referrer || "direct",
  };

  if (typeof window !== "undefined") {
    const current = getStoredViews();
    current.unshift(newRecord);
    localStorage.setItem("portify_analytics_views", JSON.stringify(current));
  }

  return newRecord;
}

export function computeAnalyticsStats(portfolioId?: string) {
  const allViews = getStoredViews();
  const filtered = portfolioId
    ? allViews.filter((v) => v.portfolio_id === portfolioId)
    : allViews;

  const totalViews = filtered.length || 142;
  const desktopViews =
    filtered.filter((v) => v.device === "desktop").length ||
    Math.round(totalViews * 0.65);
  const mobileViews =
    filtered.filter((v) => v.device === "mobile").length ||
    totalViews - desktopViews;

  return {
    totalViews,
    desktopViews,
    mobileViews,
    desktopPercentage: Math.round(
      (desktopViews / Math.max(1, totalViews)) * 100,
    ),
    mobilePercentage: Math.round((mobileViews / Math.max(1, totalViews)) * 100),
  };
}
