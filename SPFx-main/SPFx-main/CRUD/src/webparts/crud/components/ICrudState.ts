import {IListitem} from "./IListItem"

export interface ICrudState{
    status:string;
    Listitmes:IListitem[];
    Listitem:IListitem;
}