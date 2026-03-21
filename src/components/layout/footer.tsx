import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-lg font-semibold text-primary">
              Fairfield Bio
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Building the world&apos;s first trusted marketplace for non-human
              genomic data.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Marketplace</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/providers" className="text-sm text-muted-foreground hover:text-foreground">
                  For Providers
                </Link>
              </li>
              <li>
                <Link href="/users" className="text-sm text-muted-foreground hover:text-foreground">
                  For Researchers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/company/fairfield-bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fairfieldbio.com"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  info@fairfieldbio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Fairfield Bio, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
