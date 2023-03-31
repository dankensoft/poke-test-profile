import { Component } from '@angular/core';
import { IPokemon } from './components/interfaces/pokemon.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'promerica-test';

  showLoading: boolean = false;

  step2: boolean = false;

  name: string = '';
  hobbie: string = '';
  birthday?: number;
  dui?: string;

  toStep2(event: any) {
    console.log(event);
    this.name = event.name;
    this.hobbie = event.hobbie;
    this.birthday = new Date().getFullYear() - new Date(event.birthday).getFullYear();
    this.dui = event.dui;
    this.step2 = true;
    this.showLoading = true;
  }

  pokemonsLoaded() {
    this.showLoading = false;

  }
}
