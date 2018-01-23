import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ProprietarioProvider } from '../providers/proprietario/proprietario';


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
      { title: 'Proprietario', component: 'ProprietarioPage', icon:'person' },
      { title: 'Veiculo', component: 'VeiculoPage', icon:'car' },
      { title: 'Manuten\u00E7\u00F5es', component: 'ListagemManutencaoPage', icon:'construct' },
      { title: 'Logout', component: 'LoginPage', icon:'log-out' }
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
  if(page.title == 'logout'){
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
