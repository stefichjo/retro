import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { ItemContainer } from "../styles/styledComponents";
import Card from "./common/Card";

const Item = props => {
  const { item, index } = props;

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Card
            cardId={item.id}
            cardTitle={item.author}
            cardContent={item.content}
            cardPoints={item.points}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
};

export default Item;
