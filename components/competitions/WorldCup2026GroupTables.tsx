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

const GROUPS: Group[] = [
	{ group: "Group A", teams: [
		{ name: "Mexico", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "South Africa", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "South Korea", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Czech Republic", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group B", teams: [
		{ name: "Canada", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Bosnia and Herzegovina", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Qatar", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Switzerland", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group C", teams: [
		{ name: "Brazil", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Morocco", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Haiti", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Scotland", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group D", teams: [
		{ name: "United States", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Paraguay", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Australia", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Türkiye", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group E", teams: [
		{ name: "Germany", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Curaçao", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Ivory Coast", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Ecuador", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group F", teams: [
		{ name: "The Netherlands", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Japan", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Sweden", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Tunisia", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group G", teams: [
		{ name: "Belgium", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Egypt", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Iran", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "New Zealand", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group H", teams: [
		{ name: "Spain", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Cape Verde", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Saudi Arabia", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Uruguay", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group I", teams: [
		{ name: "France", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Senegal", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Iraq", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Norway", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group J", teams: [
		{ name: "Argentina", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Algeria", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Austria", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Jordan", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group K", teams: [
		{ name: "Portugal", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "DR Congo", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Uzbekistan", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Colombia", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
	{ group: "Group L", teams: [
		{ name: "England", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Croatia", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Ghana", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
		{ name: "Panama", played:0, win:0, draw:0, lose:0, goalsFor:0, goalsAgainst:0, goalDiff:0, points:0 },
	]},
];

const FLAG_BY_TEAM: Record<string, string> = {
	Mexico: "mx",
	"South Africa": "za",
	"South Korea": "kr",
	"Czech Republic": "cz",
	Canada: "ca",
	"Bosnia and Herzegovina": "ba",
	Qatar: "qa",
	Switzerland: "ch",
	Brazil: "br",
	Morocco: "ma",
	Haiti: "ht",
	Scotland: "gb-sct",
	"United States": "us",
	Paraguay: "py",
	Australia: "au",
	Türkiye: "tr",
	Germany: "de",
	"Curaçao": "cw",
	"Ivory Coast": "ci",
	Ecuador: "ec",
	"The Netherlands": "nl",
	Japan: "jp",
	Sweden: "se",
	Tunisia: "tn",
	Belgium: "be",
	Egypt: "eg",
	Iran: "ir",
	"New Zealand": "nz",
	Spain: "es",
	"Cape Verde": "cv",
	"Saudi Arabia": "sa",
	Uruguay: "uy",
	France: "fr",
	Senegal: "sn",
	Iraq: "iq",
	Norway: "no",
	Argentina: "ar",
	Algeria: "dz",
	Austria: "at",
	Jordan: "jo",
	Portugal: "pt",
	"DR Congo": "cd",
	Uzbekistan: "uz",
	Colombia: "co",
	England: "gb-eng",
	Croatia: "hr",
	Ghana: "gh",
	Panama: "pa",
};

function flagUrlFor(team: string) {
	const code = FLAG_BY_TEAM[team];
	return code ? `https://flagcdn.com/24x18/${code}.png` : undefined;
}

export function WorldCup2026GroupTables() {
	return (
		<section className="rounded-3xl border border-border bg-card p-6">
			<div className="flex items-center gap-3 mb-4">
				<h2 className="text-2xl font-black uppercase tracking-tight">FIFA World Cup 2026 — Group Stage</h2>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{GROUPS.map((g) => (
					<div key={g.group} className="rounded-2xl border border-border bg-background overflow-hidden">
						<div className="bg-muted/30 px-4 py-3 border-b border-border/50">
							<h3 className="font-bold tracking-tight text-sm uppercase">{g.group}</h3>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-muted-foreground text-[10px] uppercase font-bold border-b border-border/30">
										<th className="px-3 py-2 text-left w-8">#</th>
										<th className="px-2 py-2 text-left">Team</th>
										<th className="px-2 py-2 text-center">MP</th>
										<th className="px-2 py-2 text-center">W</th>
										<th className="px-2 py-2 text-center">D</th>
										<th className="px-2 py-2 text-center">L</th>
										<th className="px-2 py-2 text-center">GF</th>
										<th className="px-2 py-2 text-center">GA</th>
										<th className="px-2 py-2 text-center">GD</th>
										<th className="px-3 py-2 text-center font-black text-foreground">Pts</th>
									</tr>
								</thead>
								<tbody>
									{g.teams.map((t, idx) => (
										<tr key={t.name} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
											<td className="px-3 py-3 font-bold">{idx + 1}</td>
											<td className="px-3 py-3 flex items-center gap-2">
												{flagUrlFor(t.name) && (
													// eslint-disable-next-line @next/next/no-img-element
													<img src={flagUrlFor(t.name)} alt={`${t.name} flag`} width={24} height={18} className="object-contain rounded-sm" />
												)}
												<span>{t.name}</span>
											</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.played}</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.win}</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.draw}</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.lose}</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.goalsFor}</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.goalsAgainst}</td>
											<td className="px-2 py-3 text-center text-muted-foreground">{t.goalDiff}</td>
											<td className="px-3 py-3 text-center font-black text-foreground">{t.points}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default WorldCup2026GroupTables;
