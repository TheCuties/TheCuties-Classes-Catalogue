//this is only the UI for now.

const LEVEL_OPTIONS = [
  "Any level",
  "100-level",
  "200-level",
  "300-level",
  "400-level",
];


const TERM_OPTIONS = [
  "Any term",
  "Fall 2026",
  "Winter 2027",
];

function CourseFilters() {

  return (

    // Keep both dropdowns in a row and let them stack on small screens
    <div className="flex flex-col sm:flex-row gap-3">

      <select
        className="select select-bordered w-full sm:w-auto"
        defaultValue="Any level"
        aria-label="Course level"
      >
        {LEVEL_OPTIONS.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered w-full sm:w-auto"
        defaultValue="Fall 2026"
        aria-label="Term"
      >
        {TERM_OPTIONS.map((term) => (
          <option key={term} value={term}>
            {term}
          </option>
        ))}
      </select>

    </div>
  );
}

export default CourseFilters;
