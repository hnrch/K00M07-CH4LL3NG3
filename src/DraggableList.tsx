import { DragEvent, ReactNode } from "react";

type Props = {
  items: any[];
  renderItem: (item: any, idx: number) => ReactNode;
  onChange: (idxFrom: number, idxTo: number) => void;
  itemTagName: any; // TODO: how to type this correctly?
  itemClassName?: string;
};

const DATA_TYPE = "application/x.dragstartindex";

const DraggableList = ({
  items,
  renderItem,
  onChange,
  itemTagName: TagName = "span",
  itemClassName,
}: Props) => {
  const handleDragStart = (e: DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(DATA_TYPE, idx.toString());
  };

  const onDrop = (e: DragEvent, targetIndex: number) => {
    const isDroppable = e.dataTransfer.types.includes(DATA_TYPE);
    if (isDroppable) {
      e.preventDefault();
      const from = parseInt(e.dataTransfer.getData(DATA_TYPE), 10);
      const to = targetIndex;
      onChange(from, to);
    }
  };

  return items.map((item: any, idx: number) => (
    <TagName
      key={idx}
      className={itemClassName}
      draggable
      onDragStart={(e: DragEvent) => handleDragStart(e, idx)}
      onDrop={(e: DragEvent) => onDrop(e, idx)}
      onDragOver={(e: DragEvent) => e.preventDefault()}
    >
      <>{renderItem(item, idx)}</>
    </TagName>
  ));
};

export default DraggableList;
export type { Props as DraggableListProps };
