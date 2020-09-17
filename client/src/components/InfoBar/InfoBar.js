import React from 'react';

import './InfoBar.css'
import closeIcon from '../../icons/closeIcon';
import onlineIcon from '../../icons/onlineIcon'; 
const InfoBar = ( )=>{
     <div className="InfoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image"></img>
            <h3>roomName</h3>
        
        </div>
        <div className="rightInnerContainer">
        {/* not a great practice but this link for refreshing the root and cleaning the socket */}  
        <a href="/"><img src={closeIcon} alt="close Image" /></a>
        </div>
     </div>

}

export default InfoBar;