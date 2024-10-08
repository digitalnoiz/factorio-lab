import { Action } from '@ngrx/store';

import {
  CostSettings,
  DisplayRate,
  InserterCapacity,
  InserterTarget,
  MaximizeType,
  Preset,
  Rational,
  ValueDefaultPayload,
  ValuePreviousPayload,
} from '~/models';

export const enum SettingsActionType {
  SET_MOD = '[Settings] Set Mod',
  SET_RESEARCHED_TECHNOLOGIES = '[Settings] Set Researched Technologies',
  SET_NET_PRODUCTION_ONLY = '[Settings] Set Net Production Only',
  SET_REQUIRE_MACHINES_OUTPUT = '[Settings] Set Require Machines Output',
  SET_PRESET = '[Settings] Set Preset',
  SET_BEACON_RECEIVERS = '[Settings] Set Beacon Receivers',
  SET_PROLIFERATOR_SPRAY = '[Settings] Set Proliferator Spray',
  SET_BELT = '[Settings] Set Belt',
  SET_PIPE = '[Settings] Set Pipe',
  SET_CARGO_WAGON = '[Settings] Set Cargo Wagon',
  SET_FLUID_WAGON = '[Settings] Set Fluid Wagon',
  SET_FLOW_RATE = '[Settings] Set Flow Rate',
  SET_INSERTER_TARGET = '[Settings] Set Inserter Target',
  SET_MINING_BONUS = '[Settings] Set Mining Bonus',
  SET_RESEARCH_BONUS = '[Settings] Set Research Bonus',
  SET_INSERTER_CAPACITY = '[Settings] Set Inserter Capacity',
  SET_DISPLAY_RATE = '[Settings] Set Display Rate',
  SET_MAXIMIZE_TYPE = '[Settings] Set Maximize Type',
  SET_COSTS = '[Settings] Set Costs',
  RESET_COSTS = '[Settings] Reset Costs',
}

export class SetModAction implements Action {
  readonly type = SettingsActionType.SET_MOD;
  constructor(public payload: string) {}
}

export class SetResearchedTechnologiesAction implements Action {
  readonly type = SettingsActionType.SET_RESEARCHED_TECHNOLOGIES;
  constructor(public payload: string[] | null) {}
}

export class SetNetProductionOnlyAction implements Action {
  readonly type = SettingsActionType.SET_NET_PRODUCTION_ONLY;
  constructor(public payload: boolean) {}
}

export class SetSurplusMachinesOutputAction implements Action {
  readonly type = SettingsActionType.SET_REQUIRE_MACHINES_OUTPUT;
  constructor(public payload: boolean) {}
}

export class SetPresetAction implements Action {
  readonly type = SettingsActionType.SET_PRESET;
  constructor(public payload: Preset) {}
}

export class SetBeaconReceiversAction implements Action {
  readonly type = SettingsActionType.SET_BEACON_RECEIVERS;
  constructor(public payload: Rational | null) {}
}

export class SetProliferatorSprayAction implements Action {
  readonly type = SettingsActionType.SET_PROLIFERATOR_SPRAY;
  constructor(public payload: string) {}
}

export class SetBeltAction implements Action {
  readonly type = SettingsActionType.SET_BELT;
  constructor(public payload: ValueDefaultPayload) {}
}

export class SetPipeAction implements Action {
  readonly type = SettingsActionType.SET_PIPE;
  constructor(public payload: ValueDefaultPayload) {}
}

export class SetCargoWagonAction implements Action {
  readonly type = SettingsActionType.SET_CARGO_WAGON;
  constructor(public payload: ValueDefaultPayload) {}
}

export class SetFluidWagonAction implements Action {
  readonly type = SettingsActionType.SET_FLUID_WAGON;
  constructor(public payload: ValueDefaultPayload) {}
}

export class SetFlowRateAction implements Action {
  readonly type = SettingsActionType.SET_FLOW_RATE;
  constructor(public payload: Rational) {}
}

export class SetInserterTargetAction implements Action {
  readonly type = SettingsActionType.SET_INSERTER_TARGET;
  constructor(public payload: InserterTarget) {}
}

export class SetMiningBonusAction implements Action {
  readonly type = SettingsActionType.SET_MINING_BONUS;
  constructor(public payload: Rational) {}
}

export class SetResearchBonusAction implements Action {
  readonly type = SettingsActionType.SET_RESEARCH_BONUS;
  constructor(public payload: Rational) {}
}

export class SetInserterCapacityAction implements Action {
  readonly type = SettingsActionType.SET_INSERTER_CAPACITY;
  constructor(public payload: InserterCapacity) {}
}

export class SetDisplayRateAction implements Action {
  readonly type = SettingsActionType.SET_DISPLAY_RATE;
  constructor(public payload: ValuePreviousPayload<DisplayRate>) {}
}

export class SetMaximizeTypeAction implements Action {
  readonly type = SettingsActionType.SET_MAXIMIZE_TYPE;
  constructor(public payload: MaximizeType) {}
}

export class SetCostsAction implements Action {
  readonly type = SettingsActionType.SET_COSTS;
  constructor(public payload: CostSettings) {}
}

export class ResetCostAction implements Action {
  readonly type = SettingsActionType.RESET_COSTS;
}

export type SettingsAction =
  | SetModAction
  | SetResearchedTechnologiesAction
  | SetNetProductionOnlyAction
  | SetSurplusMachinesOutputAction
  | SetPresetAction
  | SetBeaconReceiversAction
  | SetProliferatorSprayAction
  | SetBeltAction
  | SetPipeAction
  | SetCargoWagonAction
  | SetFluidWagonAction
  | SetFlowRateAction
  | SetInserterTargetAction
  | SetMiningBonusAction
  | SetResearchBonusAction
  | SetInserterCapacityAction
  | SetDisplayRateAction
  | SetMaximizeTypeAction
  | SetCostsAction
  | ResetCostAction;
