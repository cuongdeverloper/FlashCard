
import { Outlet } from "react-router-dom"

import UseGetConversations from "./hooks/UseGetConversations";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";
import "./css/MessagePage.scss"

const MessagePage = () => {
    const { loading, conversations } = UseGetConversations();
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            
            <div className="Left-ctn"  >
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