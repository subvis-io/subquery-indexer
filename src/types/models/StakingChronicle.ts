// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';


export class StakingChronicle implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockNum?: number;

    public timestamp?: Date;

    public historyDepth?: number;

    public maxNominatorsCount?: number;

    public maxValidatorsCount?: number;

    public minNominatorBond?: bigint;

    public minValidatorBond?: bigint;

    public minimumValidatorCount?: number;

    public slashRewardFraction?: bigint;

    public earliestUnappliedSlash?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StakingChronicle entity without an ID");
        await store.set('StakingChronicle', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StakingChronicle entity without an ID");
        await store.remove('StakingChronicle', id.toString());
    }

    static async get(id:string): Promise<StakingChronicle | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StakingChronicle entity without an ID");
        const record = await store.get('StakingChronicle', id.toString());
        if (record){
            return StakingChronicle.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new StakingChronicle(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
