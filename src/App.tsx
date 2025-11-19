import React, { useEffect } from 'react';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Header from "./components/Header/Header";
import { Product } from './types/types';
import CartPopup from './components/CartPopup/CartPopup';
import { useAppSelector } from './redux/hooks/useAppSelector';
import { useAppDispatch } from './redux/hooks/useAppDispatch';
import { fetchProducts, setLoading  } from './redux/slices/productsSlice';
import { addToCart, updateQuantity, toggleCart, closeCart } from './redux/slices/cartSlice';
import { selectProducts, selectProductsLoading } from './redux/selectors/productsSelectors';
import { selectCartItems, selectCartOpen } from './redux/selectors/cartSelectors';
import './App.css';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    // Используем селекторы
    const products = useAppSelector(selectProducts);
    const loading = useAppSelector(selectProductsLoading);
    const cartItems = useAppSelector(selectCartItems);
    const isCartOpen = useAppSelector(selectCartOpen);

    useEffect(() => {
        dispatch(setLoading(true));

        // имитация загрузки для теста лоадера
        const timer = setTimeout(() => {
            dispatch(fetchProducts());
        }, 3000);

        // Очистка таймера при размонтировании
        return () => clearTimeout(timer);
    }, [dispatch]);

    // добавление товара в корзину
    const handleAddToCart = (product: Product, quantity: number = 1) => {
        dispatch(addToCart({ product, quantity }));
    };

    // изменение количества товара (через степпер)
    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    // toggle (открыть корзину/закрыть корзину)
    const handleCartClick = () => {
        dispatch(toggleCart());
    };

    // закрыть корзину
    const handleCloseCart = () => {
        dispatch(closeCart());
    };

    // общее количество товаров в корзине
    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Header
                cartItemsCount={totalItemsCount}
                onCartClick={handleCartClick}
            />
            <div>
            {/* Заголовок Catalog */}
            <div
                style={{
                    position: 'absolute',
                    top: '119px',
                    left: '80px',
                    width: '121px',
                    height: '40px',
                    textAlign: 'left',
                }}
            >
                <h1
                    style={{
                        fontSize: '32px',
                        fontWeight: 600,
                        margin: 0,
                        lineHeight: '40px',
                        letterSpacing: '0%',
                    }}
                >
                    Catalog
                </h1>
            </div>

            {/* Сетка товаров */}
            <ProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                loading={loading}
            />
            </div>

            {/* Popup корзины со степпером */}
            <CartPopup
                cartItems={cartItems}
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                onUpdateQuantity={handleUpdateQuantity}
            />
        </div>
    );
};

export default App;