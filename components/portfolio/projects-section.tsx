"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus } from "lucide-react";
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
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});

  const TYPE_LABELS: Record<ProjectType, string> = {
    all: "الكل",
    web: "ويب",
    mobile: "موبايل",
    desktop: "سطح المكتب",
    ai: "ذكاء اصطناعي",
  };

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

  const typeOrder: ProjectType[] = ["all", "web", "mobile", "desktop", "ai"];
  const typeCounts: Record<ProjectType, number> = typeOrder.reduce((acc, t) => {
    acc[t] = t === "all" ? baseProjects.length : baseProjects.filter((p) => p.type === t).length;
    return acc;
  }, {} as Record<ProjectType, number>);

  useEffect(() => {
    const loadMappings = async () => {
      try {
        const res = await fetch("/api/project-images", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setImageOverrides(data || {});
        }
      } catch {}
    };
    loadMappings();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? baseProjects
      : baseProjects.filter((p) => (p.type ?? classifyProjectLike(p)) === activeFilter);

  return (
    <section id="projects" dir="rtl" className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 space-y-4 text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-start gap-3">
            أحدث الأعمال
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed text-left">
            استعراض للمشاريع التي تم تنفيذها، حيث تلتقي الدقة البرمجية بالتصميم الإبداعي.
          </p>
        </div>

        <div className="mb-12">
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as ProjectType)}
            className="w-full"
          >
            <TabsList className="w-full flex flex-col gap-2 h-auto p-0 md:flex-row md:flex-wrap md:gap-2 md:h-9 md:p-[3px]">
              {typeOrder.map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="min-w-24 w-full md:w-auto flex-none md:flex-1 data-[state=active]:border-[var(--chart-2)] active:border-[var(--chart-3)] cursor-pointer"
                >
                  <span className="font-medium">{TYPE_LABELS[t]}</span>
                  <span
                    className={cn(
                      "ms-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs",
                      "bg-muted text-foreground"
                    )}
                  >
                    {typeCounts[t]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        

        <div className="space-y-48">
          {filteredProjects.length === 0 ? (
            <Empty className="border min-h-[200px]">
              <EmptyHeader>
                <EmptyTitle>لا توجد مشاريع ضمن فئة {TYPE_LABELS[activeFilter]}</EmptyTitle>
                <EmptyDescription>
                  أضف مشروعًا جديدًا أو اختر فئة أخرى لعرض النتائج.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const imgSrc = imageOverrides[project.id] ?? project.image;

            return (
              <AnimatedInView
                key={project.id}
                from={isEven ? "right" : "left"}
                className={cn(
                  "flex flex-col gap-16 items-center",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div className="relative w-full md:w-[60%] group">
                  <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500" />
                  
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border shadow-2xl bg-secondary/30">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <Plus className="text-muted-foreground/20" size={60} />
                        <span className="text-xs font-mono opacity-20 tracking-widest">لا توجد صورة</span>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full border border-primary/30 bg-background/70 backdrop-blur-md text-primary text-[11px] font-bold tracking-wide">
                      #{project.category}
                    </span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-bold tracking-[0.2em]">عرض العمل</span>
                      <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-primary hover:bg-primary/5 active:border-[var(--chart-2)] transition-all cursor-pointer">
                        <ArrowLeft size={16} />
                      </span>
                    </Link>
                  </div>
                </div>

                <div className={cn(
                  "w-full md:w-[40%] space-y-8",
                  isEven ? "md:pr-12" : "md:pl-12"
                )}>
                  <div className="space-y-4 text-right">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.2] text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed text-right">
                    {project.problem || "نقوم ببناء تجربة رقمية فريدة من خلال دمج التصميم الإبداعي مع الكود النظيف والمستقر."}
                  </p>
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
