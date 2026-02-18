"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, type ProjectType } from "@/lib/projects-data";

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
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
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
          ? "opacity-0 translate-x-10"
          : "opacity-0 -translate-x-10",
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
      ? projects
      : projects.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" dir="rtl" className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header - Styled like your reference */}
        <div className="mb-24 space-y-4 text-right">
          <h2 className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-end gap-3">
            <span className="opacity-30 font-light text-foreground">#</span>
            أحدث الأعمال
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            استعراض للمشاريع التي تم تنفيذها، حيث تلتقي الدقة البرمجية بالتصميم الإبداعي.
          </p>
        </div>

        {/* List of Projects with Alternating Layout */}
        <div className="space-y-48">
          {filteredProjects.map((project, index) => {
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
                {/* Image Section - This is where your photos go */}
                <div className="relative w-full md:w-[60%] group">
                  {/* Background decorative box */}
                  <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500" />
                  
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border shadow-2xl bg-secondary/30">
                    {imgSrc ? (
                      <Image
                        src={imgSrc} // سيأخذ الصورة من بياناتك أو الرابط المرفوع
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized={true} // لضمان ظهور الصور الخارجية دون مشاكل في التحسين
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                        <Plus className="text-muted-foreground/20" size={60} />
                        <span className="text-xs font-mono opacity-20 tracking-widest">لا توجد صورة</span>
                      </div>
                    )}
                    {/* شارة الفئة */}
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full border border-primary/30 bg-background/70 backdrop-blur-md text-primary text-[11px] font-bold tracking-wide">
                      #{project.category}
                    </span>
                    {/* زر عرض العمل داخل الصورة */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                    >
                      <span className="text-xs font-bold tracking-[0.2em]">عرض العمل</span>
                      <span className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all">
                        <ArrowLeft size={16} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Text Content Section */}
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
          })}
        </div>

        {/* Footer Design - #Lab; */}
     
      </div>
    </section>
  );
}
