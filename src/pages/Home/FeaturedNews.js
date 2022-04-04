import CustomLink from "../../components/CustomLink";
import { useNews } from "../../services/news";

const NewsGridSkeleton = () => {
  return [...Array(5).keys()].map((i) => (
    <div
      key={i}
      className={`flex skeleton bg-slate-200 col-span-6 group relative flex-col gap-2 rounded-xl overflow-hidden  ${
        i < 2 ? "md:col-span-3 h-[362px]" : "md:col-span-2"
      }`}
    >
      <div className={`w-full ${i < 2 ? "h-[360px]" : " h-[252px]"}`} />
      <div className="h-full w-full absolute">
        <div className="absolute bottom-0 flex flex-col w-full gap-4 p-6">
          <div
            className={`${i < 2 ? "h-7" : "h-6"} bg-slate-300 rounded`}
          ></div>
          <div className="flex flex-col gap-2">
            <div
              className={`${i < 2 ? "h-5" : "h-4"} w-40 bg-slate-300 rounded`}
            ></div>
            <div
              className={`${i < 2 ? "h-5" : "h-4"} w-32 bg-slate-300 rounded`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  ));
};

const FeaturedNews = () => {
  const newsQuery = useNews();
  const featuredNews = newsQuery.data?.slice(0, 5);

  return (
    <div className="grid-cols-6 grid gap-2 w-full">
      {newsQuery.isLoading ? (
        <NewsGridSkeleton />
      ) : (
        featuredNews.map((news, i) => (
          <div
            href={news.link}
            key={news.link}
            className={`flex col-span-6 group relative flex-col gap-2 rounded-xl overflow-hidden border ${
              i > 1 ? "md:col-span-2" : "md:col-span-3"
            }`}
          >
            <img
              src={news.thumbnail}
              alt={news.title}
              className={`w-full object-cover group-hover:scale-105 transition ${
                i > 1 ? "h-[250px]" : "h-[360px]"
              }`}
            />
            <div
              className="h-full w-full absolute text-white"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 70%)",
              }}
            >
              <div className="absolute bottom-0 w-full gap-4 p-6">
                <h2
                  className={`font-bold mb-4 ${
                    i > 1 ? "text-lg leading-snug" : "text-2xl"
                  }`}
                >
                  <CustomLink href={news.link}>{news.title}</CustomLink>
                </h2>
                <time
                  className="text-sm mb-3 inline-block"
                  dateTime={news.pubDate}
                >
                  {new Date(news.pubDate).toLocaleString("id", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
                <img
                  alt={news.publisher.name}
                  src={news.publisher.image}
                  className="max-h-5 rounded px-2 py-1 object-contain bg-white"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FeaturedNews;
