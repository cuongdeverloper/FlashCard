import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import useSendMessage from "./hooks/UseSendMessage";
import useListenMessages from "./hooks/UseListenMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    useListenMessages()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <Form className='px-4 my-3' onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control
                    type='text'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='bg-gray-700 border-gray-600 text-black'
                    style={{ borderColor: 'gray', zIndex: 1 }} // Add zIndex if needed
                />

                <Button type='submit' variant='outline-secondary'>
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : <BsSend />}
                </Button>
            </InputGroup>
        </Form>
    );
};

export default MessageInput;
