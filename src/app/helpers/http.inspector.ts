import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, dematerialize, materialize, delay } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

export class ApiHttpInspector implements HttpInterceptor {
    token: String = '';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(mergeMap(() => {
            if (req.url.startsWith('api/authentication') && req.method === 'POST') {
                const body: any = req.body;
                if (body.userName === 'hichem' && body.password === 'hichem') {
                    this.token = jwt.sign({
                        user: 'hichem',
                        admin: true,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60
                    }, 'HichemBaiticheSecret');

                    return of(new HttpResponse({
                        status: 200,
                        body: {
                            token: this.token
                        }
                    }));
                } else {
                    return of(new HttpResponse({
                        status: 401
                    }));
                }
            } else if (req.url.startsWith('api/slides') && req.method === 'GET') {
                if (req.headers.get('authorization')) {
                    const rToken = req.headers.get('authorization').split(' ')[1];
                    if (rToken === this.token) {
                        return of(new HttpResponse({
                            status: 200,
                            body: {
                                slides: [
                                    // tslint:disable-next-line:max-line-length
                                    { img: 'First', title: 'Ambient Intelligent (AmI)', content: 'AmI amis to use the last available technologies to build an intelligent Environment' },
                                    // tslint:disable-next-line:max-line-length
                                    { img: 'Second', title: 'Selection Indices', content: 'Selection indices are used by the plan selection process' },
                                    // tslint:disable-next-line:max-line-length
                                    { img: 'Third', title: 'Agent Preferences', content: 'it can be used by the PSP to select a plan according the agent preferences' }
                                ]
                            }
                        }));
                    }
                }

                return of(new HttpResponse({
                    status: 401
                }));
            }
            return next.handle(req);
        }))
            .pipe(materialize())
            .pipe(delay(2000))
            .pipe(dematerialize());
    }
}
