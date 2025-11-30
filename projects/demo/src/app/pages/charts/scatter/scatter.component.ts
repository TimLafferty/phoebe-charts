import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scatter',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent {}
