import React, { Component } from 'react';
import moment from 'moment';
import YearSelector from './components/YearSelector';
import Calendar from './components/Calendar/';
import CategorySelect from './components/CategorySelect/';
import './bootstrap-3.3.7-dist/css/bootstrap.min.css';

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

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-12">
                <YearSelector onSelectYear={this.handleSelectedYear} currentYear={this.state.currentYear}></YearSelector>
          </div>
        </div>
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
        <div className="row">
          <div className="col-md-4">
            <CategorySelect currentDay={this.state.currentDay} currentKey={this.state.currentKey} showModal={this.state.showModal}></CategorySelect>
          </div>
        </div>
      </div>
    );   
  }
}

export default App;