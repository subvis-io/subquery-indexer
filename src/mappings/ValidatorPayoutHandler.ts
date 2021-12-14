import { SubstrateEvent } from '@subql/types';
import { Validators } from '../types';

export async function handleValidatorPayout(event: SubstrateEvent): Promise<void> {
  try {
    const {
      event: {
        data: [era, validatorStash],
      },
      block: {
        block: { header },
        timestamp,
      },
    } = event;

    const curEra = await api.query.staking.currentEra();
    const blockNum = header.number.toNumber();

    logger.info(`
    =====
    Era: ${era} - validator: ${validatorStash}
    =====
    `);

    const validator = await Validators.get(`${curEra}-${validatorStash}`);
    if (validator) {
      validator.latestPayoutBlock = blockNum;
      validator.latestPayoutFor = era.toString();
      validator.latestPayoutTimestamp = timestamp;
      await validator.save();
      logger.info(`*** Validator payout Updated ***`);
    }
  } catch (error) {
    logger.error(`error - ${error}`);
  }
}
