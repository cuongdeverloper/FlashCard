
import { Outlet, useNavigate } from "react-router-dom"

import UseGetConversations from "./hooks/UseGetConversations";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";
import "./css/MessagePage.scss"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MessagePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isAuthenticated) {
            toast.warning('Not authenticated !')
            return navigate('/login')
        }
    },[navigate])
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