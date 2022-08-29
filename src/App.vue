<template>
  <body>
    <div class="container">
      <div class="mobile-box">
        <div class="mobile-content">
          <div class="container-fluid screenBox">
            <NavBar></NavBar>
            <router-view> </router-view>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
