import { Link } from "react-router-dom";
import { useBookmarkAyah } from "../../context/Bookmark";
import { usePreference } from "../../context/Preference";
import ButtonIconBookmark from "./ButtonIconBookmark";
import ButtonIconPlay from "./ButtonIconPlay";
import { omit, pick } from "../../lib/utility";

const Tafsir = ({ mufassirs, tafsir }) => {
  const {
    state: { isShownTafsir, mufassir },
    setMufassir,
  } = usePreference();

  return (
    <div
      className={`w-full justify-center flex-col gap-4 mt-4 ${
        isShownTafsir ? "flex" : "hidden"
      }`}
    >
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

const ContentFull = ({
  surah,
  onPlayAyah,
  mufassirs,
  currentAudioIndex,
  isPlaying,
}) => {
  const { hasBookmarkedAyah, toggleBookmarkAyah } = useBookmarkAyah();
  const {
    state: { isShownTranslation, mufassir },
  } = usePreference();

  const isPlayingAyah = (idxAyah) => {
    return isPlaying && idxAyah === currentAudioIndex;
  };

  return (
    <div className="w-full">
      {surah.ayahs.map((ayah, idx) => (
        <div
          className={`border-b py-6 md:p-6 flex flex-col gap-4`}
          key={ayah.number.inSurah}
          id={ayah.number.inQuran}
          data-number-ayah-in-quran={ayah.number.inQuran}
        >
          <div className="flex justify-between items-center gap-4">
            <Link
              to={`/quran/${surah.number}/${ayah.number.inSurah}`}
              className="font-medium px-2 py-1 hover:bg-gray-100 rounded-md"
            >
              {ayah.number.inSurah}
            </Link>
            <div className="flex items-center">
              <ButtonIconBookmark
                onClick={() =>
                  toggleBookmarkAyah({
                    surah: omit(surah, [
                      "ayahs",
                      "bismillah",
                      "audio",
                      "description",
                    ]),
                    ...pick(ayah, ["number"]),
                  })
                }
                isBookmarked={hasBookmarkedAyah(ayah.number.inQuran)}
              />
              <ButtonIconPlay
                onClick={() => onPlayAyah(idx)}
                isPlaying={isPlayingAyah(idx)}
              />
            </div>
          </div>
          <p
            className="text-3xl leading-loose font-arabic"
            dir="rtl"
            key={ayah.number.inSurah}
          >
            {ayah.arab}
          </p>
          {isShownTranslation && (
            <p className="text-slate-800">{ayah.translation}</p>
          )}
          <Tafsir
            mufassirs={mufassirs}
            tafsir={ayah.tafsir[mufassir].short ?? ayah.tafsir[mufassir]}
          />
        </div>
      ))}
    </div>
  );
};

export default ContentFull;
