import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  public listProduct: Producto[] = [];

  constructor(

    private _productoService: ProductoService,
    private toastr: ToastrService,

  ) { }
  
  ngOnInit(): void {

    this.obtenerProductos();

  }

  obtenerProductos(){

    this._productoService.getProducts().subscribe( res =>{
      console.log(res);
      this.listProduct = res.data;
    },error =>{
      
      console.log('error al obtener los productos', error);

    })

  }

  eliminarProducto(_id: any){

    this._productoService.deleteProduct(_id).subscribe(res =>{
     
      this.toastr.success(res.message, 'Eliminado con exito!')
      this.obtenerProductos();

    }, error =>{

      console.log(error);
      this.toastr.error('Ocurrio un error al intenta eliminar el producto', 'Error al eliminar!');

    })
  }
  
}
