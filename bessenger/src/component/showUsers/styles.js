import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: color.SILVER,
    borderBottomWidth: 0,
    borderColor: color.SILVER,
    borderRadius: 30
  },
  cardItemStyle: {
    backgroundColor: color.BORDER_LIGHT_GREYCOLOR,
    borderRadius: 30
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: color.SILVER,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.PRIMARY,
  },
  thumbnailName: { fontSize: 30, color: color.WHITE, fontWeight: "bold" },
  profileName: { fontSize: 20, color: color.DARK_GRAY, fontWeight: "bold" },
  profileEmail: { fontSize: 12, color: color.DARK_GRAY }
});
