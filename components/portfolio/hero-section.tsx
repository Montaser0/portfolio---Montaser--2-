"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import PatternBackground from "@/components/portfolio/pattern-background";

const CodeScene3D = dynamic(
  () => import("./code-scene-3d").then((mod) => mod.CodeScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
);

export function HeroSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <PatternBackground className="absolute inset-0 z-0 pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* تصحيح وسم العنوان الرئيسي لضمان صحة JSX وتوافق Lint */}
              <h1 className="block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-400 mt-2">
                منتصر الحاج عمر
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Full-Stack Developer
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              أبني تطبيقات ويب وموبايل متكاملة ووكلاء ذكاء اصطناعي أذكياء. أحوّل الأفكار
              المعقدة إلى حلول برمجية قابلة للتوسع، مع التركيز على الأداء وتجربة
              المستخدم والابتكار التقني.
            </p>

            {/* Stats */}

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-l from-primary to-chart-2 text-primary-foreground hover:opacity-90 transition-opacity"
                asChild
              >
                <a href="#projects">استعرض أعمالي</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-transparent transition-all"
                asChild
              >
                <a href="#contact">تواصل معي</a>
              </Button>
            </div>

            <div className="flex items-center gap-4 md:gap-5 pt-4">
              <a
                href="https://wa.me/905316924944"
                className="group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-label="WhatsApp"
                title="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp text-2xl md:text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/montaser_haj_omar8?igsh=anBndDNoMmhnN2Fz"
                className="group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-label="Instagram"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram text-2xl md:text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/share/18GKrh5v9R/"
                className="group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-label="Facebook"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook text-2xl md:text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/montaser-haj-omar-b91841281?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="group inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-border bg-background/60 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                aria-label="LinkedIn"
                title="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin text-2xl md:text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 3D Visual Element */}
          <div className="relative block order-2 lg:order-none h-64 sm:h-72 md:h-96 lg:h-[500px] overflow-hidden mt-6 pointer-events-none md:pointer-events-auto">
            <CodeScene3D />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#skills"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-sm">اكتشف المزيد</span>
            <ArrowDown className="h-5 w-5 animate-bounce group-hover:text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
}
