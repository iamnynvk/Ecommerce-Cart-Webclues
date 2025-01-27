import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Appbar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";

const AppHeader = ({ title, isBack = false, isMenu = false }: any) => {
  const navigation: any = useNavigation();
  const totalQuantity = useSelector((state: any) =>
    state.cart.cart.reduce((sum: any, item: any) => sum + item.quantity, 0)
  );

  return (
    <Appbar.Header>
      {isBack && <Appbar.BackAction onPress={() => navigation?.goBack()} />}
      <Appbar.Content title={title} />
      {isMenu && (
        <View>
          <Appbar.Action
            icon="cart-variant"
            onPress={() => navigation.navigate("Cart")}
          />
          {totalQuantity > 0 && (
            <Badge style={{ position: "absolute", right: 2 }}>
              {totalQuantity}
            </Badge>
          )}
        </View>
      )}
    </Appbar.Header>
  );
};

export default AppHeader;
