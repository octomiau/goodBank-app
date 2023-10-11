import React from 'react';
import { UserContext, Card } from './context';

function Home(){
    const bgStyle = {
        backgroundImage: 'url(/BGbank-home.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    };
    return (
        <>
            <div className="maincontent">
                <div style={bgStyle}></div>
                    <Card
                        txtcolor="black"
                        header={(<img src="goodBankLogo-black.png" className="img-fluid" alt="Responsive image"/>)}
                        title="Welcome home to simpler banking!"
                        text="Welcome to the Good Bank! Where every click makes your piggy bank smile. Let's make banking simple and seamless together."
                        body={(<img src="homeCard.png" className="img-fluid" alt="Responsive image"/>)}
                    />   

             </div>    
        </>
    );  
  }
  
  export default Home;