import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {}
