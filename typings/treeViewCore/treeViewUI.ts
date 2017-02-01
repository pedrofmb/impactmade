module treeViewCore
{
    export class TreeViewUI
    {

        public Defaults = {};
        public VirtualNumber : string;
        public Cont : number = 1;
        public Data = {};
        public Tree : Tree = null;
        public TreeViewObj : TreeView = null
        public $TreeView : JQuery = null;
        public Expand : boolean = true;
        public Lang : any;
        public Type : any;

        public Cambios : boolean = false;
        public Dirty : boolean = false;
        public EditedData : any = null;
        public DOMElement : any = null;
        public IsVoice : boolean = false;
        public NodoCopiado : Node = null;
        public $This : any = null;
        public Options;

        public ModalNuevoNodo : any = {};
        public ModalCommentElements : any = {};
        public ModalGuardar : any = {};
        public ModalGuardarCambios : any = {};
        public ModalCargarElements : any = {};
        public ModalTest : any = {};
        public Buttons : any = {};
        constructor()
        {
            if (arguments[0] && typeof arguments[0] == "object") {
              this.Options = Util.ExtendsDefault(this.Defaults, arguments[0]);
            }

            this.ModalNuevoNodo = {
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

            this.ModalCommentElements = {
            $modal: null,
            $form_comentar: null,
            $hdn_nodo_seleccionado: null,
            $hdn_nodo_padre: null,
            $hdn_nodo_option: null,
            $btn_registrar: null,
            $btn_cerrar: null
            };

            this.ModalGuardar = {
            $modal: null,
            $title: null,
            $form: null,
            $hdn_nodo_seleccionado: null,
            $btn_registrar: null,
            $btn_cerrar: null
            };

            this.ModalGuardarCambios = {
            $modal: null,
            $form: null,
            $btn_sobreescribir: null,
            $btn_guardar_nuevo: null,
            $btn_descartar_cambios: null
            };

            this.ModalCargarElements = {
            $modal: null,
            $form: null,
            $file: null
            };

            this.ModalTest = {
            $modal: null,
            $form: null,
            $txt_tonumber: null,
            $txt_label: null,
            $hdn_logic: null
            };

            this.Buttons = {
            $btn_expcol: null,
            $btn_nuevo: null,
            $btn_cargar: null,
            $btn_guardar: null,
            $btn_guardarcomo: null,
            $btn_descargar: null,
            $btn_tour: null,
            $btn_test: null
            };
        }

        public GetTreeview () : TreeView
        {
            return this.TreeViewObj;
        }

        public HighlightNode (nodeId : Node)
        {
            this.TreeViewObj.HighlightNode(nodeId);
        }

        public init ()
        {
            this.Cont = 1;
            this.Expand = true;
            this.$This = $("#" + this.Options.Element);
            this.VirtualNumber = this.Options.VirtualNumber;
            this.DOMElement = document.getElementById(this.Options.Element);
            this.Lang = this.Options.lang;
            this.Type = this.Options.Type;
            this.Dirty = false;

            $.ajax({
                url: "./js/jTreeUI/templates/modal.html?version=1.61803398874988",
                dataType: "html"
            }).done((data) => 
            {
                $("body").append(data);

                    this.ModalNuevoNodo.$modal = $("body").find(".modal-nuevo-nodo:last");
                    this.ModalNuevoNodo.$form_registrar = this.ModalNuevoNodo.$modal.find(".form-registrar-nodo");
                    this.ModalNuevoNodo.$modal_title = this.ModalNuevoNodo.$form_registrar.find(".modal-title");
                    this.ModalNuevoNodo.$btn_registrar = this.ModalNuevoNodo.$form_registrar.find(".btn-registrar-nodo");
                    this.ModalNuevoNodo.$btn_cerrar = this.ModalNuevoNodo.$form_registrar.find(".closemodal");
                    this.ModalNuevoNodo.$row_content = this.ModalNuevoNodo.$form_registrar.find(".row-content");
                    this.ModalNuevoNodo.$cmb_tag = this.ModalNuevoNodo.$row_content.find(".cmb-tag");
                    this.ModalNuevoNodo.$hdn_nodo_padre = this.ModalNuevoNodo.$form_registrar.find("input.hdn-nodo-padre");
                    this.ModalNuevoNodo.$hdn_nodo_option = this.ModalNuevoNodo.$form_registrar.find("input.hdn-nodo-option");


                    this.ModalCommentElements.$modal = $("body").find(".modal-comentario:last");
                    this.ModalCommentElements.$form_comentar = this.ModalCommentElements.$modal.find(".form-comentar-nodo");
                    this.ModalCommentElements.$btn_registrar = this.ModalCommentElements.$form_comentar.find(".btn-registrar-nodo");
                    this.ModalCommentElements.$btn_cerrar = this.ModalCommentElements.$form_comentar.find(".closemodal");
                    this.ModalCommentElements.$hdn_nodo_seleccionado = this.ModalCommentElements.$form_comentar.find("input.hdn-nodo-selecteccionado");
                    this.ModalCommentElements.$hdn_nodo_padre = this.ModalCommentElements.$form_comentar.find("input.hdn-nodo-padre");
                    this.ModalCommentElements.$hdn_nodo_option = this.ModalCommentElements.$form_comentar.find("input.hdn-nodo-option");


                    this.ModalGuardar.$modal = $("body").find(".modal-guardar:last");
                    this.ModalGuardar.$title = this.ModalGuardar.$modal.find(".modal-header h4.modal-title");
                    this.ModalGuardar.$form = this.ModalGuardar.$modal.find("form");
                    this.ModalGuardar.$btn_registrar = this.ModalGuardar.$form.find(".btn-registrar-nodo");
                    this.ModalGuardar.$hdn_nodo_seleccionado = this.ModalGuardar.$form.find("input.hdn-nodo-selecteccionado");


                    this.ModalCargarElements.$modal = $("body").find(".modal-cargar:last");
                    this.ModalCargarElements.$form = this.ModalCargarElements.$modal.find("form");
                    this.ModalCargarElements.$file = this.ModalCargarElements.$form.find("input:file");


                    this.ModalGuardarCambios.$modal = $("body").find(".modal-guardar-cambios:last");
                    this.ModalGuardarCambios.$form = this.ModalGuardarCambios.$modal.find("form");
                    this.ModalGuardarCambios.$btn_sobreescribir = this.ModalGuardarCambios.$form.find(".btn-sobreescribir");
                    this.ModalGuardarCambios.$btn_guardar_nuevo = this.ModalGuardarCambios.$form.find(".btn-guardar-nuevo");
                    this.ModalGuardarCambios.$btn_descartar_cambios = this.ModalGuardarCambios.$form.find(".btn-descartar-cambios");


                    this.ModalTest.$modal = $("body").find(".modal-test:last");
                    this.ModalTest.$form = this.ModalTest.$modal.find("form");
                    this.ModalTest.$txt_label = this.ModalTest.$form.find(".txt-label");
                    this.ModalTest.$txt_tonumber = this.ModalTest.$form.find(".txt-tonumber");
                    this.ModalTest.$hdn_logic = this.ModalTest.$form.find(".hdn-logic");

                    this.$This.load('./js/jTreeUI/templates/panel.html?v=3.1415XWYZ', () =>
                    {
                        this.Buttons.$btn_expcol = this.$This.find("button.btn-expcol");
                        this.Buttons.$btn_nuevo = this.$This.find("button.btn-nuevo");
                        this.Buttons.$btn_cargar = this.$This.find("button.btn-cargar");
                        this.Buttons.$btn_guardar = this.$This.find("button.btn-guardar");
                        this.Buttons.$btn_guardarcomo = this.$This.find("button.btn-guardarcomo");
                        this.Buttons.$btn_descargar = this.$This.find("button.btn-descargar");
                        this.Buttons.$btn_tour = this.$This.find("button.btn-tour");
                        this.Buttons.$btn_test = this.$This.find("button.btn-testit");

                        this.$TreeView = this.$This.find("div.treeview");
                        this.InicializarArbol();
                        this.AttachControlsEvents();
                        this.DOMElement.dispatchEvent(new Event("jTreeUI:complete"));
                    })
            });
        }

        public CrearNuevoArbol () : void
        {
            this.Cont = 1;
            this.InicializarArbol();
        }

        public Editar () : void
        {
            var node = this.TreeViewObj.GetSelectedNode();

            if (node != null)
            {
                this.ModalNuevoNodo.$btn_registrar.html("Update Node");
                this.ModalNuevoNodo.$hdn_nodo_option.val("actualizarNodo");
                this.ModalNuevoNodo.$row_content.find(".new-input").remove();

                var idNodoPadre = node.Data.Parent;
                var idseleccionado = node.Data.Id;
                if (idNodoPadre == null) {
                    Util.msg_warning("Cannot edit root node", 'toast-bottom-right');
                    return; 
                }

                this.CrearSelectTagPadre(idNodoPadre);

                var nodoSeleccionado : Node;
                this.Tree.Contains( (node) => 
                {
                    if (node.Data.Id * 1 === idseleccionado) {
                        nodoSeleccionado = node;
                    }
                }, this.Tree.TraverseBF);

                this.EditedData = nodoSeleccionado.Data;

                this.ModalNuevoNodo.$cmb_tag.val(nodoSeleccionado.Data.Tag).trigger("change");
                $.each(nodoSeleccionado.Data.Attrs, function (i, e) {
                    $("#form-registrar-nodo").find('[name=' + i + ']').val(e);
                });

                    this.ModalNuevoNodo.$hdn_nodo_padre.val(idNodoPadre);
                    this.ModalNuevoNodo.$modal.modal("show");
                    this.Dirty = true;
            } else{
                Util.msg_warning("Debe seleccionar un nodo del arbol", 'toast-bottom-right')
            }
        }

        public CopiarNodo ()
        {
            var node : Node = this.TreeViewObj.GetSelectedNode();
            if(node != null){
                var idNodoPadre = node.Data.Parent;
                    var idseleccionado = node.Data.Id;

                    if (idNodoPadre == null)
                    {
                        Util.msg_warning("Cannot copy root node", 'toast-bottom-right');
                        return;
                    }

                    var nodoSeleccionado;

                    this.Tree.Contains(function (node) {
                        if (node.data.id * 1 === idseleccionado) {
                            nodoSeleccionado = node;
                        }
                    }, this.Tree.TraverseBF);

                    if (nodoSeleccionado) {
                        this.NodoCopiado = nodoSeleccionado;
                        console.log(this.NodoCopiado);
                        Util.msg_info("Nodo " + nodoSeleccionado.data.tag + " copiado correctamente. Seleccione el nodo donde quiera pegarlo.", 'toast-bottom-right');
                    } else {
                        Util.msg_error("Ocurrio un problema al copiar nodo", 'toast-bottom-right');
                    }
            } else {
                Util.msg_warning("Debe seleccionar un nodo del arbol", 'toast-bottom-right');
            }
        }

        public PegarNodo ()
        {
            var selected = this.TreeViewObj.GetSelectedNode();

                if (selected != null) {

                    var idseleccionado = selected.Data.Id;

                    var nodoPegar : Node;
                    this.Tree.Contains((node : Node) =>
                    {
                        if (node.Data.Id * 1 === idseleccionado) {
                            nodoPegar = node;
                        }
                    }, this.Tree.TraverseBF);

                    if (nodoPegar)
                    {
                        var tagString = nodoPegar.Data.Tag;
                        var tag = Util.ImValNew(tagString, this.Type);

                        var tagCopiado = this.NodoCopiado.Data.Tag;

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
                            var cloneObject : Node = $.extend(true, {}, this.NodoCopiado);

                            cloneObject.Data.Parent = idseleccionado;
                            cloneObject.Data.ParentId = idseleccionado;

                            var newNode = new Node(cloneObject.Data);
                            var arrClone = $.extend(true, [], cloneObject.Childrens);

                            newNode.Childrens = new Array();
                            newNode.CopyNodeAndChildrens(arrClone);
                            nodoPegar.Childrens.push(newNode);
                            this.Cambios = true;

                            this.Tree.countNode = 1;
                            this.Tree.Root.ReconstruirIndices(this.Tree);
                            this.RenderTree();
                            //self.$treeview.trigger("nodeUnselected");
                            this.Dirty = true;

                            Util.msg_info("Nodo pegado correctamente.", 'toast-bottom-right');
                        } else {
                            Util.msg_error("El nodo donde intenta pegar no permite este elemento", 'toast-bottom-right');
                        }


                    } else {
                        Util.msg_error("Ocurrio un problema al pegar nodo", 'toast-bottom-right');
                    }

                } else {
                    Util.msg_warning("Debe seleccionar un nodo del arbol", 'toast-bottom-right');
                }
        }

        public eliminar ()
        {
            var node = this.TreeViewObj.GetSelectedNode();

            if (node != null)
            {
                var idNodoPadre = node.Data.Parent;
                if (idNodoPadre == null) {
                    Util.msg_warning("Cannot delete root node", 'toast-bottom-right');
                    return;
                }

                this.ModalNuevoNodo.$row_content.find(".new-input").remove();
                this.TreeViewObj.DeleteNode(node);
                this.Cambios = true;
                this.Dirty = true;
            } else{
                Util.msg_warning("Debe seleccionar un nodo del arbol", 'toast-bottom-right');
            }
        }

        public InicializarArbol ()
        {
            this.Tree = new Tree({ tag: 'Logic', tagText: 'Logic Des', icon: '', children: [], id: (this.Cont), content: '' });
            this.Cont++;
            var option : IOption = { Element: this.$TreeView, Tree: this.Tree };
            this.TreeViewObj = new TreeView(option);
            this.TreeViewObj.Reference = this;
        }

        public InicializarModal ()
        {
            this.ModalNuevoNodo.$row_content.html(
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

            var $actionSpanHelp = this.ModalNuevoNodo.$form_registrar.find("ActionSpanHelp");
            $actionSpanHelp.click((evt) =>
            {
                evt.preventDefault();
                evt.stopPropagation();
                this.ModalNuevoNodo.$form_registrar(".helpIcon").popover('hide');
                $actionSpanHelp.popover('show');
            });

            this.ModalNuevoNodo.$btn_cerrar.click((evt) =>
            {
                this.CleanHelps();
            });
        }

        public RenderTree ()
        {
            if (this.Cambios) {
                    this.Cambios = false;
                }
            this.TreeViewObj.RenderTree();
        }

        public CrearSelectTag ()
        {
            this.ModalNuevoNodo.$cmb_tag.html("");
            var node = this.TreeViewObj.GetSelectedNode();
            var itemNode = node.Data.Tag;

            var objectItem = Util.ImValNew(itemNode, this.Type);//imEval(itemNode);

            var tpl = '<option value="">Seleccionar acción</option>';

            if (objectItem.name.toLowerCase() == "logic")
                tpl += '<option value="' + objectItem.name + '">' + objectItem.friendlyName[this.Lang] + '</option>';

            if (objectItem.hasOwnProperty("children")) {
                tpl += '<optgroup label="' + objectItem.friendlyName[this.Lang] + ' elements">';

                for (var i = 0, length = objectItem.children.length; i < length; i++) {
                    tpl += '<option value="' + objectItem.children[i].name + '">' + objectItem.children[i].friendlyName[this.Lang] + '</option>';
                }

                tpl += '</optgroup>';
            }
            this.ModalNuevoNodo.$cmb_tag.html(tpl);
        }

        public CrearSelectTagPadre (idNodoPadre : number)
        {
            this.ModalNuevoNodo.$cmb_tag.html("");
                
            var nodoPadre : Node;
            this.Tree.Contains((node : Node) =>
            {
                if (node.Data.Id * 1 === idNodoPadre*1) {
                    nodoPadre = node;
                }
            }, this.Tree.TraverseBF);

            var objectItem = Util.ImValNew(nodoPadre.Data.Tag, this.Type);//imEval(nodoPadre.data.tag.toLowerCase());

            var tpl = '<option value="">Select tag</option>';

            if (objectItem.name.toLowerCase() == "logic")
                tpl += '<option value="' + objectItem.name + '">' + objectItem.friendlyName[this.Lang] + '</option>';

            if (objectItem.hasOwnProperty("children")) {
                tpl += '<optgroup label="' + objectItem.friendlyName[this.Lang] + ' elements">';

                for (var i = 0, length = objectItem.children.length; i < length; i++) {
                    tpl += '<option value="' + objectItem.children[i].name + '">' + objectItem.children[i].friendlyName[this.Lang] + '</option>';
                }

                tpl += '</optgroup>';
            }

            this.ModalNuevoNodo.$cmb_tag.html(tpl);
        }

        public CrearDocumentoXML (opts : any)
        {
            return this.Tree.Root.CreateXML(opts);
        }

        public GetObjectProperties (tag : string) : any
        {
            if (tag !== null && tag !== undefined && tag !== "") {
                return Util.ImValNew(tag, this.Type); //imEval(valueIn);
            }
            return null;
        }

        public UcFirst (string : string) : string
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        public GetAttributes (tag : string)
        {
            var myStructure = Util.ImValNew(tag, this.Type); //imEval(valueIn);
            return myStructure.attributes;
        }

        public CleanHelps ()
        {
            this.ModalNuevoNodo.$form_registrar.find(".helpIcon").popover('hide');
            this.ModalNuevoNodo.$form_registrar.find(".helpIcon").popover('destroy');
        }

        public DownloadXML (fileName : string, text : string)
        {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', fileName);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        }

        public LeerXML (node : Element, idParentNode : number)
        {
            var childs = node.children;
            var tag = node.nodeName;
            var structure = Util.ImValNew(tag, this.Type);
            var description = structure.friendlyName[this.Lang];
            var idnode = this.Cont++;
            var icon = structure.icon;
            var classAttributes = structure.attributes;
            var attrs = {};

            classAttributes.forEach((el, idx, arr) =>
             {
                var myAttr = node.getAttribute(el.name);
                if (myAttr) {
                    attrs[el.name] = myAttr;
                }
             });

            var nodeResult : Node;
            this.Tree.Contains((mynode : Node) => { if (mynode.Data.Id == idParentNode) { nodeResult = mynode; } }, this.Tree.TraverseBF);

            nodeResult.Childrens.push(new Node(
                {
                Id: idnode,
                Icon: icon,
                Tag: tag,
                Attrs: attrs,
                Content: '',
                Parent: idParentNode,
                Description: description,
                TagText: description || tag
                }));


            if (childs.length > 0) {
                for (var i = 0; i < childs.length; i++) {
                    if (childs[i].nodeType == 1) {
                        this.LeerXML(childs[i], idnode);
                    }
                }
            }
        }

        public CreateTreeFromXML (xmlNode : Element)
        {
            var node = xmlNode.documentElement;
            var idNode = this.Cont++;
            var tag = node.nodeName;
            var structure = Util.ImValNew(tag, this.Type);
            var description = structure.friendlyName[this.Lang];
            var icon = structure.icon;
            var classAttributes = structure.attributes;
            var attrs = {};

            classAttributes.forEach((el, idx, arr) =>
                {
                    var myAttr = node.getAttribute(el.name);
                    if (myAttr) {
                        attrs[el.name] = myAttr;
                    }
                });


            this.Tree = new Tree({
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
                        this.LeerXML(childs[i], idNode);
                    }
                }
            }
            this.Dirty = true;
        }

        public LoadXmlFromString (stringXml : Element)
        {
            this.Cont = 1;
            this.CreateTreeFromXML(stringXml);                                

            this.TreeViewObj.SetTree(this.Tree, this);
            this.Dirty = false;
        }

        public CrearInputs (attributes)
        {
            this.ModalNuevoNodo.$row_content.find(".new-input").remove();
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
                        labelPlugin = "<label class='col-sm-2' style='cursor:pointer;' onclick=\"openPluginModal('controlDisplay_" + (i + 1) + "', '" + this.VirtualNumber + "');\"><span class='fa fa-list'></span></label>";
                    }

                    tpl += '<div class="form-group new-input">' +
                            '   <label class="col-sm-4 control-label" for="txt-' + attr.name + '">' + this.UcFirst(attr.friendlyName[this.Lang]) + ':' +
                            '       <a class="fa fa-commenting helpIcon ActionSpanHelp_' + attr.name + '">&nbsp;</a>' +
                            '   </label>' +
                            '   <div class="'+colorsStyle+'">' +
                                    control +
                            '   </div>' +
                            labelPlugin +
                            '</div>';
                }

                this.ModalNuevoNodo.$row_content.append(tpl);

                var getParent = Util.ImValNew(this.ModalNuevoNodo.$cmb_tag.val(), this.Type);//imEval(self.modalNuevoNodo.$cmb_tag.val().toLowerCase());
                var selectorSearch = this.ModalNuevoNodo.$modal.find(".generatedField");

                $.each(selectorSearch, function (ix, vx) {
                    var nameAttr = vx.name;
                    var attributesList = getParent.attributes;//getParent[self.type].attributes;

                    $.each(attributesList, function (ix1, vx1) {
                        if (vx1.name == nameAttr) {
                            var $actionSpanHelp = this.ModalNuevoNodo.$form_registrar.find(".ActionSpanHelp_" + vx1.name);
                            $actionSpanHelp.attr("data-html", true);
                            $actionSpanHelp.attr("data-toggle", "popover");
                            $actionSpanHelp.attr("data-trigger", "click");
                            $actionSpanHelp.attr("data-content", vx1.description[this.Lang]);
                            $actionSpanHelp.attr("title", "<small>" + vx1.friendlyName[this.Lang] + "</small>");
                            $actionSpanHelp.attr("role", "button");
                            $actionSpanHelp.attr("tabindex", ix1);
                            $actionSpanHelp.attr("data-placement", "bottom");
                            $actionSpanHelp.html("");
                            $actionSpanHelp.popover();

                            $actionSpanHelp.click(function (event) {
                                event.preventDefault();
                                event.stopPropagation();
                                this.ModalNuevoNodo.$form_registrar.find(".helpIcon").popover('hide');
                                $actionSpanHelp.popover('show');
                            });
                        }
                    });
                });


                if (this.EditedData) {
                    for (i = 0; i < attributes.length; i++) {
                        var myAttr = attributes[i].name;
                        if (myAttr) {
                            var value = this.EditedData.attrs[myAttr];
                            this.ModalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').val(value);

                            if (this.ModalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').is("input")) {
                                if (this.ModalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').val() != "")
                                    PluginFactory.PluginVariables.BuildTextInput(this.ModalNuevoNodo.$form_registrar.find('[name=' + myAttr + ']').attr("id"), this.VirtualNumber);
                            }

                        }
                    }
                }

                this.ModalNuevoNodo.$form_registrar.find(".form-control").click(function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    this.CleanHelps();
                });
        }

        public CrearNodo ()
        {
            var selectedNode = this.TreeViewObj.GetSelectedNode();
            if (selectedNode != null) {
                var data = selectedNode.Data;
                var idseleccionado = data.Id;
                this.EditedData = null;

                this.ModalNuevoNodo.$btn_registrar.html("Create Node");
                this.ModalNuevoNodo.$hdn_nodo_option.val("crearNodo");
                this.ModalNuevoNodo.$row_content.find(".new-input").remove();
                this.CrearSelectTag();

                this.ModalNuevoNodo.$hdn_nodo_padre.val(idseleccionado);
                this.ModalNuevoNodo.$modal_title.html("Create Node");
                this.ModalNuevoNodo.$modal.modal("show");
                this.Dirty = true;
            } else {
                Util.msg_warning("Debe seleccionar un nodo del arbol", 'toast-bottom-right');
            }
        }

        public Comentar ()
        {
            var selected = this.TreeViewObj.GetSelectedNode();

            if (selected != null)
                {
                    var idNodoPadre = selected.Data.Parent;

                    if (idNodoPadre == null)
                    {
                        Util.msg_warning("Cannot comment root node", 'toast-bottom-right');
                        return;
                    }

                    var idseleccionado = selected.Data.Id;
                    idNodoPadre = selected.Data.Parent;
                    this.EditedData = null;

                    this.ModalCommentElements.$hdn_nodo_seleccionado.val(idseleccionado);
                    this.ModalCommentElements.$hdn_nodo_option.val("crearNodoComentario");
                    this.ModalCommentElements.$hdn_nodo_padre.val(idNodoPadre);

                    this.ModalCommentElements.$modal.modal("show");
                    this.Dirty = true;
                } else {
                    Util.msg_warning("Debe seleccionar un nodo del arbol", 'toast-bottom-right');
                }
        }

        public AttachControlsEvents ()
        {
            this.Buttons.$btn_expcol.click((evt) =>
            {
            evt.preventDefault();

            var selected = this.TreeViewObj.GetSelectedNode();
            
            if (selected != null) {
                var idNodoSeleccionado = selected.Data.Id;

                if (this.Expand) {
                    this.TreeViewObj.CollapseNode(idNodoSeleccionado);                            
                } else {
                    this.TreeViewObj.ExpandNode(idNodoSeleccionado);                            
                }
            } else {
                if (this.Expand) {
                    this.TreeViewObj.CollapseAll();
                } else {
                    this.TreeViewObj.ExpandAll();                            
                }
            }

            this.Expand = !this.Expand;
        });

        this.Buttons.$btn_nuevo.click(function (evt) {
            if (this.Dirty) {                        
                this.ModalGuardarCambios.$modal.modal("show");
            } else {
                this.ModalGuardar.$title.html("Nueva Lógica");
                this.ModalGuardar.$modal.modal("show");
                //self.methods.crearNuevoArbol();
            }                    
        });

        this.Buttons.$btn_test.click(() => {
            //Crea el logic temporal, y obtengo su id
            // Se hace la llamada
            var xml = '<?xml version="1.0" encoding="UTF-8"?>' + this.CrearDocumentoXML({showId: false});
            var xmlEncoded = encodeURI(xml);
            var name = "test call"; 
            var description = "test call";
            var sidVirtualNumber = this.VirtualNumber;
            var isVoice = this.IsVoice;
            var isTemp = true;

            Services.Local.ValidateXml(xml, isVoice,
                function (result) {
                    this.ModalGuardar.$modal.modal("hide");
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
        
    }
}