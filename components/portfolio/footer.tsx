"use client";

import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    isFa: true,
    iconClass: "fa-brands fa-whatsapp",
    href: "https://wa.me/905316924944",
    label: "WhatsApp",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "WhatsApp",
  },
  {
    isFa: true,
    iconClass: "fa-brands fa-instagram",
    href: "https://www.instagram.com/montaser_haj_omar8?igsh=anBndDNoMmhnN2Fz",
    label: "Instagram",
  },
  {
    isFa: true,
    iconClass: "fa-brands fa-facebook",
    href: "https://www.facebook.com/share/18GKrh5v9R/",
    label: "Facebook",
  },
  {
    isFa: true,
    iconClass: "fa-brands fa-linkedin",
    href:
      "https://www.linkedin.com/in/montaser-haj-omar-b91841281?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-muted/10">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col items-center">
          <a href="#" className="text-2xl md:text-3xl font-extrabold text-primary">
            Montaser.Dev
          </a>
        </div>
 
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-base md:text-lg font-semibold text-primary">تابعني عبر وسائل التواصل!</p>
            <div className="flex items-center gap-4 md:gap-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  title={link.title}
                  target={(link as any).target}
                  rel={(link as any).rel}
                  className="group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  <i
                    className={`${(link as any).iconClass} text-2xl md:text-3xl transition-transform duration-200 group-hover:scale-110`}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
 
          <div className="flex flex-col items-center md:items-end gap-4">
            <div>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-transparent transition-all"
              >
                <a
                  href="https://wa.me/905316924944"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  تواصل معي
                </a>
              </Button>
            </div>
          </div>
        </div>
 
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">{currentYear} جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
