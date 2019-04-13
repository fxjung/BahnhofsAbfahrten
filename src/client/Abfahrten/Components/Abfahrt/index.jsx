// @flow
import { connect } from 'react-redux';
import { getWingsForAbfahrt } from 'Abfahrten/selector/abfahrten';
import BaseAbfahrt from './BaseAbfahrt';
import React from 'react';
import type { AbfahrtenState } from 'AppState';
import type { Abfahrt as AbfahrtType, ResolvedWings } from 'types/abfahrten';
export type OwnProps = {|
  +abfahrt: AbfahrtType,
|};
type StateProps = {|
  +resolvedWings: ?ResolvedWings,
|};
type Props = {|
  ...OwnProps,
  ...StateProps,
  +dispatch: Dispatch<*>,
|};

const Abfahrt = ({ resolvedWings, abfahrt }: Props) => {
  const wings = resolvedWings?.arrivalWings || resolvedWings?.departureWings;
  const sameTrainWing = Boolean(
    wings &&
      wings.every(
        w =>
          w.trainNumber.endsWith(abfahrt.trainNumber) &&
          w.trainType !== abfahrt.trainType
      )
  );

  return (
    <>
      <BaseAbfahrt
        abfahrt={abfahrt}
        sameTrainWing={sameTrainWing}
        wing={Boolean(wings?.length)}
        wingStart={Boolean(wings)}
      />
      {wings &&
        wings.map((w, index) => (
          <BaseAbfahrt
            sameTrainWing={sameTrainWing}
            abfahrt={w}
            key={w.rawId}
            wing
            wingEnd={wings.length === index + 1}
          />
        ))}
    </>
  );
};

export default connect<Props, OwnProps, StateProps, _, AbfahrtenState, _>(
  (state, props) => ({
    resolvedWings: getWingsForAbfahrt(state, props),
  })
)(Abfahrt);