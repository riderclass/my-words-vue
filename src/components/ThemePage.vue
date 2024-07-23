<template>
  <div id="themeBox">
    <p class="p-repeated">Повторили: {{ userScore }}/{{ lineLong }}</p>
    <div className="lineZone">
      <div class="linePart" v-for="f in lineLong" :key="f"></div>
    </div>
    <word-chunk
      :words="myData"
      @remove="rememberWord"
      @repeat="repeatWord"
      @send-parent="checkAnn"
      @send-parent-test="checkAnn"
      @change-theme="setTheme"
    ></word-chunk>
  </div>
</template>

<script>
import WordChunk from "@/components/WordChunk";
import axios from "axios";

export default {
  components: { WordChunk },
  data() {
    return {
      myData: [],
      theme: "animals",
      lineLong: 0,
      userScore: 0,
    };
  },

  methods: {
    rememberWord(word) {
      this.addColor();
      this.myData = this.myData.filter((p) => p.id !== word.id);
      word.active = false;
      if (this.myData.length > 0) {
        this.myData[0].active = true;
      } else {
        let audioNowords = new Audio('/sounds/no-words.wav');
        audioNowords.play();
      }
      let audioCorrect = new Audio('/sounds/correct.wav');
      audioCorrect.play();
      this.userScore++;
    },

    repeatWord(word) {
      this.myData = this.myData.filter((p) => p.id !== word.id);
      word.active = false;
      this.myData.push(word);
      let audioNotcorrect = new Audio('/sounds/not-correct.mp3');
      audioNotcorrect.play();
      if (this.myData.length > 0) {
        this.myData[0].active = true;
      }
    },

    setTheme() {
      if (this.theme === "animals") {
        this.theme = "fruits";
      } else if (this.theme === "fruits") {
        this.theme = "animals";
      }
      this.userScore = 0;
      this.clearLine();
      this.fetchPosts();
    },

    addColor() {
      let chunks = document.querySelectorAll(".linePart");
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i].className === "linePart") {
          return (chunks[i].className = "correctAnn");
        }
      }
    },

    clearLine() {
      let chunks = document.querySelectorAll(".correctAnn");
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i].className === "correctAnn") {
          chunks[i].className = "linePart";
        }
      }
    },

    check(answer) {
      let thePart = answer.substr(0, 4);
      let aPart = answer.substr(0, 2);
      if (thePart === "the ") {
        answer = answer.substr(-(answer.length - thePart.length));
      } else if (aPart === "a ") {
        answer = answer.substr(-(answer.length - aPart.length));
      }
      return answer;
    },

    checkAnn(value1, value2) {
      let myAnn = value1.toLowerCase();
      if (myAnn === "") {
        alert("Введите ваш ответ!");
      }

      myAnn = this.check(myAnn);
      let rightAnn = value2.eng.toLowerCase();

      if (myAnn === rightAnn && value2.repeat === 0) {
        alert("Верно!");
        this.rememberWord(value2);
      } else if (myAnn !== "" && myAnn !== rightAnn && value2.repeat === 0) {
        alert("Неверно, будет вторая попытка");
        value2.repeat = 1;
      } else if (myAnn === rightAnn && value2.repeat !== 0) {
        alert("Наконец-то!");
        this.rememberWord(value2);
      } else if (myAnn !== rightAnn && value2.repeat !== 0) {
        alert("Неверно второй раз! Вернемся позже");
        value2.repeat = 0;
        this.repeatWord(value2);
      }
    },

    async fetchPosts() {
      try {
        const response = await axios.get(this.theme + ".json", {
          params: {
            //  _page: this.page,
            //  _limit: this.limit
          },
        });

        this.myData = [...this.myData, ...response.data];
        this.lineLong = this.myData.length;
      } catch (e) {
        alert("ошибка");
      }
    },
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>