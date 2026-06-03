import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Football Pulse",
  description: "Our privacy policy outlines how we collect, use, and protect your data while using Football Pulse.",
  alternates: { canonical: "https://www.footballpulse.online/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none flex flex-col gap-8 text-foreground/80 leading-relaxed">
           <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">1. Introduction</h2>
              <p>
                Welcome to GoalStream. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
           </section>

           <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">2. The Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                 <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                 <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                 <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                 <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
           </section>

           <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                 <li>To provide you with the services you have requested.</li>
                 <li>To improve our website, products/services, marketing, and customer relationships.</li>
                 <li>To send you newsletters and promotional materials if you have opted-in.</li>
                 <li>To comply with a legal or regulatory obligation.</li>
              </ul>
           </section>

           <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal 
                data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
           </section>

           <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide">5. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
                including the right to request access, correction, erasure, restriction, transfer, to object to processing, 
                to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
           </section>

           <div className="p-8 border border-border bg-card rounded-3xl mt-4">
              <p className="text-sm font-medium">
                If you have any questions about this privacy policy, please contact us at <span className="text-primary font-bold">privacy@goalstream.com</span>.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
