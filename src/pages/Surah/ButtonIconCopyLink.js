import IconLink from "../../components/icons/IconLink";

const ButtonIconCopyLink = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 transition rounded-lg"
    >
      <IconLink className="h-5 w-5" />
    </button>
  );
};

export default ButtonIconCopyLink;
