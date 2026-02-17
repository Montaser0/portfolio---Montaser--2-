import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
  User,
  Code2,
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
    return {
      title: "المشروع غير موجود",
    };
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

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/#projects">
            <Button variant="ghost" className="gap-2 hover:text-primary">
              <ArrowRight className="h-4 w-4" />
              <span>العودة للمشاريع</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={cn(
                "p-4 rounded-2xl",
                project.type === "web" && "bg-blue-500/10",
                project.type === "mobile" && "bg-green-500/10",
                project.type === "desktop" && "bg-purple-500/10",
                project.type === "ai" && "bg-amber-500/10"
              )}
            >
              <ProjectIcon
                className={cn(
                  "h-8 w-8",
                  project.type === "web" && "text-blue-400",
                  project.type === "mobile" && "text-green-400",
                  project.type === "desktop" && "text-purple-400",
                  project.type === "ai" && "text-amber-400"
                )}
              />
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-sm px-4 py-1",
                project.type === "web" &&
                  "bg-blue-500/10 text-blue-400 border-blue-500/20",
                project.type === "mobile" &&
                  "bg-green-500/10 text-green-400 border-green-500/20",
                project.type === "desktop" &&
                  "bg-purple-500/10 text-purple-400 border-purple-500/20",
                project.type === "ai" &&
                  "bg-amber-500/10 text-amber-400 border-amber-500/20"
              )}
            >
              {project.category}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.solution}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Problem Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Target className="h-5 w-5 text-red-400" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  المشكلة
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </CardContent>
          </Card>

          {/* Solution Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">الحل</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </CardContent>
          </Card>

          {/* Impact Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  الأثر
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.impact}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        {project.features && project.features.length > 0 && (
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  المميزات الرئيسية
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="p-1 rounded-full bg-primary/20 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Technologies & Role */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Technologies */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  التقنيات المستخدمة
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-secondary text-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Role */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  دوري في المشروع
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.role}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            هل لديك مشروع مشابه؟ دعنا نتحدث عن كيفية مساعدتك
          </p>
          <Link href="/#contact">
            <Button size="lg" className="gap-2">
              <span>تواصل معي</span>
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
