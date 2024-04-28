import React, { useState, useEffect } from 'react';
import './App.css';
import {images} from './images';

const savedImages = localStorage.getItem('classifiedImages');
console.log("savedImages");
const previouslyClassifiedImages = savedImages ?JSON.parse(savedImages) : {};
console.log("savedImages", Object.keys(previouslyClassifiedImages).length);


const unclassifiedImages = images.filter((image) => !previouslyClassifiedImages.hasOwnProperty(image));
console.log("unclassifiedImages", unclassifiedImages.length);
function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [classifiedImages, setClassifiedImages] = useState(previouslyClassifiedImages);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        setClassifiedImages(prevState => ({
          ...prevState,
          [unclassifiedImages[currentImageIndex]]: event.key === 'ArrowRight' ? 'right' : 'left',
        }));
        setCurrentImageIndex(prevIndex => prevIndex + 1);
      }else if (event.key === 'Backspace') {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex]);

  useEffect(() => {

  }, []);

  const saveProgress = () => {
    const save = JSON.stringify(classifiedImages);
    localStorage.setItem('classifiedImages', save);
    localStorage.setItem(`classifiedImages-${Date.now()}`, save);
  };


  return (
    <div className="App">
      <header className="App-header">
      
      {unclassifiedImages.length > currentImageIndex ? (
        <>
          <img src={unclassifiedImages[currentImageIndex]} className="App-logo"  alt="classification" />
          <p>
          Raccourcis :
        </p>
        <p>
           ⬅️ Photo en situation réelle
        </p>
        <p>
           ➡️ Packshot
        </p>  
        </>
      ) : (
        <p>No more images to classify.</p>
      )}
      </header>

      <button onClick={() => saveProgress()}>Save Progress</button>
    </div>
  );
}

export default App;