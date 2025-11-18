import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import { services } from "@/lib/services";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Search, ArrowLeft, Calendar, BookOpen, Award } from "lucide-react";
import { History } from "@/lib/types/History"

export default function ResultKuisModule() {
    const params = useParams();
    const navigate = useNavigate();
    const kuisId = params.kuisId;

    const [result, setResult] = useState<History[]>([]);
    const [filteredResult, setFilteredResult] = useState<History[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchResult = async () => {
        setIsLoading(true);
        const { url, method } = services.kuis.getResult(kuisId!);
        
        API({
            url,
            method,
        }).then((res) => {
            const { data } = res.data;
            console.log(data);
            setResult(data);
            setFilteredResult(data);
        }).catch((err) => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message || "Gagal memuat hasil kuis.");
            }
            console.error(err);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if (kuisId) {
            fetchResult();
        }
    }, [kuisId]);

    // Search functionality
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredResult(result);
        } else {
            const filtered = result.filter((item) => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    item.modul_kuis.modul_title.toLowerCase().includes(searchLower) ||
                    item.modul_kuis.modul_title.toLowerCase().includes(searchLower) ||
                    item.score.toString().includes(searchLower) ||
                    item.id.toString().includes(searchLower)
                );
            });
            setFilteredResult(filtered);
        }
    }, [searchTerm, result]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (isCompleted: number, score: number) => {
        if (isCompleted === 1) {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Selesai
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <XCircle className="h-3 w-3 mr-1" />
                    Belum Selesai
                </span>
            );
        }
    };

    const getScoreBadge = (score: number) => {
        if (score >= 80) {
            return 'bg-green-100 text-green-800 border-green-300';
        } else if (score >= 60) {
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        } else {
            return 'bg-red-100 text-red-800 border-red-300';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat riwayat kuis...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/edukasi')}
                        className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Riwayat Kuis Modul : {result?.[0]?.modul_kuis?.modul_title}</h1>
                    <p className="text-gray-600">Lihat semua aktivitas pengerjaan kuis Anda</p>
                </div>

                                {/* Summary Card */}
                {/* {filteredResult.length > 0 && (
                    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Kuis</p>
                                    <p className="text-3xl font-bold text-gray-800">{filteredResult.length}</p>
                                </div>
                                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Rata-rata Score</p>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {(filteredResult.reduce((acc, item) => acc + item.score, 0) / filteredResult.length).toFixed(0)}
                                    </p>
                                </div>
                                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Award className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Selesai</p>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {filteredResult.filter(item => item.isCompleted === 1).length}
                                    </p>
                                </div>
                                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* Search Bar */}
                {/* <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-red-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan modul, judul kuis, level, atau score..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                        />
                    </div>
                </div> */}

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-red-200 bg-red-500/95 ">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Modul
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Level
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredResult.length > 0 ? (
                                    filteredResult.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-start">
                                                    <BookOpen className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.modul_kuis.modul_title}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {item.modul_kuis.modul_description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Level {item.kuis_id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getScoreBadge(item.score)}`}>
                                                    <Award className="h-4 w-4 mr-1" />
                                                    {item.score}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(Number(item.isCompleted), item.score)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-start">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                                                    <div className="text-sm text-gray-900">
                                                        {formatDate(item.created_at)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <XCircle className="h-12 w-12 text-gray-400 mb-4" />
                                                <p className="text-gray-600 font-medium">
                                                    {searchTerm ? "Tidak ada hasil yang ditemukan" : "Belum ada riwayat kuis"}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {searchTerm ? "Coba kata kunci lain" : "Mulai mengerjakan kuis untuk melihat riwayat"}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}