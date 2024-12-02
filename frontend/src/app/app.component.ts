import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from "./components/employee/employee.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [EmployeeComponent, CommonModule]
})
export class AppComponent {
}
