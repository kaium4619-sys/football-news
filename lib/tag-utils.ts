import { ALL_LEAGUES, ALL_TEAMS, FAMOUS_PLAYERS } from "./api-mock";
import { slugify } from "./slugify";

export function formatTag(tag: string): string {
  if (!tag) return "";
  const parts = tag.split(":");
  if (parts.length !== 2) return tag;
  const [type, id] = parts;

  if (type === "competition") {
    return ALL_LEAGUES.find(l => l.id === parseInt(id, 10))?.name ?? tag;
  }
  if (type === "team") {
    return ALL_TEAMS.find(t => t.id === parseInt(id, 10))?.name ?? tag;
  }
  if (type === "player") {
    return FAMOUS_PLAYERS.find(p => p.id === parseInt(id, 10))?.name ?? tag;
  }
  if (type === "topic") {
    return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " ");
  }

  return tag;
}

export function getTagLink(tag: string): string | null {
  if (!tag) return null;
  const parts = tag.split(":");
  if (parts.length !== 2) return null;
  const [type, id] = parts;

  if (type === "competition") return `/competitions/${slugify(formatTag(tag))}`;
  if (type === "team") return `/teams/${slugify(formatTag(tag))}`;
  if (type === "player") {
    const player = FAMOUS_PLAYERS.find(p => p.id === parseInt(id, 10));
    return player ? `/players/${slugify(player.name)}` : `/players/${slugify(formatTag(tag))}`;
  }
  if (type === "topic" && id === "transfers") return `/transfers`;
  
  return `/news?category=${encodeURIComponent(formatTag(tag))}`;
}

export function getPrimaryCategory(tags: string[] | null | undefined): string {
  if (!tags || tags.length === 0) return "News";
  
  // Prefer competition, then team, then topic
  const competition = tags.find(t => t.startsWith("competition:"));
  if (competition) return formatTag(competition);
  
  const team = tags.find(t => t.startsWith("team:"));
  if (team) return formatTag(team);
  
  const player = tags.find(t => t.startsWith("player:"));
  if (player) return formatTag(player);

  const topic = tags.find(t => t.startsWith("topic:"));
  if (topic) return formatTag(topic);

  return "News";
}
