
// SearchBar shows the text input that will later be used to search courses by course code or title.
// It is only the UI for now.
// CoursesPage can pass value/onChange props here. but that's for m3 :)

function SearchBar() {
  return (
    <label className="input input-bordered flex items-center gap-2 flex-1 min-w-0">
      <input
        type="search"
        className="grow"
        placeholder="Search by course code or title"
        aria-label="Search by course code or title"
      />
    </label>
  );
}

export default SearchBar;
