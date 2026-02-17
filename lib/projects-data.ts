import {
  Bot,
  Globe,
  MessageSquare,
  Shield,
  Smartphone,
  ShoppingBag,
  School,
  Database,
  Calendar,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectType = "all" | "web" | "mobile" | "desktop" | "ai";

export interface Project {
  id: string;
  title: string;
  category: string;
  type: ProjectType;
  icon: LucideIcon;
  image?: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  role: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "poultry-eggs-store",
    title: "متجر إلكتروني لشركة مداجن بيض",
    category: "تجارة إلكترونية",
    type: "web",
    icon: ShoppingBag,
    problem:
      "الحاجة إلى منصة بيع إلكترونية لمنتجات البيض تُخدم العملاء وتدير الطلبات بكفاءة",
    solution:
      "متجر إلكتروني متكامل مبني بواجهة Next.js وخلفية Laravel مع قاعدة بيانات MySQL وواجهة MUI",
    impact: "زيادة المبيعات وتنظيم العمليات وتوفير تجربة سلسة للمستخدمين",
    technologies: ["Laravel", "Next.js", "MySQL", "MUI"],
    role: "مطور Full-Stack - تصميم الواجهة والباك إند",
    features: [
      "إدارة المنتجات والأصناف",
      "سلة مشتريات وواجهة دفع",
      "لوحة إدارة للطلبات والمخزون",
      "بحث وفلاتر متقدمة",
      "حسابات العملاء وتاريخ الطلبات",
    ],
  },
  {
    id: "coach-dashboard",
    title: "داشبورد تحكم لتطبيق المدرب",
    category: "تطبيقات ويب",
    type: "web",
    icon: Globe,
    problem:
      "الحاجة لنظام إدارة مركزي للتحكم في تطبيق تعليمي مع صلاحيات متعددة",
    solution:
      "لوحة تحكم متكاملة بثلاث مستويات صلاحيات: أدمن رئيسي، أدمن فرعي، ومعلم - مع إدارة كاملة للمحتوى والمستخدمين",
    impact: "تسهيل إدارة التطبيق وتوزيع المهام بين الفريق بكفاءة عالية",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    role: "مطور Full-Stack - تصميم وتنفيذ كامل النظام",
    features: [
      "نظام صلاحيات متعدد المستويات (أدمن، أدمن فرعي، معلم)",
      "إدارة المحتوى التعليمي والدورات",
      "متابعة تقدم الطلاب والتقارير",
      "إدارة المستخدمين والاشتراكات",
      "لوحة إحصائيات شاملة",
    ],
  },
  {
    id: "coach-app",
    title: "تطبيق المدرب - موبايل",
    category: "تطبيقات موبايل",
    type: "mobile",
    icon: Smartphone,
    problem: "الحاجة لتطبيق تعليمي متكامل يوفر تجربة تعلم سلسة للطلاب",
    solution:
      "تطبيق موبايل تفاعلي يتيح للطلاب الوصول للمحتوى التعليمي والتفاعل مع المعلمين",
    impact: "تحسين تجربة التعلم وزيادة تفاعل الطلاب مع المحتوى",
    technologies: ["Flutter", "Dart", "REST APIs", "State Management"],
    role: "مطور Flutter - تطوير التطبيق بالكامل",
    features: [
      "واجهة مستخدم سلسة وتفاعلية",
      "عرض المحتوى التعليمي بأشكال متعددة",
      "نظام إشعارات للتحديثات الجديدة",
      "متابعة التقدم والإنجازات",
      "تواصل مباشر مع المعلمين",
    ],
  },
  {
    id: "ai-chatbot",
    title: "بوت محادثة ذكي",
    category: "ذكاء اصطناعي",
    type: "ai",
    icon: Bot,
    problem: "الحاجة لأتمتة الردود والتفاعل مع العملاء على مدار الساعة",
    solution:
      "شاتبوت ذكي مبني على n8n وOpenAI قادر على فهم الاستفسارات والرد عليها بذكاء",
    impact: "خفض وقت الاستجابة وتحسين تجربة العملاء",
    technologies: ["n8n", "OpenAI", "Webhooks", "REST APIs"],
    role: "مهندس ذكاء اصطناعي - تصميم وبناء الشاتبوت",
    features: [
      "فهم اللغة الطبيعية والرد بذكاء",
      "تكامل مع منصات التواصل المختلفة",
      "إمكانية التدريب على بيانات مخصصة",
      "تحويل للدعم البشري عند الحاجة",
      "تقارير وتحليلات للمحادثات",
    ],
  },
  {
    id: "encryption-system",
    title: "نظام تشفير الملفات والرسائل",
    category: "تطبيق سطح مكتب",
    type: "desktop",
    icon: Shield,
    problem: "الحاجة لحماية البيانات الحساسة والرسائل من الوصول غير المصرح",
    solution:
      "تطبيق سطح مكتب متقدم يدعم تشفير النصوص والملفات وفك تشفيرهم باستخدام خوارزمية AES",
    impact: "تأمين البيانات والاتصالات بمستوى عالٍ من الحماية",
    technologies: ["ASP.NET", "C#", "AES Encryption", "Windows Forms"],
    role: "مطور أمني - تصميم وتنفيذ نظام التشفير",
    features: [
      "تشفير النصوص والرسائل بخوارزمية AES",
      "تشفير وفك تشفير الملفات",
      "واجهة مستخدم بسيطة وسهلة",
      "دعم أنواع ملفات متعددة",
      "حماية بكلمة مرور",
    ],
  },
  {
    id: "poultry-management",
    title: "نظام إدارة ومحاسبة مداجن بيض",
    category: "أنظمة إدارة",
    type: "web",
    icon: Database,
    problem: "صعوبة تتبع الإنتاج والمبيعات والمحاسبة في مداجن البيض",
    solution: "نظام متكامل لإدارة المخزون والإنتاج والمحاسبة مع تقارير شاملة",
    impact: "تحسين الكفاءة التشغيلية ودقة البيانات المالية",
    technologies: ["Next.js", "Supabase", "TypeScript", "Recharts"],
    role: "مطور Full-Stack - تطوير النظام بالكامل",
    features: [
      "تتبع الإنتاج اليومي والمخزون",
      "إدارة المبيعات والفواتير",
      "نظام محاسبة متكامل",
      "تقارير وإحصائيات مفصلة",
      "إدارة الموردين والعملاء",
    ],
  },
  {
    id: "school-management",
    title: "نظام إدارة مدارس",
    category: "أنظمة إدارة",
    type: "web",
    icon: School,
    problem: "الحاجة لنظام شامل لإدارة شؤون المدرسة والطلاب والمعلمين",
    solution:
      "منصة متكاملة لإدارة الطلاب والمعلمين والفصول والدرجات والحضور",
    impact: "تسهيل العمليات الإدارية وتحسين التواصل",
    technologies: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    role: "مطور Full-Stack - تصميم وتنفيذ النظام",
    features: [
      "إدارة بيانات الطلاب والمعلمين",
      "نظام الدرجات والتقييمات",
      "متابعة الحضور والغياب",
      "جدولة الحصص والامتحانات",
      "تواصل مع أولياء الأمور",
    ],
  },
  {
    id: "digital-store",
    title: "متجر إلكتروني للمنتجات الرقمية",
    category: "تجارة إلكترونية",
    type: "web",
    icon: ShoppingBag,
    problem: "الحاجة لمنصة بيع منتجات رقمية مع نظام دفع وتسليم آلي",
    solution:
      "متجر إلكتروني متكامل مع سلة مشتريات ونظام دفع وتحميل تلقائي للمنتجات",
    impact: "تسهيل عمليات البيع وزيادة المبيعات",
    technologies: ["React.js", "Laravel", "MySQL", "Payment Gateway"],
    role: "مطور Full-Stack - تطوير الواجهة والباك إند",
    features: [
      "عرض المنتجات الرقمية بشكل جذاب",
      "سلة مشتريات ونظام دفع آمن",
      "تحميل تلقائي بعد الشراء",
      "إدارة المنتجات والطلبات",
      "نظام خصومات وكوبونات",
    ],
  },
  {
    id: "inventory-dashboard",
    title: "لوحة تحكم لإدارة المخزون والمبيعات",
    category: "أنظمة إدارة",
    type: "web",
    icon: Package,
    problem: "صعوبة تتبع المخزون والمبيعات واتخاذ قرارات مبنية على البيانات",
    solution: "داشبورد تفاعلي لمتابعة المخزون والمبيعات مع تحليلات وتقارير",
    impact: "تحسين إدارة المخزون وزيادة الربحية",
    technologies: ["React.js", "Node.js", "Charts", "REST APIs"],
    role: "مطور واجهات أمامية - تصميم وتنفيذ الداشبورد",
    features: [
      "لوحة إحصائيات تفاعلية",
      "تتبع المخزون في الوقت الحقيقي",
      "تنبيهات نفاد المخزون",
      "تقارير المبيعات والأرباح",
      "إدارة الموردين والمشتريات",
    ],
  },
  {
    id: "health-booking",
    title: "تطبيق حجز مواعيد لمراكز صحية",
    category: "تطبيقات موبايل",
    type: "mobile",
    icon: Calendar,
    problem: "صعوبة إدارة مواعيد المرضى وتنظيم جدول الأطباء",
    solution: "تطبيق موبايل يتيح للمرضى حجز المواعيد ومتابعتها بسهولة",
    impact: "تحسين تجربة المرضى وتنظيم عمل المركز الصحي",
    technologies: ["Flutter", "Dart", "REST APIs", "Push Notifications"],
    role: "مطور Flutter - تطوير التطبيق بالكامل",
    features: [
      "حجز المواعيد بسهولة",
      "عرض الأطباء المتاحين",
      "إشعارات تذكير بالمواعيد",
      "سجل المواعيد السابقة",
      "تقييم الخدمة والأطباء",
    ],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByType(type: ProjectType): Project[] {
  if (type === "all") return projects;
  return projects.filter((p) => p.type === type);
}
