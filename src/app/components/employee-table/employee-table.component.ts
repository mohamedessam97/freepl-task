import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.employees$.subscribe((employees) => {
      this.employees = employees.filter((emp) => emp.isSelected === true);
    });
  }

  // Method to delete an employee by name
  deleteEmp(emp: string) {
    this.employeeService.deleteEmployee(emp);
  }
}
