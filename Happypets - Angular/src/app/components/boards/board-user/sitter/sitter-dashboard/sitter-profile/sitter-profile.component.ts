import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../../../services/token-storage.service';
import {SitterProfileService} from '../../../../../../services/sitter-service/sitter-profile.service';

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

   columnsToDisplay = ['Name', 'Price'];

  isEditModeEnable = false;

  constructor(private sitterProfileService: SitterProfileService, private token: TokenStorageService) {
  }

  ngOnInit() {
    const userId = this.token.getUser().id;
    this.currentSitterProfile = this.sitterProfileService.getSitterData(userId).subscribe(data => {

      this.getAnimalType(data.animalType);
      if (data.dogSize) {
        this.getDogSize(data.dogSize);
      }
      this.houseType = data.houseType;
      this.otherPets = data.otherPets;
      this.userServices = data.serviceModelSet;

      // console.log(this.userServices)

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

  toggleEditMode() {
    this.isEditModeEnable = !this.isEditModeEnable;
  }

}
