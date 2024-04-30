import { ServiceType } from "./updateSelectedServices";

export type ServiceYear = 2020 | 2021 | 2022;

export type PriceReturnType = { basePrice: number; finalPrice: number };

interface PriceSchedule {
  serviceYear: number;
  photography: number;
  videoRecording: number;
  blurayPackage: number;
  twoDayEvent: number;
  weddingSession: number;
  comboDiscount: number;
  weddingSessionDiscount: number;
  freeSessionSpecial: boolean;
}

const priceSchedules = [
  {
    serviceYear: 2020,
    photography: 1700,
    videoRecording: 1700,
    blurayPackage: 300,
    twoDayEvent: 400,
    weddingSession: 600,
    comboDiscount: 1200,
    weddingSessionDiscount: 300,
    freeSessionSpecial: false,
  },
  {
    serviceYear: 2021,
    photography: 1800,
    videoRecording: 1800,
    blurayPackage: 300,
    twoDayEvent: 400,
    weddingSession: 600,
    comboDiscount: 1300,
    weddingSessionDiscount: 300,
    freeSessionSpecial: false,
  },
  {
    serviceYear: 2022,
    photography: 1900,
    videoRecording: 1900,
    blurayPackage: 300,
    twoDayEvent: 400,
    weddingSession: 600,
    comboDiscount: 1300,
    weddingSessionDiscount: 300,
    freeSessionSpecial: true,
  },
];

const findPrice = (service: ServiceType, priceSchedule: PriceSchedule) => {
  switch (service) {
    case "Photography":
      return priceSchedule.photography;
    case "VideoRecording":
      return priceSchedule.videoRecording;
    case "WeddingSession":
      return priceSchedule.weddingSession;
    case "BlurayPackage":
      return priceSchedule.blurayPackage;
    case "TwoDayEvent":
      return priceSchedule.twoDayEvent;
    default:
      return 0;
  }
};

const isSelected = (
  serviceName: ServiceType,
  selectedServices: ServiceType[]
) => selectedServices.includes(serviceName);

const checkcomboDiscount = (
  selectedServices: ServiceType[],
  priceSchedule: PriceSchedule
) => {
  if (
    isSelected("Photography", selectedServices) === true &&
    isSelected("VideoRecording", selectedServices) === true
  ) {
    return priceSchedule.comboDiscount;
  } else {
    return 0;
  }
};

const checkWeddingSessionDiscount = (
  selectedServices: ServiceType[],
  priceSchedule: PriceSchedule
) => {
  if (isSelected("WeddingSession", selectedServices) === true) {
    if (
      isSelected("Photography", selectedServices) === true ||
      isSelected("VideoRecording", selectedServices) === true
    ) {
      if (
        priceSchedule.freeSessionSpecial === true &&
        isSelected("Photography", selectedServices) === true
      ) {
        return priceSchedule.weddingSession;
      } else {
        return priceSchedule.weddingSessionDiscount;
      }
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};



export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
): PriceReturnType => {
  const prices = priceSchedules.find(
    (priceSchedule) => priceSchedule.serviceYear === selectedYear
  );

  const calculateBasePrice = (
    selectedServices: ServiceType[],
    priceSchedule: PriceSchedule
  ) => {
    let total = 0;
    selectedServices.forEach((service) => {
      total += findPrice(service, priceSchedule);
    });
    return total;
  };

  const basePrice = calculateBasePrice(selectedServices, prices as PriceSchedule)

  const calculateFinalPrice = (
    selectedServices: ServiceType[],
    basePrice: number
  ) => {
    const combo = checkcomboDiscount(selectedServices, prices as PriceSchedule);

    const session = checkWeddingSessionDiscount(
      selectedServices,
      prices as PriceSchedule
    );

    const discount = combo + session;

    return basePrice - discount;
  };

  return {
    basePrice: basePrice,
    finalPrice: calculateFinalPrice(
      selectedServices,
      basePrice
    ),
  };
};
