"use client";

import { motion } from "framer-motion";

export default function Hero() {
    const scrollToAnalyzer = () => {
        document.getElementById("analyzer-section")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative isolate pt-24 pb-16 sm:pt-32 lg:pb-24">
            {/* Background Glow */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#818CF8] to-[#22D3EE] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Precision Analysis for{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                                Premium Resumes
                            </span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Instantly evaluate your software engineering resume against industry standards.
                            Discover missing keywords, calculate your exact score, and get actionable insights
                            to land top-tier technical roles.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                                onClick={scrollToAnalyzer}
                                className="rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 ease-out"
                            >
                                Analyze My Resume
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
