import { createPortal } from "react-dom";
import IconClose from "./icons/IconClose";

const Modal = ({ onClose, children, title }) => {
  return createPortal(
    <div className="w-full h-full fixed top-0 left-0 ">
      <div className="absolute p-2 top-0 left-0 bg-black bg-opacity-70 w-full h-full flex items-center justify-center">
        <div className="bg-white rounded-xl w-full max-w-sm">
          {/* header */}
          <div className="flex justify-between border-b p-2 items-center">
            <div className="text-lg font-semibold px-2">{title}</div>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>
          {/* body */}
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Modal;
