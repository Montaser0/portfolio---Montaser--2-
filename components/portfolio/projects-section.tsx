"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, ChevronDown, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, type ProjectType } from "@/lib/projects-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";

function AnimatedInView({
  children,
  from = "right",
  className,
}: {
  children: React.ReactNode;
  from?: "right" | "left";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (typeof IntersectionObserver === "undefined" || isMobile) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible
          ? "opacity-100 translate-x-0"
          : from === "right"
          ? "opacity-100 translate-x-0 md:opacity-0 md:translate-x-full"
          : "opacity-100 translate-x-0 md:opacity-0 md:-translate-x-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("all");

  const TYPE_LABELS: Record<ProjectType, string> = {
    all: "جميع المشاريع",
    web: "تطبيقات الويب",
    mobile: "تطبيقات الموبايل",
    desktop: "برامج سطح المكتب",
    ai: "الذكاء الاصطناعي",
  };

  const typeOrder: ProjectType[] = ["all", "web", "mobile", "desktop", "ai"];

  function classifyProjectLike(p: any): ProjectType {
    const t = (p?.type ?? "").toString().toLowerCase();
    if (t && ["web", "mobile", "desktop", "ai", "all"].includes(t)) return t as ProjectType;
    const cat = (p?.category ?? "").toLowerCase();
    const tech = Array.isArray(p?.technologies) ? p.technologies.map((x: string) => x.toLowerCase()) : [];
    if (cat.includes("موبايل") || tech.includes("flutter") || tech.includes("react native")) return "mobile";
    if (cat.includes("ذكاء") || tech.includes("openai") || tech.includes("ai")) return "ai";
    if (cat.includes("سطح") || tech.includes("asp.net") || tech.includes("windows")) return "desktop";
    return "web";
  }

  const baseProjects = projects.map((p) => ({
    ...p,
    type: (p as any).type ?? classifyProjectLike(p),
  }));

  const typeCounts: Record<ProjectType, number> = typeOrder.reduce((acc, t) => {
    acc[t] = t === "all" ? baseProjects.length : baseProjects.filter((p) => p.type === t).length;
    return acc;
  }, {} as Record<ProjectType, number>);


  const filteredProjects =
    activeFilter === "all"
      ? baseProjects
      : baseProjects.filter((p) => (p.type ?? classifyProjectLike(p)) === activeFilter);

  return (
    <section id="projects" dir="rtl" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16 space-y-4 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
            <LayoutGrid size={14} />
            <span>معرض الأعمال</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
            أحدث <span className="text-primary">الإبداعات</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-medium">
            مجموعة مختارة من المشاريع التي تعكس شغفنا بالابتكار ودقتنا في التنفيذ البرمجي.
          </p>
        </div>

        {/* --- Navigation & Filtering --- */}
        <div className="mb-20">
          
          {/* Mobile: Custom Select */}
          <div className="relative block md:hidden w-full group">
            <label className="block text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 mr-1 opacity-80">
              تصفية حسب الفئة
            </label>
            <div className="relative rounded-2xl border border-border/60 bg-secondary/20 backdrop-blur-xl transition-all duration-300 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as ProjectType)}
                className="w-full appearance-none bg-transparent text-foreground py-5 pr-5 pl-14 font-bold text-base cursor-pointer outline-none relative z-10"
              >
                {typeOrder.map((t) => (
                  <option key={t} value={t} className="bg-background text-foreground">
                    {TYPE_LABELS[t]} ({typeCounts[t]})
                  </option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary transition-transform group-focus-within:rotate-180">
                  <ChevronDown size={20} strokeWidth={2.5} />
                </div>
              </div>
              <div className="absolute right-0 top-3 bottom-3 w-1 bg-primary rounded-l-full shadow-[0_0_12px_rgba(var(--primary),0.4)]" />
            </div>
          </div>

          {/* Desktop: Tabs */}
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as ProjectType)}
            className="hidden md:block w-full"
          >
            <TabsList className="flex w-max mx-auto h-auto p-1.5 bg-secondary/30 rounded-[2rem] border border-border/40 backdrop-blur-md">
              {typeOrder.map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className={cn(
                    "relative flex items-center gap-3 px-8 py-3.5 rounded-[1.5rem] transition-all duration-500",
                    "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-xl data-[state=active]:scale-[1.02]",
                    "text-muted-foreground hover:text-foreground cursor-pointer font-bold text-sm"
                  )}
                >
                  <span>{TYPE_LABELS[t]}</span>
                  <span
                    className={cn(
                      "flex items-center justify-center min-w-[24px] h-6 px-1.5 text-[11px] font-black rounded-full transition-all",
                      activeFilter === t 
                        ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {typeCounts[t]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* --- Projects Grid --- */}
        <div className="space-y-32 md:space-y-48">
          {filteredProjects.length === 0 ? (
            <Empty className="border-2 border-dashed border-border/40 min-h-[350px] rounded-[3rem] bg-secondary/5">
              <EmptyHeader>
                <EmptyTitle className="text-2xl font-black">نأسف، لا توجد نتائج</EmptyTitle>
                <EmptyDescription className="text-base font-medium">
                  لم يتم العثور على مشاريع في فئة {TYPE_LABELS[activeFilter]} حالياً.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            filteredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const rawSrc = project.image || `/projects/${project.id}.png`;
              const imgSrc = encodeURI(rawSrc);

              return (
                <AnimatedInView
                  key={project.id}
                  from={isEven ? "right" : "left"}
                  className={cn(
                    "flex flex-col gap-12 md:gap-20 items-center",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Image Container */}
                  <div className="relative w-full md:w-[58%] group">
                    <div className="absolute inset-0 bg-primary/5 -rotate-2 rounded-[2.5rem] -z-10 group-hover:rotate-0 transition-transform duration-700" />
                    
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-border/50 shadow-2xl bg-secondary/20">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-1000 group-hover:scale-105"
                          unoptimized // اضف هذا إذا كانت الصور من رابط خارجي لتجاوز حظر التحسين المؤقت
                          priority={index < 2}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-muted/10">
                          <Plus className="text-muted-foreground/20" size={80} />
                        </div>
                      )}
                      
                      <div className="absolute top-6 right-6">
                        <span className="px-5 py-2 rounded-2xl bg-background/60 backdrop-blur-2xl border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest">
                          {project.category}
                        </span>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="absolute bottom-6 left-6 md:right-6 md:left-auto flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-xs shadow-2xl hover:-translate-y-1 transition-all group/btn"
                      >
                        عرض التفاصيل
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className={cn(
                    "w-full md:w-[42%] space-y-8",
                    isEven ? "md:pr-12" : "md:pl-12 text-right md:text-left"
                  )}>
                    <div className="space-y-4">
                       <h3 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1]">
                        {project.title}
                      </h3>
                      <div className="h-1.5 w-20 bg-primary/20 rounded-full" />
                    </div>
                    
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
                      {project.problem || "تجربة رقمية متكاملة تجمع بين التصميم المبتكر والأداء القوي."}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                      {project.technologies?.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="px-3 py-1 rounded-lg bg-secondary/50 border border-border/50 text-[10px] font-bold text-muted-foreground uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedInView>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
