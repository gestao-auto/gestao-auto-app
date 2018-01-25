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
import { ListagemManutencaoPage } from '../pages/listagem-manutencao/listagem-manutencao';
import { ManutencaoProvider } from '../providers/manutencao/manutencao';
import { VeiculoProvider } from '../providers/veiculo/veiculo';

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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthenticationProvider,
    UsuarioProvider,
    ProprietarioProvider,
    ManutencaoProvider,
    VeiculoProvider
  ]
})
export class AppModule {}
