// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Identity implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public deposit?: bigint;

    public display?: string;

    public web?: string;

    public riot?: string;

    public email?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Identity entity without an ID");
        await store.set('Identity', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Identity entity without an ID");
        await store.remove('Identity', id.toString());
    }

    static async get(id:string): Promise<Identity | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Identity entity without an ID");
        const record = await store.get('Identity', id.toString());
        if (record){
            return Identity.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new Identity(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
