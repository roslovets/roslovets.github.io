import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() entity: any;
  @Input() showAvatar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getAvatar(): string {
    return "assets/images/" + this.entity.type + "-logo.png";
  }

  getCover(): string {
    return "assets/images/covers/" + this.entity.cover;
  }

  getOpenBtnName(): string {
    if (this.entity.url === 'https://exponenta.ru/contacts')
      return 'PROJECT.GETINFO'
    else
      return 'PROJECT.OPEN'
  }

  btnLinkClick(url: string) {
    window.open(url);
  }

}
