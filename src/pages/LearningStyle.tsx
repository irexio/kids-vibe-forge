import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Eye, Ear, Hand, Sparkles } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "When learning something new, I prefer to:",
    options: [
      { value: "visual", label: "Watch videos or look at pictures and diagrams", icon: Eye },
      { value: "auditory", label: "Listen to someone explain it or discuss it", icon: Ear },
      { value: "kinesthetic", label: "Try it myself and learn by doing", icon: Hand },
    ],
  },
  {
    id: 2,
    question: "I remember things best when:",
    options: [
      { value: "visual", label: "I see them written down or in images", icon: Eye },
      { value: "auditory", label: "I hear them explained or talk about them", icon: Ear },
      { value: "kinesthetic", label: "I practice and repeat the actions", icon: Hand },
    ],
  },
  {
    id: 3,
    question: "During free time, I enjoy:",
    options: [
      { value: "visual", label: "Drawing, watching movies, or playing video games", icon: Eye },
      { value: "auditory", label: "Listening to music, podcasts, or chatting with friends", icon: Ear },
      { value: "kinesthetic", label: "Sports, building things, or hands-on activities", icon: Hand },
    ],
  },
  {
    id: 4,
    question: "When studying, I find it helpful to:",
    options: [
      { value: "visual", label: "Use colorful notes, highlighters, and charts", icon: Eye },
      { value: "auditory", label: "Read out loud or listen to recordings", icon: Ear },
      { value: "kinesthetic", label: "Take breaks to move around and use flashcards", icon: Hand },
    ],
  },
  {
    id: 5,
    question: "I understand directions better when:",
    options: [
      { value: "visual", label: "I can see a map or written instructions", icon: Eye },
      { value: "auditory", label: "Someone tells me where to go", icon: Ear },
      { value: "kinesthetic", label: "I walk through it myself first", icon: Hand },
    ],
  },
];

const learningStyles = {
  visual: {
    title: "Visual Learner 👀",
    icon: Eye,
    description: "You learn best by seeing! You love pictures, diagrams, videos, and colorful notes.",
    tips: [
      "Use mind maps and flowcharts when coding",
      "Watch video tutorials and coding demonstrations",
      "Use colorful syntax highlighting in your code editor",
      "Draw diagrams to plan your programs before coding",
      "Create visual notes with screenshots and examples",
    ],
    color: "text-blue-500",
  },
  auditory: {
    title: "Auditory Learner 👂",
    icon: Ear,
    description: "You learn best by hearing! You enjoy discussions, explanations, and talking through ideas.",
    tips: [
      "Explain your code out loud to yourself or others",
      "Join coding discussion groups and forums",
      "Listen to coding podcasts and audio tutorials",
      "Read your code aloud to find errors",
      "Discuss coding concepts with friends or mentors",
    ],
    color: "text-green-500",
  },
  kinesthetic: {
    title: "Kinesthetic Learner ✋",
    icon: Hand,
    description: "You learn best by doing! You love hands-on practice and building real projects.",
    tips: [
      "Type out code examples instead of just reading them",
      "Build lots of small practice projects",
      "Take breaks to move around while coding",
      "Use interactive coding platforms and challenges",
      "Experiment and try different approaches hands-on",
    ],
    color: "text-purple-500",
  },
};

const LearningStyle = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
    const counts = { visual: 0, auditory: 0, kinesthetic: 0 };
    Object.values(finalAnswers).forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });

    const maxCount = Math.max(counts.visual, counts.auditory, counts.kinesthetic);
    const topStyle = Object.entries(counts).find(([_, count]) => count === maxCount)?.[0];
    setResult(topStyle || "visual");
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setSelectedAnswer("");
  };

  if (result) {
    const style = learningStyles[result as keyof typeof learningStyles];
    const StyleIcon = style.icon;

    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <StyleIcon className={`w-20 h-20 ${style.color}`} />
                </div>
                <CardTitle className="text-4xl mb-4">{style.title}</CardTitle>
                <CardDescription className="text-lg">
                  {style.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Coding Tips for You:
                    </h3>
                    <ul className="space-y-3">
                      {style.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Remember:</strong> Most people are a mix of learning styles! These tips are
                      just suggestions to help you learn coding in ways that work best for you. Try different
                      approaches and discover what helps you the most.
                    </p>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button onClick={resetQuiz} size="lg" className="gap-2">
                      Take Quiz Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">What's Your Learning Style?</h1>
            <p className="text-xl text-muted-foreground">
              Answer these questions to discover how you learn best!
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className="space-y-4">
                  {question.options.map((option) => {
                    const OptionIcon = option.icon;
                    return (
                      <div
                        key={option.value}
                        className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAnswer === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={`q${question.id}-${option.value}`} />
                        <Label
                          htmlFor={`q${question.id}-${option.value}`}
                          className="flex items-start gap-3 cursor-pointer flex-1"
                        >
                          <OptionIcon className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                          <span className="text-base">{option.label}</span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button onClick={handleAnswer} disabled={!selectedAnswer}>
                  {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningStyle;
