import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Chart } from 'chart.js';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar';
  calendarPlugins = [dayGridPlugin]; 
  dateMap = new Map();
  flag:boolean=false;
  lineChart = [];
  noMaskData = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
  };
  handleDateClick(arg) {
    this.flag = true;
    let data = this.noMaskData.find(object => object.date == arg.dateStr);
    if(data){
      this.getGraphData(data.date, data.noMaskData);
    }
    else {
      alert('No data found for the selected Date');
    }
  }
  getNoMaskDataForMonth(){
    for(let i=1;i<=30;i++){
      let date = '2020-09-';
      let arr = this.getNoMaskDataForDay();
      if(i<10) {
        date = date + '0';
      }
      date = date + i;
      let data = {
        date: date,
        noMaskData: arr
      }
      this.noMaskData.push(data);
    }
  }
  getNoMaskDataForDay(){
    let arr = [];
    for(let i=1;i<25;i++){
      let val = this.getRandomNumber();
      arr.push(val);
    }
    return arr;
  }
  getRandomNumber(){
    let max = 80;
    let min = 0;
    let val = Math.floor(Math.random() * max);
    return val; 
  }
  getGraphData(date, data){
    this.lineChart.push(new Chart('lineChart',{
      type:'line',
        data:{
          labels:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          datasets: [{
            label:'Number of persons without mask',
            data: data,
            fill:false,
            lineTension:0.3,
            borderColor:"red",
            borderWidth:1
          }]
        },
        options:{
          title:{
            text:"Analysis Report " + date,
          display:true
        },
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
    }))
  }
  ngOnInit(){
    this.getNoMaskDataForMonth();
  }
}