<template>
  <div>
    <v-row dense>
      <!-- Start/Stop Button -->
      <v-col cols="12" sm="6" class="mb-2">
        <v-btn
          block
          color="primary"
          @click="toggleRecording"
        >
          <v-icon left>{{ isRecording ? 'mdi-stop' : 'mdi-record-rec' }}</v-icon>
          {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
        </v-btn>
      </v-col>

      <!-- Pause/Resume Button -->
      <v-col cols="12" sm="6" class="mb-2" v-if="isRecording">
        <v-btn
          block
          color="orange"
          @click="togglePause"
        >
          <v-icon left>{{ isPaused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
          {{ isPaused ? 'Resume' : 'Pause' }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Timer -->
    <div v-if="timer > 0" class="mt-2 text-center font-weight-bold">
      ⏱ Recording Time: {{ formattedTime }}
    </div>
  </div>
</template>
