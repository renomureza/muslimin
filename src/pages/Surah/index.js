import { useParams } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { useSurah } from "../../services/quran";
import { usePreference } from "../../context/Preference";
import useToggle from "../../hooks/useToggle";
import ModalPreference from "./ModalPreference";
import ContentSimple from "./ContentSimple";
import ContentFull from "./ContentFull";
import ContentHeader from "./ContentHeader";
import Title from "./Title";
import Audio from "../../components/Audio";

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

const qaris = [
  {
    title: "Mishari Alafasy",
    value: "alafasy",
  },
  {
    title: "Al-Ajmy",
    value: "ahmedajamy",
  },
  {
    title: "Al-Hussary",
    value: "husarymujawwad",
  },
  {
    title: "Al-Minshawi",
    value: "minshawi",
  },
  {
    title: "Muhammad Ayyub",
    value: "muhammadayyoub",
  },
  {
    title: "Mohamed Jibril",
    value: "muhammadjibreel",
  },
];

const Skeleton = () => {
  return [...Array(5).keys()].map((i) => (
    <div
      key={i}
      className="skeleton w-full  flex flex-col gap-6 justify-center items-center overflow-hidden"
    >
      {i === 0 && (
        <>
          <div className="flex w-full justify-center flex-col items-center gap-2">
            <div className="h-8 bg-slate-200 w-full max-w-[160px] rounded-md"></div>
            <div className="h-6 bg-slate-200 w-full max-w-[100px] rounded-md"></div>
          </div>
          <div className="flex w-full justify-between items-center border-b pb-2 flex-col gap-1 sm:flex-row">
            <span className="h-6 w-[220px] bg-slate-200 rounded-md"></span>
            <span className="h-8 w-[140px] bg-slate-200 rounded-md"></span>
          </div>
        </>
      )}
      <div className="border-b p-6 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center gap-4">
          <span className="h-8 w-[60px] bg-slate-200 rounded-md"></span>
          <span className="h-6 w-[100px] bg-slate-200 rounded-md"></span>
        </div>
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
  ));
};

const Surah = () => {
  const {
    state: { isSimpleMode, qari },
  } = usePreference();
  const { surahNumber } = useParams();
  const surahQuery = useSurah(surahNumber);
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isOpenModalPreference, toggleModalPreference] = useToggle(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const playSpesifictAyah = (indexAyahInSurah) => {
    if (indexAyahInSurah !== currentAudioIndex) {
      setCurrentAudioIndex(indexAyahInSurah);
      audioPlayerRef.current.play();
    } else {
      if (!isPlaying) {
        audioPlayerRef.current?.play();
      } else {
        audioPlayerRef.current?.pause();
        audioPlayerRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  const highlighPlayingAyah = useCallback(() => {
    const currentAyahWrapper = document.getElementById(
      `${surahQuery.data?.ayahs[currentAudioIndex]?.number.inQuran}`
    );

    currentAyahWrapper?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });

    currentAyahWrapper?.classList.add("highlight-ayah");
  }, [currentAudioIndex, surahQuery.data?.ayahs]);

  const removeHighlightPlayingAyah = useCallback(() => {
    const prevAyahWrapper = document.getElementById(
      `${surahQuery.data.ayahs[currentAudioIndex]?.number.inQuran}`
    );
    prevAyahWrapper?.classList.remove("highlight-ayah");
  }, [currentAudioIndex, surahQuery.data?.ayahs]);

  const onPlayAudioHandler = useCallback(() => {
    highlighPlayingAyah();
    setIsPlaying(true);
  }, [highlighPlayingAyah]);

  const onEndAudioHandler = useCallback(() => {
    removeHighlightPlayingAyah();
    if (currentAudioIndex < surahQuery.data.ayahs.length - 1) {
      setCurrentAudioIndex((prevIndex) => prevIndex + 1);
    } else {
      setAutoPlay(false);
      setCurrentAudioIndex(0);
      setIsPlaying(false);
    }
  }, [
    currentAudioIndex,
    removeHighlightPlayingAyah,
    surahQuery.data?.ayahs.length,
  ]);

  const tooglePlayStop = () => {
    if (isPlaying) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
      setAutoPlay(true);
    }
  };

  useEffect(() => {
    const audioRef = audioPlayerRef.current;
    if (!audioRef) return;
    audioRef.addEventListener("play", onPlayAudioHandler);
    audioRef.addEventListener("ended", onEndAudioHandler);

    return () => {
      audioRef.removeEventListener("play", onPlayAudioHandler);
      audioRef.removeEventListener("ended", onEndAudioHandler);
    };
  }, [onEndAudioHandler, onPlayAudioHandler]);

  return (
    <div className="w-full">
      {surahQuery.isLoading ? (
        <Skeleton />
      ) : (
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <div className="flex justify-center flex-col items-center">
            <Title>{surahQuery.data.name}</Title>
            <span className="font-medium">({surahQuery.data.translation})</span>
          </div>
          <ContentHeader
            isPlaying={isPlaying}
            onClickPlay={tooglePlayStop}
            surah={surahQuery.data}
            toggleModalPreference={toggleModalPreference}
          />
          {!isSimpleMode ? (
            <ContentFull
              surah={surahQuery.data}
              onPlayAyah={playSpesifictAyah}
              mufassirs={mufassirs}
              currentAudioIndex={currentAudioIndex}
              isPlaying={isPlaying}
            />
          ) : (
            <ContentSimple
              isPlaying={isPlaying}
              currentAudioIndex={currentAudioIndex}
              ayahs={surahQuery.data.ayahs}
            />
          )}
        </div>
      )}
      {isOpenModalPreference && (
        <ModalPreference
          mufassirs={mufassirs}
          onClose={toggleModalPreference}
          qaris={qaris}
        />
      )}
      <Audio
        autoPlay={autoPlay}
        ref={audioPlayerRef}
        src={surahQuery.data?.ayahs[currentAudioIndex].audio[qari]}
      />
    </div>
  );
};

export default Surah;
