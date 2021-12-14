import { SubstrateEvent } from '@subql/types';
import { Staking } from '../types';

export async function handleEraPaid(event: SubstrateEvent): Promise<void> {
  try {
    const {
      event: {
        data: [era, validatorPayout, remainder],
      },
    } = event;

    logger.info(`
    =====
    Era: ${era} - validatorPayout: ${validatorPayout} - remainder: ${remainder}
    =====
    `);

    const eraStaking = await Staking.get(era.toString());
    if (eraStaking) {
      eraStaking.stakingEraPayout = validatorPayout as unknown as bigint;
      await eraStaking.save();
      logger.info(`*** Staking EraPayout Updated ***`);
    }
  } catch (error) {
    logger.error(`error - ${error}`);
  }
}
