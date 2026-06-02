import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <h1 className="text-4xl font-black uppercase tracking-tight">Get in Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have a question, feedback, or business inquiry? We&apos;re here to help. 
            Reach out to our team and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex gap-6 items-start">
               <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Email Us</h3>
                 <p className="text-muted-foreground text-sm mb-2">For support and inquiries</p>
                 <span className="text-primary font-black">support@goalstream.com</span>
               </div>
            </div>

            <div className="flex gap-6 items-start">
               <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Social Media</h3>
                 <p className="text-muted-foreground text-sm mb-2">Follow us for live updates</p>
                 <div className="flex gap-4 font-black text-sm uppercase">
                    <a href="https://x.com/football_pulse_" target="_blank" rel="noreferrer" className="hover:text-primary">X</a>
                    <a href="https://www.instagram.com/football_pulse_official_" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
                    <a href="https://www.facebook.com/profile.php?id=61588853236976" target="_blank" rel="noreferrer" className="hover:text-primary">Facebook</a>
                    <a href="https://fr.pinterest.com/footballpulseofficial/" target="_blank" rel="noreferrer" className="hover:text-primary">Pinterest</a>
                 </div>
               </div>
            </div>

            <div className="flex gap-6 items-start">
               <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Office</h3>
                 <p className="text-muted-foreground text-sm mb-2">Our global headquarters</p>
                 <span className="text-foreground font-medium">123 Football Ave, Wembley Park, London, UK</span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-card border border-border p-8 md:p-10 rounded-[40px]">
             <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase text-muted-foreground px-2">Name</label>
                      <input type="text" placeholder="John Doe" className="bg-background border border-border rounded-2xl px-5 py-3 text-sm focus:border-primary focus:outline-none" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase text-muted-foreground px-2">Email</label>
                      <input type="email" placeholder="john@example.com" className="bg-background border border-border rounded-2xl px-5 py-3 text-sm focus:border-primary focus:outline-none" />
                   </div>
                </div>
                
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-black uppercase text-muted-foreground px-2">Subject</label>
                   <select className="bg-background border border-border rounded-2xl px-5 py-3 text-sm focus:border-primary focus:outline-none appearance-none">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Advertising</option>
                      <option>Content Feedback</option>
                   </select>
                </div>

                <div className="flex flex-col gap-2">
                   <label className="text-xs font-black uppercase text-muted-foreground px-2">Message</label>
                   <textarea rows={5} placeholder="How can we help you?" className="bg-background border border-border rounded-2xl px-5 py-3 text-sm focus:border-primary focus:outline-none resize-none"></textarea>
                </div>

                <button className="bg-primary text-primary-foreground font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform shadow-[0_10px_30px_rgba(204,255,0,0.2)]">
                   <Send className="h-5 w-5" /> SEND MESSAGE
                </button>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
}
