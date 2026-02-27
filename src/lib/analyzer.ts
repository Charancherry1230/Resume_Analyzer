export interface SkillCategory {
    name: string;
    found: string[];
    missing: string[];
}

export interface AnalysisResult {
    score: number;
    technical: SkillCategory;
    frameworks: SkillCategory;
    tools: SkillCategory;
    soft: SkillCategory;
    actionVerbs: string[];
    numbersDetected: boolean;
    suggestions: string[];
}

const db = {
    technical: ['javascript', 'typescript', 'python', 'java', 'c++', 'sql', 'php', 'ruby', 'go', 'rust', 'html', 'css', 'swift', 'kotlin'],
    frameworks: ['react', 'next.js', 'nextjs', 'node', 'node.js', 'express', 'django', 'spring', 'vue', 'angular', 'svelte', 'tailwind', 'bootstrap'],
    tools: ['git', 'docker', 'aws', 'mongodb', 'postgresql', 'firebase', 'kubernetes', 'linux', 'jenkins', 'github actions', 'figma', 'jira', 'webpack', 'vite'],
    soft: ['leadership', 'communication', 'teamwork', 'problem solving', 'agile', 'scrum', 'collaboration', 'management', 'mentoring', 'negotiation', 'critical thinking'],
    actionVerbs: ['built', 'developed', 'designed', 'implemented', 'optimized', 'improved', 'created', 'managed', 'led', 'architected', 'reduced', 'increased', 'resolved', 'spearheaded'],
};

export function analyzeResume(text: string): AnalysisResult {
    const processedText = text.toLowerCase().replace(/\s+/g, ' ').trim();

    // Helper to find skills
    const extractSkills = (database: string[]) => {
        const found: string[] = [];
        const missing: string[] = [];

        database.forEach(skill => {
            // Create a regex to match the skill as a whole word, or part of a common phrase
            // Escaping special characters for skills like 'c++' or 'next.js'
            const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');

            if (regex.test(processedText) || processedText.includes(skill)) {
                found.push(skill);
            } else {
                missing.push(skill);
            }
        });

        return { found: Array.from(new Set(found)), missing: Array.from(new Set(missing)) };
    };

    const technical = extractSkills(db.technical);
    const frameworks = extractSkills(db.frameworks);
    const tools = extractSkills(db.tools);
    const soft = extractSkills(db.soft);
    const actionVerbs = extractSkills(db.actionVerbs).found;

    const numbersDetected = /\b\d+\b/.test(processedText) || /\b\d+%\b/.test(processedText);

    // Scoring Logic
    let score = 0;
    score += technical.found.length * 5;
    score += frameworks.found.length * 4;
    score += tools.found.length * 3;
    score += soft.found.length * 2;

    if (numbersDetected) score += 10;
    if (actionVerbs.length >= 2) score += 10;

    // Penalties
    if (technical.found.length === 0) score -= 10;
    if (!numbersDetected) score -= 5;

    // Clamp Score
    score = Math.max(0, Math.min(100, score));

    // Dynamic Suggestions Logic
    const suggestions: string[] = [];

    if (!numbersDetected) {
        suggestions.push("Quantify your achievements. Use metrics (percentages, revenue, time saved) to prove impact.");
    }

    if (technical.found.length < 3) {
        suggestions.push("Clarify your technical stack. Mention specific languages you are proficient in.");
    }

    if (actionVerbs.length < 3) {
        suggestions.push("Use stronger action verbs (e.g., 'Spearheaded', 'Architected') to start bullet points.");
    }

    if (soft.found.length < 2) {
        suggestions.push("Add evidence of collaboration, leadership, or communication to show well-roundedness.");
    }

    if (score < 50) {
        suggestions.push("Major improvements needed: Focus on expanding keywords, adding detailed metrics, and highlighting specific technologies.");
    } else if (score < 75) {
        suggestions.push("Good foundation, but can be refined. Add more context to your projects and ensure all relevant tools are mentioned.");
    } else {
        suggestions.push("Strong resume! For further optimization, tailor specific keywords to the job description you are applying for.");
    }

    return {
        score,
        technical: { name: 'Technical', ...technical },
        frameworks: { name: 'Frameworks', ...frameworks },
        tools: { name: 'Tools', ...tools },
        soft: { name: 'Soft Skills', ...soft },
        actionVerbs,
        numbersDetected,
        suggestions
    };
}
