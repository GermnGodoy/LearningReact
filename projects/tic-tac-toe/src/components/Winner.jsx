import { Square } from "./Square"

export function Winner({winner, resetGame}) {
    if(winner === null) return null

    const winnerText = winner === false
                ? 'Draw'
                : 'Winner is '

    return (
        <section className = 'winner'>
          <div className="text">
            <h2>
              {winnerText}
            </h2>

            {
              winner && (
                <header className="win">
                  {<Square>{winner}</Square>}
                </header>
              )
            }

            <footer>
              <button onClick={resetGame}>Try again</button>
            </footer>
          </div>
        </section>
    )
}