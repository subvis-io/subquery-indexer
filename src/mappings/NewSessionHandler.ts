import { SubstrateEvent } from '@subql/types';
import * as Storage from '../services';
import { StakingChronicleKey } from '../constants';

export async function handleNewSession(event: SubstrateEvent): Promise<void> {
  try {
    const {
      event: {
        data: [sessionIdx],
      },
      block: {
        block: { header },
        timestamp,
      },
    } = event;

    const blockNum = header.number.toNumber();

    const [
      historyDepth,
      maxNominatorsCount,
      maxValidatorsCount,
      minNominatorBond,
      minValidatorBond,
      minimumValidatorCount,
      slashRewardFraction,
      earliestUnappliedSlash,
    ] = await api.queryMulti([
      api.query.staking.historyDepth,
      api.query.staking.maxNominatorsCount,
      api.query.staking.maxValidatorsCount,
      api.query.staking.minNominatorBond,
      api.query.staking.minValidatorBond,
      api.query.staking.minimumValidatorCount,
      api.query.staking.slashRewardFraction,
      api.query.staking.earliestUnappliedSlash,
    ]);

    logger.info(`
    =====
    Era: ${blockNum} - historyDepth: ${historyDepth} 
    maxValidatorsCount: ${maxValidatorsCount} - maxNominatorsCount: ${maxNominatorsCount}
    minValidatorBond: ${minValidatorBond}  - minNominatorBond: ${minNominatorBond}
    minimumValidatorCount: ${minimumValidatorCount} - slashRewardFraction: ${slashRewardFraction} 
    earliestUnappliedSlash: ${earliestUnappliedSlash}
    =====
    `);

    await Storage.upsert('StakingChronicle', StakingChronicleKey, {
      blockNum,
      timestamp,
      historyDepth,
      maxNominatorsCount,
      maxValidatorsCount,
      minNominatorBond,
      minValidatorBond,
      minimumValidatorCount,
      slashRewardFraction,
      earliestUnappliedSlash,
    });
    logger.info(`*** StakingChronicle Updated ***`);
  } catch (error) {
    logger.error(`error - ${error}`);
  }
}
