<template>
  <v-container class="pa-4">
    <h2 class="text-h5 mb-4">🎙 Audio Recorder</h2>

    <!-- Recorder Component -->
    <custom-audio-recorder @recorded="onRecorded" />

    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
      {{ snackbar.message }}
      <v-btn text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-divider class="my-6" />

    <!-- Recording List -->
    <v-row v-if="recordings.length" dense>
      <v-col cols="12" v-for="(record, index) in recordings" :key="index">
        <v-card class="pa-3 mb-3">
          <v-row align="center">
            <!-- Audio Player -->
            <v-col cols="12" sm="6">
              <audio :src="record.url" controls class="w-100" />
            </v-col>

            <!-- Filename + Time -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="record.name"
                label="Filename"
                dense
                hide-details
              />
              <small class="grey--text">📅 {{ formatDate(record.createdAt) }}</small>
            </v-col>

            <!-- Buttons -->
            <v-col cols="12" class="d-flex justify-end">
              <a :href="record.url" :download="record.name">
                <v-btn icon color="green" class="mr-2">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </a>
              <v-btn icon color="red" @click="deleteRecording(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomAudioRecorder from '@/components/CustomAudioRecorder.vue'

export default {
  components: {
    CustomAudioRecorder
  },
  data() {
    return {
      recordings: [],
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      }
    }
  },
  methods: {
    onRecorded(blob) {
      const createdAt = new Date()
      const url = URL.createObjectURL(blob)
      const name = this.generateFilename(createdAt)
      this.recordings.push({ blob, url, name, createdAt })
      this.showSnackbar('Recording saved!')
    },
    deleteRecording(index) {
      URL.revokeObjectURL(this.recordings[index].url)
      this.recordings.splice(index, 1)
      this.showSnackbar('Recording deleted.', 'error')
    },
    formatDate(date) {
      const d = new Date(date)
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }
      return d.toLocaleString('en-US', options)
    },
    generateFilename(date) {
      const pad = n => String(n).padStart(2, '0')
      const yyyy = date.getFullYear()
      const mm = pad(date.getMonth() + 1)
      const dd = pad(date.getDate())
      const hh = pad(date.getHours())
      const min = pad(date.getMinutes())
      return `Recording_${yyyy}-${mm}-${dd}_${hh}-${min}.webm`
    },
    showSnackbar(message, color = 'success') {
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.show = true
    }
  }
}
</script>

<style scoped>
audio {
  width: 100%;
}
</style>
