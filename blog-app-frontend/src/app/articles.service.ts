import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get(this.apiUrl + '/api/read-all-articles').pipe(
      map((response: any) => {
        
       return response.map((x:any) => {
        console.log(x.author)
          return {
            comments: x.comments,
            numbersSeen: x.numbersSeen,
            _id: x._id,
            name: x.name,
            tags: x.tags,
            content: x.content,
            ratings: x.ratings,
            createdAt: new Date(x.createdAt),
            updatedAt: new Date(x.updatedAt),
            author: x.author
          };
        });
      })
    );
  }
}
