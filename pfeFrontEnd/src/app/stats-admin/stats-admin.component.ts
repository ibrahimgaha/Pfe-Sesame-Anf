import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_services/statistics.service';
import Chart from 'chart.js/auto';
import { AvisTechniqueStatisticsService } from '../_services/avis-technique-stistics.service';

@Component({
  selector: 'app-stats-admin',
  templateUrl: './stats-admin.component.html',
  styleUrls: ['./stats-admin.component.css']
})
export class StatsAdminComponent implements OnInit {

  statusStatistics: any;
  typeStatistics: any;
  avisStatistics: any;
  // Doughnut chart
  doughnutChartLabels: string[] = [];
  doughnutChartData: number[] = [];
  doughnutChartType: string = 'doughnut';

  // Bars Chart
  barChartLabels: string[] = [];
  barChartData: { data: number[], label: string }[] = [];

  // Area chart
  areaChartLabels: string[] = [];
  areaChartData: { data: number[], label: string }[] = [{ data: [], label: 'Technical Advice' }];

  constructor(private statisticsService: StatisticsService, private statsAvis: AvisTechniqueStatisticsService) { }

  ngOnInit(): void {
    this.fetchStatusStatistics();
    this.fetchTypeStatistics();
    this.fetchAvisStatistics();
    
  }

  fetchStatusStatistics(): void {
    this.statisticsService.getStatusStatistics().subscribe(data => {
      this.statusStatistics = data;
      this.doughnutChartLabels = Object.keys(data);
      this.doughnutChartData = Object.values(data);
      this.renderChartStatus();
    });
  }

  fetchTypeStatistics(): void {
    this.statisticsService.getTypeStatistics().subscribe((data: unknown) => {
      this.typeStatistics = data;
      this.barChartLabels = Object.keys(this.typeStatistics);
      this.barChartData[0] = { data: Object.values(this.typeStatistics), label: 'Number of Demands' };
      this.renderChartType();
    });
  }
  fetchAvisStatistics(): void {
    this.statsAvis.getStatusAvisStatistics().subscribe((data: any) => {
      // Convert data object to arrays of labels and counts
      const labels = Object.keys(data);
      const counts = Object.values(data);
  
      // Update the area chart data
      this.areaChartLabels = labels;
      this.areaChartData[0].data = counts as number[];
  
      // Render the area chart
      this.renderChartAvisStatus();
    });
  }
  
  renderChartAvisStatus(): void {
    const data = {
      labels: this.areaChartLabels,
      datasets: [{
        fill: {
          target: 'origin',
          above: 'rgba(255, 0, 0, 0.2)',   // Area will be red above the origin
          below: 'rgba(0, 0, 255, 0.2)'    // And blue below the origin
        },
        data: this.areaChartData[0].data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  
    const ctx = document.getElementById('avisChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  

  renderChartType(): void {
    const data = {
      labels: this.barChartLabels,
      datasets: [{
        label: 'Number of Demands',
        data: this.barChartData[0].data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 250, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    const ctx = document.getElementById('typeChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  renderChartStatus(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.doughnutChartLabels,
        datasets: [{
          label: '# of Votes',
          data: this.doughnutChartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
