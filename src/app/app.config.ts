import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { apiPrefixInterceptor } from "@app/core/interceptors/api-prefix.interceptor";
import { tokenInterceptor } from "@app/core/interceptors/token.interceptor";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([tokenInterceptor, apiPrefixInterceptor]))
    ]
};
