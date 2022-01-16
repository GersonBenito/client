export class Producto {
    _id?: number;
    nombre: string;
    categoria: string;
    ubicacion: string;
    precio: number;

    // inicializando las variables
    constructor(nombre: string, categoria: string, ubicacion: string, precio: number){
        this.nombre = nombre;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.precio = precio;
    }
}