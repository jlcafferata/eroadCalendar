export default {
  clear: function(){
    localStorage.clear();
  },

  get: function(k) {
    try {
      return JSON.parse(localStorage.getItem(k));
    } catch (e) {
      return null;
    }
  },
  
  set: function(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  },

  getAll: function(){
      var items = [];
      for (var i = 0; i<localStorage.length; i++) {
          items[i] = localStorage.getItem(localStorage.key(i));
      }
      return items;
  },

  
  getAllByYear: function(year){
    let months=['00', '01', '02', '03', '04','05','06','07','08','09','10','11'];
    let itemsFound=[];
    let itemsJSON={
      holiday: 0,
      busy: 0,
      anniversary: 0,
      birthday: 0
    };
  
    months.forEach(element => {
      itemsFound.push(JSON.stringify(this.get(year+element)));
    });
    
    try{
      itemsFound.forEach(element => {
        var itemJSON=JSON.parse(element);
        var monthCalendar=itemJSON.calendar[0];
        monthCalendar.days.forEach(element => {
          if(element.category!=='none'){
            var count=((itemsJSON[element.category])?itemsJSON[element.category]:0);
            itemsJSON[element.category]=count+1;
          }
        });      
      });
    } catch(error){
      //
    }
    return itemsJSON;
  }
};
