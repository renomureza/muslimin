import {
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import useOnClickOutside from "../hooks/useOnclickOutside";
import ChevronDown from "./icons/ChevronDown";
import IconCheck from "./icons/IconCheck";

const Select = ({ value, onChange, label, children }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const selectOptionsRef = useRef();
  useOnClickOutside(selectOptionsRef, () => setIsOpenSelect(false));

  const childrenWithNewProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        currentValue: value,
        onChange,
        setIsOpenSelect,
      });
    }

    return child;
  });

  const currentTitle = childrenWithNewProps.find(
    (child) => child.props.value === value
  )?.props.children;

  return (
    <div className="w-full">
      {label && (
        <span
          className="cursor-default text-sm font-medium mb-2 inline-block"
          onClick={() => setIsOpenSelect((prev) => !prev)}
        >
          {label}
        </span>
      )}
      <div
        ref={selectOptionsRef}
        className="h-11 relative transition-colors text-sm cursor-pointer"
      >
        <div
          onClick={() => setIsOpenSelect((prev) => !prev)}
          className={`px-3 flex gap-2 justify-between active:bg-slate-50 border-slate-300 border w-full items-center h-full ${
            isOpenSelect ? "rounded-t-lg" : "rounded-lg hover:border-slate-400"
          }`}
        >
          {currentTitle && (
            <>
              <span>{currentTitle}</span> <ChevronDown className="h-5 w-5" />
            </>
          )}
        </div>
        <div
          className={`scrollbar overflow-auto max-h-40 absolute z-30 -mt-[1px] w-full flex-col p-2 gap-1 bg-white border border-slate-300 rounded-b-lg ${
            isOpenSelect ? "flex" : "hidden"
          }`}
        >
          {childrenWithNewProps}
        </div>
      </div>
    </div>
  );
};

const Options = ({
  value,
  children,
  onChange,
  setIsOpenSelect,
  currentValue,
}) => {
  return (
    <span
      key={value}
      onClick={() => {
        onChange(value);
        setIsOpenSelect(false);
      }}
      className={`px-3 py-1 inline-flex justify-between items-center rounded-md ${
        currentValue === value
          ? "bg-blue-50 text-primary font-medium"
          : "hover:bg-slate-100"
      }`}
    >
      {children}{" "}
      <IconCheck
        className={`h-5 w-5 ${
          currentValue === value ? "inline-block" : "hidden"
        }`}
      />
    </span>
  );
};

Select.Option = Options;

export default Select;
