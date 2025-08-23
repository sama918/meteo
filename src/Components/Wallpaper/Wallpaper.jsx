import React from 'react';
import wallpaper from "../../assets/img/wallpaper.jpg"
import './Wallpaper.scss'
function Wallpaper() {
    return (
        <>
            <div className={'wallpaper-container  position-fixed d-flex top-0 bottom-0 start-0 end-0'}>
                <img className="wallpaper" src={wallpaper} alt="wallpaper"/>
            </div>

        </>
    );
}

export default Wallpaper;