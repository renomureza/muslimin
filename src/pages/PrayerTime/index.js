import { useEffect, useState } from "react";
import { usePrayerTimes, useProvinces } from "../../services/prayer";
import {
  useGeolocation,
  useLocationGeolocation,
} from "../../context/Geolocation";

const formatter = (date, options) => {
  return Intl.DateTimeFormat("id-ID", options).format(date);
};

const dateNow = new Date();
const dateNowStr = formatter(dateNow, { dateStyle: "full" });

// Asia/Jakarta / Asia/Makasar
const timeZoneIANA = Intl.DateTimeFormat().resolvedOptions().timeZone;

// GMT+7/GMT+8/GMT+9
const timeZoneGMT = new Intl.DateTimeFormat("en-us", {
  timeZoneName: "short",
})
  .formatToParts(dateNow)
  .find((part) => part.type === "timeZoneName").value;

const Clock = () => {
  const [clock, setClock] = useState("-- : -- : --");

  useEffect(() => {
    const myInterval = setInterval(() => {
      const clock = formatter(new Date(), {
        timeStyle: "medium",
      });
      setClock(clock.split(".").join(" : "));
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return <span className="font-semibold text-xl">{clock}</span>;
};

const MyLocation = () => {
  const { city, province, latitude, longitude } = useLocationGeolocation();
  return (
    <div className="flex w-full flex-col sm:flex-row gap-8  py-4 justify-between border-b items-center">
      <div className="flex flex-col">
        <span className="font-semibold">{dateNowStr}</span>
        <Clock />
        <span className="text-sm">
          {timeZoneIANA} ({timeZoneGMT})
        </span>
      </div>
      <div className="flex flex-col items-end">
        {!city && !province && !latitude && !longitude && (
          <span className="text-red-600 text-sm">
            Lokasi Anda tidak diketahui.
          </span>
        )}
        {city && province && (
          <span className="font-semibold">
            {city.name}, {province.name}
          </span>
        )}
        {latitude && longitude && (
          <span className="text-sm">
            {latitude}, {longitude}
          </span>
        )}
      </div>
    </div>
  );
};

// jakarta

const now = new Date();
const currentDate = now.getDate();

const PrayerTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full skeleton">
      <div className="flex items-center flex-col md:flex-row justify-between gap-4">
        <span className="bg-slate-200 max-w-sm h-6 w-full rounded-md"></span>
        <span className="bg-slate-200 max-w-sm h-7 w-full rounded-md"></span>
      </div>
      <div className="w-full overflow-auto">
        <table className="border-collapse whitespace-nowrap w-full">
          <thead className="bg-slate-100">
            <tr>
              {[...Array(9).keys()].map((i) => (
                <th key={i} className="border px-4 py-3">
                  <span className="bg-slate-200 h-7 w-full rounded-md inline-block"></span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center whitespace-nowrap">
            {[...Array(30).keys()].map((ri) => (
              <tr key={ri}>
                {[...Array(9).keys()].map((di) => (
                  <td key={`${ri}${di}`} className="border px-3 py-2 ">
                    <span className="bg-slate-200 h-6 w-full rounded-md inline-block"></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PrayerTimeTable = ({ prayers }) => {
  return (
    <div className="w-full overflow-auto">
      <table className="border-collapse whitespace-nowrap w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="border px-4 py-3 capitalize">Tanggal</th>
            {Object.keys(prayers[0].time).map((title) => (
              <th className="border px-4 py-3 capitalize" key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center whitespace-nowrap">
          {prayers.map((prayer) => (
            <tr key={prayer.id}>
              <td
                className={`border px-3 py-2 text-sm ${
                  new Date(prayer.date).getDate() === currentDate
                    ? "bg-slate-200 font-semibold"
                    : ""
                }`}
              >
                {new Date(prayer.date).toLocaleString("id", {
                  timeZone: "Asia/Jakarta",
                  dateStyle: "long",
                })}
              </td>
              {Object.keys(prayer.time).map((time) => (
                <td
                  key={`${prayer.date}${time}`}
                  className={`border px-3 py-2 text-sm  ${
                    new Date(prayer.date).getDate() === currentDate
                      ? "bg-slate-200 font-semibold"
                      : ""
                  }`}
                >
                  {prayer.time[time]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PrayerTable = ({
  latitude = -6.170088888888889,
  longitude = 106.83104999999999,
  setSelectedCityId,
  setSelectedProvinceId,
  selectedCityId,
  setCoordinate,
  selectedProvinceId,
}) => {
  const prayerTimesQuery = usePrayerTimes(latitude, longitude);

  useEffect(() => {
    if (prayerTimesQuery.data) {
      setSelectedProvinceId(prayerTimesQuery.data.provinceId);
      setSelectedCityId(prayerTimesQuery.data.id);
    }
  }, [prayerTimesQuery.data, setSelectedCityId, setSelectedProvinceId]);

  return prayerTimesQuery.isLoading ? (
    <PrayerTableSkeleton />
  ) : (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center flex-col md:flex-row justify-between gap-4">
        <span>
          {prayerTimesQuery.data.name}, {prayerTimesQuery.data.province.name}
        </span>
        <Location
          setCoordinate={setCoordinate}
          selectedCityId={selectedCityId}
          setSelectedCityId={setSelectedCityId}
          selectedProvinceId={selectedProvinceId}
          setSelectedProvinceId={setSelectedProvinceId}
        />
      </div>
      <PrayerTimeTable prayers={prayerTimesQuery.data.prayers} />
    </div>
  );
};

const Location = ({
  selectedProvinceId,
  setSelectedProvinceId,
  selectedCityId,
  setSelectedCityId,
  setCoordinate,
}) => {
  const provincesQuery = useProvinces();
  return (
    <div className="flex gap-2 flex-col sm:flex-row ">
      {provincesQuery.isLoading ? (
        <p>loading..</p>
      ) : (
        <>
          <div className="flex gap-1">
            <select
              className="outline-none border px-3 py-2 rounded-md"
              onChange={(e) => {
                const city = provincesQuery.data.find(
                  (province) => province.id === e.target.value
                ).cities[0];
                setSelectedProvinceId(e.target.value);
                setSelectedCityId(city.id);
                setCoordinate(city.coordinate);
              }}
              value={selectedProvinceId}
            >
              {provincesQuery.data.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <select
              className="outline-none border px-3 py-2 rounded-md"
              onChange={(e) => {
                const city = provincesQuery.data
                  .find((province) => province.id === selectedProvinceId)
                  .cities.find((city) => city.id === e.target.value);
                setSelectedCityId(e.target.value);
                setCoordinate(city.coordinate);
              }}
              value={selectedCityId}
            >
              {provincesQuery.data
                .find((province) => province.id === selectedProvinceId)
                .cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

const PrayerTime = () => {
  const geolocation = useGeolocation();
  const [selectedProvinceId, setSelectedProvinceId] = useState(
    "623170da0c9712e86967f915"
  );
  const [selectedCityId, setSelectedCityId] = useState(
    "623174648c0926930463d08b"
  );
  const [coordinate, setCoordinate] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center">
      <h1 className="text-center text-4xl font-bold">Waktu Sholat</h1>
      <MyLocation />
      {geolocation.state.isLoading ? (
        <PrayerTableSkeleton />
      ) : (
        <PrayerTable
          setSelectedCityId={setSelectedCityId}
          setSelectedProvinceId={setSelectedProvinceId}
          latitude={coordinate.latitude || geolocation.state.latitude}
          longitude={coordinate.longitude || geolocation.state.longitude}
          selectedProvinceId={selectedProvinceId}
          selectedCityId={selectedCityId}
          setCoordinate={setCoordinate}
        />
      )}
    </div>
  );
};

export default PrayerTime;
