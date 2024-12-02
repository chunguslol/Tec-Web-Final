import { Component, OnInit } from '@angular/core';
import  {EmployeeService} from '../../services/employee.service'  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgForm } from "@angular/forms";
import { Employee } from "../../models/employee";

@Component({
  selector: "app-employee",
  imports: [CommonModule, FormsModule],
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  providers: [EmployeeService, CommonModule],
})

export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employeeService.employees = res; // Manejo de la respuesta exitosa
      },
      error: (err) => {
        console.error(err); // Manejo de errores
      },
      complete: () => {
        console.log('Carga de empleados completada.'); // (Opcional) Cuando se completa
      },
    });
  }

  addEmployee(form?: NgForm) {
    if (form?.value._id) {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.getEmployees();
      });
    } else {
      this.employeeService.postEmployee(form?.value).subscribe((res) => {
        this.getEmployees();
        this.resetForm(form);
      });
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.getEmployees();
        this.resetForm(form);
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }
  

}
