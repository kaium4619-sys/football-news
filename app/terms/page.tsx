export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Terms of Service</h1>
        </div>

        <div className="prose prose-invert max-w-none flex flex-col gap-8 text-foreground/80 leading-relaxed">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">1. Agreement to Terms</h2>
            <p>
              By accessing our website at GoalStream, you are agreeing to be bound by these terms of service,
              all applicable laws and regulations, and agree that you are responsible for compliance with any
              applicable local laws. If you do not agree with any of these terms, you are prohibited from using
              or accessing this site.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software)
              on GoalStream&apos;s website for personal, non-commercial transitory viewing only.
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on GoalStream&apos;s website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">3. Disclaimer</h2>
            <p>
              The materials on GoalStream&apos;s website are provided on an &apos;as is&apos; basis. GoalStream makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a particular
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">4. Limitations</h2>
            <p>
              In no event shall GoalStream or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on GoalStream&apos;s website.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on GoalStream&apos;s website could include technical, typographical, or
              photographic errors. GoalStream does not warrant that any of the materials on its website are
              accurate, complete or current. GoalStream may make changes to the materials contained on its
              website at any time without notice.
            </p>
          </section>

          <div className="p-8 border border-border bg-card rounded-3xl mt-4">
            <p className="text-sm font-medium">
              By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}