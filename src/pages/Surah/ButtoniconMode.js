import IconSimpleMode from "../../components/icons/IconDocumentRemove";
import IconComplexMode from "../../components/icons/IconDocumentText";

const ButtonIconMode = ({ isSimpleMode, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 flex relative group gap-2 text-sm font-medium items-center justify-center hover:bg-gray-100 transition rounded-lg`}
    >
      <div className="hidden whitespace-nowrap absolute -top-9 py-1 px-2 transition-all rounded-md bg-black text-white group-hover:block after:h-2 after:w-2 after:-ml-[4px] after:absolute after:left-[50%] after:rotate-[-135deg] after:bg-black after:-bottom-1 after:rounded-t-[2px]">
        Mode {isSimpleMode ? "Full" : "Simple"}
      </div>
      {isSimpleMode ? <IconSimpleMode /> : <IconComplexMode />}
    </button>
  );
};

export default ButtonIconMode;
