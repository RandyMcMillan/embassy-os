import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from 'src/app/services/api/api.service'
import { Subscription } from 'rxjs'
import { copyToClipboard } from 'src/app/util/web.util'
import { AlertController, IonContent, NavController, PopoverController, ToastController } from '@ionic/angular'
import { PackageProperties } from 'src/app/util/properties.util'
import { QRComponent } from 'src/app/components/qr/qr.component'
import { PatchDbModel } from 'src/app/services/patch-db/patch-db.service'
import * as JsonPointer from 'json-pointer'
import { FEStatus } from 'src/app/services/pkg-status-rendering.service'
import { PackageMainStatus } from 'src/app/services/patch-db/data-model'

@Component({
  selector: 'app-properties',
  templateUrl: './app-properties.page.html',
  styleUrls: ['./app-properties.page.scss'],
})
export class AppPropertiesPage {
  error = ''
  loading = true
  pkgId: string
  pointer: string
  qrCode: string
  properties: PackageProperties
  node: PackageProperties
  unmasked: { [key: string]: boolean } = { }
  running = true

  @ViewChild(IonContent) content: IonContent
  subs: Subscription[] = []

  constructor (
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly alertCtrl: AlertController,
    private readonly toastCtrl: ToastController,
    private readonly popoverCtrl: PopoverController,
    private readonly navCtrl: NavController,
    public readonly patch: PatchDbModel,
  ) { }

  async ngOnInit () {
    this.pkgId = this.route.snapshot.paramMap.get('pkgId')

    await this.getProperties()

    this.subs = [
      this.route.queryParams.subscribe(queryParams => {
        if (queryParams['pointer'] === this.pointer) return
        this.pointer = queryParams['pointer']
        this.node = JsonPointer.get(this.properties, this.pointer || '')
      }),
      this.patch.watch$('package-data', this.pkgId, 'installed', 'status', 'main', 'status')
      .subscribe(status => {
        this.running = status === PackageMainStatus.Running
      }),
    ]
  }

  ngAfterViewInit () {
    this.content.scrollToPoint(undefined, 1)
  }

  ngOnDestroy () {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  async refresh () {
    await this.getProperties()
  }

  async presentDescription (property: { key: string, value: PackageProperties[''] }, e: Event) {
    e.stopPropagation()

    const alert = await this.alertCtrl.create({
      header: property.key,
      message: property.value.description,
    })
    await alert.present()
  }

  async goToNested (key: string): Promise<any> {
    this.navCtrl.navigateForward(`/services/${this.pkgId}/properties`, {
      queryParams: {
        pointer: `${this.pointer || ''}/${key}/value`,
      },
    })
  }

  async copy (text: string): Promise<void> {
    let message = ''
    await copyToClipboard(text).then(success => { message = success ? 'copied to clipboard!' :  'failed to copy'})

    const toast = await this.toastCtrl.create({
      header: message,
      position: 'bottom',
      duration: 1000,
      cssClass: 'notification-toast',
    })
    await toast.present()
  }

  async showQR (text: string, ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: QRComponent,
      cssClass: 'qr-popover',
      event: ev,
      componentProps: {
        text,
      },
    })
    return await popover.present()
  }

  toggleMask (key: string) {
    this.unmasked[key] = !this.unmasked[key]
  }

  asIsOrder (a: any, b: any) {
    return 0
  }

  private async getProperties (): Promise<void> {
    this.loading = true
    try {
      this.properties = await this.apiService.getPackageProperties({ id: this.pkgId })
      this.node = JsonPointer.get(this.properties, this.pointer || '')
    } catch (e) {
      console.error(e)
      this.error = e.message
    } finally {
      this.loading = false
    }
  }
}