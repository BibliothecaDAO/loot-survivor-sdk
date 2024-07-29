export const RoundedContainer = ({
  children,
  className,
  inner,
}: {
  children: React.ReactNode;
  className?: string;
  inner?: boolean;
}) => {
  return (
    <div
      className={` bg-black  border-primary rounded-2xl ${className} ${inner ? "border-y" : "border"}`}
    >
      {children}
    </div>
  );
};
