import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GetCatsService } from '../get-cats.service';
import { Breed } from '../models/breed'
import { CatImage } from '../models/catImage'

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  pageTitle: string = 'Cats list';
  breeds: Breed[] = [];
  images: CatImage[] = [];
  selectedBreed!: Breed; 
  limits = ['5', '10', '15', '20', '25'];
  selectedLimit = '10';
  order = 'Asc';
  chooseAll: boolean = true;
  breedControl = new FormControl<Breed | null>(null, Validators.required);

  constructor(private catsService: GetCatsService) { }

  ngOnInit(): void {
    this.getBreeds()
    this.searchImages()
  }

  getBreeds(): void {
    this.catsService.getBreeds(this.order)
        .subscribe(response => {
          this.breeds = response;
          console.log(this.breeds);
    });
  }

  searchImages(): void {
    console.log(this.selectedLimit);
    this.catsService.searchImages(this.selectedLimit)
        .subscribe(response => {
          this.images = response;
          this.images.forEach(i => i.loading = true)
    });
  }

  searchByBreed(breedId: string): void{
    console.log(this.selectedLimit);
    this.catsService.searchByBreed(breedId, this.selectedLimit)
        .subscribe(response => {
          this.images = response;
          this.images.forEach(i => i.loading = true)
    });
  }

  imageLoadingChange(image: CatImage) {
    image.loading  = false;
    console.log("i'm loaded")
  }

  changeLimit(limit: string) {
    this.selectedLimit = limit
    console.log(this.selectedLimit);
  }
}
