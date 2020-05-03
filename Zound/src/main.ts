import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  //Ensure Angular destroys itself on hot reloads
  .then((ref) => {
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
  })
  //otherwise log boot error
  .catch((err) => console.error(err));
