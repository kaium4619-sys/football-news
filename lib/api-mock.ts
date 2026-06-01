import { Match, Standing } from "@/types/football";

export const ALL_LEAGUES = [
  // Major Domestic Leagues
  { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png", type: "League" },
  { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png", type: "League" },
  { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png", type: "League" },
  { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png", type: "League" },
  { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png", type: "League" },
  { id: 94, name: "Primeira Liga", country: "Portugal", logo: "https://media.api-sports.io/football/leagues/94.png", type: "League" },
  { id: 307, name: "Saudi Pro League", country: "Saudi Arabia", logo: "https://media.api-sports.io/football/leagues/307.png", type: "League" },
  { id: 128, name: "Argentine Primera División", country: "Argentina", logo: "https://media.api-sports.io/football/leagues/128.png", type: "League" },

  // International Tournaments (National Teams)
  { id: 1, name: "FIFA World Cup", country: "World", logo: "/world-cup-trophy.png", type: "International" },
  { id: 4, name: "Euro Championship", country: "Europe", logo: "https://media.api-sports.io/football/leagues/4.png", type: "International" },
  { id: 9, name: "Copa América", country: "South America", logo: "https://media.api-sports.io/football/leagues/9.png", type: "International" },
  { id: 6, name: "Africa Cup of Nations", country: "Africa", logo: "https://media.api-sports.io/football/leagues/6.png", type: "International" },
  { id: 7, name: "AFC Asian Cup", country: "Asia", logo: "https://media.api-sports.io/football/leagues/7.png", type: "International" },
  { id: 22, name: "CONCACAF Gold Cup", country: "N. America", logo: "https://media.api-sports.io/football/leagues/22.png", type: "International" },
  { id: 37, name: "FIFA Women's World Cup", country: "World", logo: "https://media.api-sports.io/football/leagues/37.png", type: "International" },

  // Club-Level International Competitions
  { id: 15, name: "FIFA Club World Cup", country: "World", logo: "https://media.api-sports.io/football/leagues/15.png", type: "Club-Int" },
  { id: 2, name: "Champions League", country: "Europe", logo: "https://media.api-sports.io/football/leagues/2.png", type: "Club-Int" },
  { id: 3, name: "Europa League", country: "Europe", logo: "https://media.api-sports.io/football/leagues/3.png", type: "Club-Int" },
  { id: 13, name: "Copa Libertadores", country: "S. America", logo: "https://media.api-sports.io/football/leagues/13.png", type: "Club-Int" },
  { id: 16, name: "CONCACAF Champions Cup", country: "N. America", logo: "https://media.api-sports.io/football/leagues/16.png", type: "Club-Int" }
];

export const COMPETITION_ALIASES: Record<string, number> = {
  "premier league": 39, "epl": 39, "pl": 39, "english premier league": 39,
  "la liga": 140, "primera division": 140,
  "bundesliga": 78,
  "serie a": 135,
  "ligue 1": 61,
  "primeira liga": 94,
  "saudi pro league": 307,
  "champions league": 2, "ucl": 2, "uefa champions league": 2,
  "europa league": 3, "uel": 3, "uefa europa league": 3,
  "world cup": 1, "fifa world cup": 1, "wc": 1,
  "euro": 4, "euros": 4, "euro championship": 4, "european championship": 4,
  "copa america": 9,
  "afcon": 6, "africa cup of nations": 6,
  "asian cup": 7, "afc asian cup": 7,
  "gold cup": 22,
};


export const FAMOUS_PLAYERS = [
  // Men's Football Icons
  { id: 154, name: "Lionel Messi", team: "Inter Miami", country: "Argentina", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg/500px-Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg" },
  { id: 874, name: "Cristiano Ronaldo", team: "Al Nassr", country: "Portugal", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/9/9c/President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg/500px-President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg" },
  { id: 276, name: "Kylian Mbappé", team: "Real Madrid", country: "France", position: "Forward", image: "/mbappe.png" },
  { id: 1100, name: "Erling Haaland", team: "Manchester City", country: "Norway", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/7/71/Erling_Haaland_June_2025.jpg/500px-Erling_Haaland_June_2025.jpg" },
  { id: 184, name: "Harry Kane", team: "Bayern Munich", country: "England", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/9/91/Harry_Kane_on_October_10%2C_2023.jpg/500px-Harry_Kane_on_October_10%2C_2023.jpg" },
  { id: 306, name: "Mohamed Salah", team: "Liverpool", country: "Egypt", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/500px-Mohamed_Salah_2018.jpg" },
  { id: 629, name: "Kevin De Bruyne", team: "Manchester City", country: "Belgium", position: "Midfielder", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg/500px-Kevin_De_Bruyne_USMNT_v_Belgium_Mar_28_2026-64_%28cropped%29.jpg" },
  { id: 28224, name: "Jude Bellingham", team: "Real Madrid", country: "England", position: "Midfielder", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/f/f9/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg/500px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_%28cropped%29.jpg" },
  { id: 733, name: "Vinícius Júnior", team: "Real Madrid", country: "Brazil", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg/500px-2023_05_06_Final_de_la_Copa_del_Rey_-_52879242230_%28cropped%29.jpg" },
  { id: 278, name: "Neymar Jr", team: "Al Hilal", country: "Brazil", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg" },
  { id: 909, name: "Marcus Rashford", team: "Man United", country: "England", position: "Forward", image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/1/11/Marcus_Rashford_in_2023.jpg/500px-Marcus_Rashford_in_2023.jpg" },
  { id: 2028, name: "Sunil Chhetri", team: "Bengaluru FC", country: "India", position: "Forward", image: "https://images.weserv.nl/?url=media.api-sports.io/football/players/2028.png" },

  // Women's Football Legends
  { id: 16182, name: "Leah Williamson", team: "Arsenal", country: "England", position: "Defender", image: "https://images.weserv.nl/?url=media.api-sports.io/football/players/16182.png" },
  { id: 16185, name: "Alessia Russo", team: "Arsenal", country: "England", position: "Forward", image: "https://images.weserv.nl/?url=media.api-sports.io/football/players/16185.png" },
  { id: 16188, name: "Lauren James", team: "Chelsea", country: "England", position: "Forward", image: "https://images.weserv.nl/?url=media.api-sports.io/football/players/16188.png" },
  // More players
  { id: 137, name: "Lamine Yamal", team: "Barcelona", country: "Spain", position: "Forward", image: "" },
  { id: 138, name: "Pedri", team: "Barcelona", country: "Spain", position: "Midfielder", image: "" },
  { id: 139, name: "Gavi", team: "Barcelona", country: "Spain", position: "Midfielder", image: "" },
  { id: 140, name: "Rodri", team: "Manchester City", country: "Spain", position: "Midfielder", image: "" },
  { id: 141, name: "Bukayo Saka", team: "Arsenal", country: "England", position: "Forward", image: "" },
  { id: 142, name: "Martin Ødegaard", team: "Arsenal", country: "Norway", position: "Midfielder", image: "" },
];

export const PLAYER_ALIASES: Record<string, number> = {
  "lionel messi": 154, "messi": 154, "leo messi": 154,
  "cristiano ronaldo": 874, "ronaldo": 874, "cr7": 874,
  "kylian mbappe": 276, "mbappe": 276, "kylian mbappé": 276, "mbappé": 276,
  "erling haaland": 1100, "haaland": 1100,
  "harry kane": 184, "kane": 184,
  "mohamed salah": 306, "salah": 306, "mo salah": 306,
  "kevin de bruyne": 629, "de bruyne": 629, "kdb": 629,
  "jude bellingham": 28224, "bellingham": 28224,
  "vinicius junior": 733, "vinicius": 733, "vini jr": 733, "vinícius júnior": 733,
  "neymar jr": 278, "neymar": 278,
  "marcus rashford": 909, "rashford": 909,
  "lamine yamal": 137, "yamal": 137,
  "pedri": 138,
  "gavi": 139,
  "rodri": 140,
  "bukayo saka": 141, "saka": 141,
  "martin odegaard": 142, "odegaard": 142, "ødegaard": 142,
};



export const ALL_TEAMS = [
  // Major European Clubs - England
  { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png", country: "England" },
  { id: 40, name: "Liverpool F.C.", logo: "https://media.api-sports.io/football/teams/40.png", country: "England" },
  { id: 42, name: "Arsenal F.C.", logo: "https://media.api-sports.io/football/teams/42.png", country: "England" },
  { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png", country: "England" },
  { id: 49, name: "Chelsea F.C.", logo: "https://media.api-sports.io/football/teams/49.png", country: "England" },
  { id: 47, name: "Tottenham Hotspur F.C.", logo: "https://media.api-sports.io/football/teams/47.png", country: "England" },
  { id: 66, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png", country: "England" },
  { id: 34, name: "Newcastle United F.C.", logo: "https://media.api-sports.io/football/teams/34.png", country: "England" },
  { id: 48, name: "West Ham United", logo: "https://media.api-sports.io/football/teams/48.png", country: "England" },

  // Major European Clubs - Spain
  { id: 541, name: "Real Madrid CF", logo: "https://media.api-sports.io/football/teams/541.png", country: "Spain" },
  { id: 529, name: "FC Barcelona", logo: "https://media.api-sports.io/football/teams/529.png", country: "Spain" },
  { id: 530, name: "Atlético Madrid", logo: "https://media.api-sports.io/football/teams/530.png", country: "Spain" },
  { id: 536, name: "Sevilla FC", logo: "https://media.api-sports.io/football/teams/536.png", country: "Spain" },
  { id: 532, name: "Valencia CF", logo: "https://media.api-sports.io/football/teams/532.png", country: "Spain" },

  // Major European Clubs - Germany
  { id: 157, name: "FC Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png", country: "Germany" },
  { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png", country: "Germany" },
  { id: 168, name: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png", country: "Germany" },
  { id: 173, name: "RB Leipzig", logo: "https://media.api-sports.io/football/teams/173.png", country: "Germany" },

  // Major European Clubs - Italy
  { id: 496, name: "Juventus F.C.", logo: "https://media.api-sports.io/football/teams/496.png", country: "Italy" },
  { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png", country: "Italy" },
  { id: 505, name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png", country: "Italy" },
  { id: 492, name: "S.S.C. Napoli", logo: "/napoli.png", country: "Italy" },
  { id: 497, name: "AS Roma", logo: "https://media.api-sports.io/football/teams/497.png", country: "Italy" },

  // Major European Clubs - France & Others
  { id: 85, name: "Paris Saint-Germain F.C.", logo: "https://media.api-sports.io/football/teams/85.png", country: "France" },
  { id: 80, name: "Olympique Lyonnais", logo: "https://media.api-sports.io/football/teams/80.png", country: "France" },
  { id: 81, name: "Olympique de Marseille", logo: "https://media.api-sports.io/football/teams/81.png", country: "France" },
  { id: 194, name: "AFC Ajax", logo: "https://media.api-sports.io/football/teams/194.png", country: "Netherlands" },
  { id: 197, name: "PSV Eindhoven", logo: "https://media.api-sports.io/football/teams/197.png", country: "Netherlands" },

  // Major European Clubs - Portugal
  { id: 190, name: "SL Benfica", logo: "/benfica.png", country: "Portugal" },
  { id: 192, name: "FC Porto", logo: "/porto.png", country: "Portugal" },
  { id: 193, name: "Sporting CP", logo: "/sporting.png", country: "Portugal" },

  // North American Clubs
  { id: 1595, name: "Inter Miami CF", logo: "/inter-miami.png", country: "USA" },

  // Middle East Clubs
  { id: 2939, name: "Al Nassr FC", logo: "https://media.api-sports.io/football/teams/2939.png", country: "Saudi Arabia" },
  { id: 2931, name: "Al Hilal SFC", logo: "/al-hilal-new.png", country: "Saudi Arabia" },

  // South American Clubs
  { id: 451, name: "Boca Juniors", logo: "https://media.api-sports.io/football/teams/451.png", country: "Argentina" },
  { id: 435, name: "River Plate", logo: "https://media.api-sports.io/football/teams/435.png", country: "Argentina" },
  { id: 127, name: "Flamengo", logo: "https://media.api-sports.io/football/teams/127.png", country: "Brazil" },
  { id: 121, name: "Palmeiras", logo: "https://media.api-sports.io/football/teams/121.png", country: "Brazil" },

  // Famous National Teams
  { id: 26, name: "Argentina", logo: "https://media.api-sports.io/football/teams/26.png", country: "World" },
  { id: 6, name: "Brazil", logo: "https://media.api-sports.io/football/teams/6.png", country: "World" },
  { id: 2, name: "France", logo: "https://media.api-sports.io/football/teams/2.png", country: "World" },
  { id: 10, name: "England", logo: "https://media.api-sports.io/football/teams/10.png", country: "World" },
  { id: 25, name: "Germany", logo: "https://media.api-sports.io/football/teams/25.png", country: "World" },
  { id: 27, name: "Portugal", logo: "https://media.api-sports.io/football/teams/27.png", country: "World" },
  { id: 9, name: "Spain", logo: "https://media.api-sports.io/football/teams/9.png", country: "World" },
  { id: 30, name: "Italy", logo: "https://media.api-sports.io/flags/it.svg", country: "World" },
  { id: 1, name: "Netherlands", logo: "https://media.api-sports.io/flags/nl.svg", country: "World" },
  { id: 7, name: "Belgium", logo: "https://media.api-sports.io/flags/be.svg", country: "World" },
  { id: 3, name: "Croatia", logo: "https://media.api-sports.io/football/teams/3.png", country: "World" },
  { id: 24, name: "Uruguay", logo: "https://media.api-sports.io/flags/uy.svg", country: "World" },
  { id: 29, name: "Colombia", logo: "https://media.api-sports.io/flags/co.svg", country: "World" },
  { id: 31, name: "Morocco", logo: "https://media.api-sports.io/football/teams/31.png", country: "World" },
  { id: 12, name: "Japan", logo: "https://media.api-sports.io/football/teams/12.png", country: "World" },
  { id: 15, name: "USA", logo: "https://media.api-sports.io/flags/us.svg", country: "World" },
  { id: 16, name: "Mexico", logo: "https://media.api-sports.io/football/teams/16.png", country: "World" },
  { id: 10001, name: "Canada", logo: "https://media.api-sports.io/flags/ca.svg", country: "World" },
  { id: 10002, name: "Panama", logo: "https://media.api-sports.io/flags/pa.svg", country: "World" },
  { id: 10003, name: "Haiti", logo: "https://media.api-sports.io/flags/ht.svg", country: "World" },
  { id: 10004, name: "Switzerland", logo: "https://media.api-sports.io/flags/ch.svg", country: "World" },
  { id: 10005, name: "Denmark", logo: "https://media.api-sports.io/flags/dk.svg", country: "World" },
  { id: 10006, name: "Sweden", logo: "https://media.api-sports.io/flags/se.svg", country: "World" },
  { id: 10007, name: "Turkey", logo: "https://media.api-sports.io/flags/tr.svg", country: "World" },
  { id: 10008, name: "Norway", logo: "https://media.api-sports.io/flags/no.svg", country: "World" },
  { id: 10009, name: "Austria", logo: "https://media.api-sports.io/flags/at.svg", country: "World" },
  { id: 10010, name: "Scotland", logo: "https://media.api-sports.io/flags/gb.svg", country: "World" },
  { id: 10011, name: "Nigeria", logo: "https://media.api-sports.io/flags/ng.svg", country: "World" },
  { id: 10012, name: "Egypt", logo: "https://media.api-sports.io/flags/eg.svg", country: "World" },
  { id: 10013, name: "Senegal", logo: "https://media.api-sports.io/flags/sn.svg", country: "World" },
  { id: 10014, name: "Algeria", logo: "https://media.api-sports.io/flags/dz.svg", country: "World" },
  { id: 10015, name: "Ivory Coast", logo: "https://media.api-sports.io/flags/ci.svg", country: "World" },
  { id: 10016, name: "Ghana", logo: "https://media.api-sports.io/flags/gh.svg", country: "World" },
  { id: 10017, name: "South Korea", logo: "https://media.api-sports.io/flags/kr.svg", country: "World" },
  { id: 10018, name: "Saudi Arabia", logo: "https://media.api-sports.io/flags/sa.svg", country: "World" },
  { id: 10019, name: "Iran", logo: "https://media.api-sports.io/flags/ir.svg", country: "World" },
  { id: 10020, name: "Australia", logo: "https://media.api-sports.io/flags/au.svg", country: "World" },
  { id: 10021, name: "New Zealand", logo: "https://media.api-sports.io/flags/nz.svg", country: "World" },
  { id: 10022, name: "Ecuador", logo: "https://media.api-sports.io/flags/ec.svg", country: "World" },
  { id: 10023, name: "Paraguay", logo: "https://media.api-sports.io/flags/py.svg", country: "World" },
  { id: 10024, name: "Uzbekistan", logo: "https://media.api-sports.io/flags/uz.svg", country: "World" },
  { id: 10025, name: "Jordan", logo: "https://media.api-sports.io/flags/jo.svg", country: "World" },
  { id: 10026, name: "Curaçao", logo: "https://media.api-sports.io/flags/cw.svg", country: "World" },
  { id: 10027, name: "Cape Verde", logo: "https://media.api-sports.io/flags/cv.svg", country: "World" },
  { id: 10028, name: "Bangladesh", logo: "https://media.api-sports.io/flags/bd.svg", country: "World" }
];

export const TEAM_ALIASES: Record<string, number> = {
  "manchester city": 50, "man city": 50, "city": 50, "mcfc": 50,
  "liverpool": 40, "lfc": 40,
  "arsenal": 42, "afc": 42,
  "manchester united": 33, "man united": 33, "man utd": 33, "mufc": 33, "united": 33,
  "chelsea": 49, "cfc": 49,
  "tottenham": 47, "spurs": 47, "tottenham hotspur": 47,
  "aston villa": 66, "villa": 66,
  "newcastle": 34, "newcastle united": 34, "nufc": 34,
  "west ham": 48, "west ham united": 48, "whufc": 48,

  "real madrid": 541, "madrid": 541, "rmcf": 541,
  "barcelona": 529, "barca": 529, "fcb": 529, "fc barcelona": 529,
  "atletico madrid": 530, "atletico": 530, "atleti": 530,

  "bayern munich": 157, "bayern": 157, "fc bayern": 157,
  "borussia dortmund": 165, "dortmund": 165, "bvb": 165,
  "bayer leverkusen": 168, "leverkusen": 168,

  "juventus": 496, "juve": 496,
  "ac milan": 489, "milan": 489,
  "inter milan": 505, "inter": 505, "internazionale": 505,
  "napoli": 492,
  "roma": 497, "as roma": 497,

  "psg": 85, "paris saint-germain": 85, "paris": 85,

  "inter miami": 1595, "miami": 1595,

  "al nassr": 2939,
  "al hilal": 2931,
};


// Predefined Team Strengths for Realistic Standings Generation (2023-2024 Season Final)
const TEAM_STRENGTHS: Record<number, { win: number; draw: number; lose: number; points: number; gd: number; goalsFor: number; goalsAgainst: number }> = {
  // England
  50: { win: 28, draw: 7, lose: 3, points: 91, gd: 62, goalsFor: 96, goalsAgainst: 34 }, // Man City
  42: { win: 28, draw: 5, lose: 5, points: 89, gd: 62, goalsFor: 91, goalsAgainst: 29 }, // Arsenal
  40: { win: 24, draw: 10, lose: 4, points: 82, gd: 45, goalsFor: 86, goalsAgainst: 41 }, // Liverpool
  66: { win: 20, draw: 8, lose: 10, points: 68, gd: 15, goalsFor: 76, goalsAgainst: 61 }, // Aston Villa
  47: { win: 20, draw: 6, lose: 12, points: 66, gd: 13, goalsFor: 74, goalsAgainst: 61 }, // Tottenham
  49: { win: 18, draw: 9, lose: 11, points: 63, gd: 14, goalsFor: 77, goalsAgainst: 63 }, // Chelsea
  34: { win: 18, draw: 6, lose: 14, points: 60, gd: 23, goalsFor: 85, goalsAgainst: 62 }, // Newcastle
  33: { win: 18, draw: 6, lose: 14, points: 60, gd: -1, goalsFor: 57, goalsAgainst: 58 }, // Man United
  48: { win: 14, draw: 10, lose: 14, points: 52, gd: -14, goalsFor: 60, goalsAgainst: 74 }, // West Ham
  // Spain
  541: { win: 29, draw: 8, lose: 1, points: 95, gd: 61, goalsFor: 87, goalsAgainst: 26 }, // Real Madrid
  529: { win: 26, draw: 7, lose: 5, points: 85, gd: 35, goalsFor: 79, goalsAgainst: 44 }, // Barcelona
  530: { win: 24, draw: 4, lose: 10, points: 76, gd: 27, goalsFor: 70, goalsAgainst: 43 }, // Atletico Madrid
  532: { win: 13, draw: 10, lose: 15, points: 49, gd: -5, goalsFor: 40, goalsAgainst: 45 }, // Valencia
  536: { win: 10, draw: 11, lose: 17, points: 41, gd: -6, goalsFor: 48, goalsAgainst: 54 }, // Sevilla
  // Germany
  168: { win: 28, draw: 6, lose: 0, points: 90, gd: 65, goalsFor: 89, goalsAgainst: 24 }, // Leverkusen
  157: { win: 23, draw: 3, lose: 8, points: 72, gd: 49, goalsFor: 94, goalsAgainst: 45 }, // Bayern
  173: { win: 19, draw: 8, lose: 7, points: 65, gd: 38, goalsFor: 77, goalsAgainst: 39 }, // Leipzig
  165: { win: 18, draw: 9, lose: 7, points: 63, gd: 25, goalsFor: 68, goalsAgainst: 43 }, // Dortmund
  // Italy
  505: { win: 29, draw: 7, lose: 2, points: 94, gd: 67, goalsFor: 89, goalsAgainst: 22 }, // Inter
  489: { win: 22, draw: 9, lose: 7, points: 75, gd: 27, goalsFor: 76, goalsAgainst: 49 }, // Milan
  496: { win: 19, draw: 14, lose: 5, points: 71, gd: 23, goalsFor: 54, goalsAgainst: 31 }, // Juventus
  497: { win: 18, draw: 9, lose: 11, points: 63, gd: 19, goalsFor: 65, goalsAgainst: 46 }, // Roma
  492: { win: 13, draw: 14, lose: 11, points: 53, gd: 7, goalsFor: 55, goalsAgainst: 48 }, // Napoli
  // France
  85: { win: 22, draw: 10, lose: 2, points: 76, gd: 48, goalsFor: 81, goalsAgainst: 33 }, // PSG
  81: { win: 13, draw: 11, lose: 10, points: 50, gd: 11, goalsFor: 52, goalsAgainst: 41 }, // Marseille
  80: { win: 16, draw: 5, lose: 13, points: 53, gd: -6, goalsFor: 49, goalsAgainst: 55 }, // Lyon
  // Portugal
  193: { win: 29, draw: 3, lose: 2, points: 90, gd: 67, goalsFor: 96, goalsAgainst: 29 }, // Sporting
  190: { win: 25, draw: 5, lose: 4, points: 80, gd: 49, goalsFor: 77, goalsAgainst: 28 }, // Benfica
  192: { win: 22, draw: 6, lose: 6, points: 72, gd: 36, goalsFor: 63, goalsAgainst: 27 }, // Porto
  // Saudi Arabia
  2931: { win: 31, draw: 3, lose: 0, points: 96, gd: 78, goalsFor: 101, goalsAgainst: 23 }, // Al Hilal
  2939: { win: 26, draw: 4, lose: 4, points: 82, gd: 58, goalsFor: 100, goalsAgainst: 42 }, // Al Nassr
  // Argentina
  435: { win: 27, draw: 14, lose: 10, points: 95, gd: 37, goalsFor: 83, goalsAgainst: 46 }, // River Plate (2023 Aggregate)
  451: { win: 18, draw: 18, lose: 15, points: 72, gd: 11, goalsFor: 56, goalsAgainst: 45 }, // Boca Juniors (2023 Aggregate)
  // National Teams (Approx form for realism)
  26: { win: 12, draw: 2, lose: 1, points: 38, gd: 28, goalsFor: 35, goalsAgainst: 7 }, // Argentina
  2: { win: 10, draw: 3, lose: 2, points: 33, gd: 20, goalsFor: 28, goalsAgainst: 8 }, // France
  9: { win: 11, draw: 2, lose: 2, points: 35, gd: 25, goalsFor: 32, goalsAgainst: 7 }, // Spain
  10: { win: 9, draw: 4, lose: 2, points: 31, gd: 18, goalsFor: 26, goalsAgainst: 8 }, // England
  6: { win: 7, draw: 4, lose: 4, points: 25, gd: 10, goalsFor: 22, goalsAgainst: 12 }, // Brazil
  25: { win: 8, draw: 3, lose: 4, points: 27, gd: 12, goalsFor: 24, goalsAgainst: 12 }, // Germany
  27: { win: 10, draw: 2, lose: 3, points: 32, gd: 18, goalsFor: 27, goalsAgainst: 9 } // Portugal
};

// Helper to filter teams for each competition dynamically
function getTeamsForLeague(leagueId: number): typeof ALL_TEAMS {
  const league = ALL_LEAGUES.find(l => l.id === leagueId);
  if (!league) return [];

  if (league.type === "League") {
    return ALL_TEAMS.filter(t => t.country === league.country);
  }

  if (league.type === "Club-Int") {
    // Top European clubs for CL / EL
    const europeanCountries = ["England", "Spain", "Germany", "Italy", "France", "Netherlands", "Portugal"];
    const euroClubs = ALL_TEAMS.filter(t => europeanCountries.includes(t.country));
    if (leagueId === 2) {
      // Champions League - Top clubs
      return euroClubs.filter(t => [50, 40, 42, 541, 529, 530, 157, 165, 505, 489, 496, 85, 190, 193].includes(t.id));
    }
    if (leagueId === 3) {
      // Europa League - Other clubs
      return euroClubs.filter(t => [33, 49, 47, 66, 34, 48, 536, 532, 168, 173, 492, 497, 80, 81, 194, 197, 192].includes(t.id));
    }
    if (leagueId === 13) {
      // Copa Libertadores - South American clubs
      return ALL_TEAMS.filter(t => ["Argentina", "Brazil"].includes(t.country));
    }
    if (leagueId === 15) {
      // FIFA Club World Cup - Global clubs
      return ALL_TEAMS.filter(t => [50, 541, 49, 157, 505, 85, 2931, 2939, 435, 451, 127, 121, 1595].includes(t.id));
    }
    return euroClubs.slice(0, 8);
  }

  if (league.type === "International") {
    const nationals = ALL_TEAMS.filter(t => t.country === "World");
    if (leagueId === 4) {
      // Euro Championship
      const euroNats = ["France", "England", "Germany", "Portugal", "Spain", "Italy", "Netherlands", "Belgium", "Croatia", "Denmark", "Sweden", "Turkey", "Norway", "Austria", "Scotland", "Switzerland"];
      return nationals.filter(t => euroNats.includes(t.name));
    }
    if (leagueId === 9) {
      // Copa América
      const saNats = ["Argentina", "Brazil", "Uruguay", "Colombia", "Ecuador", "Paraguay"];
      return nationals.filter(t => saNats.includes(t.name));
    }
    if (leagueId === 6) {
      // Africa Cup of Nations
      const cafNats = ["Morocco", "Nigeria", "Egypt", "Senegal", "Algeria", "Ivory Coast", "Ghana", "Cape Verde"];
      return nationals.filter(t => cafNats.includes(t.name));
    }
    if (leagueId === 7) {
      // AFC Asian Cup
      const afcNats = ["Japan", "South Korea", "Saudi Arabia", "Iran", "Uzbekistan", "Jordan", "Australia"];
      return nationals.filter(t => afcNats.includes(t.name));
    }
    if (leagueId === 22) {
      // CONCACAF Gold Cup
      const concacafNats = ["USA", "Mexico", "Canada", "Panama", "Haiti", "Curaçao"];
      return nationals.filter(t => concacafNats.includes(t.name));
    }
    // World Cup - Top 16
    return nationals.slice(0, 16);
  }

  return [];
}

// Function to generate realistic standings dynamically
export function getMockStandingsForLeague(leagueId: number): Standing[] {
  const league = ALL_LEAGUES.find(l => l.id === leagueId);
  if (!league) return [];

  // 2026 FIFA World Cup Special Logic (48 teams, 12 groups of 4)
  if (leagueId === 1) {
    const nationals = ALL_TEAMS.filter(t => t.country === "World");
    // Duplicate some teams to reach 48 if needed (we have ~45)
    const teamsPool = [...nationals, ...nationals].slice(0, 48);
    const standings: Standing[] = [];

    const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    for (let g = 0; g < 12; g++) {
      const groupName = `Group ${groupLetters[g]}`;
      const groupTeams = teamsPool.slice(g * 4, g * 4 + 4);

      groupTeams.forEach((team, idx) => {
        standings.push({
          rank: idx + 1,
          team: { id: team.id, name: team.name, logo: team.logo },
          points: [7, 4, 3, 1][idx],
          goalsDiff: [4, 1, -1, -4][idx],
          group: groupName,
          form: ["WWD", "WLD", "LWD", "DLL"][idx],
          status: "same",
          description: idx < 2 ? "Advance to Knockout Stage" : null,
          all: {
            played: 3,
            win: [2, 1, 1, 0][idx],
            draw: [1, 1, 0, 1][idx],
            lose: [0, 1, 2, 2][idx],
            goals: { for: [5, 3, 2, 1][idx], against: [1, 2, 3, 5][idx] }
          },
          update: new Date().toISOString()
        });
      });
    }
    return standings;
  }

  const teams = getTeamsForLeague(leagueId);
  const standings: Standing[] = teams.map((team, idx) => {
    const strength = TEAM_STRENGTHS[team.id] || {
      win: Math.max(1, 10 - idx),
      draw: Math.floor(Math.random() * 4) + 2,
      lose: Math.max(1, idx + 1),
      points: 0,
      gd: 0,
      goalsFor: 0,
      goalsAgainst: 0
    };

    const played = strength.win + strength.draw + strength.lose;
    const points = strength.points || (strength.win * 3 + strength.draw);
    const goalsFor = strength.goalsFor || (strength.win * 2 + strength.draw);
    const goalsAgainst = strength.goalsAgainst || (played * 1.1 - strength.win * 0.8);
    const gd = strength.gd || Math.round(goalsFor - goalsAgainst);

    // Form sequence
    let form = "WWDLD";
    if (points / played > 2) form = "WWWDW";
    else if (points / played > 1.5) form = "WDWLW";
    else if (points / played < 1) form = "LLDLL";

    return {
      rank: 0,
      team: { id: team.id, name: team.name, logo: team.logo },
      points,
      goalsDiff: gd,
      group: league.name,
      form,
      status: "same",
      description: idx < 4 ? "Promotion - Champions League (Group Stage)" : idx > teams.length - 4 && league.type === "League" ? "Relegation" : null,
      all: {
        played,
        win: strength.win,
        draw: strength.draw,
        lose: strength.lose,
        goals: { for: Math.round(goalsFor), against: Math.max(0, Math.round(goalsFor - gd)) }
      },
      update: new Date().toISOString()
    };
  });

  // Sort by points, then goal difference, then goals scored
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalsDiff !== a.goalsDiff) return b.goalsDiff - a.goalsDiff;
    return b.all.goals.for - a.all.goals.for;
  });

  // Assign ranks
  return standings.map((item, index) => ({ ...item, rank: index + 1 }));
}

// Fallback static standings export so imports don't break
export const MOCK_STANDINGS: Standing[] = getMockStandingsForLeague(39);

// Rich Mock Live Matches across all leagues/competitions
export const MOCK_LIVE_MATCHES: Match[] = [
  // Premier League (39)
  {
    fixture: { id: 101, referee: "Michael Oliver", timezone: "UTC", date: new Date().toISOString(), timestamp: Math.floor(Date.now() / 1000), periods: { first: null, second: null }, venue: { id: 1, name: "Etihad Stadium", city: "Manchester" }, status: { long: "Second Half", short: "2H", elapsed: 67 } },
    league: { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png", flag: "https://media.api-sports.io/flags/gb.svg", season: 2024, round: "Regular Season - 32" },
    teams: { home: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, away: { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" } },
    goals: { home: 2, away: 1 },
    score: { halftime: { home: 1, away: 1 }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // La Liga (140)
  {
    fixture: { id: 102, referee: "Jesús Gil Manzano", timezone: "UTC", date: new Date().toISOString(), timestamp: Math.floor(Date.now() / 1000), periods: { first: null, second: null }, venue: { id: 2, name: "Estadio Santiago Bernabéu", city: "Madrid" }, status: { long: "First Half", short: "1H", elapsed: 24 } },
    league: { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png", flag: "https://media.api-sports.io/flags/es.svg", season: 2024, round: "Regular Season - 32" },
    teams: { home: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, away: { id: 529, name: "FC Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" } },
    goals: { home: 1, away: 0 },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Serie A (135)
  {
    fixture: { id: 103, referee: "Daniele Orsato", timezone: "UTC", date: new Date().toISOString(), timestamp: Math.floor(Date.now() / 1000), periods: { first: null, second: null }, venue: { id: 3, name: "San Siro", city: "Milan" }, status: { long: "Second Half", short: "2H", elapsed: 83 } },
    league: { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png", flag: "https://media.api-sports.io/flags/it.svg", season: 2024, round: "Regular Season - 32" },
    teams: { home: { id: 505, name: "Inter Milan", logo: "https://media.api-sports.io/football/teams/505.png" }, away: { id: 496, name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png" } },
    goals: { home: 0, away: 0 },
    score: { halftime: { home: 0, away: 0 }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Champions League (2)
  {
    fixture: { id: 104, referee: "Szymon Marciniak", timezone: "UTC", date: new Date().toISOString(), timestamp: Math.floor(Date.now() / 1000), periods: { first: null, second: null }, venue: { id: 4, name: "Allianz Arena", city: "Munich" }, status: { long: "First Half", short: "1H", elapsed: 42 } },
    league: { id: 2, name: "Champions League", country: "Europe", logo: "https://media.api-sports.io/football/leagues/2.png", flag: null, season: 2024, round: "Quarter-Finals" },
    teams: { home: { id: 157, name: "FC Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" }, away: { id: 85, name: "Paris Saint-Germain", logo: "https://media.api-sports.io/football/teams/85.png" } },
    goals: { home: 2, away: 2 },
    score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // FIFA World Cup (1)
  {
    fixture: { id: 105, referee: "Wilton Sampaio", timezone: "UTC", date: new Date().toISOString(), timestamp: Math.floor(Date.now() / 1000), periods: { first: null, second: null }, venue: { id: 5, name: "Lusail Stadium", city: "Doha" }, status: { long: "Second Half", short: "2H", elapsed: 55 } },
    league: { id: 1, name: "FIFA World Cup", country: "World", logo: "/world-cup-trophy.png", flag: null, season: 2026, round: "Group Stage" },
    teams: { home: { id: 26, name: "Argentina", logo: "https://media.api-sports.io/football/teams/26.png" }, away: { id: 6, name: "Brazil", logo: "https://media.api-sports.io/football/teams/6.png" } },
    goals: { home: 1, away: 1 },
    score: { halftime: { home: 1, away: 1 }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  }
];

// Rich Mock Finished Results across all leagues/competitions
export const MOCK_RESULTS: Match[] = [
  // Premier League (39)
  {
    fixture: { id: 201, referee: "Anthony Taylor", timezone: "UTC", date: "2025-05-18T19:00:00Z", timestamp: 1747602000, periods: { first: 1747602000, second: 1747605600 }, venue: { id: 11, name: "Anfield", city: "Liverpool" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png", flag: "https://media.api-sports.io/flags/gb.svg", season: 2024, round: "Regular Season - 37" },
    teams: { home: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", winner: true }, away: { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", winner: false } },
    goals: { home: 3, away: 2 },
    score: { halftime: { home: 1, away: 1 }, fulltime: { home: 3, away: 2 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // La Liga (140)
  {
    fixture: { id: 202, referee: "José María Sánchez Martínez", timezone: "UTC", date: "2025-05-17T18:30:00Z", timestamp: 1747500000, periods: { first: 1747500000, second: 1747503600 }, venue: { id: 12, name: "Estadio Civitas Metropolitano", city: "Madrid" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png", flag: "https://media.api-sports.io/flags/es.svg", season: 2024, round: "Regular Season - 37" },
    teams: { home: { id: 530, name: "Atlético Madrid", logo: "https://media.api-sports.io/football/teams/530.png", winner: false }, away: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png", winner: true } },
    goals: { home: 1, away: 2 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 1, away: 2 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Bundesliga (78)
  {
    fixture: { id: 203, referee: "Felix Zwayer", timezone: "UTC", date: "2025-05-16T18:30:00Z", timestamp: 1747414200, periods: { first: 1747414200, second: 1747417800 }, venue: { id: 13, name: "BayArena", city: "Leverkusen" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png", flag: "https://media.api-sports.io/flags/de.svg", season: 2024, round: "Regular Season - 34" },
    teams: { home: { id: 168, name: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png", winner: true }, away: { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png", winner: false } },
    goals: { home: 2, away: 0 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 0 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Serie A (135)
  {
    fixture: { id: 204, referee: "Marco Guida", timezone: "UTC", date: "2025-05-18T18:45:00Z", timestamp: 1747601100, periods: { first: 1747601100, second: 1747604700 }, venue: { id: 14, name: "Stadio Diego Armando Maradona", city: "Naples" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png", flag: "https://media.api-sports.io/flags/it.svg", season: 2024, round: "Regular Season - 37" },
    teams: { home: { id: 492, name: "S.S.C. Napoli", logo: "/napoli.png", winner: false }, away: { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png", winner: true } },
    goals: { home: 1, away: 3 },
    score: { halftime: { home: 0, away: 2 }, fulltime: { home: 1, away: 3 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Ligue 1 (61)
  {
    fixture: { id: 205, referee: "Clément Turpin", timezone: "UTC", date: "2025-05-18T19:00:00Z", timestamp: 1747602000, periods: { first: 1747602000, second: 1747605600 }, venue: { id: 15, name: "Parc des Princes", city: "Paris" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png", flag: "https://media.api-sports.io/flags/fr.svg", season: 2024, round: "Regular Season - 34" },
    teams: { home: { id: 85, name: "Paris Saint-Germain", logo: "https://media.api-sports.io/football/teams/85.png", winner: true }, away: { id: 80, name: "Olympique Lyonnais", logo: "https://media.api-sports.io/football/teams/80.png", winner: false } },
    goals: { home: 4, away: 1 },
    score: { halftime: { home: 2, away: 0 }, fulltime: { home: 4, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Primeira Liga (94)
  {
    fixture: { id: 206, referee: "Artur Soares Dias", timezone: "UTC", date: "2025-05-17T19:30:00Z", timestamp: 1747510200, periods: { first: 1747510200, second: 1747513800 }, venue: { id: 16, name: "Estádio José Alvalade", city: "Lisbon" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 94, name: "Primeira Liga", country: "Portugal", logo: "https://media.api-sports.io/football/leagues/94.png", flag: "https://media.api-sports.io/flags/pt.svg", season: 2024, round: "Regular Season - 34" },
    teams: { home: { id: 193, name: "Sporting CP", logo: "/sporting.png", winner: true }, away: { id: 190, name: "SL Benfica", logo: "/benfica.png", winner: false } },
    goals: { home: 2, away: 1 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Champions League (2)
  {
    fixture: { id: 207, referee: "Danny Makkelie", timezone: "UTC", date: "2025-05-14T19:00:00Z", timestamp: 1747256400, periods: { first: 1747256400, second: 1747260000 }, venue: { id: 17, name: "Estadio Santiago Bernabéu", city: "Madrid" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 2, name: "Champions League", country: "Europe", logo: "https://media.api-sports.io/football/leagues/2.png", flag: null, season: 2024, round: "Semi-Finals" },
    teams: { home: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png", winner: true }, away: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png", winner: false } },
    goals: { home: 3, away: 1 },
    score: { halftime: { home: 1, away: 1 }, fulltime: { home: 3, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // FIFA World Cup (1)
  {
    fixture: { id: 208, referee: "César Arturo Ramos", timezone: "UTC", date: "2026-05-18T18:00:00Z", timestamp: 1779213600, periods: { first: 1779213600, second: 1779217200 }, venue: { id: 18, name: "Estadio Azteca", city: "Mexico City" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 1, name: "FIFA World Cup", country: "World", logo: "/world-cup-trophy.png", flag: null, season: 2026, round: "Group Stage" },
    teams: { home: { id: 26, name: "Argentina", logo: "https://media.api-sports.io/football/teams/26.png", winner: true }, away: { id: 2, name: "France", logo: "https://media.api-sports.io/football/teams/2.png", winner: false } },
    goals: { home: 2, away: 0 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 0 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Euro Championship (4)
  {
    fixture: { id: 209, referee: "Felix Zwayer", timezone: "UTC", date: "2025-06-14T19:00:00Z", timestamp: 1749930000, periods: { first: 1749930000, second: 1749933600 }, venue: { id: 19, name: "Allianz Arena", city: "Munich" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 4, name: "Euro Championship", country: "Europe", logo: "https://media.api-sports.io/football/leagues/4.png", flag: null, season: 2024, round: "Group Stage" },
    teams: { home: { id: 25, name: "Germany", logo: "https://media.api-sports.io/football/teams/25.png", winner: true }, away: { id: 10, name: "England", logo: "https://media.api-sports.io/football/teams/10.png", winner: false } },
    goals: { home: 2, away: 1 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Copa América (9)
  {
    fixture: { id: 210, referee: "Wilton Sampaio", timezone: "UTC", date: "2025-07-10T20:00:00Z", timestamp: 1752184800, periods: { first: 1752184800, second: 1752188400 }, venue: { id: 20, name: "Hard Rock Stadium", city: "Miami" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 9, name: "Copa América", country: "South America", logo: "https://media.api-sports.io/football/leagues/9.png", flag: null, season: 2024, round: "Final" },
    teams: { home: { id: 26, name: "Argentina", logo: "https://media.api-sports.io/football/teams/26.png", winner: true }, away: { id: 6, name: "Brazil", logo: "https://media.api-sports.io/football/teams/6.png", winner: false } },
    goals: { home: 1, away: 0 },
    score: { halftime: { home: 0, away: 0 }, fulltime: { home: 1, away: 0 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // AFC Asian Cup (7)
  {
    fixture: { id: 211, referee: "Abdulrahman Al-Jassim", timezone: "UTC", date: "2025-02-10T17:00:00Z", timestamp: 1739206800, periods: { first: 1739206800, second: 1739210400 }, venue: { id: 21, name: "Lusail Iconic Stadium", city: "Lusail" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 7, name: "AFC Asian Cup", country: "Asia", logo: "https://media.api-sports.io/football/leagues/7.png", flag: null, season: 2024, round: "Final" },
    teams: { home: { id: 12, name: "Japan", logo: "https://media.api-sports.io/football/teams/12.png", winner: true }, away: { id: 17, name: "South Korea", logo: "https://media.api-sports.io/football/teams/17.png", winner: false } },
    goals: { home: 2, away: 1 },
    score: { halftime: { home: 1, away: 1 }, fulltime: { home: 2, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  },
  // Africa Cup of Nations (6)
  {
    fixture: { id: 212, referee: "Mustapha Ghorbal", timezone: "UTC", date: "2025-02-12T20:00:00Z", timestamp: 1739390400, periods: { first: 1739390400, second: 1739394000 }, venue: { id: 22, name: "Stade Olympique d'Abidjan", city: "Abidjan" }, status: { long: "Match Finished", short: "FT", elapsed: 90 } },
    league: { id: 6, name: "Africa Cup of Nations", country: "Africa", logo: "https://media.api-sports.io/football/leagues/6.png", flag: null, season: 2024, round: "Final" },
    teams: { home: { id: 31, name: "Morocco", logo: "https://media.api-sports.io/football/teams/31.png", winner: true }, away: { id: 10013, name: "Senegal", logo: "https://media.api-sports.io/flags/sn.svg", winner: false } },
    goals: { home: 2, away: 0 },
    score: { halftime: { home: 1, away: 0 }, fulltime: { home: 2, away: 0 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } }
  }
];

// ── Mock Transfer Data ─────────────────────────────────────────────────────────

export type MockTransfer = {
  player: { name: string; flag: string; position: string; nationality: string };
  teams: { from: { name: string; logo: string }; to: { name: string; logo: string } };
  details: { fee: string; status: "confirmed" | "talks" | "rumour"; date: string };
};

export const MOCK_TRANSFERS: MockTransfer[] = [
  {
    player: { name: "Kylian Mbappé", flag: "🇫🇷", position: "FW", nationality: "France" },
    teams: { from: { name: "PSG", logo: "https://media.api-sports.io/football/teams/85.png" }, to: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" } },
    details: { fee: "Free", status: "confirmed", date: "2024-06-01" }
  },
  {
    player: { name: "Erling Haaland", flag: "🇳🇴", position: "FW", nationality: "Norway" },
    teams: { from: { name: "Man City", logo: "https://media.api-sports.io/football/teams/50.png" }, to: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" } },
    details: { fee: "€200M", status: "rumour", date: "2025-06-01" }
  },
  {
    player: { name: "Rodri", flag: "🇪🇸", position: "MF", nationality: "Spain" },
    teams: { from: { name: "Man City", logo: "https://media.api-sports.io/football/teams/50.png" }, to: { name: "Man City", logo: "https://media.api-sports.io/football/teams/50.png" } },
    details: { fee: "Contract Ext.", status: "confirmed", date: "2025-01-15" }
  },
  {
    player: { name: "Marcus Rashford", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW", nationality: "England" },
    teams: { from: { name: "Man United", logo: "https://media.api-sports.io/football/teams/33.png" }, to: { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" } },
    details: { fee: "€40M", status: "talks", date: "2025-01-20" }
  },
  {
    player: { name: "Victor Osimhen", flag: "🇳🇬", position: "FW", nationality: "Nigeria" },
    teams: { from: { name: "Napoli", logo: "https://media.api-sports.io/football/teams/492.png" }, to: { name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" } },
    details: { fee: "€75M", status: "talks", date: "2025-01-18" }
  },
  {
    player: { name: "Jude Bellingham", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "MF", nationality: "England" },
    teams: { from: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, to: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" } },
    details: { fee: "Contract Ext.", status: "confirmed", date: "2025-02-01" }
  },
  {
    player: { name: "Harry Kane", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW", nationality: "England" },
    teams: { from: { name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png" }, to: { name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" } },
    details: { fee: "€100M", status: "confirmed", date: "2023-08-12" }
  },
  {
    player: { name: "Vinícius Júnior", flag: "🇧🇷", position: "FW", nationality: "Brazil" },
    teams: { from: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, to: { name: "Al Ahli", logo: "https://media.api-sports.io/football/teams/2938.png" } },
    details: { fee: "€300M/yr", status: "rumour", date: "2025-05-01" }
  },
  {
    player: { name: "Gavi", flag: "🇪🇸", position: "MF", nationality: "Spain" },
    teams: { from: { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, to: { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" } },
    details: { fee: "Contract Ext.", status: "confirmed", date: "2025-03-10" }
  },
  {
    player: { name: "Mohamed Salah", flag: "🇪🇬", position: "FW", nationality: "Egypt" },
    teams: { from: { name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, to: { name: "Al Qadsiah", logo: "https://media.api-sports.io/football/teams/2943.png" } },
    details: { fee: "Free", status: "rumour", date: "2025-06-01" }
  },
  {
    player: { name: "Bukayo Saka", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW", nationality: "England" },
    teams: { from: { name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, to: { name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" } },
    details: { fee: "Contract Ext.", status: "confirmed", date: "2025-01-05" }
  },
  {
    player: { name: "Lamine Yamal", flag: "🇪🇸", position: "FW", nationality: "Spain" },
    teams: { from: { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, to: { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" } },
    details: { fee: "New Contract", status: "confirmed", date: "2025-04-20" }
  },
  {
    player: { name: "Jadon Sancho", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW", nationality: "England" },
    teams: { from: { name: "Man United", logo: "https://media.api-sports.io/football/teams/33.png" }, to: { name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png" } },
    details: { fee: "€25M", status: "talks", date: "2025-01-25" }
  },
  {
    player: { name: "Trent Alexander-Arnold", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "DF", nationality: "England" },
    teams: { from: { name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, to: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" } },
    details: { fee: "Free", status: "confirmed", date: "2025-06-01" }
  },
  {
    player: { name: "Florian Wirtz", flag: "🇩🇪", position: "MF", nationality: "Germany" },
    teams: { from: { name: "Bayer Leverkusen", logo: "https://media.api-sports.io/football/teams/168.png" }, to: { name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" } },
    details: { fee: "€130M", status: "confirmed", date: "2025-06-01" }
  },
];
