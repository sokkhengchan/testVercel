export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="flex justify-center items-center mb-5 gap-2"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    );
  }
  