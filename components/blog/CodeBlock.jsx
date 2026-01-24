"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

export default function CodeBlock({ children, className, ...props }) {
    const [copied, setCopied] = useState(false);

    // Extract language from various sources (rehype-pretty-code often uses data-language)
    // 1. Check direct prop (passed from mdx-components)
    // 2. Check className
    // 3. Check data-language attribute
    const language =
        // @ts-ignore
        (props && props["data-language"]) ||
        (/language-(\w+)/.exec(className || "")?.[1]) ||
        "text";

    // Extract text content from children
    const getCodeText = (node) => {
        if (typeof node === "string") return node;
        if (Array.isArray(node)) return node.map(getCodeText).join("");
        if (node?.props?.children) return getCodeText(node.props.children);
        return "";
    };

    const codeText = getCodeText(children);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(codeText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className="my-6 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{language}</span>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="h-7 w-7 p-0 flex items-center justify-center rounded hover:bg-slate-700 text-slate-400 transition-colors"
                >
                    {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                        <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="sr-only">Copy code</span>
                </button>
            </div>
            <div className="p-0 overflow-x-auto text-sm bg-slate-900">
                <pre className={`${className} !m-0 !p-4 !bg-slate-900`}>
                    {children}
                </pre>
            </div>
        </div>
    );
}
