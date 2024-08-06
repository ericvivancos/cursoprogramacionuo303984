import React from 'react';
import {FriendsProvider} from '../context/FriendsContext';
import AddFriends from '../components/AddFriends';
import FriendsList from '../components/FriendsList';

const FriendsPage = () => {
    return (
        <FriendsProvider>
            <div>
                <AddFriends/>
                <div style={{marginTop: '16px'}}>
                    <FriendsList/>
                </div>
            </div>
        </FriendsProvider>
    );
}
export default FriendsPage;