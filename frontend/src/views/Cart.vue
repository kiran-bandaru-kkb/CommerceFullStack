<template>
  <div>
    <h2>Your Cart</h2>

    <ul v-if="cartItems.length > 0">
      <li v-for="item in cartItems" :key="item.id">
        {{ item.product.name }} - Quantity: {{ item.quantity }}
        <button @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>
    <p v-else>No items in your cart.</p>

    <button @click="checkout" :disabled="loading || cartItems.length === 0">
      Checkout
    </button>

    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: [],
      error: '',
      loading: false,
    };
  },
  methods: {
    fetchCart() {
      const token = localStorage.getItem('access');
      axios.get('http://127.0.0.1:8000/api/carts/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        const carts = response.data;
        // Assume first cart is user's cart
        if (carts.length > 0) {
          // cart_items or items depending on serializer field name
          this.cartItems = carts[0].cart_items || carts[0].items || [];
        } else {
          this.cartItems = [];
        }
      })
      .catch(() => {
        this.error = 'Failed to load cart';
      });
    },
    removeItem(itemId) {
      const token = localStorage.getItem('access');
      axios.delete(`http://127.0.0.1:8000/api/cart_items/${itemId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        this.fetchCart();
      })
      .catch(() => {
        this.error = 'Failed to remove item';
      });
    },
    checkout() {
      this.error = '';
      this.loading = true;
      const token = localStorage.getItem('access');
      axios.post('http://127.0.0.1:8000/api/orders/place/', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        alert(response.data.message);
        this.cartItems = [];
        this.$router.push('/orders');
      })
      .catch(error => {
        this.error = error.response?.data?.error || 'Checkout failed';
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
  created() {
    this.fetchCart();
  }
};
</script>
