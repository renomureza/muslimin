import { useEffect, createContext, useContext, useReducer } from "react";
import { useLocation } from "../services/prayer";

const initialState = {
  isLoading: true,
  latitude: undefined,
  longitude: undefined,
  province: null,
  city: null,
  isRejected: false,
  error: {},
};

const GeolocationContext = createContext();

const geolocationReducer = (state, action) => {
  switch (action.type) {
    case "SET_COORDINATE":
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    case "SET_CITY_AND_PROVINCE":
      return {
        ...state,
        city: action.payload.city,
        province: action.payload.province,
      };
    case "ON_REJECTED":
      return {
        ...state,
        isRejected: true,
        error: {
          ...state.error,
          ...action.payload,
        },
      };
    default:
      throw new Error(
        `unknown action type ${action.type} on geolocationReducer`
      );
  }
};

const GeolocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(geolocationReducer, initialState);
  const locationQuery = useLocation(state.latitude, state.longitude, {
    enabled: !isNaN(state.latitude) && !isNaN(state.longitude),
    onSuccess: (data) => {
      dispatch({ type: "SET_CITY_AND_PROVINCE", payload: data });
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: "SET_COORDINATE",
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (err) => {
        dispatch({
          type: "ON_REJECTED",
          payload: {
            code: err.code,
            message: err.message,
          },
        });
      }
    );
  }, []);

  return (
    <GeolocationContext.Provider
      value={{
        state: { ...state, isLoading: locationQuery.isLoading },
        dispatch,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

const useGeolocation = () => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error(
      "useGeolocation must be used within a GeolocationContextProvider"
    );
  }
  return context;
};

const useLocationGeolocation = () => {
  const { state } = useGeolocation();
  return {
    latitude: state.latitude,
    longitude: state.longitude,
    city: state.city,
    province: state.province,
  };
};

export { GeolocationProvider, useGeolocation, useLocationGeolocation };
