import { BookmarkProvider } from "./Bookmark";
import { GeolocationProvider } from "./Geolocation";
import { PreferenceProvider } from "./Preference";

const ContextProviders = ({ children }) => {
  return (
    <BookmarkProvider>
      <PreferenceProvider>
        <GeolocationProvider>{children}</GeolocationProvider>
      </PreferenceProvider>
    </BookmarkProvider>
  );
};

export default ContextProviders;
