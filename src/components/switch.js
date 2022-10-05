import React from "react";
import './switch.css';
import cx from "classnames";
const Switch=({rounded=true,istoggled,ontoggle})=>{
    const sliderCX=cx('slider',{
        'rounded':rounded
    })
    return(
        <label className="Switch">
          <input type="checkbox" checked={istoggled} onChange={ontoggle}/>
          <span className={sliderCX}/>
        </label>
    );
    
};
export default Switch;