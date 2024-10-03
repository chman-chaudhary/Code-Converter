"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState("javascript");
  const [outputLanguage, setOutputLanguage] = useState("python");
  const [inputCode, setInputCode] = useState(
    '// Enter your JavaScript code here\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("World");'
  );
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convertToPython = async () => {
    setIsLoading(true);
    const prompt = `Convert the following ${inputLanguage} code into ${outputLanguage}: 
  ${inputCode}`;
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      return console.log("Error: API Key is not defined.");
    }
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    setOutputCode(result.response.text());
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Code Converter: Transform Your Code
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-gray-700">Input</span>
            <Select
              defaultValue="javascript"
              onValueChange={(value) => setInputLanguage(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select input language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
                <SelectItem value="c#">C#</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CodeEditor
            value={inputCode}
            language="js"
            placeholder="Enter your code here"
            onChange={(evn) => setInputCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 14,
              backgroundColor: "#000000",
              color: "#ffffff",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              borderRadius: "0.375rem",
            }}
            className="min-h-[400px] border border-gray-300 rounded-md"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-gray-700">Output</span>
            <Select
              defaultValue="python"
              onValueChange={(value) => setOutputLanguage(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select output language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CodeEditor
            value={outputCode}
            language={outputLanguage}
            placeholder={`Your converted ${outputLanguage} code will appear here`}
            readOnly={true}
            padding={15}
            style={{
              fontSize: 14,
              backgroundColor: "#000000",
              color: "#ffffff",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              borderRadius: "0.375rem",
            }}
            className="min-h-[400px] border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <Button
        onClick={convertToPython}
        disabled={isLoading}
        className="min-w-40 max-w-80 mx-auto hover:scale-110 hover:duration-500 mt-5"
      >
        {isLoading ? "Converting..." : "Convert Code"}
      </Button>
      <footer className="mt-8 text-center text-gray-600">
        <p>Developed with ❤️ by Chaman Chaudhary</p>
        <div className="mt-2">
          <Button variant="link">
            <a
              href="https://github.com/chman-chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 mr-4"
            >
              GitHub
            </a>
          </Button>
          <Button variant="link">
            <a
              href="https://linkedin.com/in/chman-chaudhary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 mr-4"
            >
              LinkedIn
            </a>
          </Button>
          <Button variant="link">
            <a href="mailto:chaudharychaman1506@gmail.com">Email</a>
          </Button>
          <Button variant="link">
            <a href="https://github.com/chman-chaudhary/JavaScript-to-Python">
              GitHub Repository
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
