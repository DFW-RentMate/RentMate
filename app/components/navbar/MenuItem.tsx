interface MenuItemProps {
  label: string;
  onClick?: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => {
  return (
    <div
      className="px-4 py-2 hover:bg-neutral-100 transition cursor-pointer"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
