export interface IHeaderProps {
  isBack?: boolean;
  isLogo?: boolean;
  isClose?: boolean;
  isAction?: boolean;
  title?: string;
  onClose?: () => {};
  onAction?: () => {};
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICartState {
  cart: ICartItem[];
  totalPrice: number;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  cart: CartItem[];
}

export interface IProductCardProps {
  data: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}
