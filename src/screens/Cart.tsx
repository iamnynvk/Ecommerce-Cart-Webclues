import React from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../constants";
import { useSelector } from "react-redux";
import CartCard from "../components/CartCard/CartCard";
import Checkout from "../components/Checkout/Checkout";
import AppHeader from "../components/Header/AppHeader";
import { EmptyComponent } from "../components/EmptyComponent/EmptyComponent";
import { CartState } from "../types";

const Cart = () => {
  const { cart }: { cart: CartState[] } = useSelector(
    (state: any) => state.cart
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader isBack={true} title={"Cart"} />

      {/* Cart Item List */}
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartCard item={item} />}
        keyExtractor={(item: any) => `${item.id}`}
        ListEmptyComponent={<EmptyComponent title={"Cart is empty!"} />}
      />
      <Checkout />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
