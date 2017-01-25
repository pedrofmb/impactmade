var PluginFactory;
(function (PluginFactory) {
    var PluginVariables = (function () {
        function PluginVariables(idElement, virtualNumber) {
            this.Msg_warning = eval("msg_warning");
            this.Msg_info = eval("msg_info");
            this.Services = eval("Services");
            this.Element = $("#" + idElement);
            this.VirtualNumber = virtualNumber;
            this.Parent = this.Element.parent();
            this.Categories = new Array();
            this.Variables = new Array();
            this.Element.css("font-family", "Courier New");
            this.Element.addClass("generatedFieldsPlugin");
            this.Parent.css("overflow-x", "auto");
            this.Parent.css("white-space", "nowrap");
        }
        PluginVariables.prototype.OpenModal = function (positionCursor) {
            var _this = this;
            if (this.Element.siblings("input").last().length > 0)
                this.Element = this.Element.siblings("input").last();
            if (this.Element.val() == "") {
                alert("Input a value");
                return;
            }
            this.Element.on("input", function (ev) {
                if (_this.Element != undefined) {
                    var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                    _this.Element.css("width", widthInput + "px");
                }
            });
            this.PositionCursor = positionCursor;
            this.Modal = $("<div></div>");
            this.Modal.addClass("modalPlugin");
            var widthDocument = window.innerWidth;
            var heightDocument = window.document.documentElement.offsetHeight;
            this.Modal.width(widthDocument);
            this.Modal.height(heightDocument);
            var frameMiddle = $("<div></div>");
            frameMiddle.addClass("frameMiddle");
            var frameContent = $("<div></div>");
            frameContent.addClass("frameContent");
            var labelCategory = $("<span></span>");
            labelCategory.html("Category: ");
            this.SelectCategory = $("<select></select>");
            this.SelectCategory.addClass("categoryPlug form-control input-lg mb-md");
            var optionCategory = $("<option value='0'>Loading...</option>");
            this.SelectCategory.change(function (ev) {
                _this.IdCategory = _this.SelectCategory.val();
                _this.NameCategory = _this.GetCategoryForId(_this.IdCategory.toString()).Name;
                _this.GetVariables(_this.IdCategory.toString(), function () {
                    _this.SelectVariable.html("");
                    var optionVariable = $("<option value='0'>--Select--</option>");
                    _this.SelectVariable.append(optionVariable);
                    $.each(_this.Variables, function (ix, vx) {
                        var option = $("<option></option>");
                        option.attr("value", vx.Id);
                        option.html(vx.Name);
                        _this.SelectVariable.append(option);
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
            this.SelectVariable.change(function (ev) {
                _this.IdVariable = _this.SelectVariable.val();
                _this.NameVariable = _this.GetVariableForId(_this.IdVariable.toString()).Name;
                if (_this.IdVariable.toString() != "0") {
                    _this.Element.css("display", "inline-block");
                    _this.Element.css("margin-right", "10px");
                    var widthInput = ((205 / 25) * _this.Element.val().length) + 30;
                    _this.Element.css("width", widthInput + "px");
                    var divInsert = $("<div></div>");
                    divInsert.addClass("plugInsertCatVar");
                    divInsert.attr("data-categoryId", _this.IdCategory.toString());
                    divInsert.attr("data-categoryName", _this.NameCategory.toString());
                    divInsert.attr("data-variableId", _this.IdVariable.toString());
                    divInsert.attr("data-variableName", _this.NameVariable.toString());
                    divInsert.html("{" + _this.NameCategory + "/" + _this.NameVariable + "}");
                    var closeDivInsert = $("<div></div>");
                    closeDivInsert.addClass("fa fa-close closePluginItem");
                    closeDivInsert.click(function (ev) {
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
                    _this.Parent.append(divInsert);
                    var inputItem = $("<input type='text' />");
                    inputItem.css("font-family", "Courier New");
                    inputItem.css({ "display": "inline-block", "width": "200px", "margin-right": "10px" });
                    inputItem.addClass("form-control txt-text");
                    inputItem.on("input", function (ev) {
                        var widthInput = ((205 / 25) * inputItem.val().length) + 30;
                        inputItem.css("width", widthInput + "px");
                    });
                    _this.Parent.append(inputItem);
                    _this.CloseModal(inputItem);
                }
            });
            this.SelectVariable.append(optionVariable);
            frameContent.append(labelVariable);
            frameContent.append(this.SelectVariable);
            var button = $("<button></button>");
            button.attr("type", "button");
            button.html("Close");
            button.addClass("btn btn-sm btn-primary");
            button.click(function (ev) {
                _this.CloseModal(_this.Element);
            });
            frameContent.append(button);
            this.GetCategories(function () {
                _this.SelectCategory.html("");
                $.each(_this.Categories, function (ix, vx) {
                    var option = $("<option></option>");
                    option.attr("value", vx.Id);
                    option.html(vx.Name);
                    if (vx.Name.toLowerCase() == "default") {
                        option.attr("selected", "selected");
                        _this.IdCategory = parseInt(vx.Id);
                        _this.NameCategory = vx.Name;
                    }
                    _this.SelectCategory.append(option);
                });
                _this.SelectCategory.trigger("change");
            });
            frameMiddle.append(frameContent);
            this.Modal.append(frameMiddle);
            this.Modal.css("visibility", "visible");
            $(document.body).append(this.Modal);
        };
        PluginVariables.prototype.GetCategoryForId = function (idCategory) {
            for (var i = 0; i < this.Categories.length; i++) {
                if (this.Categories[i].Id == idCategory)
                    return this.Categories[i];
            }
        };
        PluginVariables.prototype.GetVariableForId = function (idVariable) {
            for (var i = 0; i < this.Variables.length; i++) {
                if (this.Variables[i].Id == idVariable)
                    return this.Variables[i];
            }
        };
        PluginVariables.prototype.GetCategories = function (func) {
            var _this = this;
            this.Services.Local.GetVariableCategories(this.VirtualNumber, function (resultOk) {
                _this.Categories = new Array();
                $.each(resultOk, function (ix, vx) {
                    _this.Categories.push(new Category(vx.Id, vx.Name, vx.Description, vx.Date));
                    func();
                });
            }, function (resultError) {
                _this.Msg_warning("Error in get Categories.");
            });
        };
        PluginVariables.prototype.GetVariables = function (categoryId, func) {
            var _this = this;
            this.Services.Local.GetVariables(categoryId, function (resultOk) {
                _this.Variables = new Array();
                $.each(resultOk, function (ix, vx) {
                    var data = new Variable(vx.Id, vx.VariableName, vx.Date, vx.VariableType, vx.VariableOptions);
                    _this.Variables.push(data);
                });
                func();
            }, function (resultError) {
                _this.Msg_warning("Error to list variables.");
            });
        };
        PluginVariables.prototype.CloseModal = function (input) {
            var _this = this;
            this.Modal.fadeOut(function () {
                _this.Modal.remove();
                input.focus();
            });
        };
        PluginVariables.GetPositionCursor = function (id) {
            var ctl = document.getElementById(id);
            var startPos = ctl.selectionStart;
            var endPos = ctl.selectionEnd;
            return { x: startPos, y: endPos };
        };
        PluginVariables.BuildTextInput = function (id, virtualNumber) {
            var element = $("#" + id);
            var parent = element.parent();
            var services = eval("Services");
            element.css("font-family", "Courier New");
            element.addClass("generatedFieldsPlugin");
            parent.css("overflow-x", "auto");
            parent.css("white-space", "nowrap");
            var expression = "({)+([a-zA-Z0-9�]*)+(\/?)+([a-zA-Z0-9�]*)+(})";
            var exp = new RegExp(expression, "g");
            var text = element.val();
            var textData = "";
            var categories = new Array();
            var variables = new Array();
            var indexPositionSearch = text.search(exp);
            if (indexPositionSearch != -1) {
                var indexWords = text.match(exp);
                indexWords.forEach(function (word) {
                    var itema = word.split("/");
                    var idCategory = itema[0].substr(1);
                    var idVariable = itema[1].substr(0, itema[1].length - 1);
                    categories.push(new Category("", idCategory, ""));
                    variables.push(new Variable("", idVariable, null, null, null));
                });
            }
            var textXhange = text;
            indexPositionSearch = textXhange.search(exp);
            if (indexPositionSearch != -1) {
                var indexWords = text.match(exp);
                indexWords.forEach(function (word) {
                    textXhange = textXhange.replace(new RegExp(word, "g"), "plp39b");
                });
            }
            var textFinal = textXhange.split("plp39b");
            if (textFinal.length > 1) {
                $.each(textFinal, function (ix, vx) {
                    if (ix == 0) {
                        element.val($.trim(vx));
                        element.css("display", "inline-block");
                        element.css("margin-right", "10px");
                        var widthInput = ((205 / 25) * element.val().length) + 30;
                        element.css("width", widthInput + "px");
                        element.on("input", function (ev) {
                            var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                            inputItem.css("width", widthInput + "px");
                        });
                        var divInsert = $("<div></div>");
                        divInsert.addClass("plugInsertCatVar");
                        divInsert.attr("data-categoryId", categories[ix].Id);
                        divInsert.attr("data-categoryName", categories[ix].Name);
                        divInsert.attr("data-variableId", variables[ix].Id);
                        divInsert.attr("data-variableName", variables[ix].Name);
                        divInsert.html("{" + categories[ix].Name + "/" + variables[ix].Name + "}");
                        var closeDivInsert = $("<div></div>");
                        closeDivInsert.addClass("fa fa-close closePluginItem");
                        closeDivInsert.click(function (ev) {
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
                    else {
                        if (ix == textFinal.length - 1) {
                            var inputItem = $("<input type='text' />");
                            inputItem.css("font-family", "Courier New");
                            inputItem.css({ "display": "inline-block", "width": "200px", "margin-right": "10px" });
                            inputItem.addClass("form-control txt-text");
                            inputItem.val($.trim(vx));
                            var widthInput = ((205 / 25) * inputItem.val().length) + 30;
                            inputItem.css("width", widthInput + "px");
                            inputItem.on("input", function (ev) {
                                var widthInput = ((205 / 25) * $(ev.target).val().length) + 30;
                                inputItem.css("width", widthInput + "px");
                            });
                            parent.append(inputItem);
                        }
                        else {
                            var inputItem = $("<input type='text' />");
                            inputItem.css("font-family", "Courier New");
                            inputItem.css({ "display": "inline-block", "width": "200px", "margin-right": "10px" });
                            inputItem.addClass("form-control txt-text");
                            inputItem.val($.trim(vx));
                            var widthInput = ((205 / 25) * inputItem.val().length) + 30;
                            inputItem.css("width", widthInput + "px");
                            inputItem.on("input", function (ev) {
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
                            closeDivInsert.click(function (ev) {
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
        };
        return PluginVariables;
    }());
    PluginFactory.PluginVariables = PluginVariables;
    var Category = (function () {
        function Category(id, name, description, date) {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Date = date;
        }
        return Category;
    }());
    PluginFactory.Category = Category;
    var varType;
    (function (varType) {
        varType[varType["String"] = 0] = "String";
        varType[varType["Numeric"] = 1] = "Numeric";
        varType[varType["Options"] = 2] = "Options";
    })(varType = PluginFactory.varType || (PluginFactory.varType = {}));
    var Variable = (function () {
        function Variable(id, name, dateV, variableType, options) {
            this.Id = id;
            this.Name = name;
            this.DateV = dateV;
            this.VariableType = variableType;
            this.Options = options;
        }
        return Variable;
    }());
    PluginFactory.Variable = Variable;
})(PluginFactory || (PluginFactory = {}));
