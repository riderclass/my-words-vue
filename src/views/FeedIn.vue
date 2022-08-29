<template>
  <div class="uk-margin-medium-top">Мой аккаунт</div>
  <br />
  <div v-if="userData.displayName">
    Добро пожаловать {{ userData.displayName }}!
    <div>
      <img
        :src="userData.photoURL"
        class="uk-margin-medium-top avatar__image"
      />
    </div>
  </div>
  <div v-else>Привет незнакомец</div>
  <button
    class="uk-button uk-button-default uk-margin-medium-top"
    @click="
      $router.push('/');
      checker = !checker;
    "
  >
    Учить слова
  </button>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

let auth;
let userData = ref("пока ничего");

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userData.value = user;
    } else {
      console.log("nothing");
    }
  });
});
</script>

<style>
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
  width: 30%;
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