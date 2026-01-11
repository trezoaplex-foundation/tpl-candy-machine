import { tplTokenMetadata } from '@trezoaplex-foundation/tpl-token-metadata';
import { UmiPlugin } from '@trezoaplex-foundation/umi';
import {
  addressGateGuardManifest,
  allowListGuardManifest,
  allocationGuardManifest,
  botTaxGuardManifest,
  defaultCandyGuardNames,
  endDateGuardManifest,
  freezeSolPaymentGuardManifest,
  freezeTokenPaymentGuardManifest,
  gatekeeperGuardManifest,
  mintLimitGuardManifest,
  nftBurnGuardManifest,
  nftGateGuardManifest,
  nftPaymentGuardManifest,
  programGateGuardManifest,
  redeemedAmountGuardManifest,
  solPaymentGuardManifest,
  startDateGuardManifest,
  thirdPartySignerGuardManifest,
  token2022PaymentGuardManifest,
  tokenBurnGuardManifest,
  tokenGateGuardManifest,
  tokenPaymentGuardManifest,
} from './defaultGuards';
import {
  createMplCandyGuardProgram,
  createMplCandyMachineCoreProgram,
} from './generated';
import {
  CandyGuardProgram,
  DefaultGuardRepository,
  GuardRepository,
} from './guards';
import {
  createCivicGatewayProgram,
  createMplTokenAuthRulesProgram,
} from './programs';

export const tplCandyMachine = (): UmiPlugin => ({
  install(umi) {
    umi.use(tplTokenMetadata());

    // Programs.
    umi.programs.add(createMplCandyMachineCoreProgram(), false);
    umi.programs.add(
      {
        ...createMplCandyGuardProgram(),
        availableGuards: defaultCandyGuardNames,
      } as CandyGuardProgram,
      false
    );
    umi.programs.add(createCivicGatewayProgram(), false);
    umi.programs.add(createMplTokenAuthRulesProgram(), false);

    // Default Guards.
    umi.guards = new DefaultGuardRepository();
    umi.guards.add(
      botTaxGuardManifest,
      solPaymentGuardManifest,
      tokenPaymentGuardManifest,
      startDateGuardManifest,
      thirdPartySignerGuardManifest,
      tokenGateGuardManifest,
      gatekeeperGuardManifest,
      endDateGuardManifest,
      allowListGuardManifest,
      mintLimitGuardManifest,
      nftPaymentGuardManifest,
      redeemedAmountGuardManifest,
      addressGateGuardManifest,
      nftGateGuardManifest,
      nftBurnGuardManifest,
      tokenBurnGuardManifest,
      freezeSolPaymentGuardManifest,
      freezeTokenPaymentGuardManifest,
      programGateGuardManifest,
      allocationGuardManifest,
      token2022PaymentGuardManifest
    );
  },
});

declare module '@trezoaplex-foundation/umi' {
  interface Umi {
    guards: GuardRepository;
  }
}
