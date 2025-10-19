import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

interface CodeEditorProps {
  starterCode: string;
  onRun?: (code: string) => void;
}

const CodeEditor = ({ starterCode, onRun }: CodeEditorProps) => {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setCode(starterCode);
  }, [starterCode]);

  const runCode = () => {
    try {
      // Create a sandboxed iframe
      const iframe = document.getElementById('code-output') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(code);
        iframe.contentWindow.document.close();
      }
      setOutput("");
      onRun?.(code);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const resetCode = () => {
    setCode(starterCode);
    const iframe = document.getElementById('code-output') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(starterCode);
      iframe.contentWindow.document.close();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
      {/* Code Editor */}
      <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-card">
        <div className="bg-muted px-4 py-2 flex items-center justify-between border-b border-border">
          <span className="text-sm font-semibold">Code Editor</span>
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
          className="flex-1 p-4 font-mono text-sm bg-background resize-none focus:outline-none"
          spellCheck={false}
        />
        {output && (
          <div className="bg-destructive/10 text-destructive px-4 py-2 text-sm border-t border-border">
            {output}
          </div>
        )}
      </div>

      {/* Output Preview */}
      <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-card">
        <div className="bg-muted px-4 py-2 border-b border-border">
          <span className="text-sm font-semibold">Live Preview</span>
        </div>
        <iframe
          id="code-output"
          className="flex-1 bg-white"
          sandbox="allow-scripts"
          title="Code Output"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
