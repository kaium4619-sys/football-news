import { ALL_LEAGUES, ALL_TEAMS, FAMOUS_PLAYERS } from "./api-mock";

const TRANSFER_KEYWORDS = ['transfer', 'signing', 'loan', 'contract', 'deal', 'bid', 'agreement', 'medical', 'joined', 'leaves', 'rumor', 'release clause'];
const MATCH_KEYWORDS = ['match', 'game', 'score', 'result', 'line-up', 'goal', 'victory', 'defeat', 'fixture', 'full-time', 'half-time', 'injury', 'suspension', 'assist', 'post-match'];

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function classifyArticle(title: string, content: string): string[] {
  const text = `${title} ${content}`;
  const tags = new Set<string>();

  // Match Competitions
  ALL_LEAGUES.forEach(l => {
    if (new RegExp(`\\b${escapeRegExp(l.name)}\\b`, 'i').test(text)) {
      tags.add(`competition:${l.id}`);
    }
  });

  // Match Teams
  ALL_TEAMS.forEach(t => {
    if (new RegExp(`\\b${escapeRegExp(t.name)}\\b`, 'i').test(text)) {
      tags.add(`team:${t.id}`);
    }
  });

  // Match Players
  FAMOUS_PLAYERS.forEach(p => {
    if (new RegExp(`\\b${escapeRegExp(p.name)}\\b`, 'i').test(text)) {
      tags.add(`player:${p.id}`);
    }
  });

  // Match Transfer Topics
  if (TRANSFER_KEYWORDS.some(k => new RegExp(`\\b${escapeRegExp(k)}\\b`, 'i').test(text))) {
    tags.add('topic:transfers');
  }

  // Match Match Topics
  if (MATCH_KEYWORDS.some(k => new RegExp(`\\b${escapeRegExp(k)}\\b`, 'i').test(text))) {
    tags.add('topic:matches');
  }

  return Array.from(tags);
}
