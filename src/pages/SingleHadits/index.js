import { useParams } from "react-router-dom";
import { useBookmarkHadith } from "../../context/Bookmark";
import { pick } from "../../lib/utility";
import { useHadithByNumber } from "../../services/hadits";
import ButtonIconBookmark from "../Surah/ButtonIconBookmark";

const SingleHadits = () => {
  const { slug, number } = useParams();
  const hadithQuery = useHadithByNumber(slug, number);
  const { toggleBookmarkHadith, hasBookmarkHadith } = useBookmarkHadith();

  return hadithQuery.isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-full flex justify-center flex-col items-center">
      <h1 className="text-center text-3xl font-semibold flex flex-col gap-1">
        <span>{hadithQuery.data.name}</span>
        <span className="text-base font-medium">
          Nomor {hadithQuery.data.number}
        </span>
      </h1>
      <div className="w-full p-4 flex flex-col gap-8 py-8">
        <div className="ml-auto">
          <ButtonIconBookmark
            onClick={() =>
              toggleBookmarkHadith(
                pick(hadithQuery.data, ["name", "slug", "number"])
              )
            }
            isBookmarked={hasBookmarkHadith(slug, Number(number))}
          />
        </div>
        <p className="text-3xl leading-loose font-arabic" dir="rtl">
          {hadithQuery.data.arab}
        </p>
        <p>{hadithQuery.data.id}</p>
      </div>
    </div>
  );
};

export default SingleHadits;
