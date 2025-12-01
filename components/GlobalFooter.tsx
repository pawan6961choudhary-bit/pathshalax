import Link from "next/link"

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">PathshalaX</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's largest learning platform for UPSC CSE preparation with top educators and comprehensive syllabus.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="https://chat.whatsapp.com/PathshalaXCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                WhatsApp
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://t.me/PathshalaXOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} PathshalaX. All rights reserved. | Made by Jai Sharma
          </p>
        </div>
      </div>
    </footer>
  )
}
