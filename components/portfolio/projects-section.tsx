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
    <section id="projects" dir="rtl" className="border-y border-border/60 bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 grid gap-8 border-b border-border/60 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-5 text-right">
            <div className="flex items-center justify-end gap-3 text-xs font-bold tracking-[0.18em] text-primary">
              <span className="h-px w-10 bg-primary/60" />
              <LayoutGrid size={15} />
              <span>معرض الأعمال</span>
            </div>
            <h2 className="text-4xl font-black leading-tight text-foreground md:text-6xl">
              أحدث <span className="text-primary">الإبداعات</span>
            </h2>
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground">
            مجموعة مختارة من المشاريع التي تعكس شغفنا بالابتكار ودقتنا في التنفيذ البرمجي.
            </p>
          </div>
          <p className="text-right text-sm font-bold tracking-widest text-muted-foreground/70 md:pb-2">
            2024 — 2025
          </p>
        </div>

        <div className="mb-16 border-b border-border/60 pb-4">
          <div className="relative block md:hidden w-full group">
            <label className="mb-3 mr-1 block text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              تصفية حسب الفئة
            </label>
            <div className="relative border border-border/70 bg-secondary/10 transition-all duration-300 focus-within:border-primary/60">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as ProjectType)}
                className="relative z-10 w-full cursor-pointer appearance-none bg-transparent py-4 pl-14 pr-5 text-base font-bold text-foreground outline-none"
              >
                {typeOrder.map((t) => (
                  <option key={t} value={t} className="bg-background text-foreground">
                    {TYPE_LABELS[t]} ({typeCounts[t]})
                  </option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex h-8 w-8 items-center justify-center text-primary transition-transform group-focus-within:rotate-180">
                  <ChevronDown size={20} strokeWidth={2.5} />
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-primary" />
            </div>
          </div>

          {/* Desktop: Tabs */}
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as ProjectType)}
            className="hidden w-full md:block"
          >
            <TabsList className="mx-0 flex h-auto w-full justify-start gap-1 rounded-none border-0 border-b-0 bg-transparent p-0">
              {typeOrder.map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className={cn(
                    "relative flex items-center gap-3 rounded-none border-0 border-b-2 border-transparent px-5 py-3 transition-colors",
                    "data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary",
                    "text-muted-foreground hover:bg-secondary/30 hover:text-foreground cursor-pointer font-bold text-sm"
                  )}
                >
                  <span>{TYPE_LABELS[t]}</span>
                  <span
                    className={cn(
                      "flex min-w-5.5 items-center justify-center border border-border/70 px-1.5 py-0.5 text-[10px] font-black transition-colors",
                      activeFilter === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-transparent text-muted-foreground"
                    )}
                  >
                    {typeCounts[t]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-0">
          {filteredProjects.length === 0 ? (
            <Empty className="min-h-87.5 border border-dashed border-border/60 bg-secondary/5">
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
                  className="border-t border-border/60 py-12 first:border-t-0 md:py-16"
                >
                  <div className={cn(
                    "flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12",
                    !isEven && "md:flex-row-reverse"
                  )}>
                    <div className="group relative w-full md:w-[54%]">
                      <div className="relative aspect-16/10 w-full overflow-hidden border border-border/60 bg-secondary/20">
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
                      
                      <div className="absolute right-4 top-4">
                        <span className="border border-white/20 bg-background/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
                          {project.category}
                        </span>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="absolute bottom-4 left-4 flex items-center gap-3 border border-primary bg-primary px-5 py-2.5 text-xs font-black text-primary-foreground transition-colors hover:bg-transparent hover:text-primary md:right-4 md:left-auto"
                      >
                        عرض التفاصيل
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      </Link>
                      </div>
                    </div>

                    <div className="w-full space-y-6 text-right md:w-[46%]">
                      <p className="text-xs font-black tracking-[0.2em] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-black leading-tight text-foreground md:text-4xl">
                        {project.title}
                        </h3>
                        <div className="h-px w-16 bg-primary/70" />
                      </div>

                      <p className="text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
                        {project.problem || "تجربة رقمية متكاملة تجمع بين التصميم المبتكر والأداء القوي."}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border/60 pt-4">
                        {project.technologies?.slice(0, 4).map((tech: string) => (
                          <span key={tech} className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          {tech}
                          </span>
                        ))}
                      </div>
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
