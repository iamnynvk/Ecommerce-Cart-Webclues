import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants";
import { clearCart } from "../../slices/cartSlice";
import { ICartState } from "../../types";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: { cart: ICartState }) => state.cart);
  const { totalPrice } = useSelector((state: any) => state.cart);

  if (cart.length === 0) return null;

  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.checkoutButton}
        onPress={() =>
          Alert.alert("Order Placed!", "Order placed successfully", [
            {
              text: "Ok",
              onPress: () => dispatch(clearCart()),
            },
          ])
        }
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutContainer: {
    backgroundColor: COLORS.white,
    padding: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: COLORS.text,
    marginRight: 8,
  },
  totalPrice: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: COLORS.success,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(100),
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default Checkout;
