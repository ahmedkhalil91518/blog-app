import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-container',
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.scss'],
})
export class ArticleContainerComponent implements OnInit {
  constructor(private articles: ArticlesService) {}

  ngOnInit(): void {
    this.articles.getAllArticles().subscribe((x) => {
      console.log(x);
    });
  }
}
