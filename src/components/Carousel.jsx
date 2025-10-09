import { useState, useEffect } from 'react'
import './Carousel.css'
import logo from '../assets/images/logo.jpg'
import agendamento from '../assets/images/agendamento.jpg'

function Carousel() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [logo, agendamento]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="carousel">
      <img src={images[currentImage]} alt="TimeRight" className="carousel-image" />
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentImage ? 'active' : ''}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel