import { useEffect, useState } from 'react'
import { DURATION_GAME } from './constants'

import './App.css'

const FollowMouse = () => {
  const [start, setStart] = useState(false)
  const [currentTime, setCurrentTime] = useState(DURATION_GAME)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleClickStart = () => {
    if (!start) {
      setStart(true)
    }
  }

  useEffect(() => {
    let intervalId = null

    if (start) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime === 0) {
            setStart(false) // -> Should be here?????? 🤔

            return DURATION_GAME
          }

          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }, [start])

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event

      setPosition({ x: clientX, y: clientY })
    }

    if (start) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [start])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <div className="menu">
        <div className="score">{currentTime} s</div>
        <button
          className="action"
          onClick={handleClickStart}
          disabled={start}
        >
          Empezar a jugar
        </button>
      </div>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
