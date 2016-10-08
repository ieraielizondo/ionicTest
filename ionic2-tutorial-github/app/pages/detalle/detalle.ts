import {Page, NavController, NavParams} from 'ionic-angular';
import {GitHubService} from '../../services/github';
import {FileContentPage} from '../file-content/file-content';

@Page({
  templateUrl: 'build/pages/detalle/detalle.html',
  providers: [GitHubService]
})
export class DetallePage {
	public content: any[];
	public repo;
  public url;
  public isFirst = false;
  
constructor(private github: GitHubService, private navCtrl: NavController, navParams: NavParams) {
	this.repo = navParams.get('repo');
  this.isFirst=navParams.get('isFirst');
  
    this.github.getRepoContent(this.repo,this.isFirst).subscribe(
      data => {this.content = data.json();
        console.log(data.json());},
      err => {
          console.error(err);
      },
      () => console.log('getDetalle completado.')
    );
  }

  goToDetails(repo,isfirst) {
    if (repo.type===undefined || repo.type==='dir'){
      this.navCtrl.push(DetallePage, {repo: repo,isFirst: isfirst});
    }else {
      this.navCtrl.push(FileContentPage,{repo:repo})
    }
    
  }
}
