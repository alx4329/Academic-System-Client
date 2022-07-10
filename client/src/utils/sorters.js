export function orderByNumber (array, property,sortOrder){
    console.log(array)
    // Primero se verifica que la propiedad sortOrder tenga un dato válido.
    if (sortOrder!==-1 && sortOrder!==1) sortOrder=1;
    array.sort(function(a,b){
        // La función de ordenamiento devuelve la comparación entre property de a y b.
        // El resultado será afectado por sortOrder.
        return (a[property]-b[property])*sortOrder;
    })
}