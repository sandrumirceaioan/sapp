import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SecretService } from '../secret.service';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  view: any;
  data$: Observable<any>;
  
  // options
  legend: boolean = true;
  legendPosition: any = 'below';
  legendTitle: string = ' ';
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showGridLines: boolean = false;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = false;
  autoScale: boolean = true;

  colorScheme: any = {
    domain: ['#000000', '#33b99e', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private statisticsService: StatisticsService
  ) { 
    
  }

  ngOnInit(): void {
    this.statisticsService.getLastDayPrices();
    this.data$ = this.statisticsService.statisticsSubject$;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  


}
