import { toast } from "react-toastify";
import UseGetConversations from "./hooks/UseGetConversations";
import UseConversation from "./zustand/UseConversation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { searchUserId } from "../../service/ApiService";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = UseConversation();
    const { conversations } = UseGetConversations();
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (search.length < 3) {
            // Only search if the input has at least 3 characters
            setResults([]); // Clear results if search is too short
            return;
        }

        try {
            const userResults = await searchUserId(search);
            setResults(userResults.data || []);
        } catch (error) {
            console.error(error.message);
            toast.error("An error occurred while searching for users.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prevent submitting if there are no results or the search is empty
        if (!search || results.length === 0) return;

        // Check if the first result matches the search input
        const conversation = results.find((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
            setResults([]);  // Clear results after selection
        } else {
            toast.error("No such user found!");
        }
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            handleSearch();
        } else {
            setResults([]); // Clear results if input is empty
        }
    };

    const handleSelect = (user) => {
        setSelectedConversation(user);
        setSearch("");
        setResults([]); // Clear results after selection
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search…"
                    className="input input-bordered rounded-full"
                    value={search}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                    <IoSearchSharp className="w-6 h-6 outline-none" />
                </button>
            </form>
            {results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-48 overflow-auto">
                    {results.map((user) => (
                        <li
                            key={user._id} // Ensure 'id' is unique for each user
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(user)}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
