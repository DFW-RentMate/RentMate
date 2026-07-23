interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  variant?: 'green' | 'blue';
}

const Badge = ({ icon, label, variant = 'green' }: BadgeProps) => {
  const styles = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
  };

  return (
    <div
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium w-fit ${styles[variant]}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Badge;
