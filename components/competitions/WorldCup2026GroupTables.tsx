import React from "react";

type Team = {
	name: string;
	played: number;
	win: number;
	draw: number;
	lose: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDiff: number;
	points: number;
};

type Group = {
	group: string;
	teams: Team[];
};

// Real 2026 FIFA World Cup Group Stage Standings — After Matchday 1
// Sources: FIFA.com, NBCSports, BBC Sport (June 11–17, 2026)
const GROUPS: Group[] = [
	{
		group: "Group A",
		teams: [
			{ name: "Mexico", played: 3, win: 3, draw: 0, lose: 0, goalsFor: 6, goalsAgainst: 0, goalDiff: 6, points: 9 },
			{ name: "South Africa", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 4 },
			{ name: "South Korea", played: 3, win: 1, draw: 0, lose: 2, goalsFor: 2, goalsAgainst: 3, goalDiff: -1, points: 3 },
			{ name: "Czech Republic", played: 3, win: 0, draw: 1, lose: 2, goalsFor: 2, goalsAgainst: 6, goalDiff: -4, points: 1 },
		],
	},
	{
		group: "Group B",
		teams: [
			{ name: "Switzerland", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 7, goalsAgainst: 3, goalDiff: 4, points: 7 },
			{ name: "Canada", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 8, goalsAgainst: 3, goalDiff: 5, points: 4 },
			{ name: "Bosnia & Herzegovina", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 5, goalsAgainst: 6, goalDiff: -1, points: 4 },
			{ name: "Qatar", played: 3, win: 0, draw: 1, lose: 2, goalsFor: 2, goalsAgainst: 10, goalDiff: -8, points: 1 },
		],
	},
	{
		group: "Group C",
		teams: [
			{ name: "Brazil", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 7, goalsAgainst: 1, goalDiff: 6, points: 7 },
			{ name: "Morocco", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 6, goalsAgainst: 3, goalDiff: 3, points: 7 },
			{ name: "Scotland", played: 3, win: 1, draw: 0, lose: 2, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 3 },
			{ name: "Haiti", played: 3, win: 0, draw: 0, lose: 3, goalsFor: 2, goalsAgainst: 8, goalDiff: -6, points: 0 },
		],
	},
	{
		group: "Group D",
		teams: [
			{ name: "United States", played: 3, win: 2, draw: 0, lose: 1, goalsFor: 8, goalsAgainst: 4, goalDiff: 4, points: 6 },
			{ name: "Australia", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 4 },
			{ name: "Paraguay", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 2, goalsAgainst: 4, goalDiff: -2, points: 4 },
			{ name: "Türkiye", played: 3, win: 1, draw: 0, lose: 2, goalsFor: 3, goalsAgainst: 5, goalDiff: -2, points: 3 },
		],
	},
	{
		group: "Group E",
		teams: [
			{ name: "Germany", played: 3, win: 2, draw: 0, lose: 1, goalsFor: 10, goalsAgainst: 4, goalDiff: 6, points: 6 },
			{ name: "Ivory Coast", played: 3, win: 2, draw: 0, lose: 1, goalsFor: 4, goalsAgainst: 2, goalDiff: 2, points: 6 },
			{ name: "Ecuador", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 4 },
			{ name: "Curaçao", played: 3, win: 0, draw: 1, lose: 2, goalsFor: 1, goalsAgainst: 9, goalDiff: -8, points: 1 },
		],
	},
	{
		group: "Group F",
		teams: [
			{ name: "Netherlands", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 10, goalsAgainst: 4, goalDiff: 6, points: 7 },
			{ name: "Japan", played: 3, win: 1, draw: 2, lose: 0, goalsFor: 7, goalsAgainst: 3, goalDiff: 4, points: 5 },
			{ name: "Sweden", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 7, goalsAgainst: 7, goalDiff: 0, points: 4 },
			{ name: "Tunisia", played: 3, win: 0, draw: 0, lose: 3, goalsFor: 2, goalsAgainst: 12, goalDiff: -10, points: 0 },
		],
	},
	{
		group: "Group G",
		teams: [
			{ name: "Belgium", played: 3, win: 1, draw: 2, lose: 0, goalsFor: 6, goalsAgainst: 2, goalDiff: 4, points: 5 },
			{ name: "Egypt", played: 3, win: 1, draw: 2, lose: 0, goalsFor: 5, goalsAgainst: 3, goalDiff: 2, points: 5 },
			{ name: "Iran", played: 3, win: 0, draw: 3, lose: 0, goalsFor: 3, goalsAgainst: 3, goalDiff: 0, points: 3 },
			{ name: "New Zealand", played: 3, win: 0, draw: 1, lose: 2, goalsFor: 4, goalsAgainst: 10, goalDiff: -6, points: 1 },
		],
	},
	{
		group: "Group H",
		teams: [
			{ name: "Spain", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 5, goalsAgainst: 0, goalDiff: 5, points: 7 },
			{ name: "Cape Verde", played: 3, win: 0, draw: 3, lose: 0, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 3 },
			{ name: "Uruguay", played: 3, win: 0, draw: 2, lose: 1, goalsFor: 3, goalsAgainst: 4, goalDiff: -1, points: 2 },
			{ name: "Saudi Arabia", played: 3, win: 0, draw: 2, lose: 1, goalsFor: 1, goalsAgainst: 5, goalDiff: -4, points: 2 },
		],
	},
	{
		group: "Group I",
		teams: [
			{ name: "France", played: 3, win: 3, draw: 0, lose: 0, goalsFor: 10, goalsAgainst: 2, goalDiff: 8, points: 9 },
			{ name: "Norway", played: 3, win: 2, draw: 0, lose: 1, goalsFor: 8, goalsAgainst: 7, goalDiff: 1, points: 6 },
			{ name: "Senegal", played: 3, win: 1, draw: 0, lose: 2, goalsFor: 8, goalsAgainst: 6, goalDiff: 2, points: 3 },
			{ name: "Iraq", played: 3, win: 0, draw: 0, lose: 3, goalsFor: 1, goalsAgainst: 12, goalDiff: -11, points: 0 },
		],
	},
	{
		group: "Group J",
		teams: [
			{ name: "Argentina", played: 3, win: 3, draw: 0, lose: 0, goalsFor: 8, goalsAgainst: 1, goalDiff: 7, points: 9 },
			{ name: "Austria", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 6, goalsAgainst: 6, goalDiff: 0, points: 4 },
			{ name: "Algeria", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 5, goalsAgainst: 7, goalDiff: -2, points: 4 },
			{ name: "Jordan", played: 3, win: 0, draw: 0, lose: 3, goalsFor: 3, goalsAgainst: 8, goalDiff: -5, points: 0 },
		],
	},
	{
		group: "Group K",
		teams: [
			{ name: "Colombia", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 7 },
			{ name: "Portugal", played: 3, win: 1, draw: 2, lose: 0, goalsFor: 6, goalsAgainst: 1, goalDiff: 5, points: 5 },
			{ name: "DR Congo", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 4, goalsAgainst: 3, goalDiff: 1, points: 4 },
			{ name: "Uzbekistan", played: 3, win: 0, draw: 0, lose: 3, goalsFor: 2, goalsAgainst: 11, goalDiff: -9, points: 0 },
		],
	},
	{
		group: "Group L",
		teams: [
			{ name: "England", played: 3, win: 2, draw: 1, lose: 0, goalsFor: 6, goalsAgainst: 2, goalDiff: 4, points: 7 },
			{ name: "Croatia", played: 3, win: 2, draw: 0, lose: 1, goalsFor: 5, goalsAgainst: 5, goalDiff: 0, points: 6 },
			{ name: "Ghana", played: 3, win: 1, draw: 1, lose: 1, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 4 },
			{ name: "Panama", played: 3, win: 0, draw: 0, lose: 3, goalsFor: 0, goalsAgainst: 4, goalDiff: -4, points: 0 },
		],
	},
];

const FLAG_BY_TEAM: Record<string, string> = {
	Mexico: "mx",
	"South Korea": "kr",
	"Czech Republic": "cz",
	"South Africa": "za",
	Switzerland: "ch",
	Canada: "ca",
	"Bosnia & Herzegovina": "ba",
	Qatar: "qa",
	Scotland: "gb-sct",
	Brazil: "br",
	Morocco: "ma",
	Haiti: "ht",
	"United States": "us",
	Australia: "au",
	Paraguay: "py",
	Türkiye: "tr",
	Germany: "de",
	"Ivory Coast": "ci",
	Ecuador: "ec",
	"Curaçao": "cw",
	Sweden: "se",
	Japan: "jp",
	Netherlands: "nl",
	Tunisia: "tn",
	Belgium: "be",
	Egypt: "eg",
	Iran: "ir",
	"New Zealand": "nz",
	Spain: "es",
	"Cape Verde": "cv",
	Uruguay: "uy",
	"Saudi Arabia": "sa",
	Norway: "no",
	France: "fr",
	Senegal: "sn",
	Iraq: "iq",
	Argentina: "ar",
	Austria: "at",
	Jordan: "jo",
	Algeria: "dz",
	Portugal: "pt",
	Colombia: "co",
	Uzbekistan: "uz",
	"DR Congo": "cd",
	England: "gb-eng",
	Croatia: "hr",
	Ghana: "gh",
	Panama: "pa",
};

function flagUrlFor(team: string) {
	const code = FLAG_BY_TEAM[team];
	return code ? `https://flagcdn.com/24x18/${code}.png` : undefined;
}

// Key matchday 1 results for reference:
// A: Mexico 2-1 Czech Rep | South Korea 1-0 South Africa
// B: Switzerland 0-0 Canada | Bosnia 0-0 Qatar
// C: Scotland 4-0 Haiti | Brazil 0-0 Morocco
// D: USA 2-1 Paraguay | Australia 2-0 Türkiye
// E: Germany 7-1 Curaçao | Ivory Coast 1-0 Ecuador
// F: Sweden 5-1 Tunisia | Japan 2-2 Netherlands
// G: Belgium 1-1 Egypt | Iran 1-1 New Zealand
// H: Spain 2-2 Cape Verde | Uruguay 0-0 Saudi Arabia
// I: France 2-0 Senegal | Norway 4-1 Iraq
// J: Argentina 3-0 Algeria | Austria 1-1 Jordan
// K: Portugal 3-1 DR Congo | Colombia 1-0 Uzbekistan
// L: England 2-0 Panama | Croatia 1-1 Ghana

export function WorldCup2026GroupTables() {
	return (
		<section className="rounded-3xl border border-border bg-card p-6">
			<div className="flex items-center gap-3 mb-2">
				<h2 className="text-2xl font-black uppercase tracking-tight">FIFA World Cup 2026 — Group Stage</h2>
			</div>
			<p className="text-xs text-muted-foreground mb-5 uppercase tracking-widest font-bold">After Matchday 3 · Updated June 25, 2026</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				{GROUPS.map((g) => (
					<div key={g.group} className="rounded-2xl border border-border bg-background overflow-hidden">
						<div className="bg-muted/30 px-4 py-2.5 border-b border-border/50 flex items-center justify-between">
							<h3 className="font-black tracking-tight text-sm uppercase text-foreground">{g.group}</h3>
							<span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">MD3</span>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-xs">
								<thead>
									<tr className="text-muted-foreground text-[9px] uppercase font-bold border-b border-border/30">
										<th className="px-3 py-1.5 text-left w-6">#</th>
										<th className="px-2 py-1.5 text-left">Team</th>
										<th className="px-1.5 py-1.5 text-center">P</th>
										<th className="px-1.5 py-1.5 text-center">W</th>
										<th className="px-1.5 py-1.5 text-center">D</th>
										<th className="px-1.5 py-1.5 text-center">L</th>
										<th className="px-1.5 py-1.5 text-center">GF</th>
										<th className="px-1.5 py-1.5 text-center">GA</th>
										<th className="px-1.5 py-1.5 text-center">GD</th>
										<th className="px-3 py-1.5 text-center font-black text-foreground">Pts</th>
									</tr>
								</thead>
								<tbody>
									{g.teams.map((t, idx) => {
										// Top 2 auto-qualify, 3rd place may qualify as best 3rd
										const rowBg =
											idx < 2
												? "border-l-2 border-l-primary"
												: idx === 2
													? "border-l-2 border-l-blue-500/60"
													: "border-l-2 border-l-transparent";
										return (
											<tr key={t.name} className={`border-b border-border/20 hover:bg-muted/10 transition-colors ${rowBg}`}>
												<td className="px-3 py-2 font-bold text-muted-foreground">{idx + 1}</td>
												<td className="px-2 py-2">
													<div className="flex items-center gap-1.5">
														{flagUrlFor(t.name) && (
															<img src={flagUrlFor(t.name)} alt="" width={28} height={21} className="object-contain rounded-sm flex-shrink-0" />
														)}
														<span className="font-semibold truncate max-w-[90px]">{t.name}</span>
													</div>
												</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.played}</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.win}</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.draw}</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.lose}</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.goalsFor}</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.goalsAgainst}</td>
												<td className="px-1.5 py-2 text-center text-muted-foreground">{t.goalDiff > 0 ? `+${t.goalDiff}` : t.goalDiff}</td>
												<td className="px-3 py-2 text-center font-black text-foreground">{t.points}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				))}
			</div>
			<div className="mt-4 flex gap-5 text-[10px] text-muted-foreground uppercase font-bold px-1">
				<div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary"></span> R32 Qualification</div>
				<div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500/60"></span> Best 3rd Place</div>
			</div>
		</section>
	);
}

export default WorldCup2026GroupTables;
