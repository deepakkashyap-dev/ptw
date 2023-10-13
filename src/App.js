import './App.css';
import React from 'react';

function App() {
  const [slides] = React.useState([...imageList])
  const [currentIndex, setIndex] = React.useState(0)
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  function sliceList() {
    const start = currentIndex;
    const end = currentIndex + 11;
    if (end > slides.length) {
      return slides.slice(start).concat(slides.slice(0, end % slides.length));
    }
    else {
      return slides.slice(start, end);
    }
  }

  function bottomButton(inx) {
    if ((inx - 5) < 0) {
      setIndex(slides.length + (inx - 5))
    }
    else {
      setIndex(inx - 5)
    }
  }


  function bottomButtonClass() {
    if ((currentIndex + 5) >= slides.length) {
      return (5 - (slides.length - currentIndex))
    }
    else {
      return currentIndex + 5
    }
  }

  return (
    <div className="slider-container">
      <div className="slider">
        {isMobileView ? (
          <div
            className={`slide`}
            style={{
              backgroundImage: `url(${slides[currentIndex]})`,
            }}
          >
          </div>
        )
          : (
            sliceList().map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === 5 ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              >
              </div>
            ))
          )
        }
      </div>
      {isMobileView &&
        <>
          <button className="carousel-button left" onClick={prevSlide}> &#9664;</button>
          <button className="carousel-button right" onClick={nextSlide}>&#9654;</button>
        </>
      }
      <div className="slider-controls">
        {!isMobileView && slides.map((_, index) => (
          <button
            key={index}
            onClick={() => bottomButton(index)}
            className={index === bottomButtonClass(index) ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

var imageList = [
  "/assets/images/image-1.jpg",
  "/assets/images/image-2.jpg",
  "/assets/images/image-3.jpg",
  "/assets/images/image-4.jpg",
  "/assets/images/image-5.jpg",
  "/assets/images/image-6.jpg",
  "/assets/images/image-7.jpg",
  "/assets/images/image-8.jpg",
  "/assets/images/image-9.jpg",
  "/assets/images/image-10.jpg",
  "/assets/images/image-11.jpg",
  "/assets/images/image-12.jpg",
  "/assets/images/image-13.jpg",
  "/assets/images/image-14.jpg",
  "/assets/images/image-15.jpg",
  "/assets/images/image-16.jpg",
  "/assets/images/image-17.jpg",
]
