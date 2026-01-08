import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import "moment/locale/tr";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

Moment.locale("tr");

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  /* ================= BLOG DETAY ================= */
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= YORUMLAR ================= */
  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", {
        blogId: id,
      });

      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= YORUM EKLE ================= */
  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success("Yorumunuz alındı, onay sonrası yayınlanacaktır.");
        setName("");
        setContent("");
        fetchComments(); // yorumları tekrar çek
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />

      <Navbar />

      {/* ======= BLOG HEADER ======= */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          {Moment(data.createdAt).format("D MMMM YYYY")} tarihinde yayınlandı.
        </p>

        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>

        <h2 className="my-5 max-w-lg truncate mx-auto">
          {data.subTitle}
        </h2>

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Oğuzhan SANCAR
        </p>
      </div>

      {/* ======= BLOG CONTENT ======= */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* ======= YORUMLAR ======= */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">
            Yorumlar ({comments.length})
          </p>

          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} className="w-6" alt="" />
                  <p className="font-medium">{item.name}</p>
                </div>

                <p className="text-sm max-w-md ml-8">
                  {item.content}
                </p>

                <div className="absolute right-4 bottom-3 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======= YORUM EKLE ======= */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Yorumunuzu ekleyin</p>

          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />

            <textarea
              placeholder="Yorum Ekle"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
            />

            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Gönder
            </button>
          </form>
        </div>

        {/* ======= PAYLAŞ ======= */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Bu makaleyi sosyal medyada paylaşın
          </p>

          <div className="flex gap-3">
            <img src={assets.facebook_icon} width={40} alt="" />
            <img src={assets.twitter_icon} width={40} alt="" />
            <img src={assets.googleplus_icon} width={40} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
