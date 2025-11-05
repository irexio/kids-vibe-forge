import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Sparkles } from "lucide-react";
import CodeHelper from "./CodeHelper";

interface CodeEditorProps {
  starterCode: string;
  onRun?: (code: string) => void;
}

const CodeEditor = ({ starterCode, onRun }: CodeEditorProps) => {
  const [code, setCode] = useState<string>(starterCode ?? "");
  const [output, setOutput] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [showHelper, setShowHelper] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const initial = starterCode ?? "";
    setCode(initial);
    // Auto-run starter code on load
    runCodeSafe(initial);
  }, [starterCode]);

  const runCodeSafe = (codeToRun: string) => {
    try {
      // Use srcdoc instead of contentWindow for security
      setIframeSrc(codeToRun);
      setOutput("");
      onRun?.(codeToRun);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const runCode = () => {
    runCodeSafe(code);
  };

  const resetCode = () => {
    const initial = starterCode ?? "";
    setCode(initial);
    runCodeSafe(initial);
  };

  return (
    <div className="h-full flex" style={{ pointerEvents: 'auto' }}>
      {/* Main Editor Area */}
      <div className={`flex-1 flex flex-col ${showHelper ? 'border-r border-border' : ''}`}>
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-b border-border relative z-10 overflow-hidden" style={{ pointerEvents: 'auto' }}>
          <div className="bg-muted px-4 py-2 flex flex-col gap-2 border-b border-border">
            <div className="flex gap-2 justify-end">
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => setShowHelper(!showHelper)}
              >
                <Sparkles className="w-4 h-4 mr-1" />
                {showHelper ? "Hide Bot" : "Code Assist Bot"}
              </Button>
              <Button size="sm" variant="outline" onClick={resetCode}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button size="sm" onClick={runCode}>
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
            </div>
            <span className="text-sm font-semibold">Type Your Code Below between &lt;script&gt; and &lt;/script&gt;</span>
          </div>
        <textarea
          value={code ?? ""}
          onChange={(e) => setCode(e.target.value)}
          onMouseDown={(e) => { e.stopPropagation(); }}
          onKeyDown={(e) => { e.stopPropagation(); }}
          className="flex-1 p-4 font-mono text-sm bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 relative z-10"
          spellCheck={false}
          autoFocus
          aria-label="Type your code here"
          style={{ pointerEvents: 'auto' }}
        />
        {output && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 text-sm border-t border-border">
            {output}
          </div>
        )}
      </div>

        {/* Output Preview */}
        <div className="flex-1 flex flex-col relative z-0">
          <div className="bg-muted px-4 py-2 border-b border-border">
            <span className="text-sm font-semibold">Your Creation</span>
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={iframeSrc}
            className="flex-1 bg-white"
            sandbox="allow-scripts"
            title="Code Output"
          />
        </div>
      </div>

      {/* AI Helper Sidebar */}
      {showHelper && (
        <div className="w-96 h-full">
          <CodeHelper onClose={() => setShowHelper(false)} />
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
