<template>
  <div>
    <div v-if="words.length > 0">
      <transition-group name="list" tag="p">
        <SingleWord
          v-for="word in words"
          :word="word"
          :key="word.id"
          :testData="getWords(words)"
          @remove="$emit('remove', word)"
          @repeat="$emit('repeat', word)"
          @send-word="sendParent"
          @send-test="sendParentTest"
        />
      </transition-group>
    </div>

    <div v-else>
      <br />
      <div className="imgBox" style="margin: 0 auto !important">
        <img className="wordImage" src="/images/empty.jpg" />
        <p>Слов больше нет..</p>
        Попробуйте другую тему:
        <br /><br />
        <button @click="changeTheme" class="uk-button uk-button-default">
          Сменить тему
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SingleWord from "@/components/SingleWord.vue";
export default {
  components: { SingleWord },
  methods: {
    sendParent(value_from_child1, value_from_child2) {
      this.$emit("send-parent", value_from_child1, value_from_child2);
    },

    sendParentTest(value_from_child1, value_from_child2) {
      this.$emit("send-parent-test", value_from_child1, value_from_child2);
    },

    changeTheme() {
      this.$emit("change-theme");
    },

    shuffleArr(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
      }
    },
    getWords(data) {
      let values = data.map(function (o) {
        return o.eng;
      });
      this.shuffleArr(values);
      values = values.slice(0, 3);
      return values;
    },
  },
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  computed: {},

  data() {
    return {
      limit: 1,
      answerWord: "",
    };
  },
};
</script>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(-30px);
}
</style>