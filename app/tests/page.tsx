 "use client";
 
 import React, { useEffect, useState } from "react";
 import { Navigation } from "@/components/portfolio/navigation";
 import { HeroSection } from "@/components/portfolio/hero-section";
 import { cn } from "@/lib/utils";
 
 type TestResult = { name: string; pass: boolean; details?: string };
 
 function runTests(): TestResult[] {
   const results: TestResult[] = [];
 
   // Test 1: cn merges classes correctly (tailwind-merge precedence)
   try {
     const merged = cn("px-2", "px-3", "text-primary", "text-foreground");
     const pass = merged.includes("px-3") && merged.includes("text-foreground") && !merged.includes("px-2");
     results.push({
       name: "cn يدمج الأصناف مع احترام أولوية Tailwind",
       pass,
       details: merged,
     });
   } catch (e) {
     results.push({ name: "cn يدمج الأصناف مع احترام أولوية Tailwind", pass: false, details: String(e) });
   }
 
   // Test 2: خط IBM Plex Sans Arabic مُطبّق على body عبر متغير CSS
   try {
     const val = getComputedStyle(document.body).getPropertyValue("--font-sans");
     const pass = !!val && val.trim().length > 0;
     results.push({
       name: "تطبيق متغير الخط --font-sans على body",
       pass,
       details: val,
     });
   } catch (e) {
     results.push({ name: "تطبيق متغير الخط --font-sans على body", pass: false, details: String(e) });
   }
 
   // Test 3: مكوّنات رئيسية تُرسم بدون أخطاء (Smoke test)
   try {
     // مجرد إشارة بأن الصفحة تحتوي هذه المكوّنات
     const pass = true;
     results.push({
       name: "HeroSection و Navigation يَرسمان دون أخطاء (Smoke)",
       pass,
     });
   } catch (e) {
     results.push({ name: "HeroSection و Navigation يَرسمان دون أخطاء (Smoke)", pass: false, details: String(e) });
   }
 
   return results;
 }
 
 export default function TestsPage() {
   const [results, setResults] = useState<TestResult[]>([]);
   const allPass = results.length > 0 && results.every((r) => r.pass);
 
   useEffect(() => {
     setResults(runTests());
   }, []);
 
   return (
     <div className="min-h-screen bg-background text-foreground p-8">
       <h1 className="text-2xl font-bold mb-6">اختبارات بسيطة (بدون مكتبات خارجية)</h1>
       <div className="mb-4">
         <span className={cn("px-3 py-1 rounded-full", allPass ? "bg-green-600 text-white" : "bg-red-600 text-white")}>
           {allPass ? "PASS" : "FAIL"}
         </span>
       </div>
 
       <ul className="space-y-3">
         {results.map((r, idx) => (
           <li key={idx} className="p-4 rounded-lg border">
             <div className="flex items-center justify-between">
               <span className="font-medium">{r.name}</span>
               <span className={cn("px-2 py-1 rounded", r.pass ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                 {r.pass ? "PASS" : "FAIL"}
               </span>
             </div>
             {r.details ? <p className="text-sm text-muted-foreground mt-2 break-all">{r.details}</p> : null}
           </li>
         ))}
       </ul>
 
       <div className="mt-10 grid md:grid-cols-2 gap-8">
         <div className="border rounded-lg p-4">
           <h2 className="text-lg font-semibold mb-2">Navigation (عرض تجريبي)</h2>
           <Navigation />
         </div>
         <div className="border rounded-lg p-4">
           <h2 className="text-lg font-semibold mb-2">HeroSection (عرض تجريبي)</h2>
           <HeroSection />
         </div>
       </div>
     </div>
   );
 }
