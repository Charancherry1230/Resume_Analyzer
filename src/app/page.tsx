"use client";

import { useState } from "react";
import Head from "next/head";
import Hero from "@/components/Hero";
import ResumeInput from "@/components/ResumeInput";
import ResultsDashboard from "@/components/ResultsDashboard";
import { analyzeResume, AnalysisResult } from "@/lib/analyzer";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (text: string) => {
    setIsAnalyzing(true);
    setResult(null); // Clear previous results

    // Simulate AI thinking time for premium feel
    setTimeout(() => {
      const analysis = analyzeResume(text);
      setResult(analysis);
      setIsAnalyzing(false);

      // Scroll to results after a short delay to allow render
      setTimeout(() => {
        document.getElementById("results-dashboard")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] selection:bg-indigo-500/30">
      <Head>
        <title>ResumeIQ | Premium AI Resume Analyzer</title>
        <meta name="description" content="A client-side resume analyzing engine" />
      </Head>

      <Hero />

      <ResumeInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {result && (
        <div id="results-dashboard">
          <ResultsDashboard result={result} />
        </div>
      )}
    </main>
  );
}
