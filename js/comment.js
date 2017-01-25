function element(number) {
    this.number = number;
    this.commentsES = [];
    this.commentsEN = [];
}

var Comment = "";

Comment.Voice = {
    A: new element(1),
    B: new element(2)
}

{
    Comment.Voice.A.commentsEN = ["Begin by selecting a say node for a welcome message.",
"Edit the greeting by entering the voice, language, and text attributes and create the node.",
"We can visualize the created node under the root logic.",
"Again we create a say node to explain the procedure we will execute.",
"We establish the values ​​that explain the procedure and accept.",
"Verify that the node was successfully created.",
"Now select the CollectDigits node to get a value entered over the phone.",
"The form will appear with the default values.",
"Enter 1 in Number of digits because the value entered will be 1 to 5 and Finish on Key will remain with the default value (serves to finalize data entry).",
"In Timeout we enter 10 because in case the user after entering the desired value does not write the Finish key on Key, after 10 seconds the value will be written on the screen.",
"Change the default to variable, the name is at your discretion.",
"Nothing is written in the category, because we will not use it in this example, but it is not necessary either. We have verified that everything has been entered correctly.",
"Now select the If node to condition the input variable.",
"The default form will appear with its 4 fields."];

    Comment.Voice.A.commentsES = ["Empezando, seleccionamos un nodo say para un mensaje de bienvenida.",
    "Editamos el saludo ingresando los atributos voice, language y text, y creamos el nodo.",
    "Podemos visualizar el nodo creado bajo la lógica raíz.",
    "Nuevamente creamos un nodo say para explicar el procedimiento que ejecutaremos.",
    "Establecemos los valores que explican el procedimiento y aceptamos.",
    "Compruebe que el nodo se ha creado correctamente.",
    "Ahora seleccione el nodo CollectDigits para obtener un valor introducido por teléfono.",
    "El formulario aparecerá con los valores predeterminados.",
    "Introduzca 1 en el número de dígitos porque el valor introducido será de 1 a 5 y la tecla Finish on Key permanecerá con el valor predeterminado (sirve para finalizar la entrada de datos).",
    "En Timeout ingresamos 10 porque en caso de que el usuario después de ingresar el valor deseado no escriba la tecla Finish en Key, después de 10 segundos el valor será escrito en la pantalla.",
    "Cambie el valor predeterminado a variable, el nombre es a su criterio.",
    "Nada está escrito en la categoría, porque no lo usaremos en este ejemplo, pero tampoco es necesario. Verificamos que todo se ha introducido correctamente.",
    "Ahora seleccione el nodo If para condicionar la variable de entrada.",
    "El formulario predeterminado aparecerá con sus 4 campos.",
    "El campo Palabra clave se refiere al nombre de la variable que recibió el"];
}