"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function AnimatedInOut({
  children,
  from = "top",
  className,
}: {
  children: React.ReactNode;
  from?: "top" | "bottom";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isMobile) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isMobile
          ? "opacity-100 translate-y-0"
          : visible
          ? "opacity-100 translate-y-0"
          : from === "top"
          ? "-translate-y-80 opacity-0"
          : "translate-y-80 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

const experiences = [
  {
    year: "2023-الآن",
    title: "مطور مستقل",
    description:
      "العمل كمستقل مع عدة شركات ومؤسسات على مشاريع ويب وذكاء اصطناعي وحلول برمجية مخصصة.",
    place: "شركات ومؤسسات متعددة",
  },
  {
    year: "2025",
    title: "مدرب حاسوب وبرمجة",
    description:
      "تدريب الطلاب على لغات البرمجة الحديثة وبناء المنطق البرمجي السليم.",
    place: "منظمة عدالة",
  },
  {
    year: "2024",
    title: "مطور برمجيات",
    description:
      "بناء أنظمة ويب متكاملة وتطوير تطبيقات مخصصة لخدمة قطاع الأعمال.",
    place: "شركة ماس",
  },
  {
    year: "2024-الآن",
    title: "مدرب حاسوب وتطبيقات جوجل",
    description:
      "تدريب عملي على أدوات جوجل والإنتاجية السحابية والعمل التعاوني.",
    place: "يونس ايمره",
  },
  {
    year: "2024",
    title: "مدرب برمجة",
    description:
      "تأسيس مهارات البرمجة لطلبة المدارس عبر مشاريع وتمارين تطبيقية.",
    place: "مدرسة القلم النموذجية",
  },
  {
    year: "مستمر",
    title: "كورسات أونلاين",
    description:
      "تدريب الطلاب برمجة بشكل اونلاين",
    place: " كورسات برمجة اونلابن",
  },
  {
    year: "2023",
    title: "تقني نظم",
    description:
      "إدارة البنية التحتية التقنية وضمان استمرارية العمليات البرمجية.",
    place: "شركة يوناتيد",
  },
];

export function ExperienceSection1() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <section id="experience" dir="rtl" className="py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - متناسق مع تصميم الهوية */}
        <div className="mb-20 text-right">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center justify-end gap-3 flex-row-reverse">
            المسيرة المهنية
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mr-0 ml-auto leading-relaxed text-right">
            محطات من الخبرة العملية والتدريب التقني، أسعى من خلالها لترك أثر رقمي ملموس ونقل المعرفة البرمجية.
          </p>
        </div>

        {/* Dynamic Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {experiences.map((exp, index) => (
            <AnimatedInOut
              key={index}
              from={isMobile ? "top" : index % 2 === 0 ? "top" : "bottom"}
            >
              <div
                className={cn(
                  "relative group p-8 rounded-2xl transition-all duration-500",
                  "bg-gradient-to-br from-card to-card/50 border border-white/[0.05]",
                  "hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2",
                  index % 2 === 0 ? "lg:mt-12" : "lg:mt-0"
                )}
              >
                {/* Year - بارز بلون السيان كما في الصورة */}
                <div className="text-primary text-3xl font-black mb-6 tracking-tighter transition-transform group-hover:scale-110 origin-right">
                  {exp.year}
                </div>

                {/* Title & Place */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-foreground leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-primary/70 text-xs font-mono uppercase tracking-widest">
                    {exp.place}
                  </p>
                </div>

                {/* Description - نص باهت قليلاً كما في الصورة */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Bottom Glow Effect */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </AnimatedInOut>
          ))}
        </div>

        {/* Footer Design Element */}
        <div className="mt-32 text-center opacity-20 select-none">
          <span className="text-8xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-transparent">
            RESUME
          </span>
        </div>
      </div>
    </section>
  );
}
