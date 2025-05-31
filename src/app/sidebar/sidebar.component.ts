// sidebar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() activeMenu: string = 'dealer';
  @Output() menuSelected = new EventEmitter<string>();

  selectMenu(menu: string) {
    this.activeMenu = menu;
    this.menuSelected.emit(menu);
  }
}
