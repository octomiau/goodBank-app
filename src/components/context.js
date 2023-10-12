import React from 'react';

// Card functional component
// This component creates a reusable card UI element that can have a header, title, text, body, and status.
export function Card(props){
    // This function determines the CSS classes for the card based on the provided bgcolor and txtcolor properties.
    function classes(){
      // Determine the background color class, default to empty string if not provided.
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      // Determine the text color class, default to 'text-white' if not provided.
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      // Return the combined classes
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      // Render the card with the determined classes
      <div className={classes()} style={{maxWidth: "18rem"}}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }


  export const UserContext = React.createContext(null);