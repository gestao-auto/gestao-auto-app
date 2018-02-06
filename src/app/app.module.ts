import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from "@ionic/storage";
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { ProprietarioPage } from '../pages/proprietario/proprietario';
import { ProprietarioProvider } from '../providers/proprietario/proprietario';
import { ListagemManutencaoPage } from '../pages/manutencao/listagem-manutencao/listagem-manutencao';
import { ManutencaoProvider } from '../providers/manutencao/manutencao';
import { PreferenciasProvider } from '../providers/preferencias/preferencias';
import { VeiculoProvider } from '../providers/veiculo/veiculo';
import { HomeProvider } from '../providers/home/home';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { IndicadorIndividualProvider } from '../providers/indicador-individual/indicador-individual';
import { BaseChartDirective } from 'ng2-charts';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Mask } from '../utils/mask/mask';

var config={
      backButtonText: '',
      iconMode: 'md',
      pageTransition: 'md',
      mode:'md',
    };

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,config),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthenticationProvider,
    UsuarioProvider,
    ProprietarioProvider,
    ManutencaoProvider,
    PreferenciasProvider,
    VeiculoProvider,
    HomeProvider,
    IndicadorIndividualProvider,
    Mask
  ]
})
export class AppModule {}
