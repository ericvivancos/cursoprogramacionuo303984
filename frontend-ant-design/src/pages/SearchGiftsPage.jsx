import React from 'react';
import SearchGifts from '../components/SearchGifts';
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