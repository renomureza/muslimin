const Toggle = ({ id, label, ...props }) => {
  return (
    <div className="toggle flex items-center gap-2 text-sm font-medium">
      <input
        className="appearance-none w-9 rounded-full h-5 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm checked:bg-primary checked:border-primary"
        type="checkbox"
        role="switch"
        id={id}
        {...props}
      />
      <label className="inline-block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Toggle;
