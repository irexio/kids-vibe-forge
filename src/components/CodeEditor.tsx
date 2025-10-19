import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  starterCode: string;
  onRun?: (code: string) => void;
}

const CodeEditor = ({ starterCode, onRun }: CodeEditorProps) => {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setCode(starterCode);
    // Auto-run starter code on load
    runCodeSafe(starterCode);
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
    setCode(starterCode);
    runCodeSafe(starterCode);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Code Editor */}
      <div className="flex-1 flex flex-col border-b border-border">
        <div className="bg-muted px-4 py-2 flex items-center justify-between border-b border-border">
          <span className="text-sm font-semibold">Type Your Code</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetCode}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button size="sm" onClick={runCode}>
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-4 font-mono text-sm bg-background text-foreground resize-none focus:outline-none pointer-events-auto"
          spellCheck={false}
          autoFocus
          aria-label="Type your code here"
        />
        {output && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 text-sm border-t border-border">
            {output}
          </div>
        )}
      </div>

      {/* Output Preview */}
      <div className="flex-1 flex flex-col">
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
  );
};

export default CodeEditor;
