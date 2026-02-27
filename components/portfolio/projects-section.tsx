"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, ChevronDown } from "lucide-react"; // أضفنا ChevronDown
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
        {/* Header */}
        <div className="mb-10 space-y-4 text-right">
          <h2 className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-start gap-3">
            أحدث الأعمال
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed text-right">
            استعراض للمشاريع التي تم تنفيذها، حيث تلتقي الدقة البرمجية بالتصميم الإبداعي.
          </p>
        </div>

        {/* --- الفلترة (Navigation) --- */}
        <div className="mb-16">
          {/* نسخة الموبايل: قائمة منسدلة (Select) */}
          <div className="relative block md:hidden">
            <div className="relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as ProjectType)}
                className="w-full appearance-none bg-secondary/50 border border-border/50 text-foreground py-4 px-5 rounded-2xl font-bold text-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                {typeOrder.map((t) => (
                  <option key={t} value={t} className="bg-background">
                    {TYPE_LABELS[t]} ({typeCounts[t]})
                  </option>
                ))}
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* نسخة سطح المكتب: تبويبات (Tabs) */}
          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as ProjectType)}
            className="hidden md:block w-full"
          >
            <TabsList className="flex w-max mx-auto h-auto p-1.5 bg-secondary/30 rounded-2xl border border-border/50 backdrop-blur-sm">
              {typeOrder.map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className={cn(
                    "relative flex items-center gap-3 px-8 py-3 rounded-xl transition-all duration-300",
                    "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg",
                    "text-muted-foreground hover:text-foreground cursor-pointer font-bold"
                  )}
                >
                  <span className="text-sm uppercase tracking-wide">{TYPE_LABELS[t]}</span>
                  <span
                    className={cn(
                      "flex items-center justify-center min-w-[22px] h-5.5 px-1.5 text-[10px] font-black rounded-full transition-colors",
                      activeFilter === t 
                        ? "bg-primary text-primary-foreground" 
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

        {/* --- قائمة المشاريع --- */}
        <div className="space-y-32 md:space-y-48">
          {filteredProjects.length === 0 ? (
            <Empty className="border min-h-[300px] rounded-3xl">
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
                    "flex flex-col gap-10 md:gap-16 items-center",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* صورة المشروع */}
                  <div className="relative w-full md:w-[60%] group">
                    <div className="absolute inset-0 bg-primary/10 translate-x-3 translate-y-3 rounded-3xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" />
                    
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border/50 shadow-2xl bg-secondary/20">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-muted/20">
                          <Plus className="text-muted-foreground/10" size={80} />
                        </div>
                      )}
                      
                      {/* الوسم (Category) */}
                      <span className="absolute top-4 right-4 px-4 py-1.5 rounded-full border border-primary/20 bg-background/80 backdrop-blur-xl text-primary text-xs font-black shadow-sm">
                        #{project.category}
                      </span>

                      {/* رابط عرض العمل */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="absolute bottom-4 right-4 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-background/90 backdrop-blur-xl border border-border hover:border-primary text-foreground transition-all group/link"
                      >
                        <span className="text-xs font-black">عرض العمل</span>
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* تفاصيل المشروع */}
                  <div className={cn(
                    "w-full md:w-[40%] space-y-6",
                    isEven ? "md:pr-8" : "md:pl-8"
                  )}>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed text-right font-medium">
                      {project.problem || "تجربة رقمية متكاملة تجمع بين التصميم المبتكر والأداء القوي لتلبية احتياجات المستخدم."}
                    </p>
                    
                    {/* يمكنك إضافة التقنيات هنا كـ Tags صغيرة */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies?.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="text-[10px] uppercase tracking-widest font-bold opacity-50 border-b border-primary/30 pb-0.5">
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