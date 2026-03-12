import React, { createContext, useState, useContext } from 'react';

const ClinicContext = createContext();

// Initial Mock Data
const generateId = () => Math.random().toString(36).substr(2, 9);

const MOCK_PETS = [
    { id: '1', name: 'Cooper', type: 'Cão', breed: 'Golden Retriever', age: '3 anos', owner: 'David Brown', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVNyjxwiNOGskn0HMtWlgY0nO3bp7Sk1CZvu9A_eqH8mISCIemfFmEkbTWung1zQc909zQUqwFUud7G_WX5EYuW0pZi7gp6VIo_aA4wYHHRyDlIa7dAFi5icqynb4WgDAt_JNOvG6k70YsbIn-0KmN1gFGGimlGZZJL_rLIcmSaQmxeQXOSnmeTTnJzbiKjOjH6fZ6lKBBxm-B-sAk1Iuur-Wi1HJ3bImbKAbRRKHL-wgM31zz5X6ejkKTUujnMjKssQGR3y_X62Y' },
    { id: '2', name: 'Luna', type: 'Gato', breed: 'Gato Siamês', age: '1 ano', owner: 'Sarah Miller', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTx5lHjvKXgpceDor3q_XAvjnv7flAHUX6C6hEyPYAksoa0v2F9SJTOAg4hg2s44WdON_I5PYBNu9-el7pUotcHilFI3cFogvMdR0eFKWPvNqffNxnlcdZ8fG5sUI6fOoNoHMabeWVMTXFj6eRZQIN1IApbLJr6oI6lPg-D2n5ZzT0iwP7BiXAneDrOI8sX5HTHRJ5o2QULUGSKQFy5aW5GYWzSZ3Zw0CH_H7l_9FE--DoDOA8GY3BRXLGLy-D7riDRnXkts-CcC4' },
    { id: '3', name: 'Oliver', type: 'Cão', breed: 'Beagle', age: '4 anos e 2 meses', owner: 'Sarah Jenkins', weight: '14.2 kg', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW8Ay36_sL1qN6yXBSqwc-PtPoxZWuvwf5Ns7US-X9Xxb1fsFV1gWFPXMHFEhAa0YR6TGk549ICkLkk2xzaS34tshD2oD46coXbxVm75Ok9PW4BAVyjSDNsFIh5LKxU7CoLvqHXm1nukxpSES_LuttsuB0fnEGCkHqAfW6doCcjvOA7gGjnrxZ1VFvTPTMZnVigwnGuUQgvUL7soTVNurp233nzU_UZjddH1ALANmX69JKXHQhTPAQEeVaBSNZE36OtLPfga9FkLw' },
    { id: '4', name: 'Max', type: 'Cão', breed: 'Golden Retriever', age: '2 anos', owner: 'Lara Croft', img: null },
    { id: '5', name: 'Milo', type: 'Cão', breed: 'Bulldog Francês', age: '5 anos', owner: 'John Doe', img: null }
];

const MOCK_APPOINTMENTS = [
    { id: '101', date: 23, time: '09:00', period: 'AM', petId: '3', reason: 'Consulta', doctor: 'Dr. Julian Vance', room: 'Sala 01', status: 'In Progress' }, // Oliver
    { id: '102', date: 23, time: '10:00', period: 'AM', petId: '2', reason: 'Limpeza Dental', doctor: 'Dra. Elena Smith', room: 'Sala 02', status: 'Checked In' }, // Luna
    { id: '103', date: 23, time: '11:30', period: 'AM', petId: '4', reason: 'Cirurgia de Castração', doctor: 'Dr. Marcus Vance', room: 'Sala 04', status: 'Scheduled' }, // Max
    { id: '104', date: 23, time: '02:00', period: 'PM', petId: '5', reason: 'Consulta', doctor: 'Dra. Elena Smith', room: 'Sala 01', status: 'Scheduled' } // Milo
];


export const ClinicProvider = ({ children }) => {
    const [pets, setPets] = useState(MOCK_PETS);
    const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

    // --- Client Actions ---
    const addAppointment = (newAppointment) => {
        const apt = {
            ...newAppointment,
            id: generateId(),
            status: 'Scheduled',
            doctor: 'Dra. Sarah Johnson', // default
            room: 'Sala 02' // default
        };
        setAppointments([...appointments, apt]);
    };

    const getMyPets = () => pets.filter(p => ['1', '2'].includes(p.id)); // Simulate Cooper and Luna belonging to logged client

    // --- Receptionist Actions ---
    const getTodayAppointments = () => {
        // Mock today is the 23rd
        let todayApts = appointments.filter(a => a.date === 23);
        // Sort by time
        return todayApts.sort((a, b) => {
            let timeA = parseInt(a.time.replace(':', ''));
            let timeB = parseInt(b.time.replace(':', ''));
            if (a.period === 'PM' && a.time !== '12:00') timeA += 1200;
            if (b.period === 'PM' && b.time !== '12:00') timeB += 1200;
            return timeA - timeB;
        });
    };

    const updateAppointmentStatus = (id, newStatus) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    };


    // --- Vet Actions ---
    const getVetAppointments = () => {
        return getTodayAppointments(); // All today appointments 
    };

    const getCurrentPatient = () => {
        // Find the one in progress. If none, find checked in.
        let current = appointments.find(a => a.status === 'In Progress' && a.date === 23);
        if (!current) {
            current = appointments.find(a => a.status === 'Checked In' && a.date === 23);
        }

        if (current) {
            return {
                appointment: current,
                pet: getPetById(current.petId)
            }
        }
        return null;
    }

    const saveSession = (appointmentId, notes, prescriptions) => {
        // In a real app we'd save the notes to a DB. 
        // Here we just mark the appointment as Complete
        updateAppointmentStatus(appointmentId, 'Completed');
    }

    // Utilities
    const getPetById = (id) => pets.find(p => p.id === id);


    return (
        <ClinicContext.Provider value={{
            pets,
            appointments,
            getPetById,
            addAppointment,
            getMyPets,
            getTodayAppointments,
            updateAppointmentStatus,
            getVetAppointments,
            getCurrentPatient,
            saveSession
        }}>
            {children}
        </ClinicContext.Provider>
    );
};

export const useClinic = () => useContext(ClinicContext);
