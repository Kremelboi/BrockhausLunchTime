import {Component} from '@angular/core';
import {DialogModule} from '@angular/cdk/dialog';
import {NgOptimizedImage} from '@angular/common';
import {MainPage} from './components/main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [DialogModule, NgOptimizedImage, MainPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
}
