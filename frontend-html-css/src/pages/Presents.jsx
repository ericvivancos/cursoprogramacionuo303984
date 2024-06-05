import React, {useContext} from 'react';
import CreatePresentForm from '../components/Presents/CreatePresentForm';
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';

const PresentsPage = () => {
    return (
        <div>
            <CreatePresentForm/>
        </div>
    );
};
export default PresentsPage;