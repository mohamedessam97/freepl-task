import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  @Input() opened: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  employees: Employee[] = [];
  depatrments: string[] = [];

  searchTerm: string = '';
  selectedDepartment: string = '';
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.availableEmployees$.subscribe((employees) => {
      this.employees = employees.filter((emp) => emp.isSelected === false);
    });
    this.depatrments = this.employeeService.getDepartments();
  }

  // Method to search employees based on search term and selected department
  searchEmployees() {
    this.employeeService.searchEmployees(
      this.searchTerm,
      this.selectedDepartment,
      true // Boolean parameter indicating the search context (e.g., searching in new emp modal)
    );
  }

  // Method to add an employee by name, and then refresh the search results
  addEmp(emp: string) {
    this.employeeService.addEmployee(emp); // Calls service to add the selected employee
    this.searchEmployees(); // Refreshes search results after adding
  }

  // Method to clear search filters and reset the employee list
  clearSearch() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.employeeService.clearSearch(); // Calls service to clear search filters
  }

  // Method to close the employee modal
  closeEmpModal() {
    this.closeModal.emit();
  }
}
