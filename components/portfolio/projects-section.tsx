"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Monitor,
  Smartphone,
  Cpu,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects, type ProjectType } from "@/lib/projects-data";

/* ================== FILTERS ================== */

const filters: { key: ProjectType; label: string; icon: typeof Monitor }[] = [
  { key: "all", label: "الكل", icon: Package },
  { key: "web", label: "ويب", icon: Monitor },
  { key: "mobile", label: "موبايل", icon: Smartphone },
  { key: "desktop", label: "سطح المكتب", icon: Monitor },
  { key: "ai", label: "ذكاء اصطناعي", icon: Cpu },
];

/* ================== SECTION ================== */

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("all");
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadMappings = async () => {
      try {
        const res = await fetch("/api/project-images", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as Record<string, string>;
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

  async function handleUpload(projectId: string, file: File | null) {
    if (!file) return;
    setUploading((p) => ({ ...p, [projectId]: true }));
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("projectId", projectId);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as { url?: string };
      if (data?.url) {
        setImageOverrides((prev) => ({ ...prev, [projectId]: data.url! }));
      }
      alert("تم رفع الصورة بنجاح");
    } catch {
      alert("فشل رفع الصورة");
    } finally {
      setUploading((p) => ({ ...p, [projectId]: false }));
    }
  }

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            المشاريع
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            بعض الأعمال التي نفذتها باستخدام تقنيات حديثة لحل مشاكل حقيقية
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const active = activeFilter === filter.key;

            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="border border-border hover:border-primary/40 transition-colors"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full">
                {/* Top */}
                <div>
                  {(() => {
                    const imgSrc = imageOverrides[project.id] ?? project.image;
                    return imgSrc ? (
                      <div className="relative mb-4 rounded-md overflow-hidden aspect-video">
                        <Image
                          src={imgSrc}
                          alt={project.title}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : null;
                  })()}
                  <div className="flex items-center justify-between mb-4">
                    <project.icon className="h-6 w-6 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  {!imageOverrides[project.id] && (
                    <div className="flex items-center gap-2">
                      <input
                        id={`file-${project.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleUpload(project.id, e.target.files?.[0] || null)
                        }
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={!!uploading[project.id]}
                        onClick={() =>
                          document.getElementById(`file-${project.id}`)?.click()
                        }
                      >
                        {uploading[project.id] ? "جاري الرفع..." : "رفع صورة"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link href={`/projects/${project.id}`} className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    عرض التفاصيل
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground mt-16">
            لا توجد مشاريع في هذه الفئة حالياً
          </p>
        )}
      </div>
    </section>
  );
}
