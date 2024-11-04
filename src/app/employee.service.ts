import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // Initial list of employees with details including name, title, years of experience, department, and selection status
  private employees: Employee[] = [
    {
      name: 'Alice Johnson',
      title: 'Software Engineer',
      yearsOfExperience: 5,
      department: 'Development',
      isSelected: false,
    },
    {
      name: 'Bob Smith',
      title: 'Project Manager',
      yearsOfExperience: 8,
      department: 'Management',
      isSelected: true,
    },
    {
      name: 'Carol Lee',
      title: 'UX Designer',
      yearsOfExperience: 3,
      department: 'Design',
      isSelected: false,
    },
    {
      name: 'David Brown',
      title: 'Data Analyst',
      yearsOfExperience: 4,
      department: 'Analytics',
      isSelected: true,
    },
    {
      name: 'Emma Wilson',
      title: 'QA Tester',
      yearsOfExperience: 2,
      department: 'Quality Assurance',
      isSelected: false,
    },
    {
      name: 'Frank Green',
      title: 'DevOps Engineer',
      yearsOfExperience: 6,
      department: 'Operations',
      isSelected: true,
    },
    {
      name: 'Grace Miller',
      title: 'Product Manager',
      yearsOfExperience: 7,
      department: 'Product',
      isSelected: false,
    },
    {
      name: 'Henry Taylor',
      title: 'Backend Developer',
      yearsOfExperience: 3,
      department: 'Development',
      isSelected: true,
    },
    {
      name: 'Ivy Thomas',
      title: 'Front-end Developer',
      yearsOfExperience: 4,
      department: 'Development',
      isSelected: false,
    },
    {
      name: 'Jack White',
      title: 'Marketing Specialist',
      yearsOfExperience: 5,
      department: 'Marketing',
      isSelected: true,
    },
    {
      name: 'Karen Black',
      title: 'HR Manager',
      yearsOfExperience: 10,
      department: 'Human Resources',
      isSelected: false,
    },
    {
      name: 'Liam Hall',
      title: 'Full Stack Developer',
      yearsOfExperience: 4,
      department: 'Development',
      isSelected: true,
    },
    {
      name: 'Mia Adams',
      title: 'Customer Support Specialist',
      yearsOfExperience: 2,
      department: 'Customer Support',
      isSelected: false,
    },
    {
      name: 'Nathan Clark',
      title: 'Technical Support Engineer',
      yearsOfExperience: 6,
      department: 'Support',
      isSelected: true,
    },
    {
      name: 'Olivia King',
      title: 'Business Analyst',
      yearsOfExperience: 3,
      department: 'Business Analysis',
      isSelected: false,
    },
    {
      name: 'Paul Walker',
      title: 'Financial Analyst',
      yearsOfExperience: 7,
      department: 'Finance',
      isSelected: true,
    },
    {
      name: 'Quinn Robinson',
      title: 'Systems Architect',
      yearsOfExperience: 9,
      department: 'IT',
      isSelected: false,
    },
    {
      name: 'Rachel Evans',
      title: 'Content Strategist',
      yearsOfExperience: 5,
      department: 'Content',
      isSelected: true,
    },
    {
      name: 'Steve Martinez',
      title: 'Data Scientist',
      yearsOfExperience: 6,
      department: 'Analytics',
      isSelected: false,
    },
    {
      name: 'Tina Scott',
      title: 'Social Media Manager',
      yearsOfExperience: 3,
      department: 'Marketing',
      isSelected: true,
    },
  ];

  // List of departments
  private departments: string[] = [
    'Development',
    'Management',
    'Design',
    'Analytics',
    'Quality Assurance',
  ];

  // BehaviorSubject to hold the employees list, allowing components to subscribe to changes
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  employees$ = this.employeesSubject.asObservable(); // Observable for components to subscribe to the employees list

  // Separate BehaviorSubject for avaiable employees list, allowing components to subscribe to changes
  private availableEmployeesSubject = new BehaviorSubject<Employee[]>([]);
  availableEmployees$ = this.availableEmployeesSubject.asObservable(); // Observable for components to subscribe to the avaiable employees list

  constructor() {}

  // Method to get the list of departments
  getDepartments(): string[] {
    return this.departments;
  }

  // Method to mark an employee as selected by name
  addEmployee(name: string) {
    this.employees = this.employees.map(
      (emp) => (emp.name === name ? { ...emp, isSelected: true } : emp) // Marks the employee as selected if the name matches
    );
    this.employeesSubject.next(this.employees); // Updates the employees observable
    this.availableEmployeesSubject.next(this.employees); // Updates the avaiable employees observable
  }

  // Method to mark an employee as not selected (delete them from the selected list) by name
  deleteEmployee(name: string): void {
    this.employees = this.employees.map(
      (emp) => (emp.name === name ? { ...emp, isSelected: false } : emp) // Marks the employee as not selected if the name matches
    );
    this.employeesSubject.next(this.employees); // Updates the employees observable
  }

  // Method to clear the search results by setting new employees to an empty list
  clearSearch() {
    this.availableEmployeesSubject.next([]); // Resets the avaiable employees  observable to an empty list
  }

  // Method to perform a search on the employees based on name and department filters
  search(name: string = ' ', department: string = ' '): Employee[] {
    return this.employees.filter((emp) => {
      const matchesName = emp.name.toLowerCase().includes(name.toLowerCase()); // Checks if the employee's name matches the search term
      const matchesDepartment = emp.department
        .toLowerCase()
        .includes(department.toLowerCase()); // Checks if the department matches the search term

      return matchesName && matchesDepartment; // Returns employees that match both the name and department
    });
  }

  // Method to search employees and decide whether to update the new or existing employees list
  searchEmployees(
    name?: string,
    department?: string,
    availableEmployee?: boolean
  ): void {
    if (availableEmployee) {
      // If searching for avaiable employees, update `availableEmployeesSubject`
      this.availableEmployeesSubject.next(this.search(name, department));
    } else {
      // If not, update `employeesSubject`
      this.employeesSubject.next(this.search(name, department));
    }
  }
}
