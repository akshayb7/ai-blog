"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
    const { theme, systemTheme } = useTheme();

    // Determine if we should use dark or light theme
    const currentTheme = theme === "system" ? systemTheme : theme;
    const giscusTheme = currentTheme === "dark" ? "dark" : "light";

    return (
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Discussion</h3>
            <Giscus
                id="comments"
                repo="akshayb7/ai-blog"
                repoId="R_kgDOQPLxKA"
                category="General"
                categoryId="DIC_kwDOQPLxKM4Czvs7"
                mapping="pathname"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={giscusTheme}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
