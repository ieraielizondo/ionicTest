import {DetallePage} from '../detalle/detalle';
import {Page, NavController} from 'ionic-angular';
import {GitHubService} from '../../services/github';
import {Platform, ActionSheetController, LoadingController } from 'ionic-angular';

@Page({ 
  templateUrl: 'build/pages/home/home.html',
  providers: [GitHubService]
})
export class HomePage {
  public foundRepos: any[]; 
  public user: string;
  public username: string;
  public stars: string;

  constructor(
    private github: GitHubService, 
    private navCtrl: NavController, 
    private actionSheetCtrl: ActionSheetController,
    public platform: Platform, 
    private loadingCtrl: LoadingController) {
    
  }
  
  getRepos() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Buscando...'
    });
    loadingPopup.present();
    if (this.username === undefined) {
      loadingPopup.dismiss();
      return;
    }
    this.github.getUser(this.username).subscribe(
      data => {
        this.user = data.json();
        console.log (data.json());
      },
      err => {
        console.error(err);
      }
    );
    this.github.getStarred(this.username).subscribe(
      data => {
        this.stars = data.json().length;
      },
      err => {

      }
    );
    this.github.getRepos(this.username).subscribe(
      data => {
          // I've added this timeout just to show the loading popup more time
          setTimeout(() => {
            this.foundRepos = data.json();
            loadingPopup.dismiss();
          }, 1000);
      },
      err => {
        loadingPopup.dismiss();
        console.error(err);
      }
    );
    
  }

  goToDetails(repo) {
    this.navCtrl.push(DetallePage, {repo: repo,isFirst: true});
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            console.log(this.platform);
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
