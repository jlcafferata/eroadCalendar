import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import storage from './../../libs/storage';


class CategorySelect extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showModal:          props.showModal || false,
            currentDay:         props.currentDay || '',
            currentMonth:       props.currentMonth || '',
            currentCategory:    props.currentCategory || 'none',
            categorySelected:   'none'
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.save = this.save.bind(this);
        this.onUpdate=this.props.onUpdate.bind(this);
    }

    open = () => {
        this.setState({showModal: true});        
    }

    close = () => {
        this.onUpdate();
    }

    save = () => {
        let calendar_found=storage.get(this.state.currentKey);
        if(calendar_found){
            if(!this.state.categorySelected){
                alert('No selecciono ninguna categoria nueva'); 
            } else{
                let days=calendar_found.calendar[0].days;
                
                days[parseInt(this.state.currentDay)-1].category=this.state.categorySelected;                
                
                let newValue=
                    {"key": calendar_found.key,
                    "calendar": [
                        {"month":              calendar_found.calendar[0].month,
                        "firstDayOfMonth":     calendar_found.calendar[0].firstDayOfMonth,
                        "days":                days
                        }
                    ]};
                
                storage.set(calendar_found.key, newValue);
                this.close();
            }
        }
    }

    componentWillReceiveProps = (next_props) =>{
        const {currentKey, currentDay, showModal}=next_props;
        const calendar_found=storage.get(currentKey);
        let currentCategory = 'none';
        if(calendar_found){
            var dayFound = calendar_found.calendar[0].days.find(function (model) {
                return parseInt(model.day) === parseInt(currentDay);
            });
            if(dayFound){
                currentCategory=dayFound.category;
            }
        }
        this.setState({
            showModal: showModal,
            currentCategory: currentCategory,
            currentKey: currentKey,
            currentDay: currentDay,
            categorySelected: ''
        });    
    }
      
    handleOptionChange = (e) =>{
        this.setState({
            categorySelected: e.target.value
        });
    }
    
    render = () =>{
        return(
            <div>
                <Modal className="modal-container" 
                show={this.state.showModal} 
                onHide={this.close}
                animation={true} 
                bsSize="small">

                <Modal.Header closeButton>
                    <Modal.Title>Select Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row"> 
                        <div className="col-md-12 radio none">
                            <label className={this.state.currentCategory === 'none'?'actualCategory':''}>
                                <input type="radio" value="none" 
                                            checked={this.state.currentCategory === 'none' ||
                                                    this.state.categorySelected === 'none'} 
                                            onChange={this.handleOptionChange} />
                                Blank
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 radio holiday">
                            <label className={this.state.currentCategory === 'holiday'?'actualCategory':''}>
                                <input type="radio" value="holiday" 
                                            checked={this.state.currentCategory === 'holiday' ||
                                                    this.state.categorySelected === 'holiday'} 
                                            onChange={this.handleOptionChange} />
                                Holiday
                            </label>
                        </div>
                    </div>
                    <div className="row"> 
                        <div className="col-md-12 radio birthday">
                            <label className={this.state.currentCategory === 'birthday'?'actualCategory':''}>
                                <input type="radio" value="birthday" 
                                            checked={this.state.currentCategory === 'birthday'||
                                                    this.state.categorySelected === 'birthday'} 
                                            onChange={this.handleOptionChange} />
                                Birthday
                            </label>
                        </div>
                    </div>
                    <div className="row"> 
                        <div className="col-md-12 radio busy">
                            <label className={this.state.currentCategory === 'busy'?'actualCategory':''}>
                                <input type="radio" value="busy" 
                                            checked={this.state.currentCategory === 'busy' ||
                                                    this.state.categorySelected === 'busy'} 
                                            onChange={this.handleOptionChange} />
                                Busy
                            </label>
                        </div>
                    </div>
                    <div className="row"> 
                        <div className="col-md-12 radio anniversary">
                            <label className={this.state.currentCategory === 'anniversary'?'actualCategory':''}>
                                <input type="radio" value="anniversary" 
                                            checked={this.state.currentCategory === 'anniversary' ||
                                                    this.state.categorySelected === 'anniversary'} 
                                            onChange={this.handleOptionChange} />
                                Anniversary
                            </label>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button bsStyle="primary" onClick={this.save}>Save changes</Button>
                </Modal.Footer>         
                </Modal> 
            </div>
        );
    }
}

export default CategorySelect;