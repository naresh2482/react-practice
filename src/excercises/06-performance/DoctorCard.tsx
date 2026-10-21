import { memo } from "react";

type DoctorCardProps = {
    name: string;
    specialization: string;
    onSelect: (name: string) => void;
};

const DoctorCard = memo(function DoctorCard({
    name,
    specialization,
    onSelect
}: DoctorCardProps) {
    console.log("DoctorCard rendered:", name);

    return (
        <li>
            <strong>{name}</strong> - {specialization}

            <button onClick={() => onSelect(name)}>Select</button>
        </li>
    );
});

export default DoctorCard;