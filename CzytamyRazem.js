import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sampleText = "Ala ma kota. Kot lubi mleko. Dzieci bawią się w parku.";

export default function CzytamRazemApp() {
      const [sentences] = useState(sampleText.split(". ").filter(Boolean));
        const [currentIndex, setCurrentIndex] = useState(0);
          const [status, setStatus] = useState("Kliknij 'Rozpocznij' i przeczytaj zdanie na głos.");
            const [transcript, setTranscript] = useState("");
              const [recording, setRecording] = useState(false);
                const [errorWords, setErrorWords] = useState([]);

                  const currentSentence = sentences[currentIndex];

                    const startRecording = async () => {
                            setRecording(true);
                                setStatus("Słucham...");

                                    try {
                                              const recognition = new window.webkitSpeechRecognition();
                                                    recognition.lang = "pl-PL";
                                                          recognition.continuous = false;
                                                                recognition.interimResults = false;

                                                                      recognition.onresult = (event) => {
                                                                                const result = event.results[0][0].transcript.trim();
                                                                                        setTranscript(result);

                                                                                                const { isCorrect, errors } = compareText(result, currentSentence);
                                                                                                        setErrorWords(errors);

                                                                                                                if (isCorrect) {
                                                                                                                              setStatus("Brawo! Świetnie przeczytane!");
                                                                                                                                        setTimeout(() => {
                                                                                                                                                        if (currentIndex + 1 < sentences.length) {
                                                                                                                                                                          setCurrentIndex(currentIndex + 1);
                                                                                                                                                                                        setStatus("Super! Teraz kolejne zdanie.");
                                                                                                                                                                                                      setTranscript("");
                                                                                                                                                                                                                    setErrorWords([]);
                                                                                                                                                        } else {
                                                                                                                                                                          setStatus("Udało się! Przeczytałeś cały tekst.");
                                                                                                                                                        }
                                                                                                                                        }, 1500);
                                                                                                                } else {
                                                                                                                              setStatus("Prawie dobrze. Spróbuj jeszcze raz.");
                                                                                                                }
                                                                                                                        setRecording(false);
                                                                      };

                                                                            recognition.onerror = () => {
                                                                                        setStatus("Wystąpił błąd podczas rozpoznawania mowy. Spróbuj ponownie.");
                                                                                                setRecording(false);
                                                                            };

                                                                                  recognition.start();
                                    } catch (error) {
                                              setStatus("Twoja przeglądarka nie obsługuje rozpoznawania mowy.");
                                                    setRecording(false);
                                    }
                    };

                      const compareText = (spoken, expected) => {
                            const normalize = (text) => text.toLowerCase().replace(/[.,!?]/g, "").split(" ");
                                const spokenWords = normalize(spoken);
                                    const expectedWords = normalize(expected);

                                        const errors = expectedWords.filter((word, i) => spokenWords[i] !== word);
                                            const isCorrect = errors.length === 0;
                                                return { isCorrect, errors };
                      };

                        const highlightSentence = (sentence, errors) => {
                                const words = sentence.split(" ");
                                    return words.map((word, index) => {
                                              const cleanWord = word.replace(/[.,!?]/g, "");
                                                    const hasError = errors.includes(cleanWord.toLowerCase());
                                                          return (
                                                                    <span
                                                                              key={index}
                                                                                        className={hasError ? "text-red-600 font-semibold" : ""}
                                                                                                >
                                                                                                          {word + " "}
                                                                                                                  </span>
                                                          );
                                    });
                        };

                          return (
                                <div className="p-4 max-w-xl mx-auto">
                                      <h1 className="text-2xl font-bold mb-4">Czytam Razem</h1>
                                            <Card className="mb-4">
                                                    <CardContent>
                                                              <p className="text-lg">
                                                                          {highlightSentence(currentSentence, errorWords)}
                                                                                    </p>
                                                                                            </CardContent>
                                                                                                  </Card>
                                                                                                        <p className="mb-2">{status}</p>
                                                                                                              <Button onClick={startRecording} disabled={recording}>
                                                                                                                      {recording ? "Nagrywanie..." : "Rozpocznij"}
                                                                                                                            </Button>
                                                                                                                                  {transcript && (
                                                                                                                                            <p className="mt-4 text-sm">Twoje zdanie: "{transcript}"</p>
                                                                                                                                  )}
                                                                                                                                      </div>
                          );
}

                                                                                                                                  )}
                          )
                                                          )
                                    })
                        }
                      }
                                    }
                                                                            }
                                                                                                                }
                                                                                                                                                        }
                                                                                                                                                        }
                                                                                                                                        })
                                                                                                                }
                                                                      }
                                    }
                    }
}
