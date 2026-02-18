"use client";

import {
  Lightbulb,
  Code,
  Rocket,
  Users,
  CheckCircle2,
  ArrowLeft,
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

        {/* Values & Experience */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Values */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                القيم التي أعمل بها
              </h3>
              <ul className="space-y-4">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Experience Summary */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                الخبرة العملية
              </h3>
              <div className="space-y-6">
                <div className="border-r-2 border-primary pr-4">
                  <p className="text-sm text-primary mb-1">2023 - الآن</p>
                  <h4 className="font-semibold text-foreground">
                    مطور برمجيات مستقل
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    العمل مع شركات ناشئة ومؤسسات على مشاريع ويب وذكاء اصطناعي
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { year: "2025", title: "مدرب حاسوب وبرمجة", place: "منظمة عدالة" },
                    { year: "مستمر", title: "كورسات أونلاين", place: "تعلم ذاتي" },
                    { year: "2024-الآن", title: "مدرب حاسوب وتطبيقات جوجل", place: "يونس ايمره" },
                    { year: "2024", title: "مطور برمجيات", place: "شركة ماس" },
                    { year: "2024", title: "مدرب برمجة", place: "مدرسة القلم النموذجية" },
                    { year: "2023", title: "تقني", place: "شركة يوناتيد" },
                  ].map((exp) => (
                    <div
                      key={`${exp.title}-${exp.year}`}
                      className="bg-gradient-to-b from-card/70 to-card/40 rounded-xl border border-border hover:border-primary/40 transition-colors p-5"
                    >
                      <div className="text-primary/90 text-2xl font-extrabold mb-2">
                        {exp.year}
                      </div>
                      <div className="text-foreground font-semibold">
                        {exp.title}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {exp.place}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote */}
        {/* <div className="mt-16 text-center">
          <blockquote className="text-xl md:text-2xl text-foreground italic max-w-3xl mx-auto">
            {'"'}أؤمن بأن أفضل الحلول التقنية هي التي تجمع بين البساطة والذكاء -
            كود نظيف، تجربة مستخدم سلسة، وذكاء اصطناعي يضيف قيمة حقيقية.{'"'}
          </blockquote>
        </div> */}
      </div>
    </section>
  );
}
