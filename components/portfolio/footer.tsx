"use client";

import { Github, Linkedin, Twitter, Mail, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#contact", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/10">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col items-center">
          <a href="#" className="text-2xl md:text-3xl font-extrabold text-primary">
            Montaser.Dev
          </a>
        </div>
 
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-base md:text-lg font-semibold text-primary">
              تابعني عبر وسائل التواصل!
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="h-12 w-12 rounded-full border border-border bg-background text-muted-foreground flex items-center justify-center hover:text-primary hover:border-primary/40 shadow-sm hover:shadow transition-all"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
 
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-base md:text-lg font-semibold text-primary">
              تواصل معي الآن
            </p>
            <ul className="w-full max-w-sm space-y-3 text-muted-foreground">
              <li className="flex items-center justify-center md:justify-end gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <a
                  href="https://wa.me/905316924944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  واتساب: +905316924944
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <a href="#contact" className="hover:text-foreground">
                  راسلني عبر البريد
                </a>
              </li>
            </ul>
          </div>
        </div>
 
        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">{currentYear} جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
