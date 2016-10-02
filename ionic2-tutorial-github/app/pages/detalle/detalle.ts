import {Page, NavController, NavParams} from 'ionic-angular';
import {GitHubService} from '../../services/github';

@Page({
  templateUrl: 'build/pages/detalle/detalle.html',
  providers: [GitHubService]
})
export class DetallePage {
	public content: any[];
	public repo;
  
constructor(private github: GitHubService, private navCtrl: NavController, navParams: NavParams) {
	this.repo = navParams.get('repo');
    this.github.getRepoContent(this.repo).subscribe(
      data => {this.content = data.json();
        console.log(data.json());},
      err => {
          console.error(err);
      },
      () => console.log('getDetalle completado.')
    );
  }
}
