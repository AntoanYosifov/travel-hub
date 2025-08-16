import { Component } from '@angular/core';
import {AddedByYou} from "../added-by-you/added-by-you";
import {WantToVisit} from "../want-to-visit/want-to-visit";
import {Liked} from "../liked/liked";

@Component({
  selector: 'app-user-collections',
  imports: [
    AddedByYou,
    WantToVisit,
    Liked
  ],
  templateUrl: './user-collections.html',
  standalone: true,
  styleUrl: './user-collections.css'
})
export class UserCollections {}
