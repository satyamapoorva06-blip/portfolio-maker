import { PortfolioData } from "@/types/portfolio";
import { PortfolioVersionRecord } from "@/types/database";

export function getStoredVersions(
  portfolioId: string,
): PortfolioVersionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`portify_versions_${portfolioId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePortfolioVersion(
  portfolio: PortfolioData,
): PortfolioVersionRecord {
  const newVersion: PortfolioVersionRecord = {
    id: "ver_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    portfolio_id: portfolio.id,
    data: JSON.parse(JSON.stringify(portfolio)),
    created_at: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const versions = getStoredVersions(portfolio.id);
    versions.unshift(newVersion);
    // Keep max 15 versions
    const trimmed = versions.slice(0, 15);
    localStorage.setItem(
      `portify_versions_${portfolio.id}`,
      JSON.stringify(trimmed),
    );
  }

  return newVersion;
}
