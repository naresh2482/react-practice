import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

import { doctors } from "../../data/doctors";

export default function DebouncedSearchWithCustomHook() {
    const [searchText,setSearchText] = useState("");
    const debouncedText = useDebounce(searchText, 300);

    const query = debouncedText.trim().toLowerCase();

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query)
    );

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