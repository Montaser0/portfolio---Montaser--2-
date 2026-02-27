import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // أضفنا الصور
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
  User,
  Code2,
  ExternalLink,
  Github,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { projects, getProjectById } from "@/lib/projects-data";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "المشروع غير موجود" };
  }

  return {
    title: `${project.title} | Montaser.Dev`,
    description: project.solution,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const ProjectIcon = project.icon;
  const rawSrc = (project.image || `/projects/${project.id}.png` || "/placeholder-project.jpg") as string;
  const imgSrc = encodeURI(rawSrc);

  return (
    <main className="min-h-screen bg-background pb-20" dir="rtl">
      {/* 1. Navbar / Header - أكثر أناقة */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/#projects">
            <Button variant="ghost" className="gap-2 group hover:bg-primary/10 transition-colors">
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              <span className="font-bold">العودة للمعرض</span>
            </Button>
          </Link>
          <div className="flex gap-2">
             <Badge variant="outline" className="hidden sm:flex border-primary/20 text-primary">
                {project.category}
             </Badge>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - تصميم عريض وجذاب */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                {/* <div className={cn(
                  "p-3 rounded-xl ring-1 ring-border shadow-sm",
                  project.type === "web" && "bg-blue-500/10 text-blue-500",
                  project.type === "mobile" && "bg-green-500/10 text-green-500",
                  project.type === "ai" && "bg-amber-500/10 text-amber-500"
                )}>
                  <ProjectIcon size={24} />
                </div> */}
                {/* <span className="text-sm font-black tracking-widest text-primary uppercase opacity-70">
                  {project.category}
                </span> */}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1]">
                {project.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {project.solution}
              </p>


            </div>

            {/* صورة المشروع بشكل Mockup */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 -z-10" />
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-black/20 transform md:rotate-2 group-hover:rotate-0 transition-transform duration-700">
                <Image 
                  src={imgSrc} 
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Details - كروت بتصميم Glassmorphism */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "التحدي", content: project.problem, icon: Target, color: "text-red-500", bg: "bg-red-500/5" },
            { title: "الحل الذكي", content: project.solution, icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-500/5" },
            { title: "النتائج", content: project.impact, icon: Zap, color: "text-green-500", bg: "bg-green-500/5" }
          ].map((item, i) => (
            <Card key={i} className="border-none bg-secondary/20 backdrop-blur-sm hover:bg-secondary/30 transition-colors rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className={cn("inline-flex p-3 rounded-2xl mb-6", item.bg)}>
                </div>
                <h3 className="text-xl font-black mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Features & Tech Stack - تنسيق بصري مريح */}
      <section className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-12 py-10">
        
        {/* Features - تأخذ مساحة أكبر */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black">ما الذي يميز هذا المشروع؟</h2>
            <div className="h-1 flex-1 bg-secondary rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle2 size={18} className="text-primary" />
                </div>
                <span className="font-bold text-sm text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar for Tech & Role */}
        <div className="lg:col-span-2 space-y-8">
           {/* Technologies */}
           <div className="p-8 rounded-[2.5rem] bg-secondary/10 border border-border/40">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-primary" />
                لغات البرمجة والأدوات
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-4 py-2 rounded-xl bg-background border border-border/50 text-xs font-bold shadow-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
           </div>

           {/* Role Card */}
           <div className="p-8 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group">
              <User size={120} className="absolute -bottom-10 -left-10 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-lg font-black mb-4 relative z-10 flex items-center gap-2">
                <User size={20} />
                دوري في العمل
              </h3>
              <p className="text-primary-foreground/90 font-bold leading-relaxed relative z-10">
                {project.role}
              </p>
           </div>
        </div>
      </section>

      {/* 5. Next Project CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
         <div className="p-12 rounded-[3rem] bg-secondary/30 border border-border/50 backdrop-blur-sm">
            <h2 className="text-3xl font-black mb-4">هل أعجبك هذا العمل؟</h2>
            <p className="text-muted-foreground mb-8 text-lg font-medium">
              أنا متاح دائماً لمناقشة مشاريع جديدة وتحويل الأفكار المعقدة إلى واقع رقمي بسيط.
            </p>
            <Link href="/#contact">
              <Button size="lg" className="rounded-full px-12 h-14 font-black text-lg gap-3">
                لنبدأ مشروعك الآن
                <ArrowRight size={20} className="rotate-180" />
              </Button>
            </Link>
         </div>
      </section>
    </main>
  );
}
