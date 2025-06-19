import React, { useState } from 'react';
import './programs-create.css';

const ProgramsCreate = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        type: '',
        modality: '',
        date: '',
        place: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Guardando...');

        const payload = {
            ...form,
            place: form.place.trim() || null
        };

        // Envío real con fetch
        try {
            const res = await fetch('/programs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer TU_TOKEN_AQUI'
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                setMessage(result.message || 'Error al guardar.');
                return;
            }

            setMessage('Programa creado exitosamente.');
            setForm({
                name: '',
                description: '',
                type: '',
                modality: '',
                date: '',
                place: ''
            });
        } catch (err) {
            console.error(err);
            setMessage('Error de red o servidor.');
        }

        /*
        // Mock sin backend
        console.log('Mock enviado:', payload);
        setMessage('Programa creado exitosamente (mock).');
        setForm({
            name: '',
            description: '',
            type: '',
            modality: '',
            date: '',
            place: ''
        });
        */
    };

    return (
        <div className="container">
            <h1>Crear Programa</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre *</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />

                <label htmlFor="description">Descripción *</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} required />

                <label htmlFor="type">Tipo *</label>
                <select id="type" name="type" value={form.type} onChange={handleChange} required>
                    <option value="">Seleccione una opción</option>
                    <option>Ansiedad</option>
                    <option>Depresión</option>
                    <option>TDAH</option>
                    <option>Trastornos alimenticios</option>
                    <option>Estrés postraumático</option>
                    <option>Duelo</option>
                    <option>Relaciones</option>
                    <option>Autoestima</option>
                    <option>Otro</option>
                </select>

                <label htmlFor="modality">Modalidad *</label>
                <select id="modality" name="modality" value={form.modality} onChange={handleChange} required>
                    <option value="">Seleccione una opción</option>
                    <option>Virtual</option>
                    <option>Presencial</option>
                </select>

                <label htmlFor="date">Fecha *</label>
                <input type="date" id="date" name="date" value={form.date} onChange={handleChange} required />

                <label htmlFor="place">Lugar</label>
                <input type="text" id="place" name="place" value={form.place} onChange={handleChange} />

                <button type="submit">Guardar Programa</button>
            </form>

            {message && <p id="message">{message}</p>}
        </div>
    );
};

export default ProgramsCreate;