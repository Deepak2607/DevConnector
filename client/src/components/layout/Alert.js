import React, { Component } from 'react';
import { connect } from 'react-redux';

class Alert extends Component{
    
    render(){  
        let alerts=null; 
        if(this.props.alerts.length>0){

            alerts= this.props.alerts.map(alert=>{
                
                let class_= `alert alert-${alert.alertType}`;
                return(  
                    <div key={alert.id} className={class_}>
                      {alert.msg}
                    </div>
                )         
            })
        }
        
        return(  
            <div>
            {alerts}
            </div>     
        );
        
    }
    
}


const mapStateToProps = state => ({
  alerts: state.alert_reducer.alerts
});

export default connect(mapStateToProps)(Alert);
