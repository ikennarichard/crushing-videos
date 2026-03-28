export function exportToCSV(videos: any[], channelName = "channel") {
  const headers = ["Title", "Views", "Likes", "Comments", "Score", "Published"];
  const rows = videos.map((v) => [
    `"${v.snippet.title.replace(/"/g, "'")}"`,
    v.statistics.viewCount,
    v.statistics.likeCount,
    v.statistics.commentCount,
    v.score,
    v.snippet.publishedAt,
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${channelName}-analysis.csv`;
  a.click();
  URL.revokeObjectURL(url);
}