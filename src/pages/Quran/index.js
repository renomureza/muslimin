import { Link } from "react-router-dom";
import { useState } from "react";
import { useSurahs } from "../../services/quran";
import useDebounce from "../../hooks/useDebounce";
import fuzzySearch from "../../lib/fuzzySearch";
import Input from "../../components/Input";
import IconQuranCalligraphy from "../../components/icons/IconQuranCalligraphy";

const AyahCard = ({ number, name, translation, revelation, numberOfAyahs }) => {
  return (
    <Link
      to={`/quran/${number}`}
      className="border rounded-md p-4 group hover:border-primary hover:bg-slate-50 transition-colors flex gap-4 items-center w-full"
    >
      <span className="h-10 max-w-[2.5rem] w-full text-sm bg-slate-200 transition-colors group-hover:bg-primary group-hover:text-white flex items-center justify-center font-semibold rounded-full">
        {number}
      </span>
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
            {name}
          </h2>
          <span className="text-sm font-medium text-gray-600">
            {translation}
          </span>
        </div>
        <div className="text-sm text-gray-600 font-semibold flex flex-col items-center">
          <span>{revelation}</span>
          <span className="text-xs">{numberOfAyahs} ayat</span>
        </div>
      </div>
    </Link>
  );
};

const SkeletonAyahCard = () => {
  return (
    <div className="skeleton w-full flex flex-col gap-4 justify-center items-center">
      <div className="max-w-[200px] w-full h-[114px] my-8 bg-slate-200 rounded-md"></div>
      <div className="max-w-sm h-9 w-full bg-slate-200 rounded-md"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
        {Array(114)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="border rounded-md p-4 flex gap-4 items-center w-full"
            >
              <div className="rounded-full bg-slate-200 h-10 max-w-[2.5rem] w-full"></div>
              <div className="w-full space-y-3">
                <div className="h-4 w-full bg-slate-200"></div>
                <div className="h-4 w-full bg-slate-200"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Quran = () => {
  const surahsQuery = useSurahs();
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword);

  const filteredSurahs = surahsQuery.data
    ? [
        ...surahsQuery.data.filter((surah) =>
          fuzzySearch(
            debouncedSearchKeyword.toLowerCase(),
            surah.name.toLowerCase()
          )
        ),
      ]
    : [];

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      {surahsQuery.isLoading ? (
        <SkeletonAyahCard />
      ) : (
        <>
          <div className="max-w-[200px] w-full my-8">
            <IconQuranCalligraphy />
          </div>
          <div className="max-w-sm">
            <Input
              value={searchKeyword}
              type="search"
              name="search"
              placeholder="Yasin"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
            {filteredSurahs.length ? (
              filteredSurahs.map((surah) => (
                <AyahCard key={surah.number} {...surah} />
              ))
            ) : (
              <p className="text-4xl font-bold">Not found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quran;
