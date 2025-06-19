import React, { useEffect, useState } from 'react';
import './programs-edit.css';

const ProgramsEdit = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        type: '',
        modality: '',
        date: '',
        place: ''
    });
    const [message, setMessage] = useState('');
    const [programId, setProgramId] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            setMessage('ID de programa no especificado.');
            return;
        }

        setProgramId(id);
        loadProgram(id);
    }, []);

    const loadProgram = async (id) => {
        try {
            const res = await fetch('/getall', {
                headers: {
                    Authorization: 'Bearer TU_TOKEN_AQUI'
                }
            });

            const data = await res.json();
            const program = data.programss.find(p => p._id === id);

            if (!program) {
                setMessage('Programa no encontrado.');
                return;
            }

            setForm({
                name: program.name,
                description: program.description,
                type: program.type,
                modality: program.modality,
                date: program.date.split('T')[0],
                place: program.place || ''
            });
            setMessage('');
        } catch (err) {
            console.error(err);
            setMessage('Error al cargar el programa.');
        }

        /*
        // Mock
        const mockProgram = {
            _id: '123abc',
            name: 'Terapia de autoestima',
            description: 'Sesiones para fortalecer el autoconcepto.',
            type: 'Autoestima',
            modality: 'Presencial',
            date: '2025-07-20',
            place: 'Centro de salud'
        };

        if (id === mockProgram._id) {
            setForm({ ...mockProgram });
            setMessage('');
        }
        */
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Actualizando...');

        const payload = {
            ...form,
            place: form.place.trim() || null
        };

        try {
            const res = await fetch(`/${programId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer TU_TOKEN_AQUI'
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) {
                setMessage(result.message || 'Error al actualizar.');
                return;
            }

            setMessage('Programa actualizado exitosamente.');
        } catch (err) {
            console.error(err);
            setMessage('Error de red o servidor.');
        }

        /*
        // Mock actualización
        console.log('Mock PUT:', payload);
        setMessage('Programa actualizado exitosamente (mock).');
        */
    };

    return (
        <div className="container">
            <h1>Editar Programa</h1>

            {message && <p id="message">{message}</p>}

            {programId && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />

                    <label htmlFor="description">Descripción *</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required />

                    <label htmlFor="type">Tipo *</label>
                    <select name="type" value={form.type} onChange={handleChange} required>
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
                    <select name="modality" value={form.modality} onChange={handleChange} required>
                        <option value="">Seleccione una opción</option>
                        <option>Virtual</option>
                        <option>Presencial</option>
                    </select>

                    <label htmlFor="date">Fecha *</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} required />

                    <label htmlFor="place">Lugar</label>
                    <input type="text" name="place" value={form.place} onChange={handleChange} />

                    <button type="submit">Actualizar Programa</button>
                </form>
            )}
        </div>
    );
};

export default ProgramsEdit;