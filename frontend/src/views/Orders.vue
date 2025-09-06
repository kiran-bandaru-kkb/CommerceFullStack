<template>
  <div>
    <h2>Your Orders</h2>
    <ul>
      <li v-for="order in orders" :key="order.id">
        Order #{{ order.id }} - Total: ${{ order.total_price }} - Status: {{ order.status }}
        <ul>
          <li v-for="item in order.order_items" :key="item.id">
            {{ item.product.name }} - Quantity: {{ item.quantity }} - Price: ${{ item.price }}
          </li>
        </ul>
      </li>
    </ul>

    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      error: ''
    };
  },
  methods: {
    fetchOrders() {
      axios.get('/api/orders/')
        .then(response => {
          this.orders = response.data;
        })
        .catch(() => {
          this.error = 'Failed to load orders';
        });
    }
  },
  created() {
    this.fetchOrders();
  }
};
</script>
