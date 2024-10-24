import React, { useEffect, useState } from 'react';
import { getNewsletters, createNewsletter, sendNewsletter, scheduleNewsletter, deleteNewsletter } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

function NewsletterList() {
  const [newsletters, setNewsletters] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = () => {
    getNewsletters()
      .then(response => setNewsletters(response.data))
      .catch(error => console.error('Error fetching newsletters:', error));
  };

  const handleCreateNewsletter = () => {
    const formData = new FormData();
    formData.append('title', newTitle);
    if (pdfFile) {
      formData.append('content_pdf', pdfFile);
    }
    if (imageFile) {
      formData.append('content_image', imageFile);
    }

    createNewsletter(formData)
      .then(() => {
        setNewTitle('');
        setPdfFile(null);
        setImageFile(null);
        document.getElementById('pdf-input').value = "";
        document.getElementById('image-input').value = "";
        fetchNewsletters();
      })
      .catch(error => console.error('Error creating newsletter:', error));
  };

  const handleSendNewsletter = (id) => {
    sendNewsletter(id)
      .then(() => alert('Newsletter enviada exitosamente'))
      .catch(error => console.error('Error al enviar la newsletter:', error));
  };

  const handleDeleteNewsletter = (id) => {
    deleteNewsletter(id)
      .then(() => {
        alert('Newsletter eliminada exitosamente');
        fetchNewsletters();
      })
      .catch(error => console.error('Error al borrar la newsletter:', error));
  };

  const handleScheduleNewsletter = (id) => {
    const scheduledFor = prompt('Ingrese la fecha de envío (YYYY-MM-DDTHH:MM:SSZ):');
    if (scheduledFor) {
      scheduleNewsletter(id, scheduledFor)
        .then(() => alert('Newsletter programada exitosamente'))
        .catch(error => console.error('Error al programar la newsletter:', error));
    }
  };

  return (
    <div className="newsletter-container">
      <h2>Lista de Newsletters</h2>
      <ul>
        {newsletters.map(newsletter => (
          <li key={newsletter.id}>
            {newsletter.id}
            {newsletter.title}
            <div className="button-group">
              <button onClick={() => handleSendNewsletter(newsletter.id)}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button onClick={() => handleScheduleNewsletter(newsletter.id)}>
                <FontAwesomeIcon icon={faCalendarAlt} />
              </button>
              <button onClick={() => handleDeleteNewsletter(newsletter.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Crear Nueva Newsletter</h3>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Título de la newsletter"
      />
      <input
        id="pdf-input"
        type="file"
        onChange={(e) => setPdfFile(e.target.files[0])}
        accept="application/pdf"
      />
      <input
        id="image-input"
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        accept="image/*"
      />
      <button onClick={handleCreateNewsletter}>Crear Newsletter</button>
    </div>
  );
}

export default NewsletterList;