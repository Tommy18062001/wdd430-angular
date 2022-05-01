import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
    h3 {
      color: dodgerblue;
    }
  `]
})
export class AppComponent {
  name = 'Tommy';
  userName = '';
  isClicked = false;

  updateStatus() {
    this.isClicked = false ? this.isClicked = true : this.isClicked = true;
  }
}
