import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SlidesService {
    constructor(private http: HttpClient) { }

    getSlides () {
        return this.http.get('api/slides', {observe: 'response'}).pipe(map(
            response => {
                if (response.status === 200) {
                    return (response.body as any).slides;
                }
                return null;
            }
        ));
    }

}
