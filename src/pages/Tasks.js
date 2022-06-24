/* eslint-disable camelcase */
import React, {useEffect, useState} from "react";

import {useSelector} from "react-redux";

import Board from "../sections/@dashboard/tasks/Board/Board";
import "./Tasks.css";

const initialBoard = [
    {
        id: 1,
        title: 'Backlog',
        cards: []
    },
    {
        id: 2,
        title: 'Todo',
        cards: []
    },
    {
        id: 3,
        title: 'Ongoing',
        cards: []
    },
    {
        id: 4,
        title: 'Done',
        cards: []
    },
];

function Tasks() {
    const user = useSelector(({user}) => user.details)
    const [boards, setBoards] = useState(localStorage.getItem(`kanban-${user.email}`) ?
        JSON.parse(localStorage.getItem(`kanban-${user.email}`)) : initialBoard);

    const [targetCard, setTargetCard] = useState({
        bid: "",
        cid: "",
    });


    const addCardHandler = (id, title) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards[index].cards.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            tasks: [],
        });
        setBoards(tempBoards);
    };

    const removeCard = (bid, cid) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const {cards} = tempBoards[index];

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        cards.splice(cardIndex, 1);
        setBoards(tempBoards);
    };

    const dragEnded = (bid, cid) => {
        const s_boardIndex = boards.findIndex((item) => item.id === bid);
        if (s_boardIndex < 0) return;

        const s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if (s_cardIndex < 0) return;

        const t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
        if (t_boardIndex < 0) return;

        const t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
            (item) => item.id === targetCard.cid
        );
        if (t_cardIndex < 0) return;

        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
        setBoards(tempBoards);

        setTargetCard({
            bid: "",
            cid: "",
        });
    };

    const dragEntered = (bid, cid) => {
        if (targetCard.cid === cid) return;
        setTargetCard({
            bid,
            cid,
        });
    };

    const handleCardMovement = (bid, cid, mode = true) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];

        const cardIndex = tempBoards[index].cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        const card = tempBoards[index].cards[cardIndex];
        tempBoards[index].cards.splice(cardIndex, 1);

        const newBoardIndex = mode ? index + 1 : index - 1;
        tempBoards[newBoardIndex].cards.push(card);
        setBoards(tempBoards);
    }

    const updateCard = (bid, cid, card) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const {cards} = tempBoards[index];

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].cards[cardIndex] = card;

        setBoards(tempBoards);
    };

    useEffect(() => {
        localStorage.setItem(`kanban-${user.email}`, JSON.stringify(boards));
    }, [boards]);

    return (
        <div className="app">
            <div className="app_boards_container">
                <div className="app_boards">
                    {boards?.map((item) => (
                        <Board
                            key={item.id}
                            board={item}
                            addCard={addCardHandler}
                            removeCard={removeCard}
                            dragEnded={dragEnded}
                            dragEntered={dragEntered}
                            updateCard={updateCard}
                            handleCardMovement={handleCardMovement}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default Tasks;
