import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Track } from '../../app/types';
import { AppThunk } from '../../app/store';
import { uploadFile } from '../../utils/uploadfile';
import { getLyrics, searchTracks } from '../../utils/musixmatchAPI';
import { api } from '../../utils/api';

interface TrackState {
  viewedTrack: Track | null;
  allTrack: Track[];
  newUpload: Track[];
  trackByUser: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: TrackState = {
  viewedTrack: null,
  allTrack: [],
  newUpload: [],
  trackByUser: [],
  loading: true,
  error: null,
};

export const fetchTrackById = createAsyncThunk(
  'track/fetchTrackAsync',
  async (id: string) => {
    try {
      const response = await api.get(`/track/${id}`);
      const trackData = response.data.track[0];
      const trackFromThirdPartyAPI = await searchTracks(
        trackData.title,
        trackData.artist
      );
      const lyrics = await getLyrics(trackFromThirdPartyAPI);
      var transformedTrack: Track = {
        id: trackData._id,
        title: trackData.title,
        artist: trackData.artist,
        thumbnail: trackData.image,
        uploader: trackData.userId,
        audio: trackData.audio,
        lyrics: lyrics,
        duration: trackData.duration,
        privacy: trackData.isPublic,
        banned: trackData.isBanned,
        publicDate: trackData.publicDate,
      };
      return transformedTrack;
    } catch (error: any) {
      throw Error(`Error: ${error.response.data.error}`);
    }
  }
);
export const getUserUpload =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.get(`/track/alltrack/user/${id}`);
      const data = response.data.allTracks;
      const transformedData: Track[] = [];
      data.forEach((track: any) => {
        var transformedTrack: Track = {
          id: track._id,
          title: track.title,
          artist: track.artist,
          thumbnail: track.image,
          uploader: track.userId,
          audio: track.audio,
          lyrics: track.lyrics,
          duration: track.duration,
          privacy: track.isPublic,
          banned: track.isBanned,
          publicDate: track.publicDate,
        };
        transformedData.push(transformedTrack);
      });
      dispatch(getUserUploadSuccess(transformedData));
    } catch (e: any) {
      dispatch(getUserUploadFailed(e.message || 'An error occured!'));
    }
  };
export const getNewUpload = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get('/track');
    const data = response.data.allTracks;
    const transformedData: Track[] = [];
    data.forEach((track: any) => {
      var transformedTrack: Track = {
        id: track._id,
        title: track.title,
        artist: track.artist,
        thumbnail: track.image,
        uploader: track.userId,
        audio: track.audio,
        lyrics: track.lyrics,
        duration: track.duration,
        privacy: track.isPublic,
        banned: track.isBanned,
        publicDate: track.publicDate,
      };
      transformedData.push(transformedTrack);
    });
    dispatch(getNewUploadSuccess(transformedData));
  } catch (e: any) {
    dispatch(getNewUploadFailed(e.message || 'An error occured!'));
  }
};
export const uploadTrackAsync = createAsyncThunk(
  'track/uploadTrackAsync',
  async (track: any) => {
    try {
      const { title, artist, duration, isPublic, publicDate } = track;
      const image = await uploadFile(track.thumbnail);
      const audio = await uploadFile(track.audio);
      const response = await api.post('/track/create', {
        title,
        artist,
        publicDate,
        isPublic,
        duration,
        image,
        audio,
      });
      const trackData = response.data.track;
      var transformedTrack: Track = {
        id: trackData._id,
        title: trackData.title,
        artist: trackData.artist,
        thumbnail: trackData.image,
        uploader: trackData.userId,
        audio: trackData.audio,
        lyrics: trackData.lyrics,
        duration: trackData.duration,
        privacy: trackData.isPublic,
        banned: trackData.isBanned,
        publicDate: trackData.publicDate,
      };
      return transformedTrack;
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`);
    }
  }
);
const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    getNewUploadSuccess: (state, action) => {
      state.newUpload = action.payload;
      state.loading = false;
      state.error = null;
    },
    getNewUploadFailed: (state, action) => {
      state.newUpload = [];
      state.loading = false;
      state.error = action.payload;
    },
    getUserUploadSuccess: (state, action) => {
      state.trackByUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserUploadFailed: (state, action) => {
      state.trackByUser = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(uploadTrackAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadTrackAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.newUpload.push(action.payload);
    });
    builder.addCase(uploadTrackAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchTrackById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTrackById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.viewedTrack = action.payload;
    });
    builder.addCase(fetchTrackById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  getNewUploadSuccess,
  getNewUploadFailed,
  getUserUploadSuccess,
  getUserUploadFailed,
} = trackSlice.actions;

export default trackSlice.reducer;
