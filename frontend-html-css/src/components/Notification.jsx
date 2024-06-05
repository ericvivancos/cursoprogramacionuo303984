import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Notification = ({type,message, onClose}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    }

    useEffect(() => {
          const timer = setTimeout(() => {
            onClose();
          }, 1000); 
          // Duración de la animación en ms
            return () => clearTimeout(timer);
        
      }, [onClose,1000]);
        return (
            isVisible && (
              <div className={`fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-sm rounded-lg border border-primary-200 bg-primary p-4 shadow-lg transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className={`text-lg font-medium color-secondary`}>
                      {type === 'success' ? 'Éxito' : 'Error'}
                    </h3>
                    <p className="text-sm color-secondary">{message}</p>
                  </div>
                  <Link onClick={handleClose}><XIcon /></Link>
                </div>
              </div>
            )
          );
        };
        
function XIcon(){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}
export default Notification;