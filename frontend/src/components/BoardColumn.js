import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";

import BoardItem from "./BoardItem";
import Title from "./common/Title";
import Button from "./common/Button";
import CreateCard from "./CreateCard";

import "../styles/Modal.css";

const Container = styled.div`
  width: 400px;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  box-shadow: 2px 2px 1px lightgrey;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  padding: 8px;
  margin-bottom: 0 !important;
`;

const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "lightgrey" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eceff1;
  padding: 8px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { items } = this.props;
    if (nextProps.items === items) return false;
    return true;
  }

  render() {
    const { items } = this.props;
    return items.map((item, i) => (
      <BoardItem key={item.id} item={item} index={i} />
    ));
  }
}

export default class BoardColumn extends React.Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;

    const { column, items, index } = this.props;

    return (
      <Draggable draggableId={column.id} index={index}>
        {providedDraggable => (
          <Container
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            innerRef={providedDraggable.innerRef}
          >
            <ColumnHeader>
              <StyledTitle className="is-5">{column.title}</StyledTitle>
              <Button
                className="is-primary is-rounded"
                onClick={this.onOpenModal}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Modal open={open} onClose={this.onCloseModal} center classNames={{ modal: 'custom-modal' }} >
                <CreateCard/>
              </Modal>
            </ColumnHeader>
            <Droppable droppableId={column.id} type="item">
              {(providedDroppable, snapshot) => (
                <CardList
                  innerRef={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList items={items} />
                  {providedDroppable.placeholder}
                </CardList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}