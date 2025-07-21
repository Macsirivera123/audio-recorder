<template>
  <div>
    <v-btn @click="toggleRecording" color="primary">
      <v-icon left>{{ isRecording ? 'mdi-stop' : 'mdi-record-rec' }}</v-icon>
      {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
    </v-btn>

    <v-btn
      v-if="isRecording"
      @click="togglePause"
      color="orange"
      class="ml-2"
    >
      <v-icon left>{{ isPaused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
      {{ isPaused ? 'Resume' : 'Pause' }}
    </v-btn>

    <div v-if="timer > 0" class="mt-2 font-weight-bold">
      Recording Time: {{ formattedTime }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaRecorder: null,
      audioChunks: [],
      isRecording: false,
      isPaused: false,
      timer: 0,
      intervalId: null
    }
  },
  computed: {
    formattedTime() {
      const min = String(Math.floor(this.timer / 60)).padStart(2, '0')
      const sec = String(this.timer % 60).padStart(2, '0')
      return `${min}:${sec}`
    }
  },
  methods: {
    async toggleRecording() {
      if (!this.isRecording) {
        // Start recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        this.mediaRecorder = new MediaRecorder(stream)

        this.audioChunks = []
        this.mediaRecorder.ondataavailable = e => {
          if (e.data.size > 0) this.audioChunks.push(e.data)
        }

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.audioChunks, { type: 'audio/webm' })
          this.$emit('recorded', blob)
        }

        this.mediaRecorder.start()
        this.isRecording = true
        this.isPaused = false
        this.timer = 0
        this.intervalId = setInterval(() => this.timer++, 1000)
      } else {
        // Stop recording
        this.mediaRecorder.stop()
        clearInterval(this.intervalId)
        this.isRecording = false
        this.isPaused = false
      }
    },
    togglePause() {
      if (this.isPaused) {
        this.mediaRecorder.resume()
        this.isPaused = false
        this.intervalId = setInterval(() => this.timer++, 1000)
      } else {
        this.mediaRecorder.pause()
        this.isPaused = true
        clearInterval(this.intervalId)
      }
    }
  }
}
</script>
