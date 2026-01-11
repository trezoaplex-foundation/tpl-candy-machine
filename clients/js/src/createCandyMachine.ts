import { createAccount } from '@trezoaplex-foundation/tpl-toolbox';
import {
  Context,
  none,
  Signer,
  transactionBuilder,
  TransactionBuilder,
} from '@trezoaplex-foundation/umi';
import { initializeCandyMachine } from './generated';
import { getCandyMachineSize } from './hooked';

export type CreateCandyMachineInput = Omit<
  Parameters<typeof initializeCandyMachine>[1],
  'candyMachine'
> & {
  candyMachine: Signer;
};

export const createCandyMachine = async (
  context: Parameters<typeof initializeCandyMachine>[0] & Pick<Context, 'rpc'>,
  input: CreateCandyMachineInput
): Promise<TransactionBuilder> => {
  const space = getCandyMachineSize(
    input.itemsAvailable,
    input.configLineSettings ?? none()
  );
  const lamports = await context.rpc.getRent(space);
  return transactionBuilder()
    .add(
      createAccount(context, {
        newAccount: input.candyMachine,
        lamports,
        space,
        programId: context.programs.get('tplCandyMachineCore').publicKey,
      })
    )
    .add(
      initializeCandyMachine(context, {
        ...input,
        candyMachine: input.candyMachine.publicKey,
      })
    );
};
