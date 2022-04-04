import IconHeart from "../../components/icons/IconHeart";

const ButtonIconBookmark = ({ onClick, isBookmarked }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 transition rounded-lg`}
    >
      <IconHeart className="h-5 w-5" isFilled={isBookmarked} />
    </button>
  );
};

export default ButtonIconBookmark;
