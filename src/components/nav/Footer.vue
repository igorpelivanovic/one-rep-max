<script>
export default {
  name: 'Footer',
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <RouterLink to="/" class="footer-logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
        </RouterLink>
      </div>

      <div class="footer-right">
        <ul>
          <li><RouterLink to="/about">O nama</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
          <li><RouterLink to="/register">Registruj se</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 One Rep Max. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000000;
  color: #fff;
  padding: 40px 20px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-left {
  flex: 1;
}

.footer-logo {
  display: block;
}

.logo-img {
  width: 150px;
  height: auto;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
}

.footer-right ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: right;
}

.footer-right li {
  margin: 8px 0;
}

.footer-right a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
}

.footer-right a:hover {
  text-decoration: underline;
}

.social-icon {
  color: #fff;
  text-decoration: none;
}

.social-icon:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #ddd;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-left {
    margin-bottom: 20px;
    text-align: center;
  }

  .footer-right {
    text-align: center;
    align-items: center;
  }

  .footer-right ul {
    text-align: center;
  }

  .footer-right li {
    margin: 5px 0;
  }
}
</style>
