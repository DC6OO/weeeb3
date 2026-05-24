import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import EventForm from '../components/EventForm';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data)).catch(() => navigate('/'));
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    await api.put(`/events/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    navigate(`/events/${id}`);
  };

  if (!event) return <div className="container page-center"><div className="spinner" /></div>;

  return (
    <div className="container narrow">
      <h1>Edit Event</h1>
      <EventForm initial={event} onSubmit={handleSubmit} submitLabel="Update Event" />
    </div>
  );
}
