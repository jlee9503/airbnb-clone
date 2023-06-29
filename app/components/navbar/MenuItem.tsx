"use client";

interface MenuItemProps {
  onClick: () => void;
  itemLabel: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, itemLabel }) => {
  return (
    <div onClick={onClick} className="font-semibold transition px-4 py-3 hover:bg-neutral-100">
      {itemLabel}
    </div>
  );
};

export default MenuItem;
