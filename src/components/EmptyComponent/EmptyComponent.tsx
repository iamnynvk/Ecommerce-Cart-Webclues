import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS, SCREEN_HEIGHT } from "../../constants/theme";
import { ActivityIndicator } from "react-native-paper";

export const EmptyComponent = ({ contentStyles, title, loading }: any) => {
  return (
    <View
      style={[
        styles.emptyContainer,
        { alignItems: "center", ...contentStyles },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Text style={styles.errorMessage}>
          {title || "Oops! It seems like there's nothing here right now."}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: SCREEN_HEIGHT / 2.5,
  },
  errorMessage: {
    color: COLORS.text,
    fontSize: wp(4),
    textAlign: "center",
  },
});
