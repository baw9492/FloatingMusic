import TrackPlayer, { Capability } from "react-native-track-player";

export default async () => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    // Capabilities that will show up when the notification is in the compact form on Android
    // compactCapabilities: [Capability.Play, Capability.Pause],
  });
};
