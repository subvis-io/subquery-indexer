import { SubstrateEvent } from '@subql/types';
import { hexToString } from '../utils';
import * as Storage from '../services';

export async function handleValidators(event: SubstrateEvent): Promise<void> {
  try {
    const {
      event: {
        data: [sessionIdx],
      },
      block: {
        block: { header },
      },
    } = event;

    const curEra = await api.query.staking.currentEra();
    const parsedCurEra = Number.parseInt(curEra.toString());

    const curSessionIdx = await api.query.session.currentIndex();
    const validators = await api.query.session.validators();
    logger.info(`Session ${curSessionIdx} - Validators: ${validators.length}`);

    await Promise.all(
      validators.map(async (validator) => {
        const eraStakers = await api.query.staking.erasStakers(parsedCurEra, validator);
        const totalStake = eraStakers?.total;
        const ownStake = eraStakers?.own;
        const nominatorCount = eraStakers?.others.length;

        const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs(parsedCurEra, validator);
        const { commission, blocked } = erasValidatorPrefs.toJSON();
        const validatorSlashInEra = await api.query.staking.validatorSlashInEra(parsedCurEra, validator);

        const producedBlockCount = await api.query.imOnline.authoredBlocks(sessionIdx, validator);
        const identity = await api.query.identity.identityOf(validator);
        const { info } = (identity.toJSON() as any) || { info: null };
        const identityDisplayName = info !== null ? hexToString(info?.display?.raw.toString()) : null;

        const { individual } = await api.query.staking.erasRewardPoints(parsedCurEra);
        const eraRewardsPoints = individual && individual.toJSON()[validator.toString()];
        logger.info(`
          =====
          era: ${curEra} - validator: ${validator} - identity: ${identityDisplayName}
          totalStake: ${totalStake} - ownStake: ${ownStake} - nominatorCount: ${nominatorCount}
          commission: ${commission} - blocked: ${blocked}
          validatorSlashInEra: ${validatorSlashInEra}
          producedBlockCount: ${producedBlockCount} - eraRewardsPoints: ${Number.parseInt(eraRewardsPoints?.toString())}
          =====
          `);
        await Storage.upsert('Validators', `${parsedCurEra}-${validator}`, {
          sessionIdx,
          stashAddress: validator.toString(),
          stakingEra: curEra.toString(),
          era: curEra.toString(),
          totalStake,
          ownStake,
          nominatorCount,
          commission,
          blocked,
          slashInEra: validatorSlashInEra !== null,
          eraProducedBlockCount: producedBlockCount,
          eraRewardsPoints: Number.parseInt(eraRewardsPoints?.toString() || '0'),
          identityDisplayName,
        });
      })
    );
    logger.info(`***  era: ${curEra} - ${validators.length} Validators Updated ***`);
  } catch (error) {
    logger.error(`error - ${error}`);
  }
}
