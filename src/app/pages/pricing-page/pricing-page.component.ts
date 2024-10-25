import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // console.log({ isPlatformServer: isPlatformServer(this.platform) });
    this.title.setTitle('Precios del servicio');
    this.meta.updateTag({ name: 'description', content: 'Esta es la página de precios' });
    this.meta.updateTag({ name: 'og:title', content: 'Precios del servicio' });
    this.meta.updateTag({ name: 'keywords', content: 'pricing, page' });
  }

}
