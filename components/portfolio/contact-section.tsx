"use client";

import React from "react"

import { useState } from "react";
import { Mail, MessageSquare, Send, Linkedin, Github, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactMethods = [
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: "hello@developer.com",
    href: "mailto:hello@developer.com",
  },
  {
    icon: Linkedin,
    title: "لينكد إن",
    value: "linkedin.com/in/developer",
    href: "#",
  },
  {
    icon: Github,
    title: "جيت هب",
    value: "github.com/developer",
    href: "#",
  },
  {
    icon: Twitter,
    title: "تويتر",
    value: "@developer",
    href: "#",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            لنبدأ العمل معاً
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            هل لديك فكرة مشروع أو تحتاج إلى خبرة تقنية؟ أنا هنا لمساعدتك في
            تحويلها إلى واقع
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">


          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  طرق التواصل
                </h3>
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <a
                      key={method.title}
                      href={method.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                        <method.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {method.title}
                        </p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  هل تبحث عن شريك تقني؟
                </h3>
                <p className="text-muted-foreground mb-6">
                  سواء كنت شركة ناشئة تحتاج لبناء منتجك الأول، أو مؤسسة تريد دمج
                  الذكاء الاصطناعي في عملياتها، أنا هنا للمساعدة.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    استشارات تقنية مجانية للمشاريع الجديدة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    تسعير مرن حسب حجم المشروع
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    دعم فني مستمر بعد التسليم
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
