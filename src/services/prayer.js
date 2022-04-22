import { useQuery } from "react-query";

const BASE_URL = "https://waktu-sholat.vercel.app";

const useProvinces = (options) => {
  return useQuery(
    "province",
    () => fetch(`${BASE_URL}/province`).then((res) => res.json()),
    options
  );
};

const useProvince = (provinceId, options) => {
  return useQuery(
    ["province", provinceId],
    () => fetch(`${BASE_URL}/province/${provinceId}`).then((res) => res.json()),
    options
  );
};

const usePrayerTimes = (
  latitude = "-6.170088888888889",
  longitude = "106.83105",
  options
) => {
  return useQuery(
    ["prayer", latitude, longitude],
    () =>
      fetch(
        `${BASE_URL}/prayer?latitude=${latitude}&longitude=${longitude}`
      ).then((res) => res.json()),
    options
  );
};

const useLocation = (latitude, longitude, options) => {
  return useQuery(
    ["location", latitude, longitude],
    () =>
      fetch(
        `${BASE_URL}/location?latitude=${latitude}&longitude=${longitude}`
      ).then((res) => res.json()),
    options
  );
};

export { useProvinces, usePrayerTimes, useProvince, useLocation };
