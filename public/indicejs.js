$(document).ready(function () {
    $(document).on("click", "#buttonMinP",function() {
        var pruebaa = $(this).closest(".contenedorGral").find(".contenedorPrimero");
        pruebaa.slideToggle();
    }) 

    $(document).on("click", "#buttonMinS",function() {
        var pruebaa = $(this).closest(".contenedorGral").find(".contenedorSegundoContenido");
        pruebaa.slideToggle();
    })        

    $(document).on("click", "#buttonMinT",function() {
        var pruebaa = $(this).closest(".contenedorGral").find(".contenedorTerceroContenido");
        pruebaa.slideToggle();
    })        
       
    });