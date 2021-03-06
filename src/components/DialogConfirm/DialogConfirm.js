import React from "react";
import './DialogConfirm.css';

class DialogConfirm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dialogTitle: this.props.dialogTitle,
            dialogDescription: this.props.dialogDescription
        };
    }

    callback(action){
        this.props.callback(action);
    }

    render(){
        const {dialogTitle, dialogDescription} = this.state;
        return(
            <div className="wrapperOutside">
                
                <div className="dialogContainer">
        
                        <div className="dialogContentTitle">{dialogTitle}</div>
                    
                        <div className="dialogContentBody">{dialogDescription}</div>

                        <div className="buttonContent">
                            <div className="buttonTouchTarget" onClick={() => this.callback(false)}>
                                <div className="buttonFlat">Rechazar</div>
                            </div>
                            
                            <div className="buttonTouchTarget" onClick={() => this.callback(true)}>
                                <div className="buttonFlat">Aceptar</div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
  }

export default DialogConfirm;