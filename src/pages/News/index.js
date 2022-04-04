import { useNews } from "../../services/news";
import CustomLink from "../../components/CustomLink";

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

const FeaturedNews = ({ news, isLoading }) => {
  return (
    <div className="grid-cols-6 grid gap-2 w-full">
      {isLoading ? (
        <NewsGridSkeleton />
      ) : (
        news.map((news, i) => (
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
              <div className="absolute bottom-0 flex flex-col w-full gap-4 p-6">
                <h2
                  className={`font-bold ${
                    i > 1 ? "text-lg leading-snug" : "text-2xl"
                  }`}
                >
                  <CustomLink href={news.link}>{news.title}</CustomLink>
                </h2>
                <div className="flex flex-col gap-2">
                  <time className="text-sm" dateTime={news.pubDate}>
                    {new Date(news.pubDate).toLocaleString("id", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                  <img
                    alt={news.publisher.name}
                    src={news.publisher.image}
                    className="max-h-5 rounded h-full w-max px-2 py-1 object-contain bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const News = () => {
  const newsQuery = useNews();
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      {newsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FeaturedNews
            isLoading={newsQuery.isLoading}
            news={newsQuery.data.slice(0, 5)}
          />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {newsQuery.data.slice(5).map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="rounded-md group flex flex-col mb-4 h-full relative p-3 transition hover:bg-sky-50 hover:border-primary hover:border-2 border-2 border-transparent"
              >
                <div className="flex relative justify-center h-[176px] overflow-hidden rounded-md">
                  <img
                    loading="lazy"
                    src={post.thumbnail}
                    alt={post.title}
                    height="176"
                    width="284"
                    className=" group-hover:scale-105 transition-transform w-full object-cover"
                  />
                  <img
                    src={post.publisher.image}
                    alt={post.publisher.description}
                    className="absolute max-h-[15px] rounded-bl-md w-auto block py-1 bg-white px-2 top-0 right-0"
                  />
                </div>
                <div className=" flex flex-col gap-4 pt-3 flex-grow">
                  <h1 className="font-semibold ">{post.title}</h1>
                </div>
                <div className="flex justify-between">
                  <time dateTime={post.pubDate} className="text-sm ">
                    {new Date(post.pubDate).toLocaleString("id", {
                      timeStyle: "short",
                      dateStyle: "medium",
                    })}
                  </time>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default News;
