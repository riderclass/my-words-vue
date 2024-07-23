<template>
  <div>
    <div v-if="word.active">
      <div class="single-word-box">
        <div class="word-area">
          <p class="word-theme">{{ word.theme }}</p>
          <div className="imgBox">
            <div v-if="word.active">
              <img
                className="wordImage"
                :src="'/images/' + word.eng.toLowerCase() + '.jpg'"
              />
            </div>
          </div>

          <h3 class="main-word">{{ word.rus }}</h3>
        </div>
        <div
          v-if="!isShowWord && !isShowKeyboard && !isShowTest"
          class="btn-area-one"
        >
          <button @click="isShowKeyboard = true" class="btn-one btn-eff-one icon-btn">
            <i class="gg-keyboard"></i>
          </button>
          <button @click="isShowWord = true" class="btn-one btn-eff-one icon-btn">
            <i class="gg-eye"></i>
          </button>
          <button @click="isShowTest = true" class="btn-one btn-eff-one icon-btn">
            <i class="gg-layout-list"></i>
          </button>
        </div>

        <div v-else-if="isShowWord && !isShowKeyboard && !isShowTest">
          <hr class="uk-divider-icon" />

          <div class="word-base">
            <div class="word-col">
              <h3 class="main-word">{{ word.eng }}</h3>
              <p class="hide-trans">{{ word.trans }}</p>
            </div>

            <div class="sound-box">
              <form @submit.prevent="playWord">
                <button type="submit" class="btn btn-success sound-btn">
                  <i class="gg-play-button"></i>
                </button>
              </form>
            </div>
          </div>

          <p class="hide-text-head">Пример:</p>

          <div class="word-base-example">
            <div>
              <p class="hide-text-example">{{ word.example }}</p>
            </div>

            <div>
              <form @submit.prevent="playExample">
                <button type="submit" class="btn btn-success sound-btn-example">
                  <i class="gg-play-button"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div v-else-if="!isShowWord && isShowKeyboard && !isShowTest">
          <hr class="uk-divider-icon" />
          <p class="p-attempt">Попытка: {{ word.repeat }}/2</p>
          <div class="inputbox">
            <input
              v-focus
              @keyup.enter="sendWord"
              v-model.trim="userAnswer"
              class="uk-input"
              placeholder="Пишите здесь.."
            />
            <button
              @click="sendWord"
              class="uk-button uk-button-default my-btn"
            >
              проверить
            </button>
          </div>
        </div>

        <div v-else-if="!isShowWord && !isShowKeyboard && isShowTest">
          <hr class="uk-divider-icon" />
          <p>Выберите ответ</p>
          <div
            class="uk-margin uk-grid-small uk-child-width-auto uk-grid"
            v-for="item in this.checkData"
            :key="item.id"
          >
            <!-- <input class="uk-checkbox" type="checkbox" /> {{ item }} -->
            <label
              ><input
                :value="item"
                v-model="flagCheck"
                class="uk-radio"
                type="radio"
              />
              {{ item }}</label
            >
          </div>
          <button
            @click="sendTest"
            class="uk-button uk-button-primary uk-button-small"
          >
            проверить
          </button>
        </div>
      </div>

      <div class="btn-area-two">
        <button class="btn-two btn-eff-two" @click="$emit('remove', word)">
          Я вспомнил<br />это слово
        </button>
        <hr class="uk-divider-vertical" />

        <button
          @click="
            $emit('repeat', word),
              (isShowTest = false),
              (isShowWord = false),
              (isShowKeyboard = false)
          "
          class="btn-two-2 btn-eff-two"
        >
          Я не вспомнил<br />это слово
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: {
      type: Object,
      required: true,
    },
    testData: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      wordEnglish: this.word.eng,
      synth: window.speechSynthesis,
      voiceList: [],
      greetingSpeech: new window.SpeechSynthesisUtterance(),
      isShowWord: false,
      isShowTest: false,
      isShowKeyboard: false,
      userAnswer: "",
      receivedWords: [],
      flagCheck: "",
      checkData: this.wordExist(this.receiveData(this.testData), this.word.eng),
    };
  },

  mounted() {
    this.voiceList = this.synth.getVoices();

    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices();
    };
  },

  methods: {
    playWord() {
      this.voiceList = this.synth.getVoices();
      this.greetingSpeech.text = this.wordEnglish;
      this.greetingSpeech.lang='en-US';
      // this.greetingSpeech.voice = this.voiceList[7];
      this.synth.speak(this.greetingSpeech);
    },

    playExample() {
      this.voiceList = this.synth.getVoices();
      this.greetingSpeech.text = this.word.example;
      this.greetingSpeech.lang='en-US';
      // this.greetingSpeech.voice = this.voiceList[7];
      this.synth.speak(this.greetingSpeech);
    },

    sendWord() {
      if (this.word.repeat === 1) {
        this.isShowKeyboard = false;
      }
      this.$emit("send-word", this.userAnswer, this.word, this.isShowKeyboard);
      this.userAnswer = "";
    },

    sendTest() {
      if (this.word.repeat === 1) {
        this.isShowTest = false;
      }
      this.$emit("send-test", this.flagCheck, this.word);
    },

    shuffleArr(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
      }
    },
    wordExist(data, wordActive) {
      let changes = [];
      let answer = data.indexOf(wordActive);
      if (answer >= 0) {
        changes = data;
        return changes;
      } else {
        changes = data.concat(wordActive);
        changes = changes.slice(1, 4);
        this.shuffleArr(changes);
        return changes;
      }
    },

    receiveData(data) {
      return data;
    },
  },

  watch: {
    wordEnglish: function () {
      this.receivedWords = this.receiveData(this.testData);
    },
  },
};
</script>
<style scoped>
.gg-layout-list {
  transform: scale(var(--ggs, 1));
}

.gg-layout-list,
.gg-layout-list::after,
.gg-layout-list::before {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 10px;
  height: 2px;
  border-left: 6px double;
  border-right: 4px solid;
  margin: 0 auto;
}

.gg-layout-list::after,
.gg-layout-list::before {
  content: "";
  position: absolute;
  left: -6px;
}

.gg-layout-list::after {
  bottom: 4px;
}

.gg-layout-list::before {
  top: 4px;
}

.gg-eye {
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 24px;
  height: 18px;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 auto;
}

.gg-eye::after,
.gg-eye::before {
  content: "";
  display: block;
  border-radius: 100px;
  position: absolute;
  box-sizing: border-box;
}

.gg-eye::after {
  top: 2px;
  box-shadow: inset 0 -8px 0 2px, inset 0 0 0 2px;
  width: 24px;
  height: 24px;
}

.gg-eye::before {
  width: 8px;
  height: 8px;
  border: 2px solid;
  bottom: 4px;
  left: 8px;
}

.gg-keyboard {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 18px;
  height: 18px;
  border: 2px solid;
  border-radius: 3px;
  margin: 0 auto;
}

.gg-keyboard::after,
.gg-keyboard::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  height: 2px;
  border-radius: 4px;
  background: currentColor;
}

.gg-keyboard::before {
  top: 2px;
  box-shadow: 4px 0 0, 8px 0 0, 0 4px 0, 4px 4px 0, 8px 4px 0;
  width: 2px;
  left: 2px;
}

.gg-keyboard::after {
  width: 8px;
  bottom: 2px;
  left: 3px;
}

.gg-play-button {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  margin: 0 auto;
}

.gg-play-button::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 0;
  height: 10px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid;
  top: 6px;
  left: 9px;
}

.hide-text-head {
  text-align: left;
  margin-left: 20px;
}

.hide-text-example {
  text-align: left;
  margin-left: 20px;
}

.hide-trans {
  text-align: left;
  margin-left: 20px;
}

.btn-area-one {
  display: flex;
  flex-direction: row;
}

.my-btn {
  float: left;
  margin-top: 20px;
}
.word-theme {
  text-align: left;
  margin: 20px 0 0px 20px;
  text-transform: lowercase;
  font-size: 11px;
  color: #979797;
}
</style>