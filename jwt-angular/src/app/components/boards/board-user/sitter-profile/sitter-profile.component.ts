import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {SitterProfileService} from '../../../../services/sitter-service/sitter-profile.service';

@Component({
  selector: 'app-sitter-profile',
  templateUrl: './sitter-profile.component.html',
  styleUrls: ['./sitter-profile.component.css']
})
export class SitterProfileComponent implements OnInit {

  private currentSitterProfile: any;
  private animalType: any[];
  private dogSize: any[];
  private houseType;
  private otherPets;
  private userServices;

  constructor(private sitterProfileService: SitterProfileService) {
  }

  ngOnInit() {
    this.currentSitterProfile = this.sitterProfileService.getSitterData().subscribe(data => {

      this.getAnimalType(data.animalType);
      if (data.dogSize) {
        this.getDogSize(data.dogSize);
      }
      this.houseType = data.houseType;
      this.otherPets = data.otherPets;
      this.userServices = data.serviceModelSet;

    }, err => {
      console.log(err);
    });

  }

  getAnimalType(animalType: string) {
    animalType = animalType.replace('[', '');
    animalType = animalType.replace(']', '');
    animalType = animalType.replace(' ', '');
    this.animalType = animalType.split(',');

  }

  getDogSize(dogSize: string) {
    dogSize = dogSize.replace('[', '');
    dogSize = dogSize.replace(']', '');
    dogSize = dogSize.replace(' ', '');
    this.dogSize = dogSize.split(',');
  }

}
