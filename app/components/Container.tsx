interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto max-w-[1280px] xl:px-20 md:px-10 sm:px-4 px-4">
      {children}
    </div>
  );
};

export default Container;
