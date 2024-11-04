import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  @Output() openEmpModal: EventEmitter<string> = new EventEmitter<string>();

  constructor(private employeeService: EmployeeService) {}

  // Method to search employees based on user input
  searchEmployees(event: any) {
    this.employeeService.searchEmployees(event.target.value, '');
  }

  // Method to open the employee modal when adding a new employee
  addEmployee() {
    this.openEmpModal.emit();
  }
}
