import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get(this.apiUrl + "/api/read-all-articles");
  }
}
