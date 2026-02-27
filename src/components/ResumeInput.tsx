"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, UploadCloud, FileText, AlertCircle } from "lucide-react";
import { parseDocument } from "@/lib/fileParser";

interface ResumeInputProps {
    onAnalyze: (text: string) => void;
    isAnalyzing: boolean;
}

export default function ResumeInput({ onAnalyze, isAnalyzing }: ResumeInputProps) {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [parseError, setParseError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const characterCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const isButtonDisabled = text.trim().length === 0 || isAnalyzing || isParsing;

    const handleAnalyzeClick = () => {
        if (!isButtonDisabled) {
            onAnalyze(text);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsParsing(true);
        setParseError("");

        try {
            const extractedText = await parseDocument(file);
            setText(extractedText);
        } catch (err: any) {
            setParseError(err.message || "Failed to parse document. Please try pasting text instead.");
        } finally {
            setIsParsing(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset to allow re-upload
            }
        }
    };

    return (
        <section id="analyzer-section" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        Input Your Resume
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Upload a PDF/DOCX or paste your plain text resume. Our AI engine runs completely locally.
                    </p>
                </div>

                {/* Upload Section */}
                <div className="mb-6 flex flex-col items-center justify-center">
                    <input
                        type="file"
                        accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isParsing || isAnalyzing}
                        className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-700 bg-[#0F1523]/50 w-full p-8 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isParsing ? (
                            <Loader2 className="h-8 w-8 text-indigo-400 animate-spin mb-3" />
                        ) : (
                            <UploadCloud className="h-8 w-8 text-indigo-400 group-hover:-translate-y-1 transition-transform duration-300 mb-3" />
                        )}
                        <span className="text-sm font-medium text-gray-300">
                            {isParsing ? "Extracting Text..." : "Click to upload a PDF or DOCX file"}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">Or drag and drop your file here</span>
                    </button>

                    {parseError && (
                        <div className="mt-3 flex items-center text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg w-full">
                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                            {parseError}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-px bg-gray-800 flex-1"></div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">OR PASTE TEXT</span>
                    <div className="h-px bg-gray-800 flex-1"></div>
                </div>

                {/* Text Area Section */}
                <div
                    className={`relative rounded-2xl border bg-[#0F1523] p-1 transition-all duration-300 ${isFocused
                        ? "border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                        : "border-gray-800"
                        }`}
                >
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Paste your resume text here... (e.g., Senior Full Stack Engineer. 5+ years experience building scalable React and Node.js applications...)"
                        className="h-96 w-full resize-none bg-transparent p-4 text-gray-200 placeholder-gray-500 focus:outline-none"
                        spellCheck="false"
                    />
                    <div className="absolute bottom-4 left-6 flex space-x-4 text-xs text-gray-400">
                        <span>{characterCount} chars</span>
                        <span>{wordCount} words</span>
                    </div>
                    {text.length > 0 && (
                        <button
                            onClick={() => setText("")}
                            className="absolute bottom-4 right-6 text-xs text-gray-500 hover:text-white transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={isButtonDisabled}
                        className={`group relative flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 ${isButtonDisabled
                            ? "cursor-not-allowed bg-gray-800 text-gray-500"
                            : "bg-indigo-600 hover:scale-105 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                            }`}
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Analyzing your resume...
                            </>
                        ) : (
                            <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                Generate AI Analysis
                            </div>
                        )}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
