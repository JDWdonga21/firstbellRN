import { Platform } from "react-native";

export const SHADOW_MAIN_HOME_POPUP = {
  ...(Platform.OS === 'ios' ?
      {
        shadowColor: '#4d4d4d',
        shadowOffset: { width: 2, height: 4, },
        shadowOpacity: 0.3,
        shadowRadius: 4
      }
      :
      {
        elevation: 6,
      }
  ),
};