import clsx from "clsx";


const NewLandingLayout = ({ children, className }) => {
  return (
    <div className={clsx(`flex flex-col items-center w-screen`, className)}>
      {children}
    </div>
  );
};

export default NewLandingLayout;
