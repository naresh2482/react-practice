import { useCallback, useMemo, useState } from "react";
import { doctors } from "../../data/doctors";
import DoctorCard from "./DoctorCard";

export default function PerformanceDemo() {
    const [count, setCount] = useState(0);
    const [searchText, setSearchText] = useState("");
    
    const filteredDoctors = useMemo(() => {

        console.log("Filtering doctors...");

        const query = searchText.trim().toLowerCase();
        
        return doctors.filter((doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialization.toLowerCase().includes(query)
        );
    }, [searchText]);

    const handleSelectDoctor = useCallback((name: string) => {
        console.log("Selected doctor:", name);
    }, []);
    
    console.log("PerformanceDemo rendered:", count);

    return (
        <div>
            <h2>Performance Demo</h2>
            <button onClick={() => setCount(count => count + 1)}>
                Count: {count}
            </button>

            <ul>
                <DoctorCard 
                    name="Dr. Smith"
                    specialization="Cardiology"
                    onSelect={handleSelectDoctor}
                />
            </ul>

            <input 
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search doctors..."
            />

            <p>Matching doctors: {filteredDoctors.length}</p>
        </div>
    );
}