// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Nominators implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public stashAddress: string;

    public totalStake?: bigint;

    public nominateToId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Nominators entity without an ID");
        await store.set('Nominators', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Nominators entity without an ID");
        await store.remove('Nominators', id.toString());
    }

    static async get(id:string): Promise<Nominators | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Nominators entity without an ID");
        const record = await store.get('Nominators', id.toString());
        if (record){
            return Nominators.create(record);
        }else{
            return;
        }
    }


    static async getByStashAddress(stashAddress: string): Promise<Nominators[] | undefined>{
      
      const records = await store.getByField('Nominators', 'stashAddress', stashAddress);
      return records.map(record => Nominators.create(record));
      
    }


    static create(record){
        let entity = new Nominators(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
