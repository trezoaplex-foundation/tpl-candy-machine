import { fetchDigitalAsset } from '@trezoaplex-foundation/tpl-token-metadata';
import {
  Context,
  isNone,
  isSome,
  none,
  Option,
  PublicKey,
} from '@trezoaplex-foundation/umi';
import { fetchCandyMachine } from './generated';

export const getCandyMachineRuleSet = async (
  context: Pick<Context, 'rpc' | 'eddsa' | 'programs'>,
  candyMachine: PublicKey
): Promise<Option<PublicKey>> => {
  const candyMachineAccount = await fetchCandyMachine(context, candyMachine);

  if (isSome(candyMachineAccount.ruleSet)) {
    return candyMachineAccount.ruleSet;
  }

  const collection = candyMachineAccount.collectionMint;
  const collectionAsset = await fetchDigitalAsset(context, collection);
  const { programmableConfig } = collectionAsset.metadata;
  if (isNone(programmableConfig)) {
    return none();
  }

  return programmableConfig.value.ruleSet;
};
