

const MyBtn = ({ children, classNames, onClick, ...props }) => {
  return (
    <button className={`${classNames} btn`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default MyBtn;
