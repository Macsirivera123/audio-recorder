<template>
  <div>
    <v-row dense>
      <!-- Start/Stop Button -->
      <v-col cols="12" sm="6" class="mb-2">
        <v-btn block color="primary" @click="toggleRecording">
          <v-icon left>{{ isRecording ? 'mdi-stop' : 'mdi-record-rec' }}</v-icon>
          {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
        </v-btn>
      </v-col>

      <!-- Pause/Resume Button -->
      <v-col cols="12" sm="6" class="mb-2" v-if="isRecording">
        <v-btn block color="orange" @click="togglePause">
          <v-icon left>{{ isPaused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
          {{ isPaused ? 'Resume' : 'Pause' }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Timer + Blinking Indicator -->
    <div v-if="timer > 0" class="mt-2 text-center font-weight-bold">
      <span v-if="isRecording" class="blinking-dot"></span>
      ⏱ Recording Time: {{ formattedTime }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      isPaused: false,
      mediaRecorder: null,
      audioChunks: [],
      timer: 0,
      intervalId: null
    }
  },
  computed: {
    formattedTime() {
      const mins = Math.floor(this.timer / 60)
      const secs = this.timer % 60
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
  },
  methods: {
    async toggleRecording() {
      try {
        if (!this.isRecording) {
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
          this.timer = 0
          this.intervalId = setInterval(() => this.timer++, 1000)

          // Optional: Vibrate on mobile
          if (navigator.vibrate) navigator.vibrate(100)

        } else {
          this.mediaRecorder.stop()
          clearInterval(this.intervalId)
          this.isRecording = false
          this.isPaused = false

          if (navigator.vibrate) navigator.vibrate(50)
        }
      } catch (err) {
        alert('Microphone access failed or not allowed.')
        console.error('Recording Error:', err)
      }
    },
    togglePause() {
      if (!this.mediaRecorder) return

      if (this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.pause()
        clearInterval(this.intervalId)
        this.isPaused = true
      } else if (this.mediaRecorder.state === 'paused') {
        this.mediaRecorder.resume()
        this.intervalId = setInterval(() => this.timer++, 1000)
        this.isPaused = false
      }
    }
  }
}
</script>

<style scoped>
.blinking-dot {
  height: 12px;
  width: 12px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  animation: blink 1s infinite;
  vertical-align: middle;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
