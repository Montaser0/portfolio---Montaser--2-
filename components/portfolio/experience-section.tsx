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
            <Card
              key={item.step}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 relative group"
            >
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
          ))}
        </div>



        {/* Quote */}
        {/* قسم المقولة بتصميم مطور */}
        <div className="mt-32 relative max-w-4xl mx-auto px-6">
          {/* علامة اقتباس خلفية ضخمة لتعزيز التصميم */}
          <Quote
            className="absolute -top-12 -right-4 size-32 text-primary opacity-[0.03] rotate-12 -z-10"
            strokeWidth={1}
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
                <cite className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground not-italic">
                  Montaser <span className="text-primary/60">/</span> Full-Stack Developer
                </cite>
              </footer>
            </blockquote>
          </div>

          {/* علامة اقتباس سفلية لإتمام التوازن البصري */}
          <Quote
            className="absolute -bottom-12 -left-4 size-24 text-primary opacity-[0.03] -rotate-12 -z-10"
            strokeWidth={1}
          />
        </div>
      </div>
    </section>
  );
}
