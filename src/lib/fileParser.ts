export async function extractTextFromPDF(file: File): Promise<string> {
    try {
        const pdfjsLib = await import('pdfjs-dist');

        // Set the worker source to a public CDN with the correct module extension (.mjs for v4+)
        if (typeof window !== "undefined") {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(" ");
            fullText += pageText + "\n";
        }

        return fullText;
    } catch (error) {
        console.error("Error reading PDF:", error);
        throw new Error("Failed to parse PDF document.");
    }
}

export async function extractTextFromWord(file: File): Promise<string> {
    try {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value || "";
    } catch (error) {
        console.error("Error reading DOCX:", error);
        throw new Error("Failed to parse DOCX document.");
    }
}

export async function parseDocument(file: File): Promise<string> {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
        return extractTextFromPDF(file);
    } else if (
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileName.endsWith(".docx")
    ) {
        return extractTextFromWord(file);
    } else if (fileName.endsWith(".doc")) {
        throw new Error("Legacy .doc files are not supported. Please convert to .docx or .pdf.");
    } else if (fileType === "text/plain" || fileName.endsWith(".txt")) {
        return await file.text();
    } else {
        throw new Error("Unsupported file format. Please upload a PDF, DOCX, or TXT file.");
    }
}
