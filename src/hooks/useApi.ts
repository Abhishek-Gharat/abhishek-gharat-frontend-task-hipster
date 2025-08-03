import { useState, useEffect } from 'react';
import { Product } from '@/types/theme';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(url: string): UseApiState<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ data: null, loading: true, error: null });
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred'
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

// Utility function to normalize different API responses to our Product interface
const normalizeProduct = (product: any): Product => {
  // Handle DummyJSON format
  if (product.thumbnail) {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.thumbnail || product.images?.[0] || product.image,
      images: product.images,
      thumbnail: product.thumbnail,
      brand: product.brand,
      stock: product.stock,
      discountPercentage: product.discountPercentage,
      rating: {
        rate: product.rating || 4.5, // DummyJSON uses 'rating' directly
        count: product.stock || 100 // Use stock as count fallback
      }
    };
  }
  
  // Handle Platzi API format
  if (product.images && Array.isArray(product.images)) {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category?.name || product.category,
      image: product.images[0] || product.image,
      images: product.images,
      rating: {
        rate: 4.5, // Platzi doesn't provide ratings
        count: 100
      }
    };
  }
  
  // Handle FakeStore API format (existing)
  return product;
};

export const useProducts = () => {
  // DummyJSON provides better quality images and more detailed product data
  const apiResult = useApi<{ products: Product[] }>('https://dummyjson.com/products?limit=50');
  
  return {
    ...apiResult,
    data: apiResult.data?.products ? apiResult.data.products.map(normalizeProduct) : null
  };
};

// Alternative product APIs you can switch to:

// 1. Platzi Fake Store API - Good images, no rate limits
export const useProductsPlatzi = () => {
  const apiResult = useApi<Product[]>('https://api.escuelajs.co/api/v1/products');
  
  return {
    ...apiResult,
    data: apiResult.data ? apiResult.data.map(normalizeProduct) : null
  };
};

// 2. Original FakeStore API - Basic but reliable
export const useProductsFakeStore = () => {
  return useApi<Product[]>('https://fakestoreapi.com/products');
};

// 3. DummyJSON with specific category
export const useProductsByCategory = (category: string) => {
  const apiResult = useApi<{ products: Product[] }>(`https://dummyjson.com/products/category/${category}`);
  
  return {
    ...apiResult,
    data: apiResult.data?.products ? apiResult.data.products.map(normalizeProduct) : null
  };
};