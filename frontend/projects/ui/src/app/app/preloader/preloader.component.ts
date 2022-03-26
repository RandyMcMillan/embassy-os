import { ChangeDetectionStrategy, Component } from '@angular/core'

// TODO: Turn into DI token if this is needed someplace else too
const ICONS = [
  'add',
  'alert-outline',
  'alert-circle-outline',
  'aperture-outline',
  'arrow-back',
  'arrow-up',
  'briefcase-outline',
  'bookmark-outline',
  'cellular-outline',
  'chatbubbles-outline',
  'checkmark',
  'chevron-down',
  'chevron-up',
  'chevron-forward',
  'close',
  'cloud-outline',
  'cloud-done-outline',
  'cloud-download-outline',
  'cloud-offline-outline',
  'cloud-upload-outline',
  'code-outline',
  'cog-outline',
  'color-wand-outline',
  'construct-outline',
  'copy-outline',
  'cube-outline',
  'desktop-outline',
  'download-outline',
  'earth-outline',
  'ellipsis-horizontal-outline',
  'eye-off-outline',
  'eye-outline',
  'file-tray-stacked-outline',
  'finger-print-outline',
  'flash-outline',
  'folder-open-outline',
  'grid-outline',
  'help-circle-outline',
  'hammer-outline',
  'home-outline',
  'information-circle-outline',
  'key-outline',
  'list-outline',
  'lock-closed-outline',
  'logo-bitcoin',
  'mail-outline',
  'map-outline',
  'medkit-outline',
  'newspaper-outline',
  'notifications-outline',
  'open-outline',
  'options-outline',
  'pencil',
  'phone-portrait-outline',
  'play-circle-outline',
  'power',
  'pulse',
  'qr-code-outline',
  'receipt-outline',
  'refresh',
  'reload',
  'remove',
  'remove-circle-outline',
  'remove-outline',
  'reorder-three',
  'rocket-outline',
  'save-outline',
  'shield-checkmark-outline',
  'stop-outline',
  'storefront-outline',
  'swap-vertical',
  'terminal-outline',
  'trash',
  'trash-outline',
  'warning-outline',
  'wifi',
]

@Component({
  selector: 'section[appPreloader]',
  templateUrl: 'preloader.component.html',
  styles: [':host { display: none }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent {
  readonly icons = ICONS
}
