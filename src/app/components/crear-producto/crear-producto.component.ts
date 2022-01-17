import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  // creamos la variable publica de tipo FormGroup
  public productoForm: FormGroup;
  public titulo: string = 'Crear producto';
  public _id: string | null; // el id puede ser el string o tambien null

  constructor(
    // usamos inyeccion de depencias
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute,

  ) { 

    //REACTIVE FORMS 

    // inicializamos la variable productoForm
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });

    // obtener el id que se envia por medio de la url
    this._id = this.aRouter.snapshot.paramMap.get('id');
    
  }

  ngOnInit(): void {
    
    this.obtenerProductoById();

  }

  // agregar producto
  agregarProducto(){
   
    const producto: Producto = {
      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    // verificar la accion del boton
    if(this._id !== null){
      console.log('_id', this._id);
      
      // actualizar producto
      this._productoService.updateProduct(this._id, producto).subscribe( res =>{
        console.log(res);
        if(res.status === 200){
          this.toastr.success(res.message, 'Actualizado con exito!');
          this.router.navigate(['/']);
        }else{
          this.toastr.error(res.message, 'Error al actualizar!');
        }

      }, error =>{
        console.log(error);
        this.toastr.error('Ocurrio un error al intenta actualizar el producto', 'Error al actualizar!');
      })

    }else{
      // agregar producto
      this._productoService.addProduct(producto).subscribe(res =>{
  
        this.toastr.success(res.message, 'Producto agregado!')
  
        // redireccionar a la lista de productos
        this.router.navigate(['/']);
  
      },error =>{
  
        console.log(error);
        this.toastr.error('Ocurrio un error al intenta agregar el producto', 'Error al agregar!');
        this.productoForm.reset();
  
      })
    }
    
  }

  // obtener producto por id
  obtenerProductoById(){

    // verificar si el id existe
    if(this._id){

      this.titulo = 'Actualizar producto'
      this._productoService.getProductById(this._id).subscribe( res =>{

        this.productoForm.setValue({
          producto: res.data.producto,
          categoria: res.data.categoria,
          ubicacion: res.data.ubicacion,
          precio: res.data.precio
        });

      },error =>{
        console.log(error);
        this.toastr.error('Ocurrio un error al intenta obtener el producto', 'Error al obtener!');
      })
    }

  }

}
