import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save, Trash2 } from "lucide-react";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer?: number;
  language?: string;
  hasFormulas?: boolean;
}

interface QuestionManagerProps {
  questions: Question[];
  onQuestionsUpdate: (questions: Question[]) => void;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions = [],
  onQuestionsUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingQuestions, setEditingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);

  const openDialog = () => {
    setEditingQuestions([...questions]);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setCurrentQuestion(null);
    setCurrentQuestionIndex(null);
  };

  const saveQuestions = () => {
    onQuestionsUpdate(editingQuestions);
    closeDialog();
  };

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };

    setEditingQuestions([...editingQuestions, newQuestion]);
    setCurrentQuestion(newQuestion);
    setCurrentQuestionIndex(editingQuestions.length);
  };

  const editQuestion = (index: number) => {
    setCurrentQuestion({ ...editingQuestions[index] });
    setCurrentQuestionIndex(index);
  };

  const updateCurrentQuestion = (field: string, value: string | number) => {
    if (!currentQuestion) return;

    setCurrentQuestion({
      ...currentQuestion,
      [field]: value,
    });
  };

  const updateOption = (index: number, value: string) => {
    if (!currentQuestion) return;

    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;

    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const saveCurrentQuestion = () => {
    if (currentQuestion && currentQuestionIndex !== null) {
      const newQuestions = [...editingQuestions];
      newQuestions[currentQuestionIndex] = currentQuestion;
      setEditingQuestions(newQuestions);
      setCurrentQuestion(null);
      setCurrentQuestionIndex(null);
    }
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = [...editingQuestions];
    newQuestions.splice(index, 1);
    setEditingQuestions(newQuestions);

    if (currentQuestionIndex === index) {
      setCurrentQuestion(null);
      setCurrentQuestionIndex(null);
    } else if (currentQuestionIndex !== null && currentQuestionIndex > index) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <Button onClick={openDialog} className="mb-4">
        <PlusCircle className="h-4 w-4 mr-2" /> Manage Test Questions
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Test Questions</DialogTitle>
            <DialogDescription>
              Add, edit, or remove questions for this test.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Question List */}
            <div className="md:col-span-1 border rounded-md p-4 h-[60vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">
                  Questions ({editingQuestions.length})
                </h3>
                <Button size="sm" onClick={addNewQuestion}>
                  <PlusCircle className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-2">
                {editingQuestions.map((q, index) => (
                  <div
                    key={q.id}
                    className={`p-2 border rounded cursor-pointer hover:bg-gray-50 flex justify-between items-center ${currentQuestionIndex === index ? "bg-blue-50 border-blue-300" : ""}`}
                    onClick={() => editQuestion(index)}
                  >
                    <div className="truncate flex-1">
                      <span className="font-medium mr-2">{index + 1}.</span>
                      {q.text || (
                        <span className="text-gray-400 italic">
                          Untitled Question
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteQuestion(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}

                {editingQuestions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No questions added yet. Click "Add" to create your first
                    question.
                  </div>
                )}
              </div>
            </div>

            {/* Question Editor */}
            <div className="md:col-span-2 border rounded-md p-4 h-[60vh] overflow-y-auto">
              {currentQuestion ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question-text">Question Text</Label>
                    <Textarea
                      id="question-text"
                      value={currentQuestion.text}
                      onChange={(e) =>
                        updateCurrentQuestion("text", e.target.value)
                      }
                      placeholder="Enter your question here..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          <input
                            type="radio"
                            id={`option-${index}`}
                            name="correctAnswer"
                            checked={currentQuestion.correctAnswer === index}
                            onChange={() =>
                              updateCurrentQuestion("correctAnswer", index)
                            }
                            className="h-4 w-4"
                          />
                        </div>
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-shrink-0 w-16"
                        >
                          Option {String.fromCharCode(65 + index)}:
                        </Label>
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-1">
                      Select the radio button next to the correct answer.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={saveCurrentQuestion}>
                      <Save className="h-4 w-4 mr-2" /> Save Question
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <p>Select a question to edit or add a new one.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={saveQuestions}>Save All Questions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionManager;
