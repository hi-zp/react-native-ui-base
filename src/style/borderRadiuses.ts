import type { Dictionary, ExtendTypeWith } from '../typings/common';

// TODO: enable template type after we're ready to use TS 4.4.0
// interface IBorderRadiusesLiterals {
//   [key: `br${number}`]: number
// }

export const BorderRadiusesLiterals /* : IBorderRadiusesLiterals  */ = {
  br0: 0,
  br1: 4,
  br2: 8,
  br3: 12,
  br4: 16,
  br5: 20,
  br6: 24,
  br7: 28,
  br8: 32,
  br9: 36,
  br10: 40,
  br100: 1000,
};

export class BorderRadiuses {
  loadBorders(borders: Dictionary<number> /*  IBorderRadiusesLiterals */) {
    Object.assign(this, borders);
  }

  getKeysPattern() {
    return /^(br[0-9]+)/;
  }
}
const TypedBorderRadiuses = BorderRadiuses as ExtendTypeWith<
  typeof BorderRadiuses,
  typeof BorderRadiusesLiterals
>;
const borderRadiusesInstance = new TypedBorderRadiuses();
borderRadiusesInstance.loadBorders(BorderRadiusesLiterals);

export default borderRadiusesInstance;
