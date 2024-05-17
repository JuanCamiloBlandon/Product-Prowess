import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private avatars = [
    {name: 'Avatar 1', url: 'assets/avatar/avatar1.png'},
    {name: 'Avatar 2', url: 'assets/avatar/avatar2.png'},
    {name: 'Avatar 3', url: 'assets/avatar/avatar3.png'},
    {name: 'Avatar 4', url: 'assets/avatar/avatar4.png'},
    {name: 'Avatar 5', url: 'assets/avatar/avatar5.png'},
    {name: 'Avatar 6', url: 'assets/avatar/avatar6.png'},
    {name: 'Avatar 7', url: 'assets/avatar/avatar7.png'},
    {name: 'Avatar 8', url: 'assets/avatar/avatar8.png'},
    {name: 'Avatar 9', url: 'assets/avatar/avatar9.png'},

  ];

  getAvatars() { 
    return this.avatars;
  }
}
