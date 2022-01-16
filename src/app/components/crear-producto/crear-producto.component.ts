import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  // creamos la variable publica de tipo FormGroup
  public productoForm: FormGroup;

  constructor(
    // usamos inyeccion de depencias
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,

  ) { 

    //REACTIVE FORMS 

    // inicializamos la variable productoForm
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  // agregar producto
  agregarProducto(){
   
    const producto: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    console.log(producto);
    
    this.toastr.success('El producto fue agregado con exito!', 'Producto agregado!')

    // redireccionar a la lista de productos
    this.router.navigate(['/']);

  }

}
