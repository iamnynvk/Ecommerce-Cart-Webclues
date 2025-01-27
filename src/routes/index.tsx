import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "../screens/Product";
import Cart from "../screens/Cart";

export type RootStackParamList = {
  Product: undefined;
  Cart: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ animation: "fade_from_bottom", presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
