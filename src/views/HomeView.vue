<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="home-content">
    <div class="hero-section">
      <h1 class="hero-title">{{ t('slogan_part1') }}</h1>
      <h2 class="hero-subtitle">{{ t('slogan_part2') }}</h2>
        <div class="intro-text">
        <p>{{ t('home.welcome') }}</p>
        <p>{{ t('home.explore') }}</p>
      </div>
    </div>

    <section class="features">      
      <router-link to="/chat" class="nav-item">
        <div class="feature-card">
          <h3>💬 {{ t('home.chat_title') }}</h3>
          <p>{{ t('home.chat_description') }}</p>
        </div>
      </router-link>
      
      <a href="tel:+33652152656" class="nav-item">
        <div class="feature-card">
          <h3>📞 {{ t('home.contact_title') }}</h3>
          <p>{{ t('home.contact_description') }}</p>
        </div>
      </a>
      
      <a href="https://open.spotify.com/intl-fr/artist/3CgZJvLenXaHb7bwqu6HQa" target="_blank" class="nav-item">
        <div class="feature-card">
          <h3>🎵 {{ t('home.music_title') }}</h3>
          <p>{{ t('home.music_description') }}</p>
        </div>
      </a>
      
      <a href="https://www.linkedin.com/in/dorian-blanchard-hedocode" target="_blank" class="nav-item">
        <div class="feature-card">
          <h3>💼 {{ t('home.professional_title') }}</h3>
          <p>{{ t('home.professional_description') }}</p>
        </div>
      </a>

    </section>
  </main>
</template>

<style lang="scss" scoped>
.home-content {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 160px);
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  
  .hero-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #007bff, #6f42c1, #e83e8c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
    font-weight: 300;
  }
  
  .intro-text {
    max-width: 600px;
    margin: 0 auto;
    
    p {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: #555;
      line-height: 1.6;
    }
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  a {
    text-decoration: none;
  }
}

.feature-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #666;
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
  .home-content {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.2rem !important;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
}
</style>
