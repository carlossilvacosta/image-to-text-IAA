import React, { useState } from 'react';
import './App.css';

function ImageCaptioningApp() {
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Enviando requisição pra /describe-image com a URL:', imageUrl);
      const response = await fetch('http://localhost:5000/describe-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      const data = await response.json();
      console.log('Recebendo resposta da API:', data);
      if (data.description) {
        setCaption(data.description[0]);
      } else {
        console.error('Error in response:', data.error);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="container">
      <h1>Descrição de Imagens</h1>
      <form onSubmit={handleSubmit} className="form">
        {imageUrl && <img src={imageUrl} alt="Preview" className="preview-image" />}
        <input
          type="text"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Insira a URL da imagem"
        />
        <button type="submit" className="btn">Gerar Descrição</button>
      </form>
      {caption && (
        <div className="caption-box">
          <strong>Descrição:</strong> {caption}
        </div>
      )}
    </div>
  );
}

export default ImageCaptioningApp;
