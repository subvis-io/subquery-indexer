import { SubstrateBlock } from '@subql/types';
import { ChronicleKey } from '../constants';
import * as Storage from '../services';
const _ = require('lodash');

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  try {
    const { timestamp, block: rawBlock } = block;
    const blockNum = rawBlock.header.number.toNumber();

    const curEra = await api.query.staking.currentEra();
    const sortedCurEra = Number.parseInt((curEra || 0).toString());

    const curTotalIssuance = await api.query.balances?.totalIssuance();
    const auctionCounter = (await api.query.auctions?.auctionCounter()) || 0;
    const curAuctionCounter = auctionCounter ? Number.parseInt(auctionCounter.toString()) : 0;
    const totalStaking = await api.query.staking.erasTotalStake(sortedCurEra);
    const curSessionIdx = await api.query.session.currentIndex();

    const [startSessionIdx, eraRewardPoints, stakingValidatorCount, counterForNominators, counterForValidators] =
      sortedCurEra &&
      (await api.queryMulti([
        [api.query.staking.erasStartSessionIndex, sortedCurEra],
        [api.query.staking.erasRewardPoints, sortedCurEra],
        api.query.staking.validatorCount,
        api.query.staking.counterForNominators,
        api.query.staking.counterForValidators,
      ]));
    const stakingEraRewardPoints = eraRewardPoints?.total;

    logger.info(`
      =====
      Era: ${curEra} - BlockNum: ${blockNum} - timestamp: ${timestamp}
      curTotalIssuance: ${curTotalIssuance} - curAuctionCounter: ${curAuctionCounter}
      totalStaking: ${totalStaking} - curSessionIdx: ${curSessionIdx}
      counterForNominators: ${counterForNominators} - counterForValidators: ${counterForValidators} 
      =====
      `);

    await Storage.upsert('Chronicle', ChronicleKey, {
      curEra: curEra as unknown as number,
      curBlockNum: blockNum,
      curTotalIssuance: curTotalIssuance as unknown as bigint,
      curAuctionCounter,
      curSessionIdx,
    });
    logger.info(`*** Chronicle Updated ***`);

    await Storage.upsert('Staking', curEra.toString(), {
      timestamp,
      blockNum,
      stakingAmount: totalStaking,
      totalIssuance: curTotalIssuance as unknown as bigint,
      auctionCounter: curAuctionCounter,
      stakingEraRewardPoints,
      stakingValidatorCount,
      startSessionIdx,
      counterForNominators,
      counterForValidators,
    });
    logger.info(`*** Staking Updated ***`);
  } catch (err) {
    logger.error(`handleBlock err: ${err} `);
  }
}
