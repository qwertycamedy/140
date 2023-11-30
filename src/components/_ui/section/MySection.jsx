

const MySection = ({ classNames, containerCl, innerCl, children, ...props }) => {
  return (
    <section className={`${classNames} section`} {...props}>
      <div className={`${containerCl} container`}>
        <div className={`${innerCl} section-inner`}>{children}</div>
      </div>
    </section>
  );
};

export default MySection;
