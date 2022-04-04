const Title = (props) => {
  return (
    <h1 className="text-3xl font-bold" {...props}>
      {props.children}
    </h1>
  );
};

export default Title;
