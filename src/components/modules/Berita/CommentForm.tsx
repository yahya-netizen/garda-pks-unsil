import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { API } from '@/lib/api';
import { services } from '@/lib/services';
import { Send, Loader2 } from 'lucide-react';
import { Comment } from '@/lib/types/Comment';
import { useAuth } from '@/context/AuthContext';

interface CommentFormData {
    content: string;
}

interface CommentFormProps {
    slug: string;
    onCommentAdded: (newComment: Comment) => void;
}

export default function CommentForm({ slug, onCommentAdded }: CommentFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormData>();
    const { user } = useAuth();

    const onSubmit = async (data: CommentFormData) => {
        setIsSubmitting(true);
        
        const { url, method } = services.comment.createComment();
        
        API({
            url,
            method,
            data: {
                comment_text: data.content,
                slug: slug
            }
        }).then((res) => {
            const {data: data} = res.data;
            toast.success('Komentar berhasil ditambahkan');
            // console.log(res);
            reset();
            // if (onCommentAdded) {
            onCommentAdded(data);
            // }
        }).catch((err) => {
            console.log(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message || 'Gagal menambahkan komentar');
            } else {
                toast.error('Terjadi kesalahan, silakan coba lagi');
            }
            console.error(err);
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    if(!user) return null;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tulis Komentar</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <textarea
                        {...register('content', {
                            required: 'Komentar tidak boleh kosong',
                            minLength: {
                                value: 3,
                                message: 'Komentar minimal 3 karakter'
                            },
                            maxLength: {
                                value: 500,
                                message: 'Komentar maksimal 500 karakter'
                            }
                        })}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 resize-none ${
                            errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-300'
                        }`}
                        placeholder="Tulis komentar Anda disini..."
                        disabled={isSubmitting}
                    />
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                        Harap berkomentar dengan sopan dan santun
                    </p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center px-6 py-2.5 rounded-lg font-medium text-white transition-all duration-200 ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4 mr-2" />
                                Kirim Komentar
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
