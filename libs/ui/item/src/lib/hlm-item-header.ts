import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmItemHeader],hlm-item-header2',
  host: {
    'data-slot': 'item-header2',
  },
})
export class HlmItemHeader {
  constructor() {
    classes(() => 'flex basis-full items-center justify-between gap-2');
  }
}
