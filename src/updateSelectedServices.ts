export type ServiceType = "Photography"
  | "VideoRecording"
  | "BlurayPackage"
  | "TwoDayEvent"
  | "WeddingSession";

export type PrimaryServiceType = "Photography"
  | "VideoRecording"
  | "WeddingSession";

export type VideoRecordingAddonType = "TwoDayEvent" | "BlurayPackage";

export type PhotographyAddonType = "TwoDayEvent";

export type ServiceActionType = "Select" | "Deselect";

interface IServiceAction {
  type: ServiceActionType;
  service: ServiceType;
}

const isPrimaryService = (
  service: ServiceType
): service is PrimaryServiceType => {
  return ["Photography", "VideoRecording", "WeddingSession"].indexOf(service) !== -1;
};

const isVideoRecordingAddon = (
  service: ServiceType
): service is VideoRecordingAddonType => {
  return ["TwoDayEvent", "BlurayPackage"].indexOf(service) !== -1;
};

const isPhotographyAddon = (
  service: ServiceType
): service is PhotographyAddonType => {
  return ["TwoDayEvent"].indexOf(service) !== -1;
};

const isAlreadySelected = (state: ServiceType[], service: ServiceType) => {
  return state.includes(service);
};

const isSelectablePrimary = (state: ServiceType[], service: ServiceType) => {
  if (
    isPrimaryService(service) === true &&
    isAlreadySelected(state, service) === false
  ) {
    return true;
  } else {
    return false;
  }
};

const isSelectableAddon = (state: ServiceType[], service: ServiceType) => {
  if (
    isPrimaryService(service) === false &&
    isAlreadySelected(state, service) === false
  ) {
    if (
      isVideoRecordingAddon(service) === true &&
      isAlreadySelected(state, "VideoRecording") === true
    ) {
      return true;
    } else if (
      isPhotographyAddon(service) === true &&
      isAlreadySelected(state, "Photography") === true
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const updateSelectedServices = (
  state: ServiceType[],
  action: IServiceAction
): ServiceType[] => {
  switch (action.type) {
    case "Select":
      if (isSelectablePrimary(state, action.service) === true || isSelectableAddon(state, action.service) === true) {
        return [...state, action.service];
      }else{
        return state;
      }
    case "Deselect":
      return [...state.filter((service) => service !== action.service)];
    default:
      return state;
  }
};
