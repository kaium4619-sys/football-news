import { fetchFixture, fetchMatchStatistics, fetchMatchEvents } from "@/lib/football-api";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60; // 1 min cache

export default async function MatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fixtureId = parseInt(id, 10);
  
  if (isNaN(fixtureId)) {
    notFound();
  }

  const [match, stats, events] = await Promise.all([
    fetchFixture(fixtureId),
    fetchMatchStatistics(fixtureId),
    fetchMatchEvents(fixtureId)
  ]);

  if (!match) {
    notFound();
  }

  const fixture = (match as any).fixture;
  const league = (match as any).league;
  const teams = (match as any).teams;
  const goals = (match as any).goals;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Image src={league.logo} alt={league.name} width={32} height={32} className="object-contain" />
        <h1 className="text-xl font-bold text-muted-foreground uppercase">{league.name}</h1>
      </div>

      {/* Scoreboard */}
      <div className="bg-card border border-border rounded-3xl p-8 mb-12 shadow-xl flex items-center justify-between">
        <div className="flex flex-col items-center gap-4 flex-1">
          <Image src={teams.home.logo} alt={teams.home.name} width={100} height={100} className="w-24 h-24 object-contain" />
          <h2 className="text-2xl font-black text-center">{teams.home.name}</h2>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <div className="text-sm font-bold text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full">
            {fixture.status.long}
          </div>
          <div className="text-6xl font-black tabular-nums tracking-tighter">
            {goals.home ?? "-"}:{goals.away ?? "-"}
          </div>

        </div>

        <div className="flex flex-col items-center gap-4 flex-1">
          <Image src={teams.away.logo} alt={teams.away.name} width={100} height={100} className="w-24 h-24 object-contain" />
          <h2 className="text-2xl font-black text-center">{teams.away.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Events */}
        <section className="bg-card border border-border rounded-3xl p-6">
          <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Match Events
          </h3>
          <div className="space-y-4">
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event: any, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <div className="w-12 font-bold text-muted-foreground">{event.time.elapsed}&apos;</div>
                  <div className="flex-1">
                    <span className="font-semibold">{event.player.name}</span>
                    {event.assist?.name && <span className="text-muted-foreground text-xs ml-2">({event.assist.name})</span>}
                  </div>
                  <div className="uppercase text-xs font-bold px-2 py-1 bg-muted rounded">{event.type}</div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No events available.</p>
            )}
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-card border border-border rounded-3xl p-6">
          <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Team Statistics
          </h3>
          <div className="space-y-4">
            {Array.isArray(stats) && stats.length === 2 ? (
              (stats[0] as any).statistics.map((stat: any, i: number) => {
                const homeStat = stat.value ?? 0;
                const awayStat = (stats[1] as any).statistics[i].value ?? 0;
                return (
                  <div key={stat.type} className="flex items-center justify-between text-sm">
                    <div className="w-16 font-bold">{homeStat}</div>
                    <div className="flex-1 text-center text-muted-foreground">{stat.type}</div>
                    <div className="w-16 font-bold text-right">{awayStat}</div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground">No statistics available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
