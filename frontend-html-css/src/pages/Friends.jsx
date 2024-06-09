import React, {useContext} from 'react';
import AddFriends from '../components/Friends/AddFriends'
import FriendsList from '../components/Friends/FriendsList';
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext';
import { FriendsProvider } from '../context/FriendsContext';

const Friends = () => {
   
  return (
    <FriendsProvider>
        <div>
            <AddFriends />
            <div className="mt-4">
            <FriendsList />
            </div>         
        </div>
    </FriendsProvider>
);
};

export default Friends;