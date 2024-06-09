import React, { useContext } from 'react';
import { FriendsContext } from '../../context/FriendsContext';

const FriendsList = () => {
    const { friends, removeFriend, loading } = useContext(FriendsContext);
    if (loading) {
      return <div>Loading...</div>;
  }
   
      return (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Amigos</h2>
              <p className="card-description">Aquí se mostrarán todos tus amigos.</p>
            </div>
            <div className="card-content">
              {friends.length === 0 ? (
                <p>No tienes amigos en tu lista.</p>
              ) : (
                <div className="friends-list">
                  {friends.map(friend => (
                    <div key={friend} className="friend-item">
                      <p>{friend}</p>
                      <button className='m-6' onClick={() => removeFriend(friend)}>Eliminar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default FriendsList;