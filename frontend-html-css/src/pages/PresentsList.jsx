import React, {useContext} from 'react';
import PresentList from '../components/Presents/PresentsList';
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';

const PresentsPage = () => {
    return (
        <div>
            <PresentList/>
        </div>
    );
};
export default PresentsPage;