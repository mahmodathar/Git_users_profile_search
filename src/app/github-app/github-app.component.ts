import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {

  public githubUserQuery: string;
  public githubProfile: any;
  public githubRepos: any[];
  public errorMassage: string;


  constructor(private githubService: GithubService,
              private ngxSpinner: NgxSpinnerService ) { }

  public searchUser(): any{
    // Display the spinner before the service call
    this.ngxSpinner.show();
    // to get the github profile
    this.githubService.getProfile(this.githubUserQuery).subscribe((data) => {
      this.githubProfile = data;
    } , (error) => {
      this.errorMassage = error;
    });


    // to get the github repos
    this.githubService.getRepos(this.githubUserQuery).subscribe((data) => {
      this.githubRepos = data;

      // Stop the spinner Display
      this.ngxSpinner.hide();
    }, (error) => {
      this.errorMassage = error;
    });
  }

  ngOnInit(): void {
  }

}
