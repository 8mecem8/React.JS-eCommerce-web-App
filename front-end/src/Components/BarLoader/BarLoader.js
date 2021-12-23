import React from 'react'
import '../BarLoader/BarLoader.css';

export default function BarLoader(props) {

    return (
        <>
        <div className="spinner-container">

            <svg width="130" height="50" viewBox="0 0 95 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="loader_bars">
                    <g id="upperbar">
                        <rect id="1_2" width="90" height="14" rx="7" fill="#FF72C6" />
                    </g>
                    <g id="middlebar">
                        <rect id="Rectangle 2" x="20" y="18" width="90" height="14" rx="7" fill="#FF3AB0" />
                    </g>
                    <g id="bottombar">
                        <rect id="3_2" y="36" width="90" height="14" rx="7" fill="#FD0098" />
                    </g>
                </g>
            </svg>


            <p>{props.customText}</p>
        </div>
        </>
    )
}