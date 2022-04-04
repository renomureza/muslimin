import { createContext, useReducer, useContext, useEffect } from "react";

const initialState = (typeof window !== "undefined" &&
  JSON.parse(localStorage.getItem("preference"))) || {
  isShownTafsir: true,
  isSimpleMode: false,
  isShownTranslation: true,
  mufassir: "kemenag",
  qari: "alafasy",
};

const actionTypes = {
  SET_MUFASSIR: "SET_MUFASSIR",
  SET_QARI: "SET_QARI",
  TOGGLE_TAFSIR: "TOGGLE_TAFSIR",
  TOGGLE_MODE: "TOGGLE_MODE",
  TOGGLE_TRANSLATION: "TOGGLE_TRANSLATION",
};

const PreferenceContext = createContext();

const preferenceReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_MUFASSIR:
      return {
        ...state,
        mufassir: action.payload,
      };
    case actionTypes.SET_QARI:
      return {
        ...state,
        qari: action.payload,
      };
    case actionTypes.TOGGLE_TAFSIR:
      return {
        ...state,
        isShownTafsir: !state.isShownTafsir,
      };
    case actionTypes.TOGGLE_MODE:
      return {
        ...state,
        isSimpleMode: !state.isSimpleMode,
      };
    case actionTypes.TOGGLE_TRANSLATION:
      return {
        ...state,
        isShownTranslation: !state.isShownTranslation,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const PreferenceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preferenceReducer, initialState);

  useEffect(() => {
    localStorage.setItem("preference", JSON.stringify(state));
  }, [state]);

  return (
    <PreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
};

const usePreferenceContext = () => {
  const contex = useContext(PreferenceContext);
  if (!contex) {
    throw new Error("usePreference must be used within a PreferencesProvider");
  }
  return contex;
};

const usePreference = () => {
  const { state, dispatch } = usePreferenceContext();

  const toggleMode = () => {
    dispatch({ type: actionTypes.TOGGLE_MODE });
  };

  const toggleShownTafsir = () => {
    dispatch({ type: actionTypes.TOGGLE_TAFSIR });
  };

  const toggleShownTranslation = () => {
    dispatch({ type: actionTypes.TOGGLE_TRANSLATION });
  };

  const setQari = (qari) => {
    dispatch({ type: actionTypes.SET_QARI, payload: qari });
  };

  const setMufassir = (mufassir) => {
    dispatch({ type: actionTypes.SET_MUFASSIR, payload: mufassir });
  };

  return {
    state,
    toggleMode,
    toggleShownTafsir,
    setQari,
    setMufassir,
    toggleShownTranslation,
  };
};

export { PreferenceProvider, usePreference };
