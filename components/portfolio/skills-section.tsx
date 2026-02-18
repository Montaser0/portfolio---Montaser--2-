"use client";

import React from "react";
import {
  Code2,
  Database,
  Globe,
  Bot,
  Smartphone,
  Shield,
  ArrowUpRight,
} from "lucide-react";

/* ملاحظة: استخدمت متغيرات Tailwind الخاصة بك 
   مثل bg-background و bg-card و text-primary 
*/

const skillCategories = [
  {
    title: "لغات البرمجة",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "Java", "Dart", "PHP"],
    accentColor: "group-hover:text-primary",
  },
  {
    title: "تطوير الويب",
    icon: Globe,
    skills: ["React.js", "Next.js", "Laravel", "TailwindCSS" , "Bootstrap" , "MUI" , "Shadcn UI"],
    accentColor: "group-hover:text-chart-2",
  },
  {
    title: "قواعد البيانات والمنصات",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "Supabase", "Firebase", "MongoDB"],
    accentColor: "group-hover:text-chart-3",
  },
  {
    title: "الذكاء الاصطناعي",
    icon: Bot,
    skills: ["n8n Automation", "RAG", "OpenAI API", "LangChain"],
    accentColor: "group-hover:text-primary",
  },
  {
    title: "تطبيقات الموبايل",
    icon: Smartphone,
    skills: ["Flutter", "Dart", "App Store Deployment"],
    accentColor: "group-hover:text-chart-2",
  },
  {
    title: "الأمن السيبراني",
    icon: Shield,
    skills: ["Auth Systems", "Data Encryption", "Security Audits"],
    accentColor: "group-hover:text-destructive",
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header - Minimalist */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl text-right">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">
              القدرات التقنية
            </h2>

          </div>
          <div className="hidden md:block select-none pointer-events-none">
            <span className="text-7xl font-bold opacity-[0.03] uppercase tracking-tighter">
              Expertise
            </span>
          </div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="group relative p-8 rounded-[--radius] border border-border bg-card/50 transition-all duration-300 hover:bg-card hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`p-3 rounded-lg bg-secondary text-muted-foreground transition-colors duration-300 ${cat.accentColor}`}>
                  <cat.icon size={26} strokeWidth={1.2} />
                </div>
                <ArrowUpRight className="text-muted-foreground/20 group-hover:text-primary transition-colors duration-300" size={18} />
              </div>

              <h3 className="text-lg font-semibold mb-5 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-background border border-border/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats - Consistent with Theme */}
        <div className="mt-20 pt-10 border-t border-border/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { label: "المنهجية", value: "Agile / Scrum" },
              { label: "المشاريع", value: "+20 مشروع" },
              { label: "الخبرة", value: "Full-Stack" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-sm font-medium text-foreground/90 font-mono">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}