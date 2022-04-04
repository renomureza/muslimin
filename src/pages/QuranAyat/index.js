import { useParams } from "react-router-dom";
import { useBookmarkAyah } from "../../context/Bookmark";
import { usePreference } from "../../context/Preference";
import { omit, pick } from "../../lib/utility";
import { useSurah } from "../../services/quran";
import ButtonIconBookmark from "../Surah/ButtonIconBookmark";

const mufassirs = [
  {
    title: "Kemenag",
    value: "kemenag",
  },
  {
    title: "Al-Jalalayn",
    value: "jalalayn",
  },
  {
    title: "Quraish",
    value: "quraish",
  },
];

const Skeleton = () => {
  return (
    <div className="skeleton w-full flex flex-col gap-6 justify-center items-center overflow-hidden">
      <div className="flex w-full justify-center flex-col items-center gap-2">
        <div className="h-8 bg-slate-200 w-full max-w-[160px] rounded-md"></div>
        <div className="h-6 bg-slate-200 w-full max-w-[100px] rounded-md"></div>
      </div>
      <span className="h-8 w-10 bg-slate-200 rounded-md ml-auto"></span>
      <div className="p-6 flex flex-col gap-6 w-full">
        <span className="h-8 w-3/4 bg-slate-200 rounded-md self-end"></span>
        <span className="h-8 w-3/4 bg-slate-200 rounded-md"></span>
        <div className="flex gap-2 flex-col">
          <span className="h-8 w-1/4 bg-slate-200 rounded-md self-center"></span>
          <span className="h-6 w-full bg-slate-200 rounded-md"></span>
          <span className="h-6 w-full bg-slate-200 rounded-md"></span>
          <span className="h-6 w-full bg-slate-200 rounded-md"></span>
        </div>
      </div>
    </div>
  );
};

const Tafsir = ({ mufassirs, tafsir }) => {
  const {
    state: { mufassir },
    setMufassir,
  } = usePreference();

  return (
    <div className="w-full justify-center flex-col gap-4 mt-4 flex">
      <div className="self-center space-x-1 border-b">
        {mufassirs.map((item) => (
          <button
            key={item.value}
            className={`px-3 py-2 font-medium hover:text-primary transition ${
              mufassir === item.value
                ? "border-b-2 border-b-primary text-primary"
                : ""
            }`}
            onClick={() => setMufassir(item.value)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="w-full">
        <p
          className="text-slate-800"
          dangerouslySetInnerHTML={{ __html: tafsir }}
        />
      </div>
    </div>
  );
};

const QuranAyat = () => {
  const { surahNumber, ayahNumber } = useParams();
  const surahQuery = useSurah(surahNumber, {
    select: (surah) => {
      const ayah = surah.ayahs.find(
        (ayah) => ayah.number.inSurah === Number(ayahNumber)
      );
      return {
        ...omit(surah, "ayahs"),
        ayah,
      };
    },
  });
  const {
    state: { mufassir },
  } = usePreference();
  const { hasBookmarkedAyah, toggleBookmarkAyah } = useBookmarkAyah();

  return (
    <div className="w-full">
      {surahQuery.isLoading ? (
        <Skeleton />
      ) : (
        <div
          className="flex flex-col gap-4"
          key={surahQuery.data.number.inSurah}
        >
          <h1 className="text-center text-3xl font-semibold flex flex-col gap-1">
            <span>{surahQuery.data.name}</span>
            <span className="text-base font-medium">
              Ayat {surahQuery.data.ayah.number.inSurah}
            </span>
          </h1>
          <div className="ml-auto">
            <ButtonIconBookmark
              onClick={() =>
                toggleBookmarkAyah({
                  surah: omit(surahQuery.data, [
                    "ayahs",
                    "bismillah",
                    "audio",
                    "description",
                  ]),
                  ...pick(surahQuery.data.ayah, ["number"]),
                })
              }
              isBookmarked={hasBookmarkedAyah(
                surahQuery.data.ayah.number.inQuran
              )}
            />
          </div>
          <p className="text-3xl leading-loose font-arabic" dir="rtl">
            {surahQuery.data.ayah.arab}
          </p>
          <p className="text-slate-800">{surahQuery.data.ayah.translation}</p>
          <Tafsir
            mufassirs={mufassirs}
            tafsir={
              surahQuery.data.ayah.tafsir[mufassir].short ??
              surahQuery.data.ayah.tafsir[mufassir]
            }
          />
        </div>
      )}
    </div>
  );
};

export default QuranAyat;
