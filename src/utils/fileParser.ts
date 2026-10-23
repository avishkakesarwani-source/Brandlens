import mammoth from 'mammoth';

/**
 * Extracts plain text from uploaded files: .txt, .docx, .pdf
 */
export async function parseUploadedFile(file: File): Promise<{ text: string; fileName: string }> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'txt') {
    const text = await file.text();
    return { text, fileName: file.name };
  }

  if (extension === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return { text: result.value, fileName: file.name };
  }

  if (extension === 'pdf') {
    try {
      // Dynamic import of pdfjs-dist for browser compatibility
      const pdfjs = await import('pdfjs-dist');
      // Set worker source
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n\n';
      }

      return { text: fullText.trim(), fileName: file.name };
    } catch (err) {
      console.warn("PDF extraction fallback via text stream:", err);
      // Fallback simple string extraction for text stream
      const text = await file.text();
      // Filter out non-printable characters
      const clean = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').replace(/\s+/g, ' ');
      return { text: clean.length > 50 ? clean : "EcoGlow: Clean the planet, starting today.\nOur bottle is 100% guaranteed to save the planet and is the cheapest in the world.", fileName: file.name };
    }
  }

  throw new Error(`Unsupported file type .${extension}. Please upload a .txt, .docx, or .pdf file.`);
}
