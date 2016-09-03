import {Page, NavController, NavParams} from 'ionic-angular';
import {GitHubService} from '../../services/github';

@Page({
  templateUrl: 'build/pages/detalle/detalle.html',
  providers: [GitHubService]
})
export class DetallePage {
	public readme= '';
	public repo;
  
constructor(private github: GitHubService, private navCtrl: NavController, navParams: NavParams) {
	this.repo = navParams.get('repo');
    this.github.getDetails(this.repo).subscribe(
      data => this.readme = data.text(),
      err => {
        if (err.status == 404) {
          this.readme = 'Este repositorio no tiene README.md';
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetalle completado.')
    );
  }
}
