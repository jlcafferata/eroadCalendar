import React, { Component } from 'react';
import moment from 'moment';
import YearSelector from './components/YearSelector/';
import Calendar from './components/Calendar/';
import CategorySelect from './components/CategorySelect/';
import Summary from './components/Summary/';
import './App.css';

class App extends Component {
  
  state={
    currentYear: moment().format('YYYY'),
    openCategory: false
  }

  handleSelectedYear = (currentYear) => {
    this.setState({
      currentYear: currentYear,
      showModal:false
    })
  }

  openCategory = (key, day) => {
    this.setState({
      currentKey: key,
      currentDay: day,
      showModal:true
    });
  }

  refresh = () =>{
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div className="App">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="col-md-2">
                    <label className="label-year">Select year</label>
              </div>
              <div className="col-md-4">
                    <YearSelector onSelectYear={this.handleSelectedYear} currentYear={this.state.currentYear}></YearSelector>
              </div>
              <div className="col-md-6">
                <Summary year={this.state.currentYear}></Summary>
              </div>
            </div>  
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                  <Calendar yearSelected={this.state.currentYear} monthSelected='00' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='01' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='02' openChangeCategory={this.openCategory}></Calendar> 
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='03' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='04' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='05' openChangeCategory={this.openCategory}></Calendar> 
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='06' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='07' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='08' openChangeCategory={this.openCategory}></Calendar> 
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='09' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='10' openChangeCategory={this.openCategory}></Calendar> 
              </div>
              <div className="col-md-4">
                    <Calendar yearSelected={this.state.currentYear} monthSelected='11' openChangeCategory={this.openCategory}></Calendar> 
              </div>
            </div>
            </div>  
        </div>
        <div className="row">
          <div className="col-md-4">
            <CategorySelect currentDay={this.state.currentDay} currentKey={this.state.currentKey} showModal={this.state.showModal} onUpdate={this.refresh}></CategorySelect>
          </div>
        </div>
      </div>
    );   
  }
}

export default App;