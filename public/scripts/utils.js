function escapeXSS(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}
