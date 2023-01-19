export function WinnerModal({ onCloseModal, score }) {
  return (
    <section className="winner">
      <div className="text">
        <h2 className="description">Total de puntos:</h2>

        <header className="win">{score}</header>

        <footer>
          <button onClick={onCloseModal}>Cerrar</button>
        </footer>
      </div>
    </section>
  )
}
