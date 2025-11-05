import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface SandboxGuideProps {
  onStartCoding: () => void;
}

const SandboxGuide = ({ onStartCoding }: SandboxGuideProps) => {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-2">
          🖍️ Your Coding Sandbox Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert space-y-6">
        <p className="text-lg">
          This is your coding sandbox! It's a special place in the webpage where you get to build and make things happen using code.
        </p>

        <div>
          <h2 className="text-2xl font-bold mb-3">📚 Understanding Tags: Open and Close</h2>
          <p>
            In coding, we use special markers called <strong>tags</strong> that tell the computer exactly what to do and where to do it. 
            Every main section needs an <strong>opening tag</strong> and a <strong>closing tag</strong>.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">1. The Body Tags (The Page's Content Area)</h3>
          <p>
            The <code>&lt;body&gt;</code> tags tell the computer where all the visible stuff on the webpage goes (the text, pictures, and buttons).
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Opening Tag:</strong> <code>&lt;body&gt;</code></li>
            <li><strong>Closing Tag:</strong> <code>&lt;/body&gt;</code> (Notice the slash /)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">2. The Script Tags (Your Code Doorway)</h3>
          <p>
            You will put your code inside these tags to tell the computer: "Everything here is a set of instructions!"
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Opening Tag:</strong> <code>&lt;script&gt;</code> (Think: "Start running code now!")</li>
            <li><strong>Closing Tag:</strong> <code>&lt;/script&gt;</code> (Think: "Stop running code here!")</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">✏️ Your Copying Task Checklist</h2>
          <p>
            Your job is to put the new code exactly inside the script tags, and then make sure the whole script is inside the body tags.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">1. Find the Spot</h3>
          <p>You must type or paste your code inside the <code>&lt;body&gt;</code> between the opening and closing script tags:</p>
          <pre className="bg-muted p-4 rounded-lg border border-border overflow-x-auto">
{`<body> 
  <script>
    Your Code Goes Here
  </script>
</body>`}
          </pre>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">2. Copy the Code</h3>
          <p>You have two choices to get the code into the sandbox:</p>
          <ul className="space-y-3">
            <li>
              <strong>⚡️ Quick Way (Copy/Paste):</strong> Select the code from the instructions, and then paste it right where it says <em>Your Code Goes Here</em>.
            </li>
            <li>
              <strong>✍️ Careful Way (Type It):</strong> Type the code yourself!
              <div className="ml-6 mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                <p className="font-semibold text-yellow-900 dark:text-yellow-200">⚠️ Super Important!</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  Type it EXACTLY! The computer is a smart but very strict listener! If you miss one detail, your code won't work! 
                  Pay close attention to:
                </p>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1 text-yellow-800 dark:text-yellow-300">
                  <li>Uppercase and Lowercase (Is it a big 'A' or a little 'a'?)</li>
                  <li>All the symbols (Did you remember the <code>;</code> or the <code>"</code>?)</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Using the Code Assist Bot
          </h2>
          <p>
            Need help while coding? Look for the <strong>Code Assist Bot</strong> button with a sparkles icon (✨) at the top-right of the code editor!
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Click the <strong>Code Assist Bot</strong> button to open your AI helper</li>
            <li>Ask questions about your code in simple language</li>
            <li>The bot understands HTML, CSS, and JavaScript</li>
            <li>It's designed to help coders aged 8-18 learn step by step</li>
            <li>Try asking things like "Why isn't my code working?" or "How do I change the color?"</li>
          </ul>
        </div>

        <div className="flex justify-center pt-6">
          <Button size="lg" onClick={onStartCoding} className="text-lg px-8">
            Start Coding Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SandboxGuide;
