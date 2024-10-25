import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Sobre la aplicación');
    this.meta.updateTag({ name: 'description', content: 'Esta es la página de about' });
    this.meta.updateTag({ name: 'og:title', content: 'Sobre la aplicación' });
    this.meta.updateTag({ name: 'keywords', content: 'about, page' });
  }

}
