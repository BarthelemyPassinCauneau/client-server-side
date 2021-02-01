import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_services/backend/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  something = {
    "content": "coucou tout le monde"
  }
  constructor(private back: BackendService) { }

  ngOnInit(): void {
  }

  sendServer(something: any){
    this.back.post('covid_data', something).subscribe((res)=>{
      console.log('posted on backend')
    })
  }



}
