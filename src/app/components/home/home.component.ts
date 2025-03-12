import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from '../shared/playlist-card/playlist-card.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import sectionsData from '../../data/sections.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, PlaylistCardComponent, SectionHeaderComponent]
})
export class HomeComponent {
  sections = sectionsData.sections;
}