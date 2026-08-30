export default function SubjectUnits ({ units, onUnitClick }) {
    if (!units || units.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col">
            {units.map((unit) => (
                <button
                    key={unit.slug}
                    className="noteContainer"
                    onClick={() => onUnitClick(unit)}
                >
                    <h1>
                        {unit.number && `Unit ${unit.number}: `}
                        {unit.name}
                    </h1>
                </button>
            ))}
        </div>
    )
}