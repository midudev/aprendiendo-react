import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'

import {
  BOX_RANDOM_POSITON_TIME,
  BOX_SIZE,
  DURATION_GAME,
  POINT_VALUE,
} from './constants'
import { WinnerModal } from './components/WinnerModal'

import './App.css'

const getRandomPosition = () => {
  const { innerHeight, innerWidth } = window
  const randomX = Math.floor(Math.random() * innerWidth) - BOX_SIZE
  const randomY = Math.floor(Math.random() * innerHeight) - BOX_SIZE
  const x = randomX < 0 ? 0 : randomX
  const y = randomY < 0 ? 0 : randomY

  return { x, y }
}

const FollowMouse = () => {
  const [start, setStart] = useState(false)
  const [showModalScore, setShowModalScore] = useState(false)
  const [currentTime, setCurrentTime] = useState(DURATION_GAME)
  const [score, setScore] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [boxPosition, setBoxPosition] = useState(getRandomPosition())

  const handleClickStart = () => {
    if (!start) {
      setBoxPosition(getRandomPosition())
      setStart(true)
    }
  }
  const handleHideScore = () => {
    setShowModalScore(false)
    setScore(0)
  }
  const onHoverBox = () => {
    if (start) {
      setScore((prevScore) => prevScore + POINT_VALUE)
    }
  }

  useEffect(() => {
    let intervalId = null

    if (start) {
      intervalId = setInterval(() => {
        const { x, y } = getRandomPosition()

        setBoxPosition({ x, y })
      }, BOX_RANDOM_POSITON_TIME)
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }, [start])

  useEffect(() => {
    let intervalId = null

    if (start) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime === 0) {
            confetti() // -> Should be here?????? 🤔
            setStart(false) // -> Should be here?????? 🤔
            setShowModalScore(true) // -> Should be here?????? 🤔

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
        className="box"
        style={{
          '--size': `${BOX_SIZE}px`,
          '--pos-x': `${boxPosition.x}px`,
          '--pos-y': `${boxPosition.y}px`,
          display: start ? 'block' : 'none',
        }}
        onMouseEnter={onHoverBox}
      />

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

      {showModalScore && (
        <WinnerModal
          onCloseModal={handleHideScore}
          score={score}
        />
      )}
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
