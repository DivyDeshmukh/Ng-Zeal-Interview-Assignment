import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
    private readonly base = environment.apiUrl; // api url


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('base', this.base);
        const needsPrefix = req.url.startsWith('/api');
        const url = needsPrefix ? `${this.base}${req.url}` : req.url;
        return next.handle(req.clone({ url }));
    }
}
