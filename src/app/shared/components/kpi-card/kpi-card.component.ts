import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() hint?: string;
  @Input() link?: { url: any[] | string; query?: any };
}
