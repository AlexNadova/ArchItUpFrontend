//starting point of application
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
//bootstraping main module of our app. angular loads this module and everything starts from there
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
