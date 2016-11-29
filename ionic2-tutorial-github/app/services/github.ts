import {Injectable} from '@angular/core';  
import { Http, Headers } from '@angular/http';

@Injectable()
export class GitHubService {
	constructor(private http: Http) {

	}

	getRepos(username) {
		return this.http.get('https://api.github.com/users/' + username + '/repos');
	}

	getFile(repo) {
		let headers = new Headers();
		headers.append(
			'Accept', 'application/vnd.github.VERSION.html');
		return this.http.get(
			repo.url , {headers: headers});
	}
	getUser(username) {
		return this.http.get('https://api.github.com/users/' + username );
	}
	getStarred(username) {
		return this.http.get('https://api.github.com/users/' + username + '/starred' );
	}
	getRepoContent(repo,isfirst){
		if(isfirst){
			return this.http.get(repo.url + '/contents');
		}else{
			return this.http.get(repo.url );
		}
		
	}
	getRepoLang(url){
		return this.http.get(url);
	}
}