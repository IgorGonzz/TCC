import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lgpd-banner',
  templateUrl: './lgpd-banner.html', // CORRIGIDO: Removendo .component
  styleUrls: ['./lgpd-banner.css']   // CORRIGIDO: Removendo .component
})
export class LgpdBannerComponent implements OnInit {
  accepted: boolean = false;

  ngOnInit(): void {
    this.accepted = localStorage.getItem('lgpd_accepted') === 'true';
  }

  accept(): void {
    this.accepted = true;
    localStorage.setItem('lgpd_accepted', 'true');
  }
}