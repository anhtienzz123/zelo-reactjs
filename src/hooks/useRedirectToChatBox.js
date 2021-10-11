import { setCurrentConversation } from 'features/Chat/chatSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';


const useRedirectToChatBox = (idConver) => {
    const history = useHistory();
    const dispatch = useDispatch();
    history.push("/chat");
    dispatch(setCurrentConversation(idConver));

}

export default useRedirectToChatBox;