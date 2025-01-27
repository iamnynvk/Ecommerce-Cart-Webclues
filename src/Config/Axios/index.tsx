import { Alert } from "react-native";
import axiosInstance from "./axiosInstance";

/**
 * @param url will contain GET request url endpoints.
 * @returns if response got success when return resolve body otherwise error portion render it.
 */
export const makeAuthenticatedGetRequest = (url: string): any => {
  return async (dispatch: any, getState: any) => {
    const state: any = getState();
    console.log("Access-Token GET Request---->", url);
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, {
          headers: {
            Authorization:
              state?.user?.accessToken && "Bearer " + state?.user?.accessToken,
          },
        })
        .then(function (response) {
          const returnValue = {
            type: "success",
            data: response.data,
          };
          return resolve(returnValue);
        })
        .catch(async function (error) {
          if (error.response) {
            const status: any = error.response.status;
            const dataError: any = error.response.data;
            switch (status) {
              case 403:
                Alert.alert(
                  "Warning",
                  "You are not authorized to make this request."
                );
                return reject(error);
              case 404:
                Alert.alert(
                  "Warning",
                  "This data either does not exist or you are not authorized to view it."
                );
                return reject(error);
              case 500:
                Alert.alert(
                  "Warning",
                  "Something went wrong while attempting to process your request. Please try again later."
                );
                return reject(error);
              default:
                Alert.alert(
                  "Warning",
                  "Something went wrong. Please try again later."
                );
                return reject(error);
            }
          } else if (error.request) {
            Alert.alert(
              "Warning",
              "The server is not responding. Please check your internet connection or try again later."
            );
            return reject(error);
          } else {
            Alert.alert(
              "Warning",
              "Something went wrong while attempting to process your request. Please try again later."
            );
            return reject(error);
          }
        });
    });
  };
};
