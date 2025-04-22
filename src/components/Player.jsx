import { useState } from 'react';
export function Player ({initialName ,symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (!isEditing) {
            onChangeName(symbol, playerName);
        }

    }

    function handleInputChange(event) {
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName  = <input type="text" value={playerName} required onChange={handleInputChange}/>;
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{!isEditing ? 'Edit' : 'Save'}</button>
        </li>
    )
}