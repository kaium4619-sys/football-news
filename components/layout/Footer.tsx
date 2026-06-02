import Link from "next/link";
import Image from "next/image";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-6 max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Football Pulse Logo" width={40} height={40} className="object-contain rounded-full overflow-hidden" />
            <span className="font-bold text-xl tracking-tight text-foreground">Football Pulse</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your ultimate destination for live football scores, breaking news, detailed stats, and match analysis from around the globe. Join our community of millions of fans.
          </p>
          
          {/* Social Media Icons with custom SVGs for reliability */}
          <div className="flex items-center gap-4">
             <Link href="https://www.facebook.com/profile.php?id=61588853236976" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
             </Link>
             <Link href="https://www.instagram.com/football_pulse_official_" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
             </Link>
             <Link href="https://x.com/football_pulse_" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
             </Link>
             <Link href="https://fr.pinterest.com/footballpulseofficial/" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-muted/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.162 0 7.398 2.965 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 12-5.379 12-12S18.638 0 12.017 0z"/></svg>
             </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 sm:gap-24">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-foreground uppercase text-xs tracking-widest">Explore</h3>
            <Link href="/matches" className="text-sm text-muted-foreground hover:text-primary">Live Scores</Link>
            <Link href="/results" className="text-sm text-muted-foreground hover:text-primary">Results</Link>
            <Link href="/tables" className="text-sm text-muted-foreground hover:text-primary">Tables</Link>
            <Link href="/competitions" className="text-sm text-muted-foreground hover:text-primary">Competitions</Link>
            <Link href="/teams" className="text-sm text-muted-foreground hover:text-primary">Teams</Link>
            <Link href="/news" className="text-sm text-muted-foreground hover:text-primary">Latest News</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-foreground uppercase text-xs tracking-widest">Legal</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground flex flex-col sm:flex-row justify-between items-center pb-16 md:pb-0">
        <p>© Football Pulse. All rights reserved.</p>
      </div>
    </footer>
  );
}
