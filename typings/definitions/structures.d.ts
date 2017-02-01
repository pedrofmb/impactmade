interface Phrase
{
   en? : string;
   es? : string;
}

interface DataType
{
    number: { value: "int" },
    string: { value: "string" },
    bool: { value: "boolean" }
}

interface Attribute
{
    name : string;
    value? : any;
    this.defaultValue = null;
    this.friendlyName = new Phrase();
    this.description = new Phrase();
    this.dataType = DataType.number;
    this.minValue = null;
    this.maxValue = null;
    this.required = false;
}

interface NodeElement
{
    name : string;
    isVoice : boolean;
    icon? : string;
    video? :string;
    friendlyName? :Phrase;
    description? : Phrase;
    attributes? : any[];
    children? : NodeElement[];
}

interface ILogicVoice
{
    Logic : NodeElement;
    Say : NodeElement;
    Play : NodeElement;
}

interface ILogicSms
{

}

interface LogicCore
{
   Voice : ILogicVoice;
   Sms : ILogicSms;
}

declare var Logic : LogicCore;