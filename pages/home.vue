<template>
  <v-container class="pa-4">
    <!-- Centered Title -->
    <div class="text-center mb-6">
      <h2 class="text-h5 font-weight-bold">🎙 Audio Recorder</h2>
    </div>

    <!-- Recorder Component -->
    <custom-audio-recorder @recorded="onRecorded" />

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.color">
      {{ snackbar.message }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>

    <!-- Divider -->
    <v-divider class="my-6" />

    <!-- Recordings List -->
    <v-row v-if="recordings.length" dense>
      <v-col
        v-for="(record, index) in recordings"
        :key="index"
        cols="12"
        class="mb-4"
      >
        <v-card class="pa-3">
          <v-row align="center" no-gutters>
            <!-- Audio Player -->
            <v-col cols="12" sm="6">
              <audio :src="record.url" controls class="w-100" />
            </v-col>

            <!-- Filename + Timestamp -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="record.name"
                label="Filename"
                dense
                hide-details
                prepend-inner-icon="mdi-pencil"
              />
              <small class="grey--text">📅 {{ formatDate(record.createdAt) }}</small>
            </v-col>

            <!-- Action Buttons -->
            <v-col cols="12" class="d-flex justify-end">
              <a :href="record.url" :download="record.name">
                <v-btn icon color="green" class="mr-2" :title="`Download ${record.name}`">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </a>
              <v-btn icon color="red" @click="deleteRecording(index)" title="Delete">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- No recordings message -->
    <div v-else class="text-center grey--text mt-5">
      No recordings yet. Start by tapping the microphone!
    </div>
  </v-container>
</template>

<script>
import CustomAudioRecorder from '@/components/CustomAudioRecorder.vue'

export default {
  middleware: 'auth', // ensures user is logged in
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
      this.showSnackbar('🎉 Recording saved!')
    },
    deleteRecording(index) {
      URL.revokeObjectURL(this.recordings[index].url)
      this.recordings.splice(index, 1)
      this.showSnackbar('🗑 Recording deleted.', 'error')
    },
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    },
    generateFilename(date) {
      const pad = n => String(n).padStart(2, '0')
      return `Recording_${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}.webm`
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
