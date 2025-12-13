"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <Card className="my-6 overflow-hidden border-white/10 dark:bg-slate-900/50 bg-slate-50/50">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 dark:bg-slate-800/50 border-b border-white/10">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{language}</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-white/10"
                    onClick={copyToClipboard}
                >
                    {copied ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                        <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <div className="p-0 overflow-x-auto text-sm">
                <pre className={`${className} !m-0 !p-4 !bg-transparent`}>
                    {children}
                </pre>
            </div>
        </Card>
    );
}
