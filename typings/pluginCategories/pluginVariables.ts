/// <reference path="../definitions/jquery.d.ts" />
module PluginFactory
{
  export class PluginVariables
  {
     public Parent:JQuery;
     public Element:JQuery;
     public Msg_warning: any;
     public Msg_info: any;
     public Services: any;
     public VirtualNumber:string;
     public PositionCursor: number;
     public IdCategory:number;
     public NameCategory:string;
     public IdVariable:number;
     public NameVariable:string;
     public Categories: Array<Category>;
     public Variables: Array<Variable>;

     private Modal:JQuery;
     private ModalMain:JQuery;
     private SelectCategory:JQuery;
     private SelectVariable:JQuery;

     constructor(idElement: string, virtualNumber:string)
     {
        this.Msg_warning = eval("msg_warning");
        this.Msg_info = eval("msg_info");
        this.Services = eval("Services");
        this.Element = $("#"+idElement);
        this.VirtualNumber = virtualNumber;
        this.Parent = this.Element.parent();
        this.Categories = new Array<Category>();
        this.Variables = new Array<Variable>();

        //Change properties
        this.Element.css("font-family", "Courier New");
         this.Element.addClass("generatedFieldsPlugin");
        this.Parent.css("overflow-x", "auto");
         this.Parent.css("white-space", "nowrap");
     }

     public OpenModal(positionCursor: number): void{

         if (this.Element.siblings("input").last().length > 0)
             this.Element = this.Element.siblings("input").last();

         if (this.Element.val() == "") {
             alert("Input a value");
             return;
         }

         this.Element.on("input",
             (ev) => {
                 if (this.Element != undefined) {
                     var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                     this.Element.css("width", widthInput + "px");
                 }
             });

       this.PositionCursor = positionCursor;
       this.Modal = $("<div></div>");
       this.Modal.addClass("modalPlugin");
       var widthDocument = window.innerWidth;
       var heightDocument = window.document.documentElement.offsetHeight
       this.Modal.width(widthDocument);
       this.Modal.height(heightDocument);

       var frameMiddle = $("<div></div>");
       frameMiddle.addClass("frameMiddle");

       var frameContent = $("<div></div>");
       frameContent.addClass("frameContent");

       //show categories and variables dropdown
       /*
        --Load all Categories and after load all variables of default category
       */
       var labelCategory = $("<span></span>");
         labelCategory.html("Category: ");
       this.SelectCategory = $("<select></select>");
       this.SelectCategory.addClass("categoryPlug form-control input-lg mb-md");
       var optionCategory = $("<option value='0'>Loading...</option>");

       this.SelectCategory.change((ev) => {
         this.IdCategory = this.SelectCategory.val();
         this.NameCategory = this.GetCategoryForId(this.IdCategory.toString()).Name;
         this.GetVariables(this.IdCategory.toString(), () => {
            this.SelectVariable.html("");
            let optionVariable = $("<option value='0'>--Select--</option>");
            this.SelectVariable.append(optionVariable);
            $.each(this.Variables, (ix,vx) => {
              let option = $("<option></option>");
              option.attr("value", vx.Id);
              option.html(vx.Name);
              this.SelectVariable.append(option);
            });
         });
       });
       this.SelectCategory.append(optionCategory);
       frameContent.append(labelCategory);
       frameContent.append(this.SelectCategory);

         frameContent.append($("<p></p>"));

       var labelVariable = $("<span></span>");
       labelVariable.html("Variable: ");
       this.SelectVariable = $("<select></select>");
       this.SelectVariable.addClass("variablePlug form-control input-lg mb-md");
       var optionVariable = $("<option value='0'>Loading...</option>");

       this.SelectVariable.change((ev) => {
         this.IdVariable = this.SelectVariable.val();
         this.NameVariable = this.GetVariableForId(this.IdVariable.toString()).Name;

         if(this.IdVariable.toString() != "0"){
             //CloseModal and rebuild textbox target {default/variableName}
             this.Element.css("display", "inline-block");
             this.Element.css("margin-right", "10px");
             var widthInput = ((205 / 25) * this.Element.val().length) + 30;
             this.Element.css("width", widthInput + "px");

             var divInsert = $("<div></div>");
             divInsert.addClass("plugInsertCatVar");
             divInsert.attr("data-categoryId", this.IdCategory.toString());
             divInsert.attr("data-categoryName", this.NameCategory.toString());
             divInsert.attr("data-variableId", this.IdVariable.toString());
             divInsert.attr("data-variableName", this.NameVariable.toString());

             divInsert.html("{" + this.NameCategory + "/" + this.NameVariable + "}");

             var closeDivInsert = $("<div></div>");
             closeDivInsert.addClass("fa fa-close closePluginItem");
             closeDivInsert.click((ev) => {
                 var itemPrev = $(ev.target.parentElement).prev();//find("~input");
                 var itemNext = $(ev.target.parentElement).next();
                 var valuePrevItem = itemPrev.val();
                 var valueNextItem = itemNext.val();
                 if (valueNextItem != "") {
                     itemPrev.val(valuePrevItem + " " + valueNextItem);
                     var widthInput = ((205 / 25) * itemPrev.val().length) + 30;
                     itemPrev.css("width", widthInput + "px");
                 }
                 itemNext.remove();
                 $(ev.target.parentElement).remove();
                 $(ev.target.parentElement).siblings("input").last().focus();
             });
             divInsert.append(closeDivInsert);

             this.Parent.append(divInsert);

             var inputItem = $("<input type='text' />");
             inputItem.css("font-family", "Courier New");
             inputItem.css({"display":"inline-block", "width" : "200px", "margin-right" : "10px"});
             inputItem.addClass("form-control txt-text");

             inputItem.on("input",
                 (ev) => {
                     var widthInput = ((205 / 25) * inputItem.val().length) + 30;
                     inputItem.css("width", widthInput + "px");
                 });

             this.Parent.append(inputItem);
             this.CloseModal(inputItem);
         }

       });
       this.SelectVariable.append(optionVariable);
         frameContent.append(labelVariable);
         frameContent.append(this.SelectVariable);


         var button = $("<button></button>");
         button.attr("type", "button");
         button.html("Close");
         button.addClass("btn btn-sm btn-primary");
         button.click((ev) => {
             this.CloseModal(this.Element);
         });
         frameContent.append(button);

       this.GetCategories(() => {
          this.SelectCategory.html("");

          $.each(this.Categories, (ix, vx) => {
            let option = $("<option></option>");
            option.attr("value", vx.Id);
            option.html(vx.Name);

            if(vx.Name.toLowerCase() == "default"){
              option.attr("selected", "selected");
              this.IdCategory = parseInt(vx.Id);
              this.NameCategory = vx.Name;
            }
            this.SelectCategory.append(option);
          });

          this.SelectCategory.trigger("change");
       });

       frameMiddle.append(frameContent);
       this.Modal.append(frameMiddle);
       this.Modal.css("visibility", "visible");
       $(document.body).append(this.Modal);
     }

     private GetCategoryForId(idCategory:string) : Category{
       for(let i=0; i<this.Categories.length; i++){
         if(this.Categories[i].Id == idCategory)
           return this.Categories[i];
       }
     }

     private GetVariableForId(idVariable:string) : Variable{
       for(let i=0; i<this.Variables.length; i++){
         if(this.Variables[i].Id == idVariable)
           return this.Variables[i];
       }
     }

     private GetCategories(func: ()=> void) : void
     {
         this.Services.Local.GetVariableCategories(this.VirtualNumber, (resultOk) => {
             this.Categories = new Array<Category>();
             $.each(resultOk, (ix, vx) => {
                 this.Categories.push(new Category(vx.Id, vx.Name, vx.Description, vx.Date));
                 func();
             });
         }, (resultError) => {
             this.Msg_warning("Error in get Categories.");
         });
     }

     private GetVariables(categoryId:string, func: () => void): void
     {
         this.Services.Local.GetVariables(categoryId, (resultOk) => {
             this.Variables = new Array<Variable>();
             $.each(resultOk, (ix, vx) => {
                 var data: Variable = new Variable(vx.Id, vx.VariableName, vx.Date, vx.VariableType, vx.VariableOptions);
                 this.Variables.push(data);
             });
             func();
         }, (resultError) => {
             this.Msg_warning("Error to list variables.");
         });
     }

     public CloseModal(input: JQuery): void{
       this.Modal.fadeOut(() => {
           this.Modal.remove();
           input.focus();
       });
     }

     static GetPositionCursor(id:string) : {x:number, y:number}{
        var ctl = document.getElementById(id) as HTMLInputElement;
        var startPos = ctl.selectionStart;
        var endPos = ctl.selectionEnd;
        return {x:startPos, y:endPos};
     }

     static BuildTextInput(id: string, virtualNumber: string): void {
         var element = $("#" + id);
         var parent = element.parent();
         var services = eval("Services");
         element.css("font-family", "Courier New");
         element.addClass("generatedFieldsPlugin");
         parent.css("overflow-x", "auto");
         parent.css("white-space", "nowrap");


         var expression = "({)+([a-zA-Z0-9ñ]*)+(\/?)+([a-zA-Z0-9ñ]*)+(})";
         var exp = new RegExp(expression, "g");
         var text = element.val();
         var textData = "";

         var categories = new Array<Category>();
         var variables = new Array<Variable>();

         var indexPositionSearch = text.search(exp);
         if (indexPositionSearch != -1) {
             var indexWords = text.match(exp);
             indexWords.forEach((word) =>
             {
                 var itema = word.split("/");
                 var idCategory = itema[0].substr(1);
                 var idVariable = itema[1].substr(0, itema[1].length - 1);

                 categories.push(new Category("", idCategory, ""));
                 variables.push(new Variable("", idVariable, null, null, null));

                 /*
                 $.ajax({
                     url: services.Local.BaseUrl + '/' + services.Local.Name + '/GetVariableCategories',
                     headers: { 'x-token': localStorage['x-token'] },
                     method: 'POST',
                     async:false,
                     crossDomain: true,
                     dataType: 'json',
                     data: { 'sidVirtualNumber': virtualNumber },
                     success: (resultOk) => {
                         $.each(resultOk, (ix, vx) => {
                             if (idCategory == vx.Id) {
                                 $.ajax({
                                     url: services.Local.BaseUrl + '/' + services.Local.Name + '/GetVariables',
                                     headers: { 'x-token': localStorage['x-token'] },
                                     method: 'POST',
                                     async: false,
                                     crossDomain: true,
                                     dataType: 'json',
                                     data: { 'idVariableCategory': idCategory },
                                     success: (resultOk1) => {
                                         $.each(resultOk1, (ix1, vx1) => {
                                             if (idVariable == vx1.Id) {
                                                 var textReplace = "{" + vx.Name + "/" + vx1.VariableName + "}";
                                                 text = text.replace(new RegExp(word, "g"), textReplace);
                                                 categories.push(new Category(vx.Id, vx.Name, ""));
                                                 variables.push(new Variable(vx1.Id, vx1.VariableName,null,null,null));
                                             }
                                         });
                                     },
                                     error: (error1) => {
                                         
                                     }
                                 });
                             }
                         });
                     },
                     error: (ev) => {
                         
                     }
                 });
                 */
             });
         }

         //change data
         var textXhange = text;
         indexPositionSearch = textXhange.search(exp);
         if (indexPositionSearch != -1) {
             var indexWords = text.match(exp);
             indexWords.forEach((word) => {
                 textXhange = textXhange.replace(new RegExp(word, "g"), "plp39b");
             });
         }

         var textFinal = textXhange.split("plp39b") as [string];
         if (textFinal.length > 1) {
             $.each(textFinal,
                 (ix, vx) => {
                     if (ix == 0) {
                         element.val($.trim(vx));
                         element.css("display", "inline-block");
                         element.css("margin-right", "10px");
                         var widthInput = ((205 / 25) * element.val().length) + 30;
                         element.css("width", widthInput + "px");
                         element.on("input",
                             (ev) => {
                                 var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                                 inputItem.css("width", widthInput + "px");
                             });
                         //

                         var divInsert = $("<div></div>");
                         divInsert.addClass("plugInsertCatVar");
                         divInsert.attr("data-categoryId", categories[ix].Id);
                         divInsert.attr("data-categoryName", categories[ix].Name);
                         divInsert.attr("data-variableId", variables[ix].Id);
                         divInsert.attr("data-variableName", variables[ix].Name);

                         divInsert.html("{" + categories[ix].Name + "/" + variables[ix].Name + "}");

                         var closeDivInsert = $("<div></div>");
                         closeDivInsert.addClass("fa fa-close closePluginItem");
                         closeDivInsert.click((ev) => {
                             var itemPrev = $(ev.target.parentElement).prev();
                             var itemNext = $(ev.target.parentElement).next();
                             var valuePrevItem = itemPrev.val();
                             var valueNextItem = itemNext.val();
                             if (valueNextItem != "") {
                                 itemPrev.val(valuePrevItem + " " + valueNextItem);
                                 var widthInput = ((205 / 25) * itemPrev.val().length) + 30;
                                 itemPrev.css("width", widthInput + "px");
                             }
                             itemNext.remove();
                             $(ev.target.parentElement).remove();
                             $(ev.target.parentElement).siblings("input").last().focus();
                         });
                         divInsert.append(closeDivInsert);

                         parent.append(divInsert);

                     } else {
                         if (ix == textFinal.length - 1) {
                             var inputItem = $("<input type='text' />");
                             inputItem.css("font-family", "Courier New");
                             inputItem.css({ "display": "inline-block", "width": "200px", "margin-right": "10px" });
                             inputItem.addClass("form-control txt-text");
                             inputItem.val($.trim(vx));
                             var widthInput = ((205 / 25) * inputItem.val().length) + 30;
                             inputItem.css("width", widthInput + "px");

                             inputItem.on("input",
                                 (ev) => {
                                     var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                                     inputItem.css("width", widthInput + "px");
                                 });

                             parent.append(inputItem);
                         } else {
                             var inputItem = $("<input type='text' />");
                             inputItem.css("font-family", "Courier New");
                             inputItem.css({ "display": "inline-block", "width": "200px", "margin-right": "10px" });
                             inputItem.addClass("form-control txt-text");
                             inputItem.val($.trim(vx));
                             var widthInput = ((205 / 25) * inputItem.val().length) + 30;
                             inputItem.css("width", widthInput + "px");

                             inputItem.on("input",
                                 (ev) => {
                                     var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                                     inputItem.css("width", widthInput + "px");
                                 });

                             parent.append(inputItem);

                             var divInsert = $("<div></div>");
                             divInsert.addClass("plugInsertCatVar");
                             divInsert.attr("data-categoryId", categories[ix].Id);
                             divInsert.attr("data-categoryName", categories[ix].Name);
                             divInsert.attr("data-variableId", variables[ix].Id);
                             divInsert.attr("data-variableName", variables[ix].Name);

                             divInsert.html("{" + categories[ix].Name + "/" + variables[ix].Name + "}");

                             var closeDivInsert = $("<div></div>");
                             closeDivInsert.addClass("fa fa-close closePluginItem");
                             closeDivInsert.click((ev) => {
                                 var itemPrev = $(ev.target.parentElement).prev();
                                 var itemNext = $(ev.target.parentElement).next();
                                 var valuePrevItem = itemPrev.val();
                                 var valueNextItem = itemNext.val();
                                 if (valueNextItem != "") {
                                     itemPrev.val(valuePrevItem + " " + valueNextItem);
                                     var widthInput = ((205 / 25) * itemPrev.val().length) + 30;
                                     itemPrev.css("width", widthInput + "px");
                                 }
                                 itemNext.remove();
                                 $(ev.target.parentElement).remove();
                                 $(ev.target.parentElement).siblings("input").last().focus();
                             });
                             divInsert.append(closeDivInsert);

                             parent.append(divInsert);
                         }
                     }
                 });
         }
     }
  }

  export class Category
  {
      public Id: string;
      public Name: string;
      public Description: string;
      public Date: string;

      constructor(id: string, name: string, description: string, date?: string)
      {
          this.Id = id;
          this.Name = name;
          this.Description = description;
          this.Date = date;
      }
  }

  export enum varType {
      String,
      Numeric,
      Options
  }

  export class Variable {

      public Id: string;
      public Name: string;
      public DateV: string;
      public VariableType: varType;
      public Options: Array<string>

      constructor(id: string, name: string, dateV: string, variableType: varType, options: Array<string>) {
          this.Id = id;
          this.Name = name;
          this.DateV = dateV;
          this.VariableType = variableType;
          this.Options = options;
      }
  }

}
