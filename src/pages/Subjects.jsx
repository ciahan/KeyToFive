import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SubjectUnits from '../components/SubjectUnits.jsx';

import { AP_SubjectsData, Categories } from '../data/data.js'

function findUnitByPath(units, slugs) {
    if (!units || slugs.length === 0) {
        return null;
    }

    const currentUnit = units.find(
        (unit) => unit.slug === slugs[0]
    );

    if (!currentUnit) {
        return null;
    };

    // reached the final slug
    if (slugs.length === 1) {
        return currentUnit;
    };

    // search the next level
    return findUnitByPath(
        currentUnit.units,
        slugs.slice(1)
    );
}

function findParentUnit(units, slugs) {
    if (!units || slugs.length <= 1) {
        return null;
    }

    return findUnitByPath(
        units,
        slugs.slice(0, -1)
    );
}

export default function Subjects() {
    const { subjectSlug, noteSlug, "*": unitPath } = useParams();
    const navigate = useNavigate();

    const selectedSubject = subjectSlug
        ? AP_SubjectsData.find((subject) => subject.slug === subjectSlug)
        : null;
    const selectedNote = noteSlug
        ? selectedSubject?.notes?.find((note) => note.slug === noteSlug)
        : null;

    const unitSlugs = unitPath
        ? unitPath.split("/")
        : [];
    const selectedUnit = findUnitByPath(
        selectedNote?.units,
        unitSlugs
    );

    const handleUnitClick = (unit) => {
        const newUnitPath = unitPath
            ? `${unitPath}/${unit.slug}`
            : unit.slug;

        navigate(
            `/subjects/${selectedSubject.slug}/${selectedNote.slug}/${newUnitPath}`
        );
    }

    const parentUnit = findParentUnit(
        selectedNote?.units,
        unitSlugs
    );

    const [subjectSearch, setSubjectSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const filteredSubjects = AP_SubjectsData.filter((subject) => {
        const matchesSearch = subject.title.toLowerCase().includes(subjectSearch.toLowerCase());
        const matchesCategory = activeCategory === 'All' || subject.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    useEffect(() => {
        if (subjectSlug) {
            window.scrollTo(0, 0);
        } else {
            const savedPosition =
                sessionStorage.getItem('subjectsScrollPosition');
            if (savedPosition !== null) {
                requestAnimationFrame(() => {
                    window.scrollTo(0, Number(savedPosition));
                });
            }
        }
    }, [subjectSlug]);

    return (
        <>
            <Header />
            <main>
                <div className="page">  
                    {selectedUnit ? (
                        <div className="flex flex-col gap-8 w-full">
                            <div>
                                <button
                                    className="backButton"
                                    onClick={() => navigate(-1)}
                                >
                                    ← Back to { }
                                    {parentUnit
                                        ? parentUnit.name
                                        : `${selectedNote.title} (${selectedNote.year})`
                                    }
                                </button>
                            </div>
                            <div className="h0">
                                {selectedUnit.number && `Unit ${selectedUnit.number}: `}
                                {selectedUnit.name}
                            </div>

                            {selectedUnit.units?.length > 0 ? (
                                <SubjectUnits
                                    units={selectedUnit.units}
                                    onUnitClick={handleUnitClick}
                                />
                            ) : (
                                <a
                                    href={selectedUnit.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="buttonMed"
                                >
                                    Open Notes
                                </a>
                            )}
                        </div>
                    ) : selectedNote ? (
                        <div className="flex flex-col gap-8 w-full">
                            <div>
                                <button
                                    className="backButton"
                                    onClick={() => navigate(`/subjects/${selectedSubject.slug}`)}
                                >
                                    ← Back to {selectedSubject.title} Notes
                                </button>
                            </div>

                            <div className="h0"> {selectedNote.title} ({selectedNote.year})</div>
                            <div className="flex flex-col gap-1 items">
                                <h4><span className="highlight-text">Platform:</span> {selectedNote.platform}</h4>
                                <h4><span className="highlight-text">Contributor(s):</span> {selectedNote.contributors.join(', ')}</h4>
                            </div>
                            {selectedNote.units?.length > 0 ? (
                                <SubjectUnits
                                    units={selectedNote.units}
                                    onUnitClick={handleUnitClick}
                                />
                            ) : (
                                <a
                                    href={selectedNote.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="buttonBig"
                                >
                                    Open Full Note Set
                                </a>
                            )}
                        </div>
                    ) : selectedSubject ? (
                        /* NOTES DETAIL */
                        <div className="flex flex-col gap-8 w-full">
                            {/* BACK BUTTON */}
                            <div>
                                <button
                                className="backButton"
                                onClick={() => navigate('/subjects')}
                                >
                                ← Back to All Subjects
                                </button>
                            </div>

                            {/* SUBJECT NOTES TITLE */}
                            <div className="h0">
                                {selectedSubject.title} Notes
                            </div>

                            <div className="flex flex-col gap-4">
                                {selectedSubject.notes.length === 0 ? (
                                    <h2> Notes incoming, please check in later! </h2>
                                ) : (
                                    selectedSubject.notes.map((note) => (
                                    <a
                                        key = {note.id}
                                        className = "noteContainer"
                                        onClick={() =>
                                            navigate(`/subjects/${selectedSubject.slug}/${note.slug}`)
                                        }
                                    >
                                        <h1>{note.title} ({note.year})</h1>
                                        <div>
                                            <h4><span className="highlight-text">Platform:</span> {note.platform}</h4>
                                            <h4><span className="highlight-text">Contributor(s):</span> {note.contributors.join(', ')}</h4>
                                        </div>
                                        {note.description && 
                                            <p className="description">
                                                {note.description}
                                            </p>
                                        }
                                    </a>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        /* SUBJECTS */
                        <div className="w-full flex flex-col gap-10 lg:gap-12">
                            {/* PAGE TITLE TEXT */}
                            <div className="flex flex-col gap-2">
                                <div className="h0">
                                    Available Subjects
                                </div>
                                <h2>Choose a subject to access notes and free resources</h2>          
                            </div>

                            {/* FILTERING METHODS */}
                            <div className="flex flex-col gap-3">
                                {/* SEARCH BAR */}
                                <div className="searchBar">
                                    <input
                                    type="text"
                                    placeholder="Search for a subject..."
                                    value={subjectSearch}
                                    onChange={(e) => setSubjectSearch(e.target.value)}
                                    />
                                </div>

                                {/* CATEGORIES TO FILTER */}
                                <div className="overflow-x-auto">
                                    <div className="flex w-max min-w-full justify-center gap-2 lg:gap-4 p-1">
                                        {Categories.map((category) => {
                                        const isActive = activeCategory === category.name;
                                        return (
                                            <button
                                            key={category.id}
                                            className={
                                                `category whitespace-nowrap
                                                ${activeCategory === category.name ? 'active' : ''}`
                                            }
                                            onClick={() => {
                                                if (activeCategory === category.name) {
                                                setActiveCategory('All');
                                                } else {
                                                setActiveCategory(category.name);
                                                }
                                            }}
                                            >
                                            {category.name}
                                            </button>
                                        );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* SUBJECTS DASHBOARD */}
                            <div className="flex flex-col gap-3">
                            {[...filteredSubjects]
                                .sort((a, b) => a.title.localeCompare(b.title)) // sort by alphabetical order
                                .map((subject) => (
                                <div 
                                    key={subject.id} 
                                    className="subjectCard w-full" 
                                    onClick={() => {
                                        sessionStorage.setItem(
                                            'subjectsScrollPosition',
                                            String(window.scrollY)
                                        );
                                        navigate(`/subjects/${subject.slug}`);
                                    }}
                                >
                                    <h1>{subject.title}</h1>
                                </div>
                            ))}
                            </div>

                            {/* NO MATCHING SUBJECTS MESSAGE (only relevant if something has been entered in the search bar) */}
                            {filteredSubjects.length === 0 && (
                            <h2> Sorry, no subjects match your search. </h2>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}