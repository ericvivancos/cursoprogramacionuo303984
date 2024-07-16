import React, {useContext} from 'react';
import SearchGifts from '../components/Presents/SearchGifts';
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';
import { GiftProvider } from '../context/GiftContext';

const SearchGiftsPage = () => {
    return (

        <div>
            <GiftProvider>
            <SearchGifts/>
            </GiftProvider>

        </div>
            
    );
};
export default SearchGiftsPage;