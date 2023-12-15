import type { DragEvent } from "react";

type Props = {
  children: Array<JSX.Element>;
  onChange?: (idxFrom: number, idxTo: number) => void;
};

const DATA_TYPE = "application/x.dragstartindex";

const DraggableList = ({ children, onChange }: Props) => {
  const handleDragStart = (e: DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(DATA_TYPE, idx.toString());
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent, targetIndex: number) => {
    const isDroppable = e.dataTransfer.types.includes(DATA_TYPE);
    if (isDroppable && onChange) {
      e.preventDefault();
      const from = parseInt(e.dataTransfer.getData(DATA_TYPE), 10);
      const to = targetIndex;
      onChange(from, to);
    }
  };

  return (
    <>
      {children.map((child, idx) => {
        const Type = child.type;
        return (
          <Type
            key={child.key}
            draggable
            onDragStart={(e: DragEvent) => handleDragStart(e, idx)}
            onDragOver={onDragOver}
            onDrop={(e: DragEvent) => onDrop(e, idx)}
            {...child.props}
          ></Type>
        );
      })}
    </>
  );
};

export default DraggableList;
export type { Props as DraggableListProps };
