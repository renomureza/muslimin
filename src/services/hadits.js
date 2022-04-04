import { useInfiniteQuery, useQuery } from "react-query";

const BASE_URL = "https://hadis-api-id.vercel.app";

const useHadithNarrates = () => {
  return useQuery(["narattor"], () =>
    fetch(`${BASE_URL}/hadith`).then((res) => res.json())
  );
};

const useHadithsInfinite = (slug) => {
  return useInfiniteQuery(
    ["hadiths", slug],
    async ({ pageParam = 1 }) => {
      return fetch(`${BASE_URL}/hadith/${slug}?page=${pageParam}`).then((res) =>
        res.json()
      );
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.currentPage < lastPage.pagination.totalPages
          ? lastPage.pagination.currentPage + 1
          : false;
      },
    }
  );
};

const useHadith = (slug, page) => {
  return useQuery(["hadith", slug, page], () =>
    fetch(`${BASE_URL}/hadith/${slug}?page=${page}`).then((res) => res.json())
  );
};

const useHadithByNumber = (slug, numberHadith, options) => {
  return useQuery(
    ["hadith", slug, numberHadith],
    () =>
      fetch(`${BASE_URL}/hadith/${slug}/${numberHadith}`).then((res) =>
        res.json()
      ),
    options
  );
};

export { useHadith, useHadithNarrates, useHadithsInfinite, useHadithByNumber };
