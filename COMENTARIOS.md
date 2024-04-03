# Componentes
Separé en componentes la aplicacion para que el componente App quede mas limpio.
El componente Search se encarga de la busqueda y muestra de resultados de la misma.
El componente Filters administra el uso de los filtros y su logica
Luego esta el componente Modal para mostrar los datos de un personaje al clickearlo y el componente Card que muestra un primer vistazo de los mismos
Deje un componente llamado Foote que no utilice, para el paginado manual por parte del usuario

# Peticiones
Utilice solo dos query para las peticiones, las cuales implementé a travez de Apollo Client y sus hooks

# Busqueda
Utilizo una query la cual filtra los resultados por el nombre que se da en el campo de texto y los resultados los mapeo en el mismo componente

# Filtros
Para filtrar los personajes realicé un custom hook, en el cual separo la logica para dejar los compontes mas limpios. En este utilizo 3 estados, dos para los personajes y uno para el manejo de los filtros. El cual trato como un objeto para poder aplicar mas de un filtro a la vez

# Paginación
Al principio opte por que el usuario cambie de pagina de manera manual, luego opte por capturar en un effect el evento scroll, realizar la peticion y agregar al array de los personajes, los que trae la nueva response. Esto me llevo a tener que agregar un boton para regresar arriba, por si se baja demasiado

# Conclusión
Me gustó mucho el desafio, ya que no contaba con mucha experiencia en GraphQL o Apollo Client, lo que me dió la oportunidad de aprender.
Con mas tiempo me gustaria utilizar un enrutado para separar en pages los componente, tambien me gustaria guardar los parametros de los filtros o la busqueda en la URL, para que al refrescar la pagina queden guardados. Y utilizar una libreria para los estilos.

Desde ya muchas gracias por la oportunidad!
