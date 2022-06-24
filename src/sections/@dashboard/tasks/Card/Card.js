import React, {useState} from "react";
import {Clock} from "react-feather";

import {IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
    const [showModal, setShowModal] = useState(false);

    const {id, title, date, tasks, labels} = props.card;

    const formatDate = (value) => {
        if (!value) return "";
        const date = new Date(value);
        if (!date) return "";

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Aprl",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    };

    return (
        <>
            {showModal && (
                <CardInfo
                    onClose={() => setShowModal(false)}
                    card={props.card}
                    boardId={props.boardId}
                    updateCard={props.updateCard}
                />
            )}

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className="card"
                draggable
                onDragEnd={() => props.dragEnded(props.boardId, id)}
                onDragEnter={() => props.dragEntered(props.boardId, id)}
                onClick={() => setShowModal(true)}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    className="card_top_more"
                >
                    {props.boardId !== 1 && <IconButton color="primary" aria-label="next stage" size='small'
                                                        onClick={() => props.onCardMoveClick(props.boardId, id, false)}>
                        <ArrowCircleLeftOutlinedIcon fontSize='inherit'/>
                    </IconButton>}
                    {props.boardId !== 4 && <IconButton color="success" aria-label="previous stage" size='small'
                                                        onClick={() => props.onCardMoveClick(props.boardId, id)}>
                        <ArrowCircleRightOutlinedIcon fontSize='inherit'/>
                    </IconButton>}
                    <IconButton color="error" aria-label="delete item" size='small' onClick={() => props.removeCard(props.boardId, id)}>
                        <DeleteIcon fontSize='inherit'/>
                    </IconButton>
                </Stack>
                <div className="card_title">{title}</div>
                <div className="card_footer">
                    <div className="card_top_labels">
                        {labels?.map((item, index) => (
                            // eslint-disable-next-line jsx-a11y/label-has-associated-control
                            <label key={index} style={{backgroundColor: item.color}}>
                                {item.text}
                            </label>
                        ))}
                    </div>
                    {date && (
                        <p className="card_footer_item">
                            <Clock className="card_footer_icon"/>
                            {formatDate(date)}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Card;
