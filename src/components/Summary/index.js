import React, {Component} from 'react';
import storage from './../../libs/storage';

class Summary extends Component{    
    
    constructor(props){
        super(props);
        this.events={
            holiday: 0,
            busy: 0,
            anniversary: 0,
            birthday: 0
        };
        this.events=storage.getAllByYear(props.year);
    }

    componentWillReceiveProps = (next_props) =>{
        this.events=storage.getAllByYear(next_props.year);
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-3">
                    <button className="btn btn-xs info-button holiday-button" type="button">
                        Holiday <span className="badge">{this.events.holiday}</span>
                    </button>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-xs info-button anniversary-button" type="button">
                        Anniversary <span className="badge">{this.events.anniversary}</span>
                    </button>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-xs info-button birthday-button" type="button">
                        Birthday <span className="badge">{this.events.birthday}</span>
                    </button>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-xs info-button busy-button" type="button">
                        Busy <span className="badge">{this.events.busy}</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Summary;