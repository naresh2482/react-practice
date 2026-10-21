import { useState } from "react";

interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

const doctors: Doctor[] = [
    { id: 1, name: "Rahul Sharma", specialization: "Cardiology" },
    { id: 2, name: "Priya Mehta", specialization: "Neurology" },
    { id: 3, name: "Amit Patil", specialization: "Orthopedics" },
    { id: 4, name: "Smita Patil", specialization: "Cardiology" },
];

export default function DoctorSearch() {
    const [searchText, setText] = useState("");

    const query = searchText.trim().toLowerCase();

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query)
    );

    return (
        <div>
            <h2>Doctor Search</h2>

            <input
                type="text"
                placeholder="Search doctors..."
                value={searchText}
                onChange={(e) => setText(e.target.value)}
            />

            {filteredDoctors.length === 0 ? (
                <p>No doctors found</p>
            ) : (
                <ul>
                    {filteredDoctors.map((doctor) => (
                        <li key={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => setText("")}
                disabled={searchText.length === 0}
            >
                Clear Search
            </button>
        </div>
    );
}