import { Component } from '@angular/core';
// REMOVA RouterOutlet e RouterLink daqui. O AppModule cuida disso.
// import { RouterOutlet, RouterLink } from '@angular/router';
// import { FooterComponent } from './shared/footer/footer';
// import { LgpdBannerComponent } from './shared/lgpd-banner/lgpd-banner';

@Component({
  selector: 'app-root',
  // APAGUE: standalone: true, 
  // APAGUE: imports: [RouterOutlet, RouterLink, FooterComponent, LgpdBannerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'bjj-scoreboard-tcc';
}