import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [sparkles, setSparkles] = useState([])
  const [gifKey, setGifKey] = useState(0)
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    // Crear brillitos aleatorios
    const createSparkle = () => {
      const newSparkle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        animationDuration: Math.random() * 3 + 2
      }
      setSparkles(prev => [...prev, newSparkle])
    }

    // Crear confeti
    const createConfetti = () => {
      const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
      const newConfetti = {
        id: Math.random(),
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 5,
        rotation: Math.random() * 360,
        speed: Math.random() * 2 + 1
      }
      setConfetti(prev => [...prev, newConfetti])
    }

    // Crear brillitos cada 300ms
    const interval = setInterval(createSparkle, 300)

    // Crear confeti cada 200ms
    const confettiInterval = setInterval(createConfetti, 200)

    // Limpiar brillitos antiguos
    const cleanup = setInterval(() => {
      setSparkles(prev => prev.slice(-20))
    }, 5000)

    // Limpiar confeti antiguo
    const confettiCleanup = setInterval(() => {
      setConfetti(prev => prev.slice(-50))
    }, 8000)

    // Forzar la reproducción de GIFs cada 5 segundos
    const gifRefresh = setInterval(() => {
      setGifKey(prev => prev + 1)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(confettiInterval)
      clearInterval(cleanup)
      clearInterval(confettiCleanup)
      clearInterval(gifRefresh)
    }
  }, [])

  // Actualizar posición del confeti
  useEffect(() => {
    const confettiAnimation = setInterval(() => {
      setConfetti(prev => 
        prev.map(conf => ({
          ...conf,
          y: conf.y + conf.speed,
          rotation: conf.rotation + 2
        })).filter(conf => conf.y < 110)
      )
    }, 50)

    return () => clearInterval(confettiAnimation)
  }, [])

  return (
    <div className="birthday-container">
      {/* Fondo degradado */}
      <div className="gradient-bg"></div>
      
      {/* Confeti cayendo */}
      {confetti.map(conf => (
        <div
          key={conf.id}
          className="confetti"
          style={{
            left: `${conf.x}%`,
            top: `${conf.y}%`,
            backgroundColor: conf.color,
            width: `${conf.size}px`,
            height: `${conf.size}px`,
            transform: `rotate(${conf.rotation}deg)`
          }}
        />
      ))}
      
      {/* Brillitos flotantes */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.animationDuration}s`
          }}
        />
      ))}

      {/* Mensaje principal */}
      <div className="birthday-message">
        <h1>¡FELIZ CUMPLEAÑOS MI AMOR!</h1>
      </div>

      {/* Pingüinos alrededor - más grandes y juntos */}
      <div className="penguins-container">
        <div className="penguin penguin-1">
          <img 
            key={`penguin1-${gifKey}`}
            src={`/penguin gif 1.gif?t=${gifKey}`} 
            alt="Pingüino 1" 
          />
        </div>
        <div className="penguin penguin-2">
          <img 
            key={`penguin2-${gifKey}`}
            src={`/penguin gif 2.gif?t=${gifKey}`} 
            alt="Pingüino 2" 
          />
        </div>
        <div className="penguin penguin-3">
          <img 
            key={`penguin3-${gifKey}`}
            src={`/pengiun gif 3.gif?t=${gifKey}`} 
            alt="Pingüino 3" 
          />
        </div>
        <div className="penguin penguin-4">
          <img 
            key={`penguin4-${gifKey}`}
            src={`/penguin gif 4.gif?t=${gifKey}`} 
            alt="Pingüino 4" 
          />
        </div>
        <div className="penguin penguin-5">
          <img 
            key={`penguin5-${gifKey}`}
            src={`/penguin gif 5.gif?t=${gifKey}`} 
            alt="Pingüino 5" 
          />
        </div>
        <div className="penguin kitty-1">
          <img 
            key={`kitty1-${gifKey}`}
            src={`/kitty gif 1.gif?t=${gifKey}`} 
            alt="Hello Kitty" 
          />
        </div>
      </div>
    </div>
  )
}

export default App
