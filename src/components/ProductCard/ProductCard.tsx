import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { COLORS } from "../../constants";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { IProductCardProps } from "../../types";

const ProductCard = ({
  data,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}: IProductCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Card.Content>
        <Text style={styles.title}>
          {data?.title.length > 20
            ? `${data?.title.substring(0, 20)}...`
            : data?.title}
        </Text>
        <Text style={styles.price}>${data.price.toFixed(2)}</Text>
      </Card.Content>

      {quantity === 0 ? (
        <Button
          mode="contained"
          onPress={onAdd}
          style={styles.addButton}
          labelStyle={{ color: COLORS.white }}
        >
          Add to cart
        </Button>
      ) : (
        <View style={styles.quantityContainer}>
          <IconButton
            icon="minus"
            size={20}
            onPress={onDecrement}
            iconColor={COLORS.white}
            style={{ backgroundColor: COLORS.primary }}
          />
          <Text style={styles.count}>{quantity}</Text>
          <IconButton
            icon="plus"
            size={20}
            onPress={onIncrement}
            iconColor={COLORS.white}
            style={{ backgroundColor: COLORS.secondary }}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: wp(2),
    borderRadius: wp(2),
    elevation: 3,
  },
  image: {
    height: wp(50),
  },
  title: {
    fontSize: wp(4),
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: wp(4),
    color: COLORS.danger,
  },
  addButton: {
    backgroundColor: COLORS.labelColor,
    margin: wp(2),
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: wp(2),
  },
  count: {
    marginHorizontal: wp(2),
    fontSize: wp(4),
    fontWeight: "bold",
  },
});

export default ProductCard;
