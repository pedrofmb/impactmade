interface Phrase
{
   en? : string;
   es? : string;
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
    children? : any[];
}

interface LogicCore
{
   Logic : NodeElement;
   Say : NodeElement;
}

declare var Logic : LogicCore;