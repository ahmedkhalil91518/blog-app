import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.scss'],
})
export class ArticleContainerComponent implements OnInit {
  articlesList: any;

  constructor(private articles: ArticlesService) {}

  ngOnInit(): void {
    this.articles.getAllArticles().subscribe((x) => {
      this.articlesList = x;
    });
  }
  calculateDiff(dateSent: Date) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    const calculation = currentDate.getTime() - dateSent.getTime();
    return this.msToTime(calculation);
  }
  msToTime(ms: number) {
    let seconds = (ms / 1000).toFixed();
    let minutes = (ms / (1000 * 60)).toFixed();
    let hours = (ms / (1000 * 60 * 60)).toFixed();
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed();
    if (+seconds < 60) return seconds + " Sec";
    else if (+minutes < 60) return minutes + " Min";
    else if (+hours < 24) return hours + " Hrs";
    else return days + " Days"
  }
}
