import { useEffect, useState } from "react";
import { useGeolocation } from "../../context/Geolocation";
import { usePrayerTimes } from "../../services/prayer";

const Clock = () => {
  const [clock, setClock] = useState("-- : -- : --");

  useEffect(() => {
    const myInterval = setInterval(() => {
      const clock = Intl.DateTimeFormat("id-ID", {
        timeStyle: "medium",
      }).format(new Date());
      setClock(clock.split(".").join(" : "));
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return <span className="text-lg font-semibold">{clock}</span>;
};

const timeConversion = (duration) => {
  const portions = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + " jam");
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + " menit");
    duration = duration - minutes * msInMinute;
  }

  return portions.join(" ");
};

const nearestPrayer = (prayers) => {
  const prayersTimeToday = prayers.find((prayer) => {
    return (
      new Date(new Date(prayer.date).setHours(0, 0, 0, 0)).getTime() ===
      new Date(new Date().setHours(0, 0, 0, 0)).getTime()
    );
  }).time;

  const nearest = Object.entries(prayersTimeToday).filter(([, value]) => {
    const [hours, minutes] = value.split(":");
    return (
      new Date(
        new Date().setHours(Number(hours), Number(minutes), 0, 0)
      ).getTime() >= new Date().getTime()
    );
  })[0];

  if (!nearest) return { readableTime: null, prayer: null };

  const [prayer, time] = nearest;
  const [hours, minutes] = time.split(":");

  const readableTime = timeConversion(
    new Date(
      new Date().setHours(Number(hours), Number(minutes), 0, 0)
    ).getTime() - new Date().getTime()
  );

  return { readableTime, prayer };
};

const DailyPrayerTimeSkeleton = () => {
  return (
    <div className="flex flex-col border rounded-md skeleton">
      <div className="w-full border-b px-6 py-4 gap-1 flex flex-col">
        <div className="h-7 bg-slate-200 rounded max-w-sm"></div>
        <div className="h-6 bg-slate-200 rounded max-w-md"></div>
      </div>
      <div className="flex w-full flex-col lg:flex-row ">
        <div className="flex w-full lg:w-2/12 p-6 flex-col gap-1 justify-center items-center border-b lg:border-none">
          <div className="h-6 bg-slate-200 w-full rounded"></div>
          <div className="h-6 bg-slate-200 w-full rounded"></div>
        </div>
        <div className="flex flex-col p-6 gap-1 lg:border-l items-center w-full">
          <div className="h-6 bg-slate-200 w-full rounded"></div>
          <div className="h-6 bg-slate-200 w-full rounded"></div>
        </div>
      </div>
    </div>
  );
};

const PrayerTime = () => {
  const {
    state: { latitude, longitude },
  } = useGeolocation();
  const prayerTimesQuery = usePrayerTimes(latitude, longitude);

  return (
    <div className="w-full flex flex-col">
      {prayerTimesQuery.isLoading ? (
        <DailyPrayerTimeSkeleton />
      ) : (
        <div className="flex flex-col border rounded-md">
          <div className="w-full border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Waktu Sholat</h2>
            <div className="text-gray-500">
              <span>
                {prayerTimesQuery.data.name},{" "}
                {prayerTimesQuery.data.province.name}
              </span>{" "}
              &middot;{" "}
              <span>
                {new Date().toLocaleDateString("id-ID", { dateStyle: "full" })}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col lg:flex-row ">
            <div className="flex w-full lg:w-2/12 p-6 flex-col justify-center items-center border-b lg:border-none">
              <Clock />
              {nearestPrayer(prayerTimesQuery.data.prayers).prayer && (
                <span className="capitalize text-sm text-gray-500">
                  {`${nearestPrayer(prayerTimesQuery.data.prayers).prayer} ${
                    nearestPrayer(prayerTimesQuery.data.prayers).readableTime
                  }`}{" "}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 lg:w-10/12 p-6 gap-4 lg:border-l items-center ">
              {Object.entries(
                prayerTimesQuery.data.prayers.find((prayer) => {
                  return (
                    new Date(
                      new Date(prayer.date).setHours(0, 0, 0, 0)
                    ).getTime() ===
                    new Date(new Date().setHours(0, 0, 0, 0)).getTime()
                  );
                }).time
              ).map(([key, value]) => (
                <div key={key} className="flex flex-col capitalize lg:w-full">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTime;
