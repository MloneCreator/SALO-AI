export async function chatWithSalo(messages: { role: 'user' | 'assistant', content: string }[]) {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });
  
  if (!response.ok) throw new Error("Erro na resposta do servidor");
  const data = await response.json();
  return data.text;
}

export async function extractCVData(chatHistory: string): Promise<any> {
  const response = await fetch("/api/ai/extract-cv", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatHistory })
  });

  if (!response.ok) throw new Error("Erro ao extrair dados");
  return await response.json();
}

export async function generateCoverLetter(data: any): Promise<string> {
  const response = await fetch("/api/ai/generate-cover-letter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  if (!response.ok) throw new Error("Erro ao gerar carta");
  const result = await response.json();
  return result.text || "";
}
