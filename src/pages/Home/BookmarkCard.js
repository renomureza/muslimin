import { Link } from "react-router-dom";
import { useBookmarkAyah } from "../../context/Bookmark";

const BookmarkCard = () => {
  const { state } = useBookmarkAyah();

  const bookmarkQuran = state.ayahs.length ? (
    state.ayahs.map((ayah) => (
      <Link
        to={`/quran/${ayah.surah.number}/${ayah.number.inSurah}`}
        key={ayah.number.inQuran}
        className="flex flex-col bg-slate-100 px-4 py-2 rounded-md whitespace-nowrap"
      >
        <span className="font-semibold">{ayah.surah.name}</span>
        <span className="text-sm">Ayat {ayah.number.inSurah}</span>
      </Link>
    ))
  ) : (
    <p className="text-gray-600">Tidak ditemukan.</p>
  );

  const bookmarkHadits = state.hadiths.length ? (
    state.hadiths.map((hadith) => (
      <Link
        to={`/hadits/${hadith.slug}/${hadith.number}`}
        key={`${hadith.slug}${hadith.number}`}
        className="flex flex-col bg-slate-100 px-4 py-2 rounded-md whitespace-nowrap"
      >
        <span className="font-semibold">{hadith.name}</span>
        <span className="text-sm">Nomor {hadith.number}</span>
      </Link>
    ))
  ) : (
    <p className="text-gray-600">Tidak ditemukan.</p>
  );

  return (
    <div className="w-full flex-col flex gap-4 py-8">
      <h2 className="text-xl font-medium border-b">Bookmark</h2>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-medium text-lg">Quran</h3>
        <div className="flex w-full gap-2 overflow-x-auto pb-1">
          {bookmarkQuran}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-medium text-lg">Hadis</h3>
        <div className="flex w-full gap-2 overflow-x-auto pb-1">
          {bookmarkHadits}
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
