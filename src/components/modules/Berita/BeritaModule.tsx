import { useState } from "react";
import { Calendar, User, Eye, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import { useEffect } from "react";
import { API } from "../../../lib/api";
import { services } from "@/lib/services";
import { AxiosError } from "axios";
import { toast } from "sonner"
import { NewsPageProps } from "@/lib/types/News";


export default function BeritaModule() {
  const [newsData, setNewsData] = useState<NewsPageProps>({newsItems: [], hasNextPage: false});
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async () => {
    setIsLoading(true);
    const {url, method} = services.news.getNews(10, skip);
    await API({
      url,
      method
    }).then((res) => {
      // console.log(res)
      const {data: data} = res;
      setNewsData({...newsData, newsItems: data.data, hasNextPage: data.hasNextPage});
      setSkip(skip + 10);
    }).catch((err) => {
      console.log(err);
      if( err instanceof AxiosError ){
        toast.error(err.message)
      }
      toast.error("Gagal memuat berita");
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchNews();
  }, []); 

  const featuredNews = newsData.newsItems[0];
  const regularNews = newsData.newsItems.slice(1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Berita & Informasi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Informasi terkini tentang program, kegiatan, dan pencapaian Satgas
            PPKPT (Pencegahan & Penanganan Kekerasan) Universitas Siliwangi
          </p>
        </div>

        {
          isLoading && (
            <div className="text-center h-[50vh] flex flex-col items-center justify-center">
              <p className="text-gray-500 text-lg">Memuat berita...</p>
            </div>
          )
        }

        {
          (newsData.newsItems.length < 1 && !isLoading) && (
            <div className="text-center h-[50vh] flex flex-col items-center justify-center">
              <p className="text-gray-500 text-lg">Tidak ada berita untuk ditampilkan.</p>
            </div>
          )
        }

        {/* Featured News - Full Width */}
        {featuredNews && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-red-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={import.meta.env.VITE_API_URL + '/' + featuredNews.berita_image}
                    alt={featuredNews.berita_title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  {/* <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredNews.category}
                    </span>
                  </div> */}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Berita Utama
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                    {featuredNews.berita_title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredNews.author.name}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {featuredNews.views}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredNews.created_at)}
                      </div>
                    </div>
                  </div>
                  <NavLink to={`/berita/${featuredNews.excerpt}`}>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center group w-fit">
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular News Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={import.meta.env.VITE_API_URL + '/' + news.berita_image}
                  alt={news.berita_title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {news.category}
                  </span>
                </div> */}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {news.berita_title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {news.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span className="truncate">{news.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {news.views}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(news.created_at)}
                  </div>
                  <NavLink to={`/berita/${news.excerpt}`}>
                  <button className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center group">
                    Baca
                    <ArrowRight className="ml-1 h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  </NavLink>  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {
          newsData.hasNextPage && (
             <div className="text-center mt-12">
                <button className="bg-white hover:bg-red-50 text-red-600 border-2 border-red-500 px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg" onClick={fetchNews}>
                  Muat Berita Lainnya
                </button>
              </div>
          )
        }
       
      </div>
    </div>
  );
}
