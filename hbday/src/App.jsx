import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [sparkles, setSparkles] = useState([])
  const [gifKey, setGifKey] = useState(0)
  const [confetti, setConfetti] = useState([])
  const [isImageRevealed, setIsImageRevealed] = useState(false)
  const [fadeInElements, setFadeInElements] = useState({
    title: false,
    text: false,
    image: false
  })
  const [stars, setStars] = useState([
    { id: 1, x: 20, y: 30, size: 20, rotation: 0, twinkleSpeed: 1.5 },
    { id: 2, x: 80, y: 60, size: 15, rotation: 45, twinkleSpeed: 2 },
    { id: 3, x: 50, y: 80, size: 25, rotation: 90, twinkleSpeed: 1 }
  ])

  useEffect(() => {
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

    const createConfetti = () => {
      const colors = ['#F2BAC9', '#BAF2E9', '#BAD7F2', '#F2E2BA', '#F2BAC9', '#BAF2E9', '#BAD7F2', '#F2E2BA'];
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

    const createStar = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && Math.random() > 0.3) return;
      
      const newStar = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 10,
        rotation: Math.random() * 360,
        twinkleSpeed: Math.random() * 2 + 1
      }
      setStars(prev => [...prev, newStar])
      console.log('Estrella creada:', newStar)
    }

    const interval = setInterval(createSparkle, 300)
    const confettiInterval = setInterval(createConfetti, 200)
    const starInterval = setInterval(createStar, window.innerWidth <= 768 ? 800 : 200)

    const cleanup = setInterval(() => {
      setSparkles(prev => prev.slice(-20))
    }, 5000)

    const confettiCleanup = setInterval(() => {
      setConfetti(prev => prev.slice(-50))
    }, 8000)

    const starCleanup = setInterval(() => {
      const isMobile = window.innerWidth <= 768;
      setStars(prev => prev.slice(isMobile ? -15 : -30))
    }, 10000)

    const gifRefresh = setInterval(() => {
      setGifKey(prev => prev + 1)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(confettiInterval)
      clearInterval(starInterval)
      clearInterval(cleanup)
      clearInterval(confettiCleanup)
      clearInterval(starCleanup)
      clearInterval(gifRefresh)
    }
  }, [])

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setFadeInElements(prev => ({ ...prev, title: true }))
    }, 500)

    const textTimer = setTimeout(() => {
      setFadeInElements(prev => ({ ...prev, text: true }))
    }, 1000)

    const imageTimer = setTimeout(() => {
      setFadeInElements(prev => ({ ...prev, image: true }))
    }, 1500)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(textTimer)
      clearTimeout(imageTimer)
    }
  }, [])

  const handleImageClick = () => {
    setIsImageRevealed(true)
  }

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

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setStars(prev => prev.slice(-15));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="birthday-container">
      <div className="gradient-bg"></div>
      
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

      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: `rotate(${star.rotation}deg)`,
            animationDuration: `${star.twinkleSpeed}s`
          }}
        />
      ))}

      <div className="birthday-message">
        <h1 className={fadeInElements.title ? 'fade-in' : 'fade-out'}>
          {(() => {
            const title = '¡Feliz Cumpleaños mi amor! :3';
            const maxChars = 18;
            const chars = title.split('');
            const lines = [];
            let currentLine = '';
            
            chars.forEach((char, index) => {
              if (currentLine.length < maxChars) {
                currentLine += char;
              } else {
                lines.push(currentLine);
                currentLine = char;
              }
            });
            if (currentLine) lines.push(currentLine);
            
            return lines.map((line, lineIndex) => (
              <div key={lineIndex} className="title-line">
                {line.split('').map((char, charIndex) => (
                  <span 
                    key={`${lineIndex}-${charIndex}`}
                    className="wave-letter"
                    style={{ animationDelay: `${(lineIndex * maxChars + charIndex) * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            ));
          })()}
        </h1>
        <div className="black-line"></div>
        <p className={`love-text ${fadeInElements.text ? 'fade-in' : 'fade-out'}`}>
          {(() => {
            const text = "Hola amor, hoy es tu cumpleaños, estoy tan contento de compartir mi vida contigo, me haces muy feliz. Y quiero que en tu cumpleaños lo pases hermoso, no estés triste por nada. Yo siempre voy a estar para cuidarte y amarte. Además de esta página hay un regalito más que quiero darte, dale click a la imagen para revelar que es!";
            const maxChars = 68;
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';
            
            words.forEach(word => {
              if ((currentLine + word).length <= maxChars) {
                currentLine += (currentLine ? ' ' : '') + word;
              } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
              }
            });
            if (currentLine) lines.push(currentLine);
            
            return lines.map((line, index) => (
              <span key={index}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ));
          })()}
        </p>
        
        <div className={`spoiler-image-container ${fadeInElements.image ? 'fade-in' : 'fade-out'}`}>
          <img 
            src="/spoiler imagen.jpg" 
            alt="Regalo sorpresa" 
            className={`spoiler-image ${isImageRevealed ? 'revealed' : ''}`}
            onClick={handleImageClick}
          />
        </div>
      </div>

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
        <div className="penguin frog-1">
          <img 
            key={`frog1-${gifKey}`}
            src={`/frog 1.webp?t=${gifKey}`} 
            alt="Rana 1" 
          />
        </div>
        <div className="penguin frog-2">
          <img 
            key={`frog2-${gifKey}`}
            src={`/frog 2.webp?t=${gifKey}`} 
            alt="Rana 2" 
          />
        </div>
      </div>
    </div>
  )
}

export default App
