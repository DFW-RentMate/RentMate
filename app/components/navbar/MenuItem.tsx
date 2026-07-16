interface MenuItemProps {
  label: string;
  onClick?: () => void;   
}

export default function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}    
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-sm cursor-pointer"
    >
      {label}
    </div>
  );
}