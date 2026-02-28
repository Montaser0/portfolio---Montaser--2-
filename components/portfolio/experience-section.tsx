"use client";

import {
  Lightbulb,
  Code,
  Rocket,
  Users,
  CheckCircle2,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState, type ReactNode } from "react";

function AnimatedInOut({
  children,
  from = "top",
  className,
}: {
  children: ReactNode;
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
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);
  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out will-change-transform",
        isMobile
          ? "opacity-100 translate-y-0"
          : visible
          ? "opacity-100 translate-y-0"
          : from === "top"
          ? "-translate-y-80 opacity-0"
          : "translate-y-80 opacity-0",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

const workProcess = [
  {
    step: "01",
    title: "فهم المتطلبات",
    description:
      "أبدأ بفهم عميق لاحتياجات العميل وأهداف المشروع والمشكلات التي يحتاج لحلها",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "التصميم والتخطيط",
    description:
      "أصمم البنية التقنية وأختار أفضل التقنيات المناسبة للمشروع مع وضع خطة واضحة",
    icon: Code,
  },
  {
    step: "03",
    title: "التطوير والتكرار",
    description:
      "أبني المنتج بشكل تدريجي مع مراجعات مستمرة لضمان تلبية التوقعات",
    icon: Rocket,
  },
  {
    step: "04",
    title: "التسليم والدعم",
    description:
      "أقدم منتج جاهز للاستخدام مع توثيق كامل ودعم فني لضمان النجاح المستمر",
    icon: Users,
  },
];

const values = [
  "التزام بالمواعيد والجودة العالية",
  "تواصل مستمر وشفافية في العمل",
  "كود نظيف وقابل للصيانة",
  "حلول قابلة للتوسع والتطوير",
  "تركيز على قيمة الأعمال وليس التقنية فقط",
  "تعلم مستمر لأحدث التقنيات",
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            أسلوب العمل
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            منهجية واضحة لتحويل الأفكار إلى منتجات رقمية ناجحة
          </p>
        </div>

        {/* Work Process */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {workProcess.map((item, index) => (
            <AnimatedInOut key={item.step} from={index % 2 === 0 ? "top" : "bottom"}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 relative group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {item.step}
                    </span>
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
                {index < workProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-3 transform -translate-y-1/2">
                    <ArrowLeft className="h-5 w-5 text-border" />
                  </div>
                )}
              </Card>
            </AnimatedInOut>
          ))}
        </div>



        {/* Quote */}
        {/* قسم المقولة بتصميم مطور */}
        <AnimatedInOut from="bottom" className="mt-32">
          <div className="relative max-w-4xl mx-auto px-6">
          {/* علامة اقتباس خلفية ضخمة لتعزيز التصميم */}
          <Quote
            className="absolute -top-12 -right-4 size-36 md:size-40 text-primary/25 drop-shadow-md opacity-100 rotate-12 -z-10 pointer-events-none select-none"
            strokeWidth={1.5}
          />

          <div className="relative border-r-2 border-primary/30 pr-8 py-4">
            <blockquote className="space-y-6">
              <p className="text-2xl md:text-3xl font-medium text-foreground leading-[1.6] tracking-tight">
                "أؤمن بأن أفضل الحلول التقنية هي التي تجمع بين
                <span className="text-primary italic"> البساطة والذكاء </span>
                — كود نظيف، تجربة مستخدم سلسة، وذكاء اصطناعي يضيف قيمة حقيقية."
              </p>

              <footer className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-primary/50"></div>
                <cite className="text-sm tracking-[0.3em] text-muted-foreground not-italic">
                  منتصر الحاج عمر <span className="text-primary/60">/</span> مطوّر فل ستاك
                </cite>
              </footer>
            </blockquote>
          </div>

          {/* علامة اقتباس سفلية لإتمام التوازن البصري */}
          <Quote
            className="absolute -bottom-12 -left-4 size-28 md:size-32 text-primary/20 drop-shadow-md opacity-100 -rotate-12 -z-10 pointer-events-none select-none"
            strokeWidth={1.5}
          />
          </div>
        </AnimatedInOut>
      </div>
    </section>
  );
}
