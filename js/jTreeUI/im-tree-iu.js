(function () {

    this.IMTreeUI = function () {

        var defaults = {};

        var virtualNumber;
        var cont = 1;
        var data = {};
        var tree = null;
        var treeviewObj = null;
        var $treeview = null;
        var expand = true;
        var lang;
        var type;

        var cambios = false;
        var dirty = false;
        var editedData = null;
        var DOMElement = null;
        var isVoice = false;
        var nodoCopiado = null;
        var self = this;
        var $this = null;
        var options;

        if (arguments[0] && typeof arguments[0] == "object") {
            this.options = extendsDefault(defaults, arguments[0]);
        }

        this.modalNuevoNodo = {
            $modal: null,
            $form_registrar: null,
            $modal_title: null,
            $row_content: null,
            $cmb_tag: null,
            $hdn_nodo_padre: null,
            $hdn_nodo_option: null,
            $btn_registrar: null,
            $btn_cerrar: null
        };

        this.modalCommentElements = {
            $modal: null,
            $form_comentar: null,
            $hdn_nodo_seleccionado: null,
            $hdn_nodo_padre: null,
            $hdn_nodo_option: null,
            $btn_registrar: null,
            $btn_cerrar: null
        };

        this.modalGuardar = {
            $modal: null,
            $title: null,
            $form: null,
            $hdn_nodo_seleccionado: null,
            $btn_registrar: null,
            $btn_cerrar: null
        };

        this.modalGuardarCambios = {
            $modal: null,
            $form: null,
            $btn_sobreescribir: null,
            $btn_guardar_nuevo: null,
            $btn_descartar_cambios: null
        };

        this.modalCargarElements = {
            $modal: null,
            $form: null,
            $file: null
        };

        this.modalTest = {
            $modal: null,
            $form: null,
            $txt_tonumber: null,
            $txt_label: null,
            $hdn_logic: null
        };

        this.buttons = {
            $btn_expcol: null,
            $btn_nuevo: null,
            $btn_cargar: null,
            $btn_guardar: null,
            $btn_guardarcomo: null,
            $btn_descargar: null,
            $btn_tour: null,
            $btn_test: null
        };


        this.methods = {
            getTreeview: function () {
                return treeviewObj;
            },

            highlightNode: function (nodeId) {
                self.treeviewObj.highlightNode(nodeId);
            },

            init: function () {
                self.cont = 1;
                self.expand = true;
                $this = $("#" + self.options.element);
                self.virtualNumer = self.options.virtualNumber;                
                self.DOMElement = document.getElementById(self.options.element);                
                self.lang = self.options.lang;
                self.type = self.options.type;
                self.dirty = false;
                
                $.ajax({
                    url: "./js/jTreeUI/templates/modal.html?version=1.61803398874988",
                    dataType: "html"

                }).done(function (data) {
                    $("body").append(data);

                    self.modalNuevoNodo.$modal = $("body").find(".modal-nuevo-nodo:last");
                    self.modalNuevoNodo.$form_registrar = self.modalNuevoNodo.$modal.find(".form-registrar-nodo");
                    self.modalNuevoNodo.$modal_title = self.modalNuevoNodo.$form_registrar.find(".modal-title");
                    self.modalNuevoNodo.$btn_registrar = self.modalNuevoNodo.$form_registrar.find(".btn-registrar-nodo");
                    self.modalNuevoNodo.$btn_cerrar = self.modalNuevoNodo.$form_registrar.find(".closemodal");
                    self.modalNuevoNodo.$row_content = self.modalNuevoNodo.$form_registrar.find(".row-content");
                    self.modalNuevoNodo.$cmb_tag = self.modalNuevoNodo.$row_content.find(".cmb-tag");
                    self.modalNuevoNodo.$hdn_nodo_padre = self.modalNuevoNodo.$form_registrar.find("input.hdn-nodo-padre");
                    self.modalNuevoNodo.$hdn_nodo_option = self.modalNuevoNodo.$form_registrar.find("input.hdn-nodo-option");


                    self.modalCommentElements.$modal = $("body").find(".modal-comentario:last");
                    self.modalCommentElements.$form_comentar = self.modalCommentElements.$modal.find(".form-comentar-nodo");
                    self.modalCommentElements.$btn_registrar = self.modalCommentElements.$form_comentar.find(".btn-registrar-nodo");
                    self.modalCommentElements.$btn_cerrar = self.modalCommentElements.$form_comentar.find(".closemodal");
                    self.modalCommentElements.$hdn_nodo_seleccionado = self.modalCommentElements.$form_comentar.find("input.hdn-nodo-selecteccionado");
                    self.modalCommentElements.$hdn_nodo_padre = self.modalCommentElements.$form_comentar.find("input.hdn-nodo-padre");
                    self.modalCommentElements.$hdn_nodo_option = self.modalCommentElements.$form_comentar.find("input.hdn-nodo-option");


                    self.modalGuardar.$modal = $("body").find(".modal-guardar:last");
                    self.modalGuardar.$title = self.modalGuardar.$modal.find(".modal-header h4.modal-title");
                    self.modalGuardar.$form = self.modalGuardar.$modal.find("form");
                    self.modalGuardar.$btn_registrar = self.modalGuardar.$form.find(".btn-registrar-nodo");
                    self.modalGuardar.$hdn_nodo_seleccionado = self.modalGuardar.$form.find("input.hdn-nodo-selecteccionado");


                    self.modalCargarElements.$modal = $("body").find(".modal-cargar:last");
                    self.modalCargarElements.$form = self.modalCargarElements.$modal.find("form");
                    self.modalCargarElements.$file = self.modalCargarElements.$form.find("input:file");


                    self.modalGuardarCambios.$modal = $("body").find(".modal-guardar-cambios:last");
                    self.modalGuardarCambios.$form = self.modalGuardarCambios.$modal.find("form");
                    self.modalGuardarCambios.$btn_sobreescribir = self.modalGuardarCambios.$form.find(".btn-sobreescribir");
                    self.modalGuardarCambios.$btn_guardar_nuevo = self.modalGuardarCambios.$form - find(".btn-guardar-nuevo");
                    self.modalGuardarCambios.$btn_descartar_cambios = self.modalGuardarCambios.$form.find(".btn-descartar-cambios");


                    self.modalTest.$modal = $("body").find(".modal-test:last");
                    self.modalTest.$form = self.modalTest.$modal.find("form");
                    self.modalTest.$txt_label = self.modalTest.$form.find(".txt-label");
                    self.modalTest.$txt_tonumber = self.modalTest.$form.find(".txt-tonumber");
                    self.modalTest.$hdn_logic = self.modalTest.$form.find(".hdn-logic");


                    $this.load('./js/jTreeUI/templates/panel.html?v=3.1415XWYZ', function () {

                        self.buttons.$btn_expcol = $this.find("button.btn-expcol");
                        self.buttons.$btn_nuevo = $this.find("button.btn-nuevo");
                        self.buttons.$btn_cargar = $this.find("button.btn-cargar");
                        self.buttons.$btn_guardar = $this.find("button.btn-guardar");
                        self.buttons.$btn_guardarcomo = $this.find("button.btn-guardarcomo");
                        self.buttons.$btn_descargar = $this.find("button.btn-descargar");
                        self.buttons.$btn_tour = $this.find("button.btn-tour");
                        self.buttons.$btn_test = $this.find("button.btn-testit");

                        self.$treeview = $this.find("div.treeview");
                        self.methods.inicializar_arbol();
                        self.methods.attachControlsEvents();
                        self.DOMElement.dispatchEvent(new Event("jTreeUI:complete"));

                    });
                });
            },

            crearNuevoArbol: function () {
                //alert("Verificar cambios, preguntar si se guardan, inicializar arbol con nodo raiz");
                self.cont = 1;
                self.methods.inicializar_arbol();
                //self.methods.renderTree();
            },

            editar: function () {
                var node = self.treeviewObj.methods.getSelectedNode();
                //var itemNode = node.data.tag.toLowerCase();
                //var objectItem = imEval(itemNode);

                if (node != null)
                {
                    self.modalNuevoNodo.$btn_registrar.html("Update Node");
                    self.modalNuevoNodo.$hdn_nodo_option.val("actualizarNodo");
                    self.modalNuevoNodo.$row_content.find(".new-input").remove();

                    var idNodoPadre = node.data.parent;
                    var idseleccionado = node.data.id;
                    if (idNodoPadre == null) {
                        msg_warning("Cannot edit root node");
                        return; 
                    }

                    self.methods.crearSelectTagPadre(idNodoPadre);

                    var nodoSeleccionado;
                    self.tree.contains(function (node) {
                        if (node.data.id * 1 === idseleccionado) {
                            nodoSeleccionado = node;
                        }
                    }, self.tree.traverseBF);

                    self.editedData = nodoSeleccionado.data;

                    self.modalNuevoNodo.$cmb_tag.val(nodoSeleccionado.data.tag).trigger("change");

                    $.each(nodoSeleccionado.data.attrs, function (i, e) {
                        $("#form-registrar-nodo").find('[name=' + i + ']').val(e);
                    });

                    self.modalNuevoNodo.$hdn_nodo_padre.val(idNodoPadre);
                    self.modalNuevoNodo.$modal.modal("show");
                    self.dirty = true;
                } else {
                    msg_warning("Debe seleccionar un nodo del arbol");
                }
            },

            copiarNodo: function ()
            {
                var node = self.treeviewObj.getSelectedNode();
                if (node != null)
                {
                    var idNodoPadre = node.data.parent;
                    var idseleccionado = parseInt(node.data.id);

                    if (idNodoPadre == null)
                    {
                        msg_warning("Cannot copy root node");
                        return;
                    }

                    var nodoSeleccionado;

                    self.tree.contains(function (node) {
                        if (node.data.id * 1 === idseleccionado) {
                            nodoSeleccionado = node;
                        }
                    }, self.tree.traverseBF);

                    if (nodoSeleccionado) {
                        self.nodoCopiado = nodoSeleccionado;
                        console.log(self.nodoCopiado);
                        msg_info("Nodo " + nodoSeleccionado.data.tag + " copiado correctamente. Seleccione el nodo donde quiera pegarlo.");
                    } else {
                        msg_error("Ocurrio un problema al copiar nodo");
                    }

                } else {
                    msg_warning("Debe seleccionar un nodo del arbol");
                }
            },

            pegarNodo: function ()
            {
                var selected = self.treeviewObj.getSelectedNode();

                if (selected != null) {

                    var idseleccionado = selected.data.id;

                    var nodoPegar;
                    self.tree.contains(function (node) {
                        if (node.data.id * 1 === idseleccionado) {
                            nodoPegar = node;
                        }
                    }, self.tree.traverseBF);

                    if (nodoPegar)
                    {
                        var tagString = nodoPegar.data.tag;
                        var tag = imValNew(tagString, self.type);

                        var tagCopiado = self.nodoCopiado.data.tag;

                        var permitePegar = 0;

                        try {
                            if (tag.hasOwnProperty("children"))
                            {
                                for (var i = 0, length = tag.children.length; i < length; i++)
                                {
                                    if (tag.children[i].name == tagCopiado) {
                                        permitePegar++;
                                        break;
                                    }
                                }
                            }
                        } catch (err) {
                            permitePegar = 0;
                        }

                        if (permitePegar > 0)
                        {
                            var cloneObject = $.extend(true, {}, self.nodoCopiado);

                            cloneObject.data.parent = idseleccionado;
                            cloneObject.data.parentId = idseleccionado;

                            var newNode = new Node(cloneObject.data);
                            var arrClone = $.extend(true, [], cloneObject.children);

                            newNode.children = new Array();
                            newNode.copyNodeAndChildrens(arrClone);
                            nodoPegar.children.push(newNode);
                            self.cambios = true;

                            self.tree.countNode = 1;
                            self.tree._root.reconstruirIndices(self.tree);
                            self.methods.renderTree();
                            //self.$treeview.trigger("nodeUnselected");
                            self.dirty = true;

                            msg_info("Nodo pegado correctamente.");
                        } else {
                            msg_error("El nodo donde intenta pegar no permite este elemento");
                        }


                    } else {
                        msg_error("Ocurrio un problema al pegar nodo");
                    }

                } else {
                    msg_warning("Debe seleccionar un nodo del arbol");
                }
            },

            eliminar: function () {
                var node = self.treeviewObj.getSelectedNode();
                
                if (node != null) {
                    var idNodoPadre = node.data.parent;
                    if (idNodoPadre == null) {
                        msg_warning("Cannot delete root node");
                        return;
                    }

                    //if (!confirm("Are you sure?")) {
                    //    return;
                    //}

                    self.modalNuevoNodo.$row_content.find(".new-input").remove();
                    //self.methods.crearSelectTag();

                    self.treeviewObj.deleteNode(node);
                    self.cambios = true;
                    self.dirty = true;
                } else {
                    msg_warning("Debe seleccionar un nodo del arbol");
                }
            },

            /**
             * Instance tree class
             * @returns {} 
             */
            inicializar_arbol: function () {
                self.tree = new Tree({ tag: 'Logic', tagText: 'Logic Des', icon: '', children: [], id: (self.cont), content: '' });                
                self.cont++;                
                self.treeviewObj = new Treeview({ element: self.$treeview, tree: self.tree });
                self.treeviewObj.reference = self;
            },

            inicializarModal: function () {
                modalNuevoNodo.$row_content.html(
                    '<div class="form-group">' +
                    '  <label class="col-sm-4 control-label" for="cmb-tag">' +
                    '    <span>Tipo de acción:</span>' +
                    '    <a class="fa fa-commenting helpIcon ActionSpanHelp" >&nbsp;</a>' +
                    '  </label>' +
                    '  <div class="col-sm-8">' +
                    '    <select  class="form-control cmb-tag" name="tag" ></select>' +
                    '  </div>' +
                    '</div>' +
                    '<input type="hidden" id="hdn-nodo-id" name="nodo"/>' +
                    '<input type="hidden" id="hdn-nodo-option" name="option" value="crearNodo"/>'
                );

                var $actionSpanHelp = modalNuevoNodo.$form_registrar.find("ActionSpanHelp");
                $actionSpanHelp.click(function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    modalNuevoNodo.$form_registrar(".helpIcon").popover('hide');
                    $actionSpanHelp.popover('show');
                });

                modalNuevoNodo.$btn_cerrar.click(function (evt) {
                    methods.cleanHelps();
                });
            },

            renderTree: function () {
                if (self.cambios) {
                    self.cambios = false;
                }
                self.treeviewObj.renderTree();
            },

            crearSelectTag: function ()
            {
                self.modalNuevoNodo.$cmb_tag.html("");
                var node = self.treeviewObj.getSelectedNode();
                var itemNode = node.data.tag;

                var objectItem = imValNew(itemNode, self.type);//imEval(itemNode);

                var tpl = '<option value="">Seleccionar acción</option>';

                if (objectItem.name.toLowerCase() == "logic")
                    tpl += '<option value="' + objectItem.name + '">' + objectItem.friendlyName[self.lang] + '</option>';

                if (objectItem.hasOwnProperty("children")) {
                    tpl += '<optgroup label="' + objectItem.friendlyName[self.lang] + ' elements">';

                    for (var i = 0, length = objectItem.children.length; i < length; i++) {
                        tpl += '<option value="' + objectItem.children[i].name + '">' + objectItem.children[i].friendlyName[self.lang] + '</option>';
                    }

                    tpl += '</optgroup>';
                }
                self.modalNuevoNodo.$cmb_tag.html(tpl);
            },

            crearSelectTagPadre: function (idNodoPadre)
            {
                self.modalNuevoNodo.$cmb_tag.html("");
                
                var nodoPadre;
                self.tree.contains(function (node) {
                    if (node.data.id * 1 === idNodoPadre*1) {
                        nodoPadre = node;
                    }
                }, self.tree.traverseBF);

                var objectItem = imValNew(nodoPadre.data.tag, self.type);//imEval(nodoPadre.data.tag.toLowerCase());

                var tpl = '<option value="">Select tag</option>';

                if (objectItem.name.toLowerCase() == "logic")
                    tpl += '<option value="' + objectItem.name + '">' + objectItem.friendlyName[self.lang] + '</option>';

                if (objectItem.hasOwnProperty("children")) {
                    tpl += '<optgroup label="' + objectItem.friendlyName[self.lang] + ' elements">';

                    for (var i = 0, length = objectItem.children.length; i < length; i++) {
                        tpl += '<option value="' + objectItem.children[i].name + '">' + objectItem.children[i].friendlyName[self.lang] + '</option>';
                    }

                    tpl += '</optgroup>';
                }

                self.modalNuevoNodo.$cmb_tag.html(tpl);
            },

            /**
              * create the xml structure
              * @param {} opts 
              * @returns {} 
              */
            crearDocumentoXML: function (opts) {
                return self.tree._root.createXML(opts);
            },


            getObjectProperties: function (tag) {
                if (tag !== null && tag !== undefined && tag !== "") {
                    return imValNew(tag, self.type); //imEval(valueIn);
                }
                return null;
            },

            ucFirst: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },

            getAttributes: function (tag) {
             
                var myStructure = imValNew(tag, self.type); //imEval(valueIn);
                return myStructure.attributes;
            },

            cleanHelps: function () {
                self.modalNuevoNodo.$form_registrar.find(".helpIcon").popover('hide');
                self.modalNuevoNodo.$form_registrar.find(".helpIcon").popover('destroy');
            },

            downloadXML: function (filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            },

            leerXML: function (node, idParentNode)
            {
                var childs = node.childNodes;
                var tag = node.nodeName;
                var structure = imValNew(tag, self.type); //imEval(tag.toLowerCase());
                var description = structure.friendlyName[self.lang];//structure.description[self.lang];
                var idnode = (self.cont++);
                var icon = structure.icon;
                var classAttributes = structure.attributes;//structure[self.type].attributes;
                var attrs = {};

                classAttributes.forEach(function (el, idx, arr) {
                    var myAttr = node.getAttribute(el.name);
                    if (myAttr) {
                        attrs[el.name] = myAttr;
                    }
                });

                var nodeResult;
                self.tree.contains(function (mynode) { if (mynode.data.id == idParentNode) { nodeResult = mynode; } }, self.tree.traverseBF);

                nodeResult.children.push(new Node({
                    id: idnode,
                    icon: icon,
                    tag: tag,
                    description: description,
                    tagText: description || tag,
                    attrs: attrs,
                    content: '',
                    parent: idParentNode
                }));


                if (childs.length > 0) {
                    for (var i = 0; i < childs.length; i++) {
                        if (childs[i].nodeType == 1) {
                            self.methods.leerXML(childs[i], idnode);
                        }
                    }
                }
            },

            //Instance tree class
            createTreeFromXML: function (xmlNode)
            {
                var node = xmlNode.documentElement;
                var idNode = (self.cont++);
                var tag = node.nodeName;
                var structure = imValNew(tag, self.type); //imEval(tag.toLowerCase());
                var description = structure.friendlyName[self.lang]; //structure.description[self.lang];
                var icon = structure.icon;
                var classAttributes = structure.attributes; //structure[self.type].attributes;
                var attrs = {};

                classAttributes.forEach(function (el, idx, arr) {
                    var myAttr = node.getAttribute(el.name);
                    if (myAttr) {
                        attrs[el.name] = myAttr;
                    }
                });


                self.tree = new Tree({
                    tag: tag,
                    description: description,
                    icon: icon,
                    tagText: description || tag,
                    children: [],
                    id: idNode,
                    content: '',
                    attrs: attrs,
                    parent: null
                });

                var childs = node.childNodes;
                if (childs.length > 0) {
                    for (var i = 0; i < childs.length; i++) {
                        if (childs[i].nodeType == 1) {
                            self.methods.leerXML(childs[i], idNode);
                        }
                    }
                }
                self.dirty = true;
            },

            /**
             * Load a xml from string
             * @param {} stringXml 
             * @returns {} 
             */
            loadXmlFromString: function (stringXml) {
                self.cont = 1;
                self.methods.createTreeFromXML(stringXml);                                

                self.treeviewObj.setTree(self.tree, self);
                self.dirty = false;
            },

            crearInputs: function (attributes) {
                self.modalNuevoNodo.$row_content.find(".new-input").remove();
                var tpl = '';
                var i;

                for (i = 0; i < attributes.length; i++)
                {
                    var attr = attributes[i];
                    var control = "<input type='text' class='form-control generatedField txt-" + attr.name + "' name='" + attr.name + "' />";
                    var defaultValue = "";

                    if (attr.defaultValue != null) defaultValue = attr.defaultValue;

                    if (attr.hasOwnProperty("options"))
                    {
                        var list = "";
                        if (attr.hasOwnProperty("required") && attr["required"] === false) {
                            list = "<option value=''>-Select-</option>";
                        }

                        if (attr.options.length > 0) {
                            $.each(attr.options, function (ix, vx) {
                                list += "<option value='" + vx + "'>" + vx + "</option>";
                            });
                        }

                        control = "<select class='form-control generatedField select-" + attr.name + "' name='" + attr.name + "'>" + list + "</select>";
                    }
                    else if (attr.hasOwnProperty("dataType"))
                    {
                        if (attr.dataType.value == "string")
                        {
                            control = "<input type='text' id='controlDisplay_"+(i+1)+"' class='form-control generatedField txt-" + attr.name + "' name='" + attr.name + "' value='" + defaultValue + "' />";
                        }
                        else if (attr.dataType.value == "int")
                        {
                            var minValue = 0;
                            if (attr.hasOwnProperty("minValue"))
                                minValue = attr.minValue;

                            control = "<input type='number' id='controlDisplay_" + (i + 1) + "' min='" + minValue + "' class='form-control generatedField txt-" + attr.name + "' name='" + attr.name + "' value='" + (defaultValue) + "' />";
                        }
                    }

                    var colorsStyle = "col-sm-8";
                    var labelPlugin = "";

                    if (!attr.hasOwnProperty("options")) {
                        colorsStyle = "col-sm-6";
                        labelPlugin = "<label class='col-sm-2' style='cursor:pointer;' onclick=\"openPluginModal('controlDisplay_" + (i + 1) + "', '" + self.virtualNumer + "');\"><span class='fa fa-list'></span></label>";
                    }

                    tpl += '<div class="form-group new-input">' +
                            '   <label class="col-sm-4 control-label" for="txt-' + attr.name + '">' + self.methods.ucFirst(attr.friendlyName[self.lang]) + ':' +
                            '       <a class="fa fa-commenting helpIcon ActionSpanHelp_' + attr.name + '">&nbsp;</a>' +
                            '   </label>' +
                            '   <div class="'+colorsStyle+'">' +
                                    control +
                            '   </div>' +
                            labelPlugin +
                            '</div>';
                }

                self.modalNuevoNodo.$row_content.append(tpl);

                var getParent = imValNew(self.modalNuevoNodo.$cmb_tag.val(), self.type);//imEval(self.modalNuevoNodo.$cmb_tag.val().toLowerCase());
                var selectorSearch = self.modalNuevoNodo.$modal.find(".generatedField");

                $.each(selectorSearch, function (ix, vx) {
                    var nameAttr = vx.name;
                    var attributesList = getParent.attributes;//getParent[self.type].attributes;

                    $.each(attributesList, function (ix1, vx1) {
                        if (vx1.name == nameAttr) {
                            var $actionSpanHelp = self.modalNuevoNodo.$form_registrar.find(".ActionSpanHelp_" + vx1.name);
                            $actionSpanHelp.attr("data-html", true);
                            $actionSpanHelp.attr("data-toggle", "popover");
                            $actionSpanHelp.attr("data-trigger", "click");
                            $actionSpanHelp.attr("data-content", vx1.description[self.lang]);
                            $actionSpanHelp.attr("title", "<small>" + vx1.friendlyName[self.lang] + "</small>");
                            $actionSpanHelp.attr("role", "button");
                            $actionSpanHelp.attr("tabindex", ix1);
                            $actionSpanHelp.attr("data-placement", "bottom");
                            $actionSpanHelp.html("");
                            $actionSpanHelp.popover();

                            $actionSpanHelp.click(function (event) {
                                event.preventDefault();
                                event.stopPropagation();
                                self.modalNuevoNodo.$form_registrar.find(".helpIcon").popover('hide');
                                $actionSpanHelp.popover('show');
                            });
                        }
                    });
                });


                if (self.editedData) {
                    for (i = 0; i < attributes.length; i++) {
                        var myAttr = attributes[i].name;
                        if (myAttr) {
                            var value = self.editedData.attrs[myAttr];
                            self.modalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').val(value);

                            if (self.modalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').is("input")) {
                                if (self.modalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').val() != "")
                                    PluginFactory.PluginVariables.BuildTextInput(self.modalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').attr("id"), self.virtualNumer);
                            }

                        }
                    }
                }

                self.modalNuevoNodo.$form_registrar.find(".form-control").click(function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    self.methods.cleanHelps();
                });
            },

            crearNodo: function () {                
                var selectedNode = self.treeviewObj.getSelectedNode();
                if (selectedNode != null) {
                    var data = selectedNode.data;
                    var idseleccionado = data.id;
                    self.editedData = null;

                    self.modalNuevoNodo.$btn_registrar.html("Create Node");
                    self.modalNuevoNodo.$hdn_nodo_option.val("crearNodo");
                    self.modalNuevoNodo.$row_content.find(".new-input").remove();
                    self.methods.crearSelectTag();

                    self.modalNuevoNodo.$hdn_nodo_padre.val(idseleccionado);
                    self.modalNuevoNodo.$modal_title.html("Create Node");
                    self.modalNuevoNodo.$modal.modal("show");
                    self.dirty = true;
                } else {
                    msg_warning("Debe seleccionar un nodo del arbol");
                }
            },

            comentar: function () {
                //Refactorizar
                var selected = self.treeviewObj.getSelectedNode();

                if (selected != null)
                {
                    var idNodoPadre = selected.data.parent;

                    if (idNodoPadre == null)
                    {
                        msg_warning("Cannot comment root node");
                        return;
                    }

                    var idseleccionado = selected.data.id;
                    idNodoPadre = selected.data.parent;
                    self.editedData = null;

                    self.modalCommentElements.$hdn_nodo_seleccionado.val(idseleccionado);
                    self.modalCommentElements.$hdn_nodo_option.val("crearNodoComentario");
                    self.modalCommentElements.$hdn_nodo_padre.val(idNodoPadre);

                    self.modalCommentElements.$modal.modal("show");
                    self.dirty = true;
                } else {
                    msg_warning("Debe seleccionar un nodo del arbol");
                }
            },

            attachControlsEvents: function () {

                self.buttons.$btn_expcol.click(function (evt) {
                    evt.preventDefault();

                    var selected = self.treeviewObj.getSelectedNode();
                    
                    if (selected != null) {
                        var idNodoSeleccionado = selected.data.id;

                        if (self.expand) {
                            self.treeviewObj.collapseNode(idNodoSeleccionado);                            
                        } else {
                            self.treeviewObj.expandAll(idNodoSeleccionado);                            
                        }
                    } else {
                        if (self.expand) {
                            self.treeviewObj.collapseAll();
                        } else {
                            self.treeviewObj.expandAll();                            
                        }
                    }

                    self.expand = !self.expand;
                });

                self.buttons.$btn_nuevo.click(function (evt) {
                    if (self.dirty) {                        
                        self.modalGuardarCambios.$modal.modal("show");
                    } else {
                        self.modalGuardar.$title.html("Nueva Lógica");
                        self.modalGuardar.$modal.modal("show");
                        //self.methods.crearNuevoArbol();
                    }                    
                });

                self.buttons.$btn_test.click(function () {
                    //Crea el logic temporal, y obtengo su id
                    // Se hace la llamada
                    var xml = '<?xml version="1.0" encoding="UTF-8"?>' + self.methods.crearDocumentoXML({showId: false});
                    var xmlEncoded = escape(xml);
                    var name = "test call";
                    var description = "test call";
                    var sidVirtualNumber = self.virtualNumer;
                    var isVoice = self.isVoice;
                    var isTemp = true;

                    Services.Local.ValidateXml(xml, isVoice,
                        function (result) {
                            self.modalGuardar.$modal.modal("hide");
                            //console.log(result);
                            //console.log("success es: " + result.Sucess + "__");
                            
                            msg_info("XML correcto.<br/>Enviando XML para guardar...");

                            Services.Local.CreateLogic(sidVirtualNumber, xmlEncoded, name, description, isVoice, isTemp,
                                function (data) {
                                    msg_success("Lógica guardada correctamente");
                                    self.dirty = false;

                                    var idLogic = data;
                                    self.modalTest.$hdn_logic.val(idLogic);
                                    self.modalTest.$modal.modal("show");

                                    //self.DOMElement.dispatchEvent(new Event("jTreeUI:logicSaved"));
                                },
                                function () {
                                    msg_error("Error al guardar la lógica.");
                                }
                            );
                        },
                        function (error) {
                            //msg_error("Error en el xml");

                            var errores = [];
                            for (var i = 0; i < result.AttributeNames.length; i++) {
                                errores.push({
                                    attr: result.AttributeNames[i],
                                    desc: result.ErrorDescriptions[i],
                                    node: result.NodeNames[i],
                                    xpath: result.XpathLocations[i]
                                });
                            }

                            errores.forEach(function (el, idx) {
                                msg_error("Error en el nodo <strong>" + el.node + "</strong>: " + el.desc);
                            });
                        }
                    );
                });

                self.modalTest.$form.submit(function (evt) {
                    evt.preventDefault();

                    var sidVirtualNumber = self.virtualNumer;
                    var toNumber = self.modalTest.$txt_tonumber.val();
                    var label = self.modalTest.$txt_label.val();
                    var idLogic = self.modalTest.$hdn_logic.val();

                    InitiatingOutboundCall(sidVirtualNumber, toNumber, idLogic, label,
                        function (data) {
                            var Sid = data.Sid;
                            var Success = data.Success;
                        },
                        function (error) {
                            msg_error("Error al probar la logica.");
                        }
                    );
                });

                self.buttons.$btn_guardar.click(function () {                    
                    if (!self.dirty) {
                        msg_info("No hay cambios que guardar");
                        return;
                    }

                    var isVoice = self.isVoice;
                    var idLogic = window.selectedLogic.idLogic;
                    
                    if (!idLogic) {
                        msg_error("No se ha seleccionado una logica");
                        return;
                    }

                    var xmlString = self.methods.crearDocumentoXML({showId: false});
                    var xmlEncoded = escape(xmlString);


                    Services.Local.ValidateXml(xmlEncoded, isVoice,
                        function (result) {
                            self.modalGuardar.$modal.modal("hide");
                            
                            msg_info("XML correcto.<br/>Enviando XML para guardar...");

                            msg_info("XML correcto.");
                            msg_info("Enviando XML para guardar...");

                            var name = window.selectedLogic.name;
                            var description = window.selectedLogic.description;

                            Services.Local.UpdateLogic(idLogic, xmlEncoded, null, null, null,
                                function (result) {                                        
                                    if (result == true) {
                                        msg_success("Lógica guardada correctamente");
                                        self.dirty = false;

                                        var evento = new CustomEvent("jTreeUI:logicSaved", {
                                            detail: {
                                                action: 'update',
                                                idLogic: idLogic
                                            }
                                        });
                                        self.DOMElement.dispatchEvent(evento);
                                    } else {
                                        msg_error("No se actualizó la lógica");
                                        self.dirty = true;
                                    }                                        
                                },
                                function (error) {
                                    msg_error("Error al actualizar la lógica.");
                                }
                            );
                        },
                        function (error) {
                            //msg_error("Error en el xml");

                            var errores = [];
                            for (var i = 0; i < result.AttributeNames.length; i++) {
                                errores.push({
                                    attr: result.AttributeNames[i],
                                    desc: result.ErrorDescriptions[i],
                                    node: result.NodeNames[i],
                                    xpath: result.XpathLocations[i]
                                });
                            }

                            errores.forEach(function (el, idx) {
                                msg_error("Error en el nodo <strong>" + el.node + "</strong>: " + el.desc);
                            });
                        }
                    );

                });

                self.buttons.$btn_cargar.click(function () {
                    if (self.dirty) {
                        self.modalGuardarCambios.$modal.modal("show");
                    } else {
                        self.modalCargarElements.$modal.modal("show");
                    }
                });

                self.buttons.$btn_guardarcomo.click(function () {
                    //console.log(self.modalGuardar.$modal);                    
                    self.modalGuardar.$modal.modal("show");
                });

                self.buttons.$btn_descargar.click(function () {
                    var xmlString = self.methods.crearDocumentoXML({showId: false});
                    self.methods.downloadXML('tree.xml', xmlString);
                });

                /**
                 * New Nodo create to tree
                 */
                self.modalNuevoNodo.$form_registrar.submit(
                    function (evt) {
                        evt.preventDefault();

                        var idParentNode = self.modalNuevoNodo.$hdn_nodo_padre.val();
                        var tag = self.modalNuevoNodo.$cmb_tag.val();
                        var tagText = self.modalNuevoNodo.$cmb_tag.find("option:selected").text();
                        var attrs = {};

                        self.modalNuevoNodo.$form_registrar.find(".new-input input.generatedField, .new-input select.generatedField").each(function (i, e) {
                            if (!(this.tagName == "SELECT" && this.value == 0) || !(this.type == "" && this.value == "")) {
                                var valueItem = this.value;
                                if ($(e).hasClass("generatedFieldsPlugin")) {
                                    var itemsa = $(e).siblings();
                                    $.each(itemsa, function (ix, vx) {
                                        if ($(vx).is("input"))
                                            valueItem += " " + $(vx).val();
                                        else {
                                            valueItem += " " + "{" + $(vx).attr("data-categoryName") + "/" + $(vx).attr("data-variableName") + "}";
                                        }
                                    });
                                }
                                attrs[this.name] = valueItem;
                            }
                        });

                        if (attrs["tag"]) {
                            delete attrs["tag"];
                        }

                        var nodeResult;
                        //self.tree.contains(function (node) { if (node.data.id == idParentNode) { nodeResult = node; } }, self.tree.traverseBF);
                        self.tree.traverseBF(function (node) { if (node.data.id == idParentNode) { nodeResult = node; } });

                        if (self.editedData) {
                            $.each(nodeResult.children, function (i, e) {
                                if (self.editedData.id == e.data.id) {
                                    e.data.attrs = attrs;
                                }
                            });
                        } else {
                            var icon = "";
                            if (self.isVoice)
                                icon = window.Logic["Voice"][tag].icon;
                            else
                                icon = window.Logic["Sms"][tag].icon;

                            nodeResult.children.push(new Node({ id: (self.cont++), tag: tag, icon: icon, tagText: tagText, attrs: attrs, content: '', parent: idParentNode }));
                        }

                        self.modalNuevoNodo.$modal.modal("hide");
                        self.modalNuevoNodo.$form_registrar.get(0).reset();
                        self.modalNuevoNodo.$cmb_tag.trigger("change");
                        self.cambios = true;
                        self.tree.countNode = 1;
                        self.tree._root.reconstruirIndices(self.tree);
                        self.methods.renderTree();
                });

                /**
                 * execute save tree. 
                 */
                self.modalGuardar.$form.submit(

                    function (evt)
                    {
                        evt.preventDefault();
                        var form = this;
                        var name = this.nombre.value;
                        var sidVirtualNumber = self.virtualNumer;
                        var description = this.descripcion.value;
                        var isTemp = false;
                        var isVoice = self.isVoice;
                        var xml = '<?xml version="1.0" encoding="UTF-8"?>' + self.methods.crearDocumentoXML({showId: false});
                        var xmlEncoded = escape(xml);

                        Services.Local.ValidateXml(xmlEncoded, isVoice,
                            function (result) {
                                self.modalGuardar.$modal.modal("hide");

                                msg_info("XML correcto.<br/>Enviando XML para guardar...");

                                Services.Local.CreateLogic(sidVirtualNumber, xmlEncoded, name, description, isVoice, isTemp,
                                    function (data) {
                                        msg_success("Lógica guardada correctamente");
                                        self.dirty = false;
                                        var idLogic = data;

                                        var evento = new CustomEvent("jTreeUI:logicSaved", {
                                            detail: {
                                                action: 'new',
                                                idLogic: idLogic
                                            }
                                        });
                                        self.DOMElement.dispatchEvent(evento);
                                    },
                                    function () {
                                        msg_error("Error al guardar la lógica.");
                                    }
                                );
                            },
                            function (error) {
                                //msg_error("Error en el xml");

                                var errores = [];
                                for (var i = 0; i < result.AttributeNames.length; i++) {
                                    errores.push({
                                        attr: result.AttributeNames[i],
                                        desc: result.ErrorDescriptions[i],
                                        node: result.NodeNames[i],
                                        xpath: result.XpathLocations[i]
                                    });
                                }

                                errores.forEach(function (el, idx) {
                                    msg_error("Error en el nodo <strong>" + el.node + "</strong>: " + el.desc);
                                });
                            }
                        );
                });

                self.modalCargarElements.$form.submit(function (evt) {
                    evt.preventDefault();


                    var file = self.modalCargarElements.$file.get(0).files[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.readAsText(file, "UTF-8");
                        reader.onload = function (evt) {
                            msg_success("File loaded successfully!");
                            var xml = $.parseXML(evt.target.result);
                            self.methods.loadXmlFromString(xml);
                            setTimeout(function () {
                                self.modalCargarElements.$modal.modal("hide");
                            }, 250);
                        }
                        reader.onerror = function (evt) {
                            msg_error("Error reading file");
                        }
                    } else {
                        msg_error("Must selected a file from your computer!");
                    }
                });

                self.modalNuevoNodo.$cmb_tag.change(function (evt)
                {
                    var tag = $(this).val();
                    if (tag != "" && tag!=null)
                    {
                        var properties = self.methods.getObjectProperties(tag);
                        var $actionSpanHelp = self.modalNuevoNodo.$form_registrar.find(".ActionSpanHelp");

                        $actionSpanHelp.attr("data-html", true);
                        $actionSpanHelp.attr("data-toggle", "popover");
                        $actionSpanHelp.attr("data-trigger", "click");
                        $actionSpanHelp.attr("data-content", properties.description[self.lang]);
                        $actionSpanHelp.attr("title", properties.friendlyName[self.lang]);
                        $actionSpanHelp.attr("role", "button");
                        $actionSpanHelp.attr("tabindex", "0");
                        $actionSpanHelp.attr("data-placement", "bottom");
                        $actionSpanHelp.html("");
                        $actionSpanHelp.popover();

                        var attributes = self.methods.getAttributes(tag);
                        self.methods.crearInputs(attributes);
                    } else {
                        $this.closest("form").find(".new-input").remove();
                    }
                });



                self.modalCommentElements.$form_comentar.submit(function (evt) {
                    evt.preventDefault();
                    var idParentNode = self.modalCommentElements.$hdn_nodo_padre.val() * 1;
                    var node_selected = self.modalCommentElements.$hdn_nodo_seleccionado.val() * 1;
                    var comentario = self.modalCommentElements.$form_comentar.find("textarea").val();


                    var node_result;
                    var tag = 'comment';
                    var tagText = '<small><i>' + comentario + '</i></small>';


                    self.tree.contains(function (node) { if (node.data.id == idParentNode) { node_result = node; } }, self.tree.traverseBF);

                    var findIndex = -1;
                    for (var i = 0; i < node_result.children.length; i++) {
                        var tempNode = node_result.children[i];
                        if (tempNode.data.id * 1 == node_selected) {
                            findIndex = i;
                        }
                    }

                    if (findIndex == -1) {
                        msg_error("Error, no se encontro el indice del nodo seleccionado dentro de los nodos hijos");
                        return;
                    } else {
                        node_result.children.splice(findIndex, 0, new Node({ id: (self.cont++), tag: tag, icon: window[tag.toLowerCase()].icon, tagText: tagText, attrs: [], content: comentario, parent: idParentNode }));
                        self.modalCommentElements.$modal.modal("hide");
                        self.modalCommentElements.$form_comentar.get(0).reset();
                        self.cambios = true;
                        self.tree.countNode = 1;
                        self.tree._root.reconstruirIndices(self.tree);
                        self.methods.renderTree(tree);
                    }
                });

                self.modalGuardarCambios.$btn_descartar_cambios.click(function () {
                    self.modalGuardarCambios.$modal.modal("hide");
                    setTimeout(function () {
                        self.modalCargarElements.$modal.modal("show");
                    }, 500);
                });
            }
        };

        this.methods.init();
    };

    function extendsDefault(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }


    //Public functions
    IMTreeUI.prototype.crear = function () {
        return this.methods.crearNodo();
    };
    IMTreeUI.prototype.editar = function () {
        return this.methods.editar();
    };
    IMTreeUI.prototype.comentar = function () {
        return this.methods.comentar();
    };
    IMTreeUI.prototype.eliminar = function () {
        return this.methods.eliminar();
    };
    IMTreeUI.prototype.copiar = function () {
        return this.methods.copiarNodo();
    };
    IMTreeUI.prototype.pegar = function () {
        return this.methods.pegarNodo();
    };
    
    IMTreeUI.prototype.loadXmlFromString = function (xml) {
        return this.methods.loadXmlFromString(xml);
    }
    IMTreeUI.prototype.getDOMElement = function () {
        return this.DOMElement;
    }
    IMTreeUI.prototype.setIsVoice = function (isVoice) {
        this.treeviewObj.isVoice = isVoice;
        this.type = this.treeviewObj.type = (isVoice) ? "voice" : "sms";
        return this.isVoice = isVoice;
    }
    IMTreeUI.prototype.highlightNode = function (nodeid) {
        return this.methods.highlightNode(nodeid);;
    }
}());