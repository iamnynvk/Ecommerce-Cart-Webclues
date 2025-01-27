import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants";
import AppHeader from "../components/Header/AppHeader";
import { makeAuthenticatedGetRequest } from "../Config/Axios";
import { EmptyComponent } from "../components/EmptyComponent/EmptyComponent";
import ProductCard from "../components/ProductCard/ProductCard";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../slices/cartSlice";
import Checkout from "../components/Checkout/Checkout";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { ICartState, IProduct } from "../types";

const Product = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: { cart: ICartState }) => state.cart);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductList = async () => {
    try {
      const { data }: { data: IProduct[] } = await dispatch(
        makeAuthenticatedGetRequest("products")
      );
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log("Error in getting product list", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = products.filter((product: IProduct) =>
        product.title?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    getProductList();
  };

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  const handleIncrement = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrement = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const _renderProductList = ({ item }: { item: IProduct }) => {
    return (
      <ProductCard
        data={item}
        quantity={
          cart.find((product: IProduct) => product.id === item.id)?.quantity ||
          0
        }
        onAdd={() => handleAddToCart(item)}
        onIncrement={() => handleIncrement(item.id)}
        onDecrement={() => handleDecrement(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <AppHeader title={"Products"} isMenu={true} />

      <Searchbar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ margin: 10, borderRadius: 10, backgroundColor: COLORS.white }}
      />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={_renderProductList}
        keyExtractor={(item, key) => `${key}`}
        ListEmptyComponent={<EmptyComponent loading={isLoading} />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <Checkout />
    </SafeAreaView>
  );
};

export default Product;
