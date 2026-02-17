"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Bot,
  Smartphone,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ================== DATA ================== */

const skillCategories = [
  {
    title: "لغات البرمجة",
    icon: Code2,
    skills: ["Python", "JavaScript", "Typescript" ,"Java", "Dart", "C#" ,"Php" ],
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "hover:border-primary/50",
  },
  {
    title: "تطوير الويب",
    icon: Globe,
    skills: ["React.js", "Next.js", "Laravel"],
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "hover:border-cyan-400/50",
  },
  {
    title: "قواعد البيانات",
    icon: Database,
    skills: ["SQL", "PostgreSQL", "MySQL", "Supabase" , "Firebase" , "Neon"],
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "hover:border-amber-400/50",
  },
  {
    title: "الذكاء الاصطناعي والأتمتة",
    icon: Bot,
    skills: ["n8n", "RAG", "Fine-tuning", "OpenAI", "Chatbots"],
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "hover:border-purple-400/50",
  },
  {
    title: "تطوير تطبيقات الموبايل",
    icon: Smartphone,
    skills: ["Flutter", "Dart", "Mobile UI/UX", "Cross-platform"],
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "hover:border-green-400/50",
  },
  {
    title: "أمن المعلومات",
    icon: Shield,
    skills: [
      "إدارة الصلاحيات",
      "تشفير البيانات",
      "Steganography",
      "Phishing Protection",
    ],
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "hover:border-red-400/50",
  },
];

/* ================== ANIMATION ================== */

function AnimatedCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

/* ================== SECTION ================== */

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-28 bg-secondary/30 overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-l from-primary to-cyan-400 bg-clip-text text-transparent">
            المهارات التقنية
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            مجموعة متكاملة من المهارات التي تمكنني من بناء حلول برمجية شاملة من
            الألف إلى الياء
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => (
            <AnimatedCard key={cat.title} delay={index * 120}>
              <Card
                className={`
                  relative overflow-hidden
                  bg-card/40 backdrop-blur-xl
                  border border-border
                  ${cat.borderColor}
                  transition-all duration-500
                  group
                  hover:-translate-y-2
                  hover:shadow-2xl hover:shadow-primary/10
                `}
              >
                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                bg-gradient-to-br from-primary/5 via-transparent to-cyan-400/5" />

                <CardContent className="relative p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`
                        p-3 rounded-2xl
                        ${cat.bgColor}
                        ring-1 ring-white/10
                        group-hover:rotate-6 group-hover:scale-125
                        transition-all duration-500
                      `}
                    >
                      <cat.icon className={`h-6 w-6 ${cat.color}`} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {cat.title}
                      </h3>

                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="
                          bg-secondary/60 backdrop-blur-md
                          border border-border/50
                          hover:bg-primary/20 hover:border-primary/40
                          transition-all duration-300
                          hover:scale-110
                        "
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        {/* Summary */}
        <div
          className="mt-20 p-10 bg-gradient-to-br from-card/60 to-card/30
                     backdrop-blur-xl rounded-3xl border border-border
                     hover:border-primary/40 transition-all duration-500"
        >
          <div className="flex flex-wrap justify-center gap-10 text-muted-foreground">
            <div className="flex items-center gap-2 group">
              <Code2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-foreground transition-colors">
                +15 مشروع منجز
              </span>
            </div>
            <div className="flex items-center gap-2 group">
              <Layers className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-foreground transition-colors">
                تطوير Full-Stack
              </span>
            </div>
            <div className="flex items-center gap-2 group">
              <Bot className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-foreground transition-colors">
                حلول ذكاء اصطناعي
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
