import { Context, Pda, PublicKey } from '@trezoaplex-foundation/umi';
import { publicKey, string } from '@trezoaplex-foundation/umi/serializers';

export function findCandyMachineAuthorityPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    /** The Candy Machine address */
    candyMachine: PublicKey;
  }
): Pda {
  const programId = context.programs.get('tplCandyMachineCore').publicKey;
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('candy_machine'),
    publicKey().serialize(seeds.candyMachine),
  ]);
}
