<template>
  <div>Войти в аккаунт</div>
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
  <p class="uk-text-small">Нет аккаунта? <a class="uk-text-small"
                @click="
                  $router.push('/register');
                  checker = !checker;
                "
                href="#"
                >Зарегистрироваться</a
              ></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p>
    <button class="uk-button uk-button-default" @click="register">Войти</button>
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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);

      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Неправильный email";
          break;
        case "auth/user-not-found":
          errMsg.value = "Пользователь не найдет";
          break;
        case "auth/wrong-password":
          errMsg.value = "Неправильный пароль";
          break;
        default:
          errMsg.value = "Email или пароль неверны";
          break;
      }
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