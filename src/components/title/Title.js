import React from "react";

const Title = ({ title, heading = 2 }) => {
  
  
    if( heading === 4 ) return <h4 className="text-left">{title}</h4> 
    return <h2 className="text-center">{title}</h2>;
 
  
}
 ;

export default Title;
