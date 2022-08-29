<template>
  <div>Создать аккаунт</div>
  <p>
    <input class="uk-input" type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input
      class="uk-input"
      type="password"
      placeholder="Password"
      v-model="password"
    />
  </p>
  <p>
    <button class="uk-button uk-button-default" @click="register">
      Зарегистрироваться
    </button>
  </p>
  <p>
    <button class="btn-google uk-button uk-button-default" @click="signInWithGoogle">
      Google
    </button>
  </p>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("удачно зареган");
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push("/feed");
    })
    .catch((error) => {});
};
</script>

<style>
</style>