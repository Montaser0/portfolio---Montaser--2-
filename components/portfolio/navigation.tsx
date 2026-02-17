"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "نبذة عني" },
  { href: "#skills", label: "المهارات" },
  { href: "#projects", label: "المشاريع" },
  { href: "#experience", label: "الخبرة" },
  { href: "#contact", label: "تواصل" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // منع تمرير الصفحة عند فتح القائمة لتجربة استخدام أفضل
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
<div className="relative flex items-center justify-between">
  {/* Logo */}
  <a href="#" className="text-xl font-bold text-primary z-10">
    Montaser.Dev
  </a>

  {/* Desktop Navigation - Centered */}
  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 
                  bg-background/60 backdrop-blur-md border border-border 
                  rounded-full px-2 py-1">
    {navLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="
          relative px-4 py-2 text-sm font-medium text-muted-foreground
          transition-all duration-300
          hover:text-primary
          after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0
          after:bg-primary after:transition-all after:duration-300
          hover:after:w-1/2 hover:after:left-1/4
        "
      >
        {link.label}
      </a>
    ))}
  </div>

  {/* CTA Button - Left */}
  <div className="hidden md:block">
    <Button asChild className="rounded-md px-6">
      <a
        href="https://wa.me/905316924944"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        لنبدأ بمشروعك
      </a>
    </Button>
  </div>

  {/* Mobile Menu Button (بدون تغيير) */}
  <Button
    variant="ghost"
    size="icon"
    className="md:hidden relative z-50"
    onClick={() => setIsOpen(!isOpen)}
  >
    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
  </Button>
</div>

        </div>
      </nav>

      {/* Mobile Full Screen Navigation */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/50 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-2xl font-semibold text-foreground hover:text-primary transition-all duration-300 transform ${isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                  }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 flex flex-col items-center gap-4">
            <div className="w-12 h-[1px] bg-primary/50" />
            <p className="text-muted-foreground text-sm">Montaser.Dev</p>
          </div>
        </div>
      </div>
    </>
  );
}
