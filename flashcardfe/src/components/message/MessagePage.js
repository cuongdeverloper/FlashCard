import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { searchUserId } from "../../service/ApiService";
import UseGetConversations from "./hooks/UseGetConversations";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";
import "./css/MessagePage.scss"

const MessagePage = () => {
    const { loading, conversations } = UseGetConversations();
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            
            <div className="Left-ctn"  >
                {/* <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a user..."
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                {results.length > 0 && (
                    <div>
                        <ul>
                            {results.map((user) => (
                                <li key={user._id} onClick={() => navigate(`${user._id}`)}>
                                    {user.username}
                                </li>
                            ))}
                        </ul>

                    </div>
                )} */}
<SearchInput/>
                {conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))}

                {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
            </div>

            
            <div className="Right-ctn" 
             >
                <Outlet />
            </div>

        </div>
    )
}
export default MessagePage