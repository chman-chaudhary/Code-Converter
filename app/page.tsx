"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  const [jsCode, setJsCode] = useState(
    '// Enter your JavaScript code here\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");'
  );
  const [pythonCode, setPythonCode] = useState("");

  const convertToPython = async () => {
    const prompt = `Convert the following JavaScript code into Python: 
    ${jsCode}`;
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      return console.log("Error: API Key is not defined.");
    }
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    setPythonCode(result.response.text());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        JavaScript to Python Converter
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">JavaScript Input</h2>
          <CodeEditor
            value={jsCode}
            language="js"
            placeholder="Enter your JavaScript code here"
            onChange={(evn) => setJsCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="min-h-[300px] border rounded"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Python Output</h2>
          <CodeEditor
            value={pythonCode}
            language="python"
            placeholder="Your converted Python code will appear here"
            readOnly={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="min-h-[300px] border rounded"
          />
        </div>
      </div>
      <Button onClick={convertToPython} className="mt-4">
        Convert to Python
      </Button>
    </div>
  );
}
