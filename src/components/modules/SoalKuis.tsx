import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import { services } from "@/lib/services"; 
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { JawabanKuis } from "@/lib/types/Kuis";
import { Button } from "@/components/ui/button";

export default function SoalKuis(){
    const params = useParams();
    const kuisId = params.kuisId;

    const [kuis, setKuis] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [totalQuiz, setTotalQuiz] = useState(0);

    const selectQuizAnswer = (questionIndex: number, answerId: string) => {
        setSelectedAnswer(answerId);
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answerId,
        }));
    }

    const fetchKuis = async () => {
        setIsLoading(true);
        const { url, method } = services.kuis.getQuestions(kuisId!, currentQuiz + 1);
        API({
            url,
            method,
        }).then((res) => {
            const { data, total_soal } = res.data;
            setTotalQuiz(total_soal);
            setKuis(data); 
            setSelectedAnswer(null); // Reset selection when fetching new question
        }).catch((err) => {
            if(err instanceof AxiosError){
                toast.error(err.response?.data.message || "Gagal memuat soal kuis.");
            }
            console.error(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchKuis();
    },[currentQuiz]);

    const handlePrev = () => {
        // Handle submit logic here
        if(currentQuiz < 1) return;
        setCurrentQuiz(prev => prev - 1);
    };

    const handleNext = () => {
        if(totalQuiz == currentQuiz + 1) return;
        setCurrentQuiz(prev => prev + 1);
    }

    const isAnswered = userAnswers[kuis?.[currentQuiz]?.nomor_kuis];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-8 px-4">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Memuat soal...</p>
                    </div>
                </div>
            ) : kuis ? (
                <div className="max-w-lg mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
                        {/* Quiz Title */}
                        <div className="mb-8 break-all gap-y-3 flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {kuis?.[currentQuiz]?.kuis_title || "Reprehenderit In Voluptate Velit Esse Cillum Dolore"}
                            </h2>
                            <p className="text-lg">{kuis?.[currentQuiz]?.kuis_content}</p>
                        </div>
                        
                        {/* Answer Options */}
                        <div className="space-y-3 mb-8">
                            {kuis?.[currentQuiz]?.jawaban_kuis?.map((jawaban: JawabanKuis, index: number) => {
                                const isSelected = userAnswers[kuis?.[currentQuiz]?.nomor_kuis] === String(jawaban.id);
                                return (
                                    <label 
                                        key={index}
                                        className={`
                                            flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200
                                            ${isSelected 
                                                ? 'bg-primary/10 border-2 border-primary shadow-md' 
                                                : 'bg-white border-2 border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center w-full">
                                            <div className={`
                                                flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-semibold mr-4
                                                ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
                                            `}>
                                                {jawaban.pilihan_jawaban}
                                            </div>
                                            <span className={`flex-1 ${isSelected ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>
                                                {jawaban.deskripsi_jawaban}
                                            </span>
                                            {isSelected && (
                                                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                            )}
                                        </div>
                                        <input
                                            type="radio"
                                            name="jawaban"
                                            value={jawaban.id}
                                            checked={isSelected}
                                            onChange={(e) => selectQuizAnswer(kuis?.[currentQuiz]?.nomor_kuis, e.target.value)}
                                            className="sr-only"
                                            
                                        />
                                    </label>
                                );
                            })}
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-row justify-between">
                        <Button
                            onClick={handlePrev}
                            disabled={currentQuiz < 1}
                            className={`
                                w-xl py-4 px-6 rounded-xl font-semibold text-white transition-all ${currentQuiz < 1 ? 'bg-gray-300 cursor-not-allowed' : 'duration-200 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'} 
                            `}
                        >
                            Kembali
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={!isAnswered || totalQuiz == currentQuiz + 1}
                            className={`
                                w-xl py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200
                                ${isAnswered && totalQuiz != currentQuiz + 1
                                    ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                                    : 'bg-gray-300 cursor-not-allowed'
                                }
                            `}
                        >
                            Selanjutnya
                        </Button>
                        </div>

                        {/* Progress Indicator (Optional) */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Soal ke-{currentQuiz + 1}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center bg-white rounded-2xl shadow-xl p-8">
                        <p className="text-gray-600">Tidak ada soal tersedia</p>
                    </div>
                </div>
            )}
        </div>
    )
}