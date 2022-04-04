import IconPlay from "../../components/icons/IconPlay";
import IconStop from "../../components/icons/IconStop";

const ButtonIconPlay = ({ isPlaying, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 hover:bg-gray-100 transition rounded-lg flex items-center justify-center ${
        isPlaying ? "text-blue-600" : ""
      }`}
    >
      <span
        className={`${
          isPlaying ? "animate-ping" : "hidden"
        } absolute p-2 h-5 w-5 rounded-full bg-blue-400 opacity-75`}
      ></span>
      {isPlaying ? (
        <IconStop className="h-5 w-5" />
      ) : (
        <IconPlay className="h-5 w-5" />
      )}
    </button>
  );
};

export default ButtonIconPlay;
