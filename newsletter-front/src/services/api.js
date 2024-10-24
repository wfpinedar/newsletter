import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
export const getNewsletters = () => axios.get(`${API_BASE_URL}/newsletters/`);
export const createNewsletter = (newsletter) => axios.post(`${API_BASE_URL}/newsletters/`, newsletter);
export const sendNewsletter = (id) => axios.post(`${API_BASE_URL}/newsletters/${id}/send/`);
export const scheduleNewsletter = (id, scheduledFor) => axios.post(`${API_BASE_URL}/newsletters/${id}/schedule/`, { scheduled_for: scheduledFor });
export const deleteNewsletter = (id) => axios.delete(`${API_BASE_URL}/newsletters/${id}/`);

export const getSubscribers = () => axios.get(`${API_BASE_URL}/subscribers/`);
export const createSubscriber = (subscriber) => axios.post(`${API_BASE_URL}/subscribers/`, subscriber);
export const unsubscribeUser = (email) => axios.get(`${API_BASE_URL}/unsubscribe/${email}/`);