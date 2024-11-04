import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    EmployeeTableComponent,
    SectionHeaderComponent,
    AddEmployeeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  opened = false;

  constructor() {}

  ngOnInit(): void {}
  openEmpModal() {
    this.opened = true;
  }
}
