import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { setCurrentConversation } from 'features/Chat/chatSlice';

const useRedirectToChatBox = (idConver) => {
    const history = useHistory();


    const { conversations } = useSelector((state) => state.chat);
    const hasExistConver = conversations.find((conver) => conver._id === idConver);

    if (hasExistConver) {
        history.push("/chat");
        setCurrentConversation(idConver);

    }


}

export default useRedirectToChatBox;