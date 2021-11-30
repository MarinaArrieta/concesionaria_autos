/* requerir módulo autos */
let autos = require("./autos");

let concesionaria = {
    autos:autos,
  
    buscarAuto:    function(patente){
       for ( let i = 0 ; i < this.autos.length; i++ ){ 
          if (patente == this.autos[i].patente){
             return this.autos[i];
          }
       }
       return null; 
    },
 
    venderAuto:   function(patente){
       auto = this.buscarAuto(patente);
       auto.vendido = true;
    },
 
    autosParaLaVenta:  function(){
       return this.autos.filter((auto)=>auto.vendido==false);
    },
 
    autosNuevos:  function(){
       lista = this.autosParaLaVenta()
       return lista.filter((auto)=> auto.km < 100);
    },
 
  listaDeVentas: function(){
       total=[];
       this.autos.forEach((auto)=>{
          if (auto.vendido){
             total.push(auto.precio);
          }
       } )
       return total;
    },
 
    totalDeVentas: function(){
       let total = this.listaDeVentas().reduce((acum, num)=>    acum + num,0)
       return total;
    },
   
    puedeComprar: function(auto, persona){
       return ( persona.capacidadDePagoEnCuotas > (auto.precio / auto.cuotas)) && ( persona.capacidadDePagoTotal > auto.precio);
    },
 
    autosQuePuedeComprar: function(persona){
       lista = []
       this.autosParaLaVenta().forEach( (auto)=>{
          if (this.puedeComprar(auto, persona)){
             lista.push(auto);
          }
       })
       return lista;
    }
 }