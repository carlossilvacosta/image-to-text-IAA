import React, { useState } from 'react';
import './App.css';

function ImageCaptioningApp() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setCaption(data.prediction);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gerador de Legendas</h1>
      <form onSubmit={handleSubmit} className="form">
        {imageUrl && <img src={imageUrl} alt="Preview" className="preview-image" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" className="btn">Gerar Legenda</button>
      </form>
      {caption && (
        <div className="caption-box">
          <strong>Legenda:</strong> {caption}
        </div>
      )}
    </div>
  );
}

export default ImageCaptioningApp;
