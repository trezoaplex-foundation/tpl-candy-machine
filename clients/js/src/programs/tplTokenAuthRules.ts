import {
  ClusterFilter,
  Context,
  Program,
  PublicKey,
  publicKey,
} from '@trezoaplex-foundation/umi';

export const TPL_TOKEN_AUTH_RULES_PROGRAM_ID = publicKey(
  'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
);

export function createMplTokenAuthRulesProgram(): Program {
  return {
    name: 'tplTokenAuthRules',
    publicKey: TPL_TOKEN_AUTH_RULES_PROGRAM_ID,
    getErrorFromCode: () => null,
    getErrorFromName: () => null,
    isOnCluster: () => true,
  };
}

export function getMplTokenAuthRulesProgram<T extends Program = Program>(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): T {
  return context.programs.get<T>('tplTokenAuthRules', clusterFilter);
}

export function getMplTokenAuthRulesProgramId(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): PublicKey {
  return context.programs.getPublicKey(
    'tplTokenAuthRules',
    TPL_TOKEN_AUTH_RULES_PROGRAM_ID,
    clusterFilter
  );
}
