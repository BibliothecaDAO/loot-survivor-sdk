import ItemBar, { Item } from "./ItemBar";

export const ItemBarList = ({ items }: { items: Item[] }) => {
  return (
    <div className="gap-2 flex flex-col">
      {items.map((item) => (
        <ItemBar item={item} key={item.id} />
      ))}
    </div>
  );
};
