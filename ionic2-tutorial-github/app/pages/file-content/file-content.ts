import { Component } from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {GitHubService} from '../../services/github';

/*
  Generated class for the FileContentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/file-content/file-content.html',
  providers: [GitHubService]
})
export class FileContentPage {
  public texto;
  public file;


  constructor(private github: GitHubService, private navCtrl: NavController, navParams: NavParams) {
    this.file = navParams.get('repo');
    this.github.getFile(this.file).subscribe(
      data=>{
        this.texto=data.text();
        console.log(this.texto);
      },
      err => {
          console.error(err);
      },
      () => console.log('get fileText completado.')
    );

  }

}
