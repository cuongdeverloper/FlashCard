import { toast } from "react-toastify";
import UseGetConversations from "./hooks/UseGetConversations";
import UseConversation from "./zustand/UseConversation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { searchUserId } from "../../service/ApiService";
import { Form, Button, InputGroup, ListGroup } from "react-bootstrap";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation } = UseConversation();
    const { conversations } = UseGetConversations();
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (search.length < 3) {
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
        if (!search || results.length === 0) return;

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
        <div style={{ position: "relative" }}>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Search…"
                        value={search}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="primary">
                        <IoSearchSharp />
                    </Button>
                </InputGroup>
            </Form>

            {results.length > 0 && (
                <ListGroup
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        width: "100%",
                        marginTop: "0.5rem",
                        maxHeight: "12rem",
                        overflowY: "auto",
                    }}
                >
                    {results.map((user) => (
                        <ListGroup.Item
                            key={user._id} // Ensure 'id' is unique for each user
                            action
                            onClick={() => handleSelect(user)}
                        >
                            {user.username}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SearchInput;
