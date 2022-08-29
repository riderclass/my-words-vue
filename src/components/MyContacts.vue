<template>
  <div>
    <br /><br />

    <!-- <div class="uk-card uk-card-default">
            <div class="uk-card-media-top"> -->
    <div class="avatar">
      <img src="/images/avat.jpg" class="avatar__image" />
    </div>
  </div>
  <div class="uk-card-body">
    <h3 class="uk-card-title">Vladimir Repin</h3>
    <p>Frontend developer. JavaScript and Vue 3 creator.</p>

    <a
      href="tel:+79643758003"
      class="uk-icon-button uk-margin-small-right"
      uk-icon="phone"
    ></a>
    <a
      href="https://wa.me/79643758003"
      class="uk-icon-button uk-margin-small-right"
      uk-icon="whatsapp"
    ></a>
    <a href="mailto:vladimirrepin.IT@gmail.com" class="uk-icon-button" uk-icon="mail"></a>
  </div>
  <!-- </div>


    </div> -->
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
/*
 * MAIN CONTENT
 */
.avatar {
  border: 5px solid #ffffff;
  box-sizing: border-box;
  height: 200px;
  border-radius: 50%;
  position: relative;
  width: 200px;
  margin: 0 auto;
}
.avatar__image {
  width: 100%;
  border-radius: 50%;
}
.avatar::before,
.avatar::after {
  border: 5px solid transparent;
  border-radius: 50%;
  border-top: 5px solid #00bcd4;
  content: "";
  display: block;
  height: calc(100% + 10px);
  left: 50%;
  width: calc(100% + 10px);
  position: absolute;
}
.avatar::before {
  top: -10px;
  transform: translateX(-50%);
}
.avatar::after {
  bottom: -10px;
  transform: translateX(-50%) rotate(180deg);
}
</style>