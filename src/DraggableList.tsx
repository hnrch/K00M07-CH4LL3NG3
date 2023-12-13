const DraggableList = ({ renderItem, items }: any) => {
  return items.map((item: any, i: number) => renderItem(item, i));
};

export default DraggableList;
