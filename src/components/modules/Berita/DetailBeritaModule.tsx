import { data, useParams } from "react-router"
import { useEffect, useState } from "react";
import { Calendar, User, Eye, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { NavLink } from "react-router";
import { API } from "../../../lib/api";
import { services } from "@/lib/services";
import { toast } from "sonner";
import { AxiosError } from "axios";
import CommentList from "./CommentList";
import { NewsDetail } from "@/lib/types/News";
import CommentForm from "./CommentForm";
import { Comment } from "@/lib/types/Comment";



export default function DetailBeritaModule(){
    const params = useParams();
    const [berita, setBerita] = useState<NewsDetail>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setLoading] = useState(true);

        // Dummy API function
    const fetchNewsDetail = async (slug: string) => {
        setLoading(true);
        const {url, method} = services.news.getNewsBySlug(slug);

        await API({
            url,
            method
        }).then((res) => {
            // console.log(res);
            const {data: data} = res.data;
            setBerita(data);
            setComments(data.comments || []);
        }).catch((err: AxiosError) => {
            console.log(err);
            toast.error(err.message)
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchNewsDetail(params.slug);
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    const onCommentAdded = (newComment: Comment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat berita...</p>
                </div>
            </div>
        );
    }


    if (!berita) return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-600">Berita tidak ditemukan.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <NavLink 
                        to="/berita" 
                        className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Berita
                    </NavLink>
                </div>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="mb-8">
                        {/* <div className="mb-4">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {berita.category}
                            </span>
                        </div> */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                            {berita.berita_title}
                        </h1>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                {berita.author.name}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {formatDate(berita.created_at)}
                            </div>
                            <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                {berita.views} views
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {/* <div className="flex items-center gap-4 mb-8">
                            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border transition-colors">
                                <Share2 className="h-4 w-4" />
                                Bagikan
                            </button>
                            <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border transition-colors">
                                <Bookmark className="h-4 w-4" />
                                Simpan
                            </button>
                        </div> */}
                    </header>

                    {/* Featured Image */}
                    <div className="mb-8">
                        <img 
                            src={import.meta.env.VITE_API_URL + '/' + berita.berita_image} 
                            alt={berita.berita_title}
                            className="w-full h-96 object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Article Body */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 w-full">
                        <div 
                            className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:mb-2 break-all"
                            dangerouslySetInnerHTML={{ __html: berita.berita_content }}
                        />
                    </div>

                    <CommentList comments={comments} />


                    {/* Tags */}
                    {/* <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {berita.tags.map((tag, index) => (
                                <span 
                                    key={index}
                                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div> */}
                    <CommentForm slug={params.slug} onCommentAdded={onCommentAdded}/>
                </article>
            </div>
        </div>
    );
}