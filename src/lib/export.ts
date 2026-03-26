export function exportToCSV(videos: any[]) {
  if (!videos.length) return;

  const headers = ["Title", "Views", "Likes", "Comments", "Score"];
  const rows = videos.map((v) => [
    `"${v.snippet.title.replace(/"/g, '""')}"`,
    v.statistics.viewCount,
    v.statistics.likeCount,
    v.statistics.commentCount,
    v.score,
  ]);

  const csvContent =
    [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "channel_videos.csv";
  link.click();
  URL.revokeObjectURL(url);
}