import { useState, useEffect } from "react";

import { doctors } from "../../data/doctors";

export default function DebouncedSearch() {
    const [searchText,setSearchText] = useState("");
    const [debouncedText, setDebouncedText] = useState("");

    const query = debouncedText.trim().toLowerCase();

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query)
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedText(searchText);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText]);


    return (
        <div>
            <h2>Debounced Search</h2>
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
            />

            <p>Search Text: {searchText}</p>
            <p>Debounced Text: {debouncedText}</p>

            <h3>Filtered Doctors</h3>
            <ul>
                {filteredDoctors.map((doctor) => (
                    <li key={doctor.id}>
                        <strong>{doctor.name}</strong> - {doctor.specialization}
                    </li>
                ))}
            </ul>
        </div>
    );
}