const MyForm = ({ classnames, onSubmit, children }) => {
  return (
    <form
      className={`${classnames} form`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default MyForm;
