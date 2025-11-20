import { Comment } from "@/lib/types/Comment";
import { MessageCircle, User, Clock } from "lucide-react";
interface IProps {
    comments: Comment[];
}

export default function CommentList({comments}: IProps){
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            return `${diffInMinutes} menit yang lalu`;
        } else if (diffInHours < 24) {
            return `${diffInHours} jam yang lalu`;
        } else if (diffInDays < 7) {
            return `${diffInDays} hari yang lalu`;
        } else {
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    if (!comments || comments.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-red-100">
                <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Komentar</h3>
                    <p className="text-gray-500">Jadilah yang pertama memberikan komentar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex items-center mb-6">
                <MessageCircle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">
                    Komentar ({comments.length})
                </h3>
            </div>

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        {/* Comment Header */}
                        <div className="flex items-start space-x-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                                    {comment.mahasiswa?.nama_lengkap?.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
                                </div>
                            </div>

                            {/* Comment Content */}
                            <div className="flex-1 min-w-0">
                                {/* User Info */}
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">
                                            {comment?.mahasiswa?.nama_lengkap || comment?.user?.name}
                                        </h4>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatDate(comment.created_at)}
                                        </div>
                                    </div>
                                </div>

                                {/* Comment Text */}
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {comment.comment_text}
                                </p>

                                {/* Comment Actions */}
                                {/* <div className="flex items-center space-x-4 mt-3">
                                    <button className="text-xs text-gray-500 hover:text-red-600 transition-colors font-medium">
                                        Balas
                                    </button>
                                    {comment.replies && comment.replies.length > 0 && (
                                        <span className="text-xs text-gray-400">
                                            {comment.replies.length} balasan
                                        </span>
                                    )}
                                </div> */}

                                {/* Nested Replies */}
                                {/* {comment.replies && comment.replies.length > 0 && (
                                    <div className="mt-4 ml-8 space-y-4 border-l-2 border-gray-200 pl-4">
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} className="flex items-start space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                                                        {reply.user?.name?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h5 className="text-xs font-semibold text-gray-900">
                                                            {reply.user?.name || 'Anonymous'}
                                                        </h5>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500">
                                                            {formatDate(reply.created_at)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 text-xs leading-relaxed">
                                                        {reply.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}