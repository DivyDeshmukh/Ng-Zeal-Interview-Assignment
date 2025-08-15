import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { ApiBaseUrlInterceptor } from "./interceptors/api-base-url.interceptors";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiBaseUrlInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule | null) {
        if (parent) throw new Error('CoreModule should only be imported in AppModule.')
    } 
}
