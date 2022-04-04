import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBookmarkHadith } from "../../context/Bookmark";
import useDebounce from "../../hooks/useDebounce";
import { pick } from "../../lib/utility";
import { useHadithByNumber, useHadithsInfinite } from "../../services/hadits";
import ButtonIconBookmark from "../Surah/ButtonIconBookmark";

const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current, enabled]);
};

const HaditsSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="skeleton w-full border-b p-4 flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-2">
          <div className="h-8 bg-slate-200 w-16"></div>
          <div className="h-8 bg-slate-200"></div>
          <div className="h-8 bg-slate-200"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
        </div>
      </div>
      <div className="skeleton w-full border-b p-4 flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-2">
          <div className="h-8 bg-slate-200"></div>
          <div className="h-8 bg-slate-200"></div>
          <div className="h-8 bg-slate-200"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
          <div className="h-4 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

const SingleHadits = ({ number, arab, id, name, slug }) => {
  const { toggleBookmarkHadith, hasBookmarkHadith } = useBookmarkHadith();
  return (
    <div className="w-full border-b p-4 flex flex-col gap-8 py-8">
      <div className="flex justify-between">
        <h2 className="font-semibold">
          <Link to={`/hadits/${slug}/${number}`}>{number}</Link>
        </h2>
        <ButtonIconBookmark
          onClick={() => toggleBookmarkHadith({ name, slug, number })}
          isBookmarked={hasBookmarkHadith(slug, number)}
        />
      </div>
      <p className="text-3xl leading-loose font-arabic" dir="rtl">
        {arab}
      </p>
      <p>{id}</p>
    </div>
  );
};

const HaditsBook = () => {
  const { slug } = useParams();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useHadithsInfinite(slug);
  const loadMoreButtonRef = useRef();
  const [searchNumber, setSearchNumber] = useState("");
  const debouncedSearchNumber = useDebounce(searchNumber);
  const hadithByNumber = useHadithByNumber(slug, debouncedSearchNumber, {
    enabled: !!debouncedSearchNumber,
  });

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <HaditsSkeleton />
      ) : (
        <div className="w-full flex justify-center flex-col items-center">
          <h1 className="text-3xl font-bold text-center">
            {data.pages[0].name}
          </h1>
          <input
            type="number"
            value={searchNumber}
            placeholder="Nomor hadith"
            className="border rounded-md py-2 px-3 outline-none max-w-xs mt-6"
            onChange={(e) => setSearchNumber(e.target.value)}
          />
          {searchNumber && hadithByNumber.data ? (
            <SingleHadits
              {...hadithByNumber.data}
              {...pick(data.pages[0], ["name", "slug"])}
            />
          ) : (
            <>
              {data.pages.map((page) =>
                page.items.map((hadits) => (
                  <SingleHadits
                    key={hadits.number}
                    {...hadits}
                    {...pick(page, ["name", "slug"])}
                  />
                ))
              )}
              {isFetchingNextPage && <HaditsSkeleton />}
              <button
                ref={loadMoreButtonRef}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load Newer"
                  : "Nothing more to load"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HaditsBook;
