import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {}
