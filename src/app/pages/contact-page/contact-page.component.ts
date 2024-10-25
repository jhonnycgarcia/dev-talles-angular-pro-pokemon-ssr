import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contacto');
    this.meta.updateTag({ name: 'description', content: 'Esta es la página de contacto' });
    this.meta.updateTag({ name: 'og:title', content: 'Contacto' });
    this.meta.updateTag({ name: 'keywords', content: 'contact, page' });
  }

}
