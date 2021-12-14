// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class Validators implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public sessionIdx: number;

    public stakingEraId?: string;

    public era: string;

    public stashAddress: string;

    public totalStake?: bigint;

    public ownStake?: bigint;

    public nominatorCount?: number;

    public commission?: bigint;

    public blocked?: boolean;

    public slashInEra?: boolean;

    public identityDisplayName?: string;

    public eraRewardsPoints?: number;

    public eraProducedBlockCount?: number;

    public latestPayoutBlock?: number;

    public latestPayoutFor?: string;

    public latestPayoutTimestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Validators entity without an ID");
        await store.set('Validators', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Validators entity without an ID");
        await store.remove('Validators', id.toString());
    }

    static async get(id:string): Promise<Validators | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Validators entity without an ID");
        const record = await store.get('Validators', id.toString());
        if (record){
            return Validators.create(record);
        }else{
            return;
        }
    }


    static async getBySessionIdx(sessionIdx: number): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'sessionIdx', sessionIdx);
      return records.map(record => Validators.create(record));
      
    }

    static async getByEra(era: string): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'era', era);
      return records.map(record => Validators.create(record));
      
    }

    static async getByStashAddress(stashAddress: string): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'stashAddress', stashAddress);
      return records.map(record => Validators.create(record));
      
    }

    static async getBySlashInEra(slashInEra: boolean): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'slashInEra', slashInEra);
      return records.map(record => Validators.create(record));
      
    }

    static async getByEraRewardsPoints(eraRewardsPoints: number): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'eraRewardsPoints', eraRewardsPoints);
      return records.map(record => Validators.create(record));
      
    }

    static async getByLatestPayoutBlock(latestPayoutBlock: number): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'latestPayoutBlock', latestPayoutBlock);
      return records.map(record => Validators.create(record));
      
    }

    static async getByLatestPayoutFor(latestPayoutFor: string): Promise<Validators[] | undefined>{
      
      const records = await store.getByField('Validators', 'latestPayoutFor', latestPayoutFor);
      return records.map(record => Validators.create(record));
      
    }


    static create(record){
        let entity = new Validators(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
