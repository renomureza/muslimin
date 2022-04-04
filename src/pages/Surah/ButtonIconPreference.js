import IconSetting from "../../components/icons/IconAdjustments";

const ButtonIconPreference = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 relative flex gap-2 group text-sm font-medium items-center justify-center hover:bg-gray-100 transition rounded-lg`}
    >
      <div className="hidden whitespace-nowrap absolute -top-9 py-1 px-2 transition-all rounded-md bg-black text-white group-hover:block after:h-2 after:w-2 after:-ml-[4px] after:absolute after:left-[50%] after:rotate-[-135deg] after:bg-black after:-bottom-1 after:rounded-t-[2px]">
        Preferensi
      </div>
      <IconSetting />
    </button>
  );
};

export default ButtonIconPreference;
