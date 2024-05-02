import React from "react";
import { Card } from "react-bootstrap";

export default function CommentsItem ( { content, createdBy, createdAt } ) {

    const { nome, cognome, avatar } = createdBy;

    return (
        <Card>
            <Card.Header>
                <div className="d-flex align-items-center">
                    <img src={avatar} className="rounded-circle" width={20} alt={`Profile Pic of Comment written by ${nome} ${cognome}`} />
                    <div className="ms-2">{`${nome} ${cognome}`}</div>
                </div>
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>{` ${content} `}</p>
                <footer className="blockquote-footer fs-6">
                    <div>
                        {new Date(createdAt).toLocaleDateString('it-IT', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
};