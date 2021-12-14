// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class RewardAndSlashSum implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountReward: bigint;

    public accountSlash: bigint;

    public accountTotal: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RewardAndSlashSum entity without an ID");
        await store.set('RewardAndSlashSum', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RewardAndSlashSum entity without an ID");
        await store.remove('RewardAndSlashSum', id.toString());
    }

    static async get(id:string): Promise<RewardAndSlashSum | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RewardAndSlashSum entity without an ID");
        const record = await store.get('RewardAndSlashSum', id.toString());
        if (record){
            return RewardAndSlashSum.create(record);
        }else{
            return;
        }
    }


    static async getByAccountReward(accountReward: bigint): Promise<RewardAndSlashSum[] | undefined>{
      
      const records = await store.getByField('RewardAndSlashSum', 'accountReward', accountReward);
      return records.map(record => RewardAndSlashSum.create(record));
      
    }

    static async getByAccountSlash(accountSlash: bigint): Promise<RewardAndSlashSum[] | undefined>{
      
      const records = await store.getByField('RewardAndSlashSum', 'accountSlash', accountSlash);
      return records.map(record => RewardAndSlashSum.create(record));
      
    }


    static create(record){
        let entity = new RewardAndSlashSum(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
