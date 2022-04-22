import { useQuery } from "react-query";

const BASE_URL = "https://quran-api-id.vercel.app";

const useSurahs = () => {
  return useQuery(["surah"], () =>
    fetch(`${BASE_URL}/surahs`).then((res) => res.json())
  );
};

const useSurah = (surahNumber, options) => {
  return useQuery(
    ["surah", surahNumber],
    () => fetch(`${BASE_URL}/surahs/${surahNumber}`).then((res) => res.json()),
    options
  );
};

const useAyah = (surahNumber, ayahNumber) => {
  return useQuery(["ayah", surahNumber, ayahNumber], () =>
    fetch(`${BASE_URL}/surahs/${surahNumber}/ayahs/${ayahNumber}`).then((res) =>
      res.json()
    )
  );
};

export { useSurahs, useSurah, useAyah };
