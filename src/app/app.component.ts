import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ProprietarioProvider } from '../providers/proprietario/proprietario';
import { ManutencaoProvider } from '../providers/manutencao/manutencao';
import { IndicadorIndividualProvider } from '../providers/indicador-individual/indicador-individual';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  itemindex=0;
  headerTitle='Home';

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<any>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authProvider: AuthenticationProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon:'home' },
      { title: 'Usuário', component: 'ProprietarioPage', icon:'person' },
      { title: 'Veículo', component: 'VeiculoPage', icon:'car' },
      { title: 'Manuten\u00E7\u00F5es', component: 'ListagemManutencaoPage', icon:'construct' },
      { title: 'Relatórios', component: 'RelatorioGastoIndividualManutencaoPage', icon:'book' },
      { title: 'Preferências de notificação', component: 'PreferenciasPage', icon:'notifications' },
      { title: 'Sair', component: 'LoginPage', icon:'log-out' },
      //Teste
      { title: 'Nofificacao', component: 'NotificacaoPage', icon:'notifications' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
  if (page.title == 'Sair'){
    this.authProvider.logout();
  }
  this.nav.setRoot(page.component);
  }
  activeItem(index){
      this.itemindex=index;
      this.headerTitle=this.pages[index].title;
      if(this.pages[index].component=='LoginPage'){
        setTimeout(() =>{this.itemindex=0;this.headerTitle='Home';},1000)
      }
  }
}
