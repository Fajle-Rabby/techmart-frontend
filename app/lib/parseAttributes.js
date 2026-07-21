/**
 * OpenCart attribute text parser
 * Double-encoded HTML entities decode করে label-value pair বের করে
 */

function decodeHtmlEntities(input, maxIterations = 5) {
  if (!input || typeof input !== 'string') return '';
  let current = input;
  for (let i = 0; i < maxIterations; i++) {
    const decoded = current
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&nbsp;/g, ' ');
    if (decoded === current) break;
    current = decoded;
  }
  return current;
}

function stripTags(str) {
  return (str || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
}

function parseTableRows(decoded) {
  const rows = [];
  const regex = /<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi;
  let m;
  while ((m = regex.exec(decoded)) !== null) {
    const label = stripTags(m[1]);
    const value = stripTags(m[2]);
    if (label) rows.push({ label, value });
  }
  return rows;
}

function parseBoldPairs(decoded) {
  const regex = /<b>([\s\S]*?)<\/b>/gi;
  const matches = [...decoded.matchAll(regex)];
  const rows = [];
  for (let i = 0; i < matches.length; i++) {
    const label = stripTags(matches[i][1]);
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : decoded.length;
    let value = stripTags(decoded.slice(start, end));
    value = value.replace(/^[:,\s]+/, '').replace(/[,\s]+$/, '');
    if (label) rows.push({ label, value });
  }
  return rows;
}

export function parseAttributeText(raw) {
  const decoded = decodeHtmlEntities(raw);
  let rows = parseTableRows(decoded);
  if (rows.length === 0) rows = parseBoldPairs(decoded);
  if (rows.length === 0) {
    const plain = stripTags(decoded);
    if (plain) rows = [{ label: null, value: plain }];
  }
  return rows;
}
