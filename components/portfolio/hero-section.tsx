"use client";

import { ArrowDown, Linkedin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

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
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
                className="bg-gradient-to-l from-primary to-cyan-500 text-primary-foreground hover:opacity-90 transition-opacity"
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

            <div className="flex items-center gap-6 pt-4">
              <a
                href="https://wa.me/905316924944"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="WhatsApp"
                title="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/montaser_haj_omar8?igsh=anBndDNoMmhnN2Fz"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/share/18GKrh5v9R/"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/montaser-haj-omar-b91841281?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* 3D Visual Element */}
          <div className="relative hidden lg:block h-[500px]">
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
