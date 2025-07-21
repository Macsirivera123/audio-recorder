<template>
  <v-container class="pa-6">
    <h2 class="text-h5 mb-4">🎙 Custom Audio Recorder</h2>

    <!-- Custom recorder -->
    <custom-audio-recorder @recorded="onRecorded" />

    <v-divider class="my-6" />

    <!-- List of recordings -->
    <v-row
      v-for="(record, index) in recordings"
      :key="index"
      class="align-center mb-4"
    >
      <v-col cols="6">
        <audio :src="record.url" controls></audio>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="record.name"
          label="Filename"
          dense
          hide-details
        />
      </v-col>

      <v-col cols="3" class="text-right">
        <a :href="record.url" :download="record.name || `recording-${index + 1}.webm`">
          <v-btn icon color="green">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </a>
        <v-btn icon color="red" @click="deleteRecording(index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
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
      recordings: []
    }
  },
  methods: {
    onRecorded(blob) {
      const url = URL.createObjectURL(blob)
      this.recordings.push({ blob, url, name: '' })
    },
    deleteRecording(index) {
      URL.revokeObjectURL(this.recordings[index].url)
      this.recordings.splice(index, 1)
    }
  }
}
</script>
