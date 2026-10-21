import { useState } from "react";
import { doctors } from "../../data/doctors";
import "./DoctorPagination.css";

export default function DoctorPagination() {
    const [currentPage, setCurrentPage] = useState(1);

    const doctorsPerPage = 10;

    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    const startIndex = (currentPage - 1) * doctorsPerPage;

    const paginatedDoctors = doctors.slice(startIndex, startIndex + doctorsPerPage);

    return (
        <section className="pagination">
            <header className="pagination__header">
                <h2 className="pagination__title">Doctors</h2>
                <p className="pagination__meta">
                    Showing {startIndex + 1}–{startIndex + paginatedDoctors.length} of {doctors.length}
                </p>
            </header>

            <ul className="pagination__list">
                {paginatedDoctors.map((doctor) => (
                    <li key={doctor.id} className="pagination__item">
                        <span className="pagination__name">{doctor.name}</span>
                        <span className="pagination__tag">{doctor.specialization}</span>
                    </li>
                ))}
            </ul>

            <nav className="pagination__controls" aria-label="Pagination">
                <button
                    className="pagination__button"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="pagination__status">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="pagination__button"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </nav>
        </section>
    );
}
