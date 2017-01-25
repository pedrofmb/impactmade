/*
 * Estructuras y Objectos que contienen las reglas
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function ExampleStruct(id, description, xml){
    this.Id = id;
    this.Description = description;
    this.Xml = xml;
}

function VirtualNumbers(id, phone){
    this.Id = id;
    this.Phone = phone;
}

function LogicStruct(idLogic, isVoice, name, description, dateCreated, isDefault){
    this.IdLogic = idLogic;
    this.IsVoice = isVoice;
    this.Name = name;
    this.Description = description;
    this.DateCreated = dateCreated;
    this.IsDefault = isDefault;
}

var comment = {
    name: 'Comment',
    description: { "en" : "Comment for nodes", "es": "Comentario para nodos" },
    icon: 'fa fa-commenting-o',
    attributtes: [],
    choices: []
}