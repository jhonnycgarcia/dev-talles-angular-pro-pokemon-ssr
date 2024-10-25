import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

}
