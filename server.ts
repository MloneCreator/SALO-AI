import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import puppeteerCore from "puppeteer-core";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { v4 as uuidv4 } from "uuid";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from "fs";

// Load chromium only when in Vercel environment
let chromium: any = null;
if (process.env.VERCEL) {
  try {
    chromium = await import("@sparticuz/chromium").then(m => m.default);
  } catch (e) {
    console.error("Failed to load @sparticuz/chromium", e);
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // In-memory storage for photos (base64)
  const photoStorage = new Map<string, string>();

  // GitHub Models Setup
  const token = process.env.GITHUB_TOKEN || "";
  const client = ModelClient("https://models.inference.ai.azure.com", new AzureKeyCredential(token));
  const modelName = "gpt-4o-mini";

  const SYSTEM_PROMPT = `És o SALO AI, assistente especializado em criar CVs profissionais para o mercado angolano e lusófono.

Guia o utilizador com UMA pergunta de cada vez, nesta ordem:
1. Nome completo
2. Cargo/área profissional
3. Email, telefone e morada
4. Formação académica (instituição, curso, datas)
5. Experiências profissionais (empresa, cargo, período, realizações com números sempre que possível)
6. Habilidades e competências
7. Idiomas e nível
8. Cursos complementares e certificações (opcional)
9. Para a carta: empresa-alvo, cargo pretendido, motivação principal

Quando tiveres todos os dados diz: "Tudo pronto! Vou gerar o teu CV agora."
Tom: profissional, acolhedor, encorajador. Responde sempre em português de Angola.`;

  // API Routes
  app.post("/api/upload-photo", (req, res) => {
    const { photo } = req.body;
    if (!photo) return res.status(400).json({ error: "No photo provided" });
    const id = uuidv4();
    photoStorage.set(id, photo);
    res.json({ id });
  });

  app.get("/api/photo/:id", (req, res) => {
    const photo = photoStorage.get(req.params.id);
    if (!photo) return res.status(404).send("Not found");
    
    const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
    const img = Buffer.from(base64Data, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  });

  // AI Helper: Dynamic Client & Fallback Model
  const callAI = async (messages: any[], preferredModel = "gpt-4o-mini") => {
    const currentToken = process.env.GITHUB_TOKEN || "";
    
    if (!currentToken) {
      console.error("Vercel Error: GITHUB_TOKEN is not defined in environment variables!");
    } else {
      console.log("Vercel: GITHUB_TOKEN is present (length: " + currentToken.length + ")");
    }

    const currentClient = ModelClient("https://models.inference.ai.azure.com", new AzureKeyCredential(currentToken));
    
    const fallbackModels = ["gpt-4o", "phi-3-mini-128k-instruct"];
    const modelsToTry = [preferredModel, ...fallbackModels.filter(m => m !== preferredModel)];
    const uniqueModels = [...new Set(modelsToTry)];
    
    let lastError = null;
    for (const model of uniqueModels) {
      try {
        console.log(`Vercel: Requesting AI model ${model}...`);
        const response = await currentClient.path("/chat/completions").post({
          body: {
            messages,
            model,
            temperature: 0.7,
            max_tokens: 2048
          }
        });

        if (response.status === "200") {
          console.log(`Vercel: Success from model ${model}`);
          return (response.body as any).choices[0].message.content;
        }
        
        console.warn(`Vercel: Model ${model} failed with status: ${response.status}`);
        lastError = new Error(`AI error (${model}): ${response.status}`);
      } catch (err) {
        console.error(`Vercel: Error calling ${model}:`, err);
        lastError = err;
      }
    }
    throw lastError || new Error("All AI models failed");
  };

  // AI Routes
  app.post("/api/ai/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages) return res.status(400).json({ error: "No messages provided" });

    try {
      const content = await callAI([
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content
        }))
      ], "gpt-4o-mini");

      res.json({ text: content });
    } catch (error) {
      console.error("AI Chat major error:", error);
      res.status(500).json({ error: "O SALO AI está temporariamente indisponível. Por favor, verifica o teu GITHUB_TOKEN." });
    }
  });

  app.post("/api/ai/extract-cv", async (req, res) => {
    const { chatHistory } = req.body;
    if (!chatHistory) return res.status(400).json({ error: "No chat history provided" });

    try {
      const prompt = `Com base no seguinte histórico de conversa, extrai os dados do CV no formato JSON estruturado.
      Histórico:
      ${chatHistory}
      
      O JSON deve seguir esta estrutura EXATA, sem texto adicional:
      {
        "personalInfo": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "address": "" },
        "summary": "Um resumo profissional impactante baseado na experiência",
        "education": [{ "institution": "", "course": "", "period": "" }],
        "experience": [{ "company": "", "role": "", "period": "", "description": "" }],
        "skills": [],
        "languages": [],
        "certifications": [],
        "coverLetterInfo": { "targetCompany": "", "targetRole": "", "motivation": "" }
      }`;

      // Re-read .env
      const { config } = await import("dotenv");
      config();
      const currentToken = process.env.GITHUB_TOKEN || "";
      const currentClient = ModelClient("https://models.inference.ai.azure.com", new AzureKeyCredential(currentToken));

      const response = await currentClient.path("/chat/completions").post({
        body: {
          messages: [{ role: "user", content: prompt }],
          model: "gpt-4o-mini", // Use mini for extraction as it's more stable
          response_format: { type: "json_object" }
        }
      });

      if (response.status !== "200") throw new Error(`AI extraction error: ${response.status}`);
      const content = (response.body as any).choices[0].message.content;
      let parsed;
      try {
        parsed = JSON.parse(content || "{}");
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        parsed = {};
      }
      res.json(parsed);
    } catch (error) {
      console.error("CV Extraction error:", error);
      res.status(500).json({ error: "Erro ao extrair dados do CV" });
    }
  });

  app.post("/api/ai/generate-cover-letter", async (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "No data provided" });

    try {
      const prompt = `Escreve uma carta de apresentação profissional e persuasiva em português de Angola.
      Dados do Candidato: ${JSON.stringify(data.personalInfo)}
      Experiência: ${JSON.stringify(data.experience)}
      Empresa Alvo: ${data.coverLetterInfo.targetCompany}
      Cargo Alvo: ${data.coverLetterInfo.targetRole}
      Motivação: ${data.coverLetterInfo.motivation}
      
      A carta deve ser formal, destacar as competências do candidato e mostrar entusiasmo pela oportunidade.`;

      const content = await callAI([{ role: "user", content: prompt }], "gpt-4o-mini");
      res.json({ text: content });
    } catch (error) {
      console.error("Cover Letter error:", error);
      res.status(500).json({ error: "Erro ao gerar carta de apresentação" });
    }
  });

  app.post("/api/generate-pdf", async (req, res) => {
    const { html } = req.body;
    if (!html) return res.status(400).json({ error: "No HTML provided" });

    let browser;
    try {
      console.log("Starting PDF generation...");
      
      // In Vercel, paths might be different. Let's try multiple options.
      let cssPath = path.join(process.cwd(), 'src', 'index.css');
      if (!fs.existsSync(cssPath)) {
        cssPath = path.join(process.cwd(), 'index.css'); // fallback
      }
      
      let tailwindCSS = "";
      try {
        if (fs.existsSync(cssPath)) {
          tailwindCSS = fs.readFileSync(cssPath, 'utf-8');
        }
      } catch (e) {
        console.warn("Could not read CSS file:", e);
      }
      
      const fontStyles = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; font-family: inherit !important; }
          body { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif !important; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', Georgia, serif !important; }
          p, span, div, li, td, th { font-family: inherit !important; }
          .font-serif { font-family: 'Playfair Display', Georgia, serif !important; }
          .font-sans { font-family: 'Inter', 'Segoe UI', system-ui, sans-serif !important; }
          /* Force override inline styles */
          [style*="font-family: serif"], [style*="font-family:serif"] { font-family: 'Playfair Display', Georgia, serif !important; }
          [style*="font-family: sans"], [style*="font-family:sans"] { font-family: 'Inter', sans-serif !important; }
          div[style*="serif"] { font-family: 'Playfair Display', Georgia, serif !important; }
          div[style*="sans"] { font-family: 'Inter', sans-serif !important; }
        </style>
      `;
      
      let fullHtml = html.replace(
        '</head>',
        `${fontStyles}<style>${tailwindCSS}</style></head>`
      );
      
      if (process.env.VERCEL && chromium) {
        browser = await puppeteerCore.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
      } else {
        const puppeteer = await import("puppeteer").then(m => m.default);
        browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--font-render-hinting=none',
            '--disable-web-security'
          ],
          headless: true
        });
      }
      
      const page = await browser.newPage();
      
      await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
      
      await page.setContent(fullHtml, { 
        waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
        timeout: 45000 
      });

      await page.waitForFunction(() => {
        return document.fonts.ready.then(() => document.fonts.status === 'loaded');
      }, { timeout: 10000 }).catch(() => {
        console.log('Fonts ready check timed out, continuing...');
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        scale: 1,
      });

      console.log("High-fidelity PDF generated, size:", pdf.length);
      console.log("PDF generated successfully, size:", pdf.length);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
      res.send(pdf);
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).send(`Erro ao gerar PDF: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      if (browser) await browser.close();
    }
  });

  app.post("/api/generate-docx", async (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "No data provided" });

    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: data.personalInfo?.fullName || "Nome Completo",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: data.personalInfo?.jobTitle || "Cargo",
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `${data.personalInfo?.email || ""} | ${data.personalInfo?.phone || ""} | ${data.personalInfo?.address || ""}`,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({ text: "", spacing: { before: 200 } }),
              new Paragraph({
                text: "PERFIL PROFISSIONAL",
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: data.summary || "",
              }),
              new Paragraph({ text: "", spacing: { before: 200 } }),
              new Paragraph({
                text: "EXPERIÊNCIA PROFISSIONAL",
                heading: HeadingLevel.HEADING_3,
              }),
              ...(data.experience || []).flatMap((exp: any) => [
                new Paragraph({
                  children: [
                    new TextRun({ text: exp.role || "", bold: true }),
                    new TextRun({ text: ` em ${exp.company || ""} (${exp.period || ""})`, italics: true }),
                  ],
                }),
                new Paragraph({ text: exp.description || "" }),
              ]),
              new Paragraph({ text: "", spacing: { before: 200 } }),
              new Paragraph({
                text: "FORMAÇÃO ACADÊMICA",
                heading: HeadingLevel.HEADING_3,
              }),
              ...(data.education || []).map((edu: any) => 
                new Paragraph({
                  text: `${edu.course || ""} - ${edu.institution || ""} (${edu.period || ""})`,
                })
              ),
              new Paragraph({ text: "", spacing: { before: 200 } }),
              new Paragraph({
                text: "HABILIDADES",
                heading: HeadingLevel.HEADING_3,
              }),
              new Paragraph({
                text: (data.skills || []).join(", "),
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", `attachment; filename=cv.docx`);
      res.send(buffer);
    } catch (error) {
      console.error("DOCX generation error:", error);
      res.status(500).send(`Erro ao gerar DOCX: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

// Only listen if this file is run directly
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  startServer().then(app => {
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}
