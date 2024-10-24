import React, { useEffect, useState } from 'react';
import { getSubscribers, createSubscriber } from '../services/api';

function SubscriberList() {
  const [subscribers, setSubscribers] = useState([]);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = () => {
    getSubscribers()
      .then(response => setSubscribers(response.data))
      .catch(error => console.error('Error fetching subscribers:', error));
  };

  const handleCreateSubscriber = () => {
    const subscriber = { email: newEmail };
    createSubscriber(subscriber)
      .then(() => {
        setNewEmail('');
        fetchSubscribers();
      })
      .catch(error => console.error('Error creating subscriber:', error));
  };

  return (
    <div className="subscriber-container">
      <h2>Lista de Suscriptores</h2>
      <ul>
        {subscribers.map(subscriber => (
          <li key={subscriber.id}>{subscriber.email}</li>
        ))}
      </ul>
      <h3>Agregar Nuevo Suscriptor</h3>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="Correo electrónico"
      />
      <button onClick={handleCreateSubscriber}>Agregar Suscriptor</button>
    </div>
  );
}

export default SubscriberList;