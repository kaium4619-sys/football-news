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
			{ name: "Mexico", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 2, goalsAgainst: 1, goalDiff: 1, points: 3 },
			{ name: "South Korea", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 1, goalsAgainst: 0, goalDiff: 1, points: 3 },
			{ name: "Czech Republic", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 1, goalsAgainst: 2, goalDiff: -1, points: 0 },
			{ name: "South Africa", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 1, goalDiff: -2, points: 0 },
		],
	},
	{
		group: "Group B",
		teams: [
			{ name: "Switzerland", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
			{ name: "Canada", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
			{ name: "Bosnia & Herzegovina", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
			{ name: "Qatar", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
		],
	},
	{
		group: "Group C",
		teams: [
			{ name: "Scotland", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 4, goalsAgainst: 0, goalDiff: 1, points: 3 },
			{ name: "Brazil", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
			{ name: "Morocco", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
			{ name: "Haiti", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 4, goalDiff: -1, points: 0 },
		],
	},
	{
		group: "Group D",
		teams: [
			{ name: "United States", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 2, goalsAgainst: 1, goalDiff: 3, points: 3 },
			{ name: "Australia", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 2, goalsAgainst: 0, goalDiff: 2, points: 3 },
			{ name: "Türkiye", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 2, goalDiff: -2, points: 0 },
			{ name: "Paraguay", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 1, goalsAgainst: 2, goalDiff: -3, points: 0 },
		],
	},
	{
		group: "Group E",
		teams: [
			{ name: "Germany", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 7, goalsAgainst: 1, goalDiff: 6, points: 3 },
			{ name: "Ivory Coast", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 1, goalsAgainst: 0, goalDiff: 1, points: 3 },
			{ name: "Ecuador", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 1, goalDiff: -1, points: 0 },
			{ name: "Curaçao", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 1, goalsAgainst: 7, goalDiff: -6, points: 0 },
		],
	},
	{
		group: "Group F",
		teams: [
			{ name: "Sweden", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 5, goalsAgainst: 1, goalDiff: 4, points: 3 },
			{ name: "Japan", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 1 },
			{ name: "Netherlands", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 1 },
			{ name: "Tunisia", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 1, goalsAgainst: 5, goalDiff: -4, points: 0 },
		],
	},
	{
		group: "Group G",
		teams: [
			{ name: "Belgium", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "Egypt", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "Iran", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "New Zealand", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
		],
	},
	{
		group: "Group H",
		teams: [
			{ name: "Spain", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 1 },
			{ name: "Cape Verde", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 2, goalsAgainst: 2, goalDiff: 0, points: 1 },
			{ name: "Uruguay", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
			{ name: "Saudi Arabia", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 1 },
		],
	},
	{
		group: "Group I",
		teams: [
			{ name: "Norway", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 4, goalsAgainst: 1, goalDiff: 3, points: 3 },
			{ name: "France", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 2, goalsAgainst: 0, goalDiff: 2, points: 3 },
			{ name: "Senegal", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 2, goalDiff: -2, points: 0 },
			{ name: "Iraq", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 1, goalsAgainst: 4, goalDiff: -3, points: 0 },
		],
	},
	{
		group: "Group J",
		teams: [
			{ name: "Argentina", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 3, goalsAgainst: 0, goalDiff: 3, points: 3 },
			{ name: "Austria", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "Jordan", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "Algeria", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 3, goalDiff: -3, points: 0 },
		],
	},
	{
		group: "Group K",
		teams: [
			{ name: "Portugal", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 3, goalsAgainst: 1, goalDiff: 2, points: 3 },
			{ name: "Colombia", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 1, goalsAgainst: 0, goalDiff: 1, points: 3 },
			{ name: "Uzbekistan", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 1, goalDiff: -1, points: 0 },
			{ name: "DR Congo", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 1, goalsAgainst: 3, goalDiff: -2, points: 0 },
		],
	},
	{
		group: "Group L",
		teams: [
			{ name: "England", played: 1, win: 1, draw: 0, lose: 0, goalsFor: 2, goalsAgainst: 0, goalDiff: 2, points: 3 },
			{ name: "Croatia", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "Ghana", played: 1, win: 0, draw: 1, lose: 0, goalsFor: 1, goalsAgainst: 1, goalDiff: 0, points: 1 },
			{ name: "Panama", played: 1, win: 0, draw: 0, lose: 1, goalsFor: 0, goalsAgainst: 2, goalDiff: -2, points: 0 },
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
			<p className="text-xs text-muted-foreground mb-5 uppercase tracking-widest font-bold">After Matchday 1 · Updated June 17, 2026</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				{GROUPS.map((g) => (
					<div key={g.group} className="rounded-2xl border border-border bg-background overflow-hidden">
						<div className="bg-muted/30 px-4 py-2.5 border-b border-border/50 flex items-center justify-between">
							<h3 className="font-black tracking-tight text-sm uppercase text-foreground">{g.group}</h3>
							<span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">MD1</span>
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
