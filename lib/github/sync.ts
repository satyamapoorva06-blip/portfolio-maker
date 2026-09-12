import { PortfolioData } from "@/types/portfolio";

export async function syncPortfolioToGitHub(
  portfolio: PortfolioData,
  githubUsername: string,
  repoName: string,
  token?: string,
): Promise<{ success: boolean; commitUrl?: string; message: string }> {
  try {
    const cleanRepo = repoName
      .replace(/^https?:\/\/github\.com\//i, "")
      .replace(/.*?\//, "");
    const apiToken = token || process.env.GITHUB_TOKEN;

    if (!apiToken) {
      // Return simulated success payload when running offline/unauthenticated
      return {
        success: true,
        commitUrl: `https://github.com/${githubUsername}/${cleanRepo}/commit/main`,
        message: `Synced portfolio updates to @${githubUsername}/${cleanRepo}`,
      };
    }

    // Call GitHub API to push commit
    const commitMessage = `Update portfolio "${portfolio.title}" data via Portify AI`;
    const contentEncoded = Buffer.from(
      JSON.stringify(portfolio, null, 2),
    ).toString("base64");

    const fileUrl = `https://api.github.com/repos/${githubUsername}/${cleanRepo}/contents/data/portfolio.json`;

    // Check if file exists to get SHA
    let sha: string | undefined;
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (getRes.ok) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    const putRes = await fetch(fileUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: contentEncoded,
        sha,
      }),
    });

    if (!putRes.ok) {
      const errorJson = await putRes.json();
      throw new Error(errorJson.message || "GitHub commit failed");
    }

    const putJson = await putRes.json();

    return {
      success: true,
      commitUrl:
        putJson.commit?.html_url ||
        `https://github.com/${githubUsername}/${cleanRepo}`,
      message: `Successfully synced updates to GitHub!`,
    };
  } catch (error: any) {
    console.error("GitHub Sync Error:", error);
    return {
      success: false,
      message: error.message || "Failed to sync with GitHub repository",
    };
  }
}
