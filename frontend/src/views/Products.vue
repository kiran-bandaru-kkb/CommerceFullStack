<template>
  <div>
    <h2>Products</h2>
    <ul>
      <li v-for="p in products" :key="p.id">
        {{ p.name }} - {{ p.price }}
        <button @click="addToCart(p.id)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [],
      cartId: null,
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('access')
      // Get products list
      let res = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      this.products = res.data

      // Get user's cart id
      const cartRes = await axios.get('http://127.0.0.1:8000/api/cart/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (cartRes.data.length > 0) {
        this.cartId = cartRes.data[0].id
      } else {
        // If user has no cart, create one
        const newCart = await axios.post('http://127.0.0.1:8000/api/cart/', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.cartId = newCart.data.id
      }
    } catch (error) {
      console.error('Error loading products or cart:', error)
    }
  },
  methods: {
    async addToCart(productId) {
      const token = localStorage.getItem('access')
      try {
        // Check if item already in cart
        const existing = await axios.get(`http://127.0.0.1:8000/api/cart_items/?cart=${this.cartId}&product=${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (existing.data.length > 0) {
          // Increment quantity
          const item = existing.data[0]
          await axios.patch(`http://127.0.0.1:8000/api/cart_items/${item.id}/`, {
            quantity: item.quantity + 1
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
        } else {
          // Add new item to cart
          await axios.post('http://127.0.0.1:8000/api/cart_items/', {
            cart: this.cartId,
            product: productId,
            quantity: 1
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
        }
        alert('Added to cart!')
        this.$router.push('/cart')  // Navigate to Cart page after adding
      } catch (err) {
        console.error('Failed to add to cart:', err)
        alert('Failed to add to cart')
      }
    }
  }
}
</script>
