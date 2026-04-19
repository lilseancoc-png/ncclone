// Ambient types for the Puter.js browser SDK loaded via <script src="https://js.puter.com/v2/">.
// Only the surface we use is typed; everything else is left as `unknown`.
// See https://docs.puter.com/AI/chat/

export {};

export interface PuterChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface PuterChatOptions {
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface PuterChatChunk {
  text?: string;
}

export interface PuterChatResponse {
  message?: { content?: string };
  text?: string;
  toString?: () => string;
}

export interface PuterAi {
  chat(
    messages: PuterChatMessage[],
    options: PuterChatOptions & { stream: true }
  ): Promise<AsyncIterable<PuterChatChunk>>;
  chat(
    messages: PuterChatMessage[],
    options?: PuterChatOptions
  ): Promise<PuterChatResponse>;
}

export interface PuterSdk {
  ai: PuterAi;
}

declare global {
  interface Window {
    puter?: PuterSdk;
  }
}
