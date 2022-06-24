import React from "react";

import Card from "../Card/Card";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {

  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}

      </div>
      <div className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
              key={item.id}
              card={item}
              boardId={props.board.id}
              removeCard={props.removeCard}
              dragEntered={props.dragEntered}
              dragEnded={props.dragEnded}
              updateCard={props.updateCard}
              onCardMoveClick={props.handleCardMovement}
          />
        ))}
        <Editable
          text="+ New Task"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
