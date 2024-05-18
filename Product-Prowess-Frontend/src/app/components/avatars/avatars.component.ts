import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.css']
})

export class AvatarsComponent {
  @Output() avatarSelected: EventEmitter<string> = new EventEmitter<string>();

  avatars: string[] = [
    'assets/avatar/avatar1.PNG',
    'assets/avatar/avatar2.PNG',
    'assets/avatar/avatar3.PNG',
    'assets/avatar/avatar4.PNG',
    'assets/avatar/avatar5.PNG',
    'assets/avatar/avatar6.PNG',
    'assets/avatar/avatar7.PNG',
    'assets/avatar/avatar8.PNG',
    'assets/avatar/avatar9.PNG'
  ];

  ngOnInit() {
    this.avatars.forEach(avatar => console.log(avatar));
  }

  selectAvatar(avatar: string){
    this.avatarSelected.emit(avatar);
  }

}
