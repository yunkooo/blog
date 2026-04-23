"use client";

import mermaid from "mermaid";
import { useEffect, useId, useState } from "react";
import { useTheme } from "@/components/theme-provider";

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const { isDarkMode, isMounted } = useTheme();
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    let isActive = true;
    const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeVariables: getThemeVariables(isDarkMode),
    });

    async function renderDiagram() {
      try {
        const { svg: renderedSvg } = await mermaid.render(diagramId, chart);

        if (isActive) {
          setSvg(renderedSvg);
          setErrorMessage("");
        }
      } catch (error) {
        if (isActive) {
          setSvg("");
          setErrorMessage(error instanceof Error ? error.message : "Mermaid diagram render failed.");
        }
      }
    }

    renderDiagram();

    return () => {
      isActive = false;
    };
  }, [chart, isDarkMode, isMounted, reactId]);

  if (!isMounted) {
    return <div className="my-6 min-h-56 rounded-[1.35rem] border border-border bg-surface" />;
  }

  if (errorMessage) {
    return (
      <pre className="my-6 overflow-x-auto rounded-[1.35rem] border border-[color:var(--code-border)] bg-[var(--code-bg)] p-4 text-sm text-[var(--code-muted)]">
        {chart}
      </pre>
    );
  }

  return (
    <figure className="not-prose my-6 overflow-x-auto rounded-[1.35rem] border border-border bg-surface p-4">
      <div
        className="min-w-[520px] [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}

function getThemeVariables(isDarkMode: boolean) {
  if (isDarkMode) {
    return {
      background: "transparent",
      primaryColor: "#262626",
      primaryTextColor: "#f4f4f5",
      primaryBorderColor: "#525252",
      lineColor: "#a1a1aa",
      secondaryColor: "#1f2937",
      tertiaryColor: "#18181b",
      clusterBkg: "#18181b",
      clusterBorder: "#3f3f46",
      edgeLabelBackground: "#18181b",
      fontFamily:
        "Apple SD Gothic Neo, Noto Sans KR, Pretendard Variable, Pretendard, Malgun Gothic, system-ui, sans-serif",
    };
  }

  return {
    background: "transparent",
    primaryColor: "#f3f3f5",
    primaryTextColor: "#242426",
    primaryBorderColor: "#d8d8de",
    lineColor: "#717182",
    secondaryColor: "#ffffff",
    tertiaryColor: "#f7f7f8",
    clusterBkg: "#ffffff",
    clusterBorder: "#d8d8de",
    edgeLabelBackground: "#ffffff",
    fontFamily:
      "Apple SD Gothic Neo, Noto Sans KR, Pretendard Variable, Pretendard, Malgun Gothic, system-ui, sans-serif",
  };
}
