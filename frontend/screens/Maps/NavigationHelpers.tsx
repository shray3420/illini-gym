import { Linking } from "react-native";

export const openMapsApp = (latitude: number, longitude: number) => {
  const destination = encodeURIComponent(`${latitude},${longitude}`);
  const url = `http://maps.google.com/maps?daddr=${destination}`;

  Linking.openURL(url).catch((err) =>
    console.error("An error occurred trying to open maps", err)
  );
};

export const openWebsite = (url: string) => {
  Linking.openURL(url).catch((err) =>
    console.error("An error occurred trying to open a website", err)
  );
};

export const makeCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  Linking.openURL(url).catch((err) =>
    console.error("An error occurred trying to call", err)
  );
};
