import { ALL_LEAGUES, ALL_TEAMS, FAMOUS_PLAYERS, COMPETITION_ALIASES, TEAM_ALIASES, PLAYER_ALIASES } from "./api-mock";

const TRANSFER_KEYWORDS = ['transfer', 'signing', 'loan', 'contract', 'deal', 'bid', 'agreement', 'medical', 'joined', 'leaves', 'rumor', 'release clause', 'unveiled', 'departure', 'released', 'free transfer', 'extension', 'renewal'];
const MATCH_KEYWORDS = ['match', 'game', 'score', 'result', 'line-up', 'goal', 'victory', 'defeat', 'fixture', 'full-time', 'half-time', 'injury', 'suspension', 'assist', 'post-match', 'tactics'];
const AWARD_KEYWORDS = ['award', 'ballon d\'or', 'trophy', 'winner', 'ceremony', 'best player'];
const TOPIC_ALIASES: Record<string, string> = {
  'transfers': 'transfers',
  'transfer': 'transfers',
  'transfer news': 'transfers',
  'transfer rumours': 'transfers',
  'transfers news': 'transfers',
  'matches': 'matches',
  'match': 'matches',
  'international': 'matches',
  'international match': 'matches',
  'score': 'matches',
  'results': 'matches',
  'awards': 'awards',
  'award': 'awards',
  'ballon dor': 'awards',
  'ballon d\'or': 'awards',
  'trophies': 'awards',
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeRawTag(rawTag: string): string[] {
  const normalized = rawTag?.trim().toLowerCase();
  if (!normalized) return [];

  if (normalized.includes(':')) {
    const [type, value] = normalized.split(':', 2);
    if (['competition', 'team', 'player', 'topic'].includes(type) && value) {
      return [
        `${type}:${value}`,
      ];
    }
  }

  if (COMPETITION_ALIASES[normalized]) {
    return [`competition:${COMPETITION_ALIASES[normalized]}`];
  }

  if (TEAM_ALIASES[normalized]) {
    return [`team:${TEAM_ALIASES[normalized]}`];
  }

  if (PLAYER_ALIASES[normalized]) {
    return [`player:${PLAYER_ALIASES[normalized]}`];
  }

  if (TOPIC_ALIASES[normalized]) {
    return [`topic:${TOPIC_ALIASES[normalized]}`];
  }

  const league = ALL_LEAGUES.find(l => l.name.toLowerCase() === normalized);
  if (league) return [`competition:${league.id}`];

  const team = ALL_TEAMS.find(t => t.name.toLowerCase() === normalized);
  if (team) return [`team:${team.id}`];

  const player = FAMOUS_PLAYERS.find(p => p.name.toLowerCase() === normalized);
  if (player) return [`player:${player.id}`];

  return [rawTag.trim()];
}

export interface ClassifyInput {
  title: string;
  subtitle?: string;
  content: string;
  keywords?: string[];
  entities?: string[];
  tags?: string[];
}

export interface ClassificationResult {
  tags: string[];
  detectedCompetitions: number[];
  detectedTeams: number[];
  detectedPlayers: number[];
  topics: string[];
  seoTitle?: string;
  seoDescription?: string;
  primaryCategory: string;
  section: string;
  subsection?: string;
}

export function classifyArticle(input: ClassifyInput): ClassificationResult {
  const { title = '', subtitle = '', content = '' } = input;

  // Weights: title counts more
  const fullText = `${title} ${title} ${title} ${subtitle} ${subtitle} ${content}`.toLowerCase();

  const tags = new Set<string>();
  const detectedCompetitions = new Set<number>();
  const detectedTeams = new Set<number>();
  const detectedPlayers = new Set<number>();
  const topics = new Set<string>();

  // Helper for matching
  const matchCount = (pattern: RegExp) => {
    return (fullText.match(pattern) || []).length;
  };

  // 1. Competitions
  ALL_LEAGUES.forEach(l => {
    if (new RegExp(`\\b${escapeRegExp(l.name.toLowerCase())}\\b`, 'i').test(fullText)) {
      detectedCompetitions.add(l.id);
    }
  });
  for (const [alias, id] of Object.entries(COMPETITION_ALIASES)) {
    if (new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i').test(fullText)) {
      detectedCompetitions.add(id);
    }
  }

  // 2. Teams
  ALL_TEAMS.forEach(t => {
    if (new RegExp(`\\b${escapeRegExp(t.name.toLowerCase())}\\b`, 'i').test(fullText)) {
      detectedTeams.add(t.id);
    }
  });
  for (const [alias, id] of Object.entries(TEAM_ALIASES)) {
    // Only accept team aliases if they appear significantly or in title/subtitle
    const pattern = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'ig');
    const inTitle = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i').test(title + ' ' + subtitle);
    if (inTitle || matchCount(pattern) > 1) {
      detectedTeams.add(id);
    }
  }

  // 3. Players
  FAMOUS_PLAYERS.forEach(p => {
    if (new RegExp(`\\b${escapeRegExp(p.name.toLowerCase())}\\b`, 'i').test(fullText)) {
      detectedPlayers.add(p.id);
    }
  });
  for (const [alias, id] of Object.entries(PLAYER_ALIASES)) {
    if (new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'i').test(fullText)) {
      detectedPlayers.add(id);
    }
  }

  // 4. Topics
  if (TRANSFER_KEYWORDS.some(k => new RegExp(`\\b${escapeRegExp(k)}\\b`, 'i').test(fullText))) {
    topics.add('transfers');
  }
  if (MATCH_KEYWORDS.some(k => new RegExp(`\\b${escapeRegExp(k)}\\b`, 'i').test(fullText))) {
    topics.add('matches');
  }
  if (AWARD_KEYWORDS.some(k => new RegExp(`\\b${escapeRegExp(k)}\\b`, 'i').test(fullText))) {
    topics.add('awards');
  }

  // Build tags array
  detectedCompetitions.forEach(id => tags.add(`competition:${id}`));
  detectedTeams.forEach(id => tags.add(`team:${id}`));
  detectedPlayers.forEach(id => tags.add(`player:${id}`));
  topics.forEach(t => tags.add(`topic:${t}`));

  if (input.tags) {
    input.tags.forEach((t) => {
      normalizeRawTag(t).forEach(tag => tags.add(tag));
    });
  }
  if (input.entities) {
    input.entities.forEach((t) => {
      normalizeRawTag(t).forEach(tag => tags.add(tag));
    });
  }
  if (input.keywords) {
    input.keywords.forEach((t) => {
      normalizeRawTag(t).forEach(tag => tags.add(tag));
    });
  }

  // Keep raw values for unknown tags so they still appear in UI
  let seoTitle = title;
  if (seoTitle.length > 60) {
    seoTitle = seoTitle.substring(0, 57) + "...";
  }

  const seoDescription = subtitle || content.substring(0, 150).replace(/<[^>]+>/g, '') + "...";

  let primaryCategory = 'general';
  if (topics.has('transfers')) primaryCategory = 'transfers';
  else if (detectedCompetitions.size > 0) primaryCategory = 'competition';
  else if (detectedTeams.size > 0) primaryCategory = 'team';
  else if (detectedPlayers.size > 0) primaryCategory = 'player';

  let section = 'News';
  let subsection: string | undefined;

  if (topics.has('transfers')) {
    section = 'Transfers';
    subsection = 'Transfers';
  } else if (detectedCompetitions.size > 0) {
    section = 'Competitions';
    const firstCompetition = Array.from(detectedCompetitions)[0];
    const league = ALL_LEAGUES.find(l => l.id === firstCompetition);
    subsection = league?.name;
  } else if (detectedTeams.size > 0) {
    section = 'Teams';
    const firstTeam = Array.from(detectedTeams)[0];
    const team = ALL_TEAMS.find(t => t.id === firstTeam);
    subsection = team?.name;
  } else if (detectedPlayers.size > 0) {
    section = 'Players';
    const firstPlayer = Array.from(detectedPlayers)[0];
    const player = FAMOUS_PLAYERS.find(p => p.id === firstPlayer);
    subsection = player?.name;
  } else if (topics.has('matches')) {
    section = 'News';
    subsection = 'Matches';
  } else if (topics.has('awards')) {
    section = 'News';
    subsection = 'Awards';
  }

  return {
    tags: Array.from(tags),
    detectedCompetitions: Array.from(detectedCompetitions),
    detectedTeams: Array.from(detectedTeams),
    detectedPlayers: Array.from(detectedPlayers),
    topics: Array.from(topics),
    seoTitle,
    seoDescription,
    primaryCategory,
    section,
    subsection
  };
}
