import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  BASEURL = "./assets/database/"

  getProjects(): Observable<any> {
    return this.http.get(this.BASEURL + "projects.json");
  }

  getVideos(): Observable<any> {
    return this.http.get(this.BASEURL + "videos.json");
  }

  getEvents(): Observable<any> {
    return this.http.get(this.BASEURL + "events.json");
  }

}
