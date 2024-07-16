import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importar el CSS del carrusel

const InstructionsCarousel = () => {
    return (
        <Carousel showThumbs={false} autoPlay infiniteLoop>
            <div>
            <p className="legend">Paso 1: Inicia sesión en tu cuenta</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThx3y0voTNaGs9143gfU1S77Kui9qyyd5KiQ&s" alt="Paso 1" />
                
            </div>
            <div>
            <p className="legend">Paso 2: Navega a la página de amigos para agregar nuevos amigos</p>
                <img src="https://rpopular.mediasector.es/estaticos/2023/11/21102032/real_5e6be4c8-0668-4da7-8d74-bf3579e05acd-jpeg-e1700558447681-880x495.webp" alt="Paso 2" />
                
            </div>
            <div>
            <p className="legend">Paso 3: Busca regalos usando el correo de tus amigos</p>
                <img src="https://los40.com/resizer/v2/LMLB42STIZL5FOZTL5X4V52HRY.jpg?auth=94b7b515da7a2728747a100c098504a6fc7bff1f03fd68a29f5a3454fd6ef946&quality=70&width=1200&height=675&smart=true" alt="Paso 3" />
                
            </div>
            <div>
            <p className="legend">Paso 4: Selecciona los regalos que quieres regalar</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5DBQ3JZH5U-ye7T-VG2QXUNPfK6Cbb7MwELVcqqiAZ62cBEDe4sXZaAM95rnlxr7otQ&usqp=CAU" alt="Paso 4" />
               
            </div>
        </Carousel>
    );
};

export default InstructionsCarousel;
