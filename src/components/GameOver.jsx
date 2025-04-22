export default function GameOver({ winner, onPlayAgain }) {
    return (
        <div id="game-over">
            <h2>{winner ? `Player ${winner} wins!` : 'It\'s a draw!'}</h2>
            <p>  Thanks for playing!</p>
            <button onClick={onPlayAgain}>Play Again</button>

        </div>
    );
}