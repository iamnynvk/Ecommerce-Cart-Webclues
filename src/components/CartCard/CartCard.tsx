import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../slices/cartSlice";
import { COLORS } from "../../constants";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CartCard = ({ item }: any) => {
  const dispatch = useDispatch();

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Card.Cover
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.details}>
          <Text style={styles.title}>
            {item.title.length > 20
              ? `${item.title.substring(0, 20)}...`
              : item.title}
          </Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => dispatch(decreaseQuantity(item.id))}
              iconColor={COLORS.white}
              style={{ backgroundColor: COLORS.danger }}
            />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => dispatch(increaseQuantity(item.id))}
              iconColor={COLORS.white}
              style={{ backgroundColor: "green" }}
            />
          </View>

          {/* Remove Button */}
          <TouchableOpacity
            onPress={() => dispatch(removeFromCart(item.id))}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    margin: wp(2.5),
    borderRadius: wp(3),
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(3),
  },
  image: {
    width: wp(20),
    height: wp(20),
  },
  details: {
    flex: 1,
    marginLeft: wp(4),
  },
  title: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: COLORS.text,
  },
  price: {
    fontSize: wp(4),
    color: COLORS.primary,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: wp(4),
    fontSize: wp(5),
    fontWeight: "bold",
  },
  removeButton: {
    marginTop: wp(1),
  },
  removeText: {
    color: COLORS.danger,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
