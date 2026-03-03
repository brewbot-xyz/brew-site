import Image from "next/image";
import React from "react";
import { parseEmoji } from "@/lib/utils";
import { Button } from "../button";

enum RepeatMode {
  OFF = 0,
  REPEAT = 1,
  REPEAT_ONE = 2,
}

interface VoiceState {
  paused: boolean;
  repeatMode: RepeatMode;
  shuffle: boolean;
}

function NowPlayingDemo() {
  const [fakeState, setFakeState] = React.useState<VoiceState>({
    paused: false,
    shuffle: false,
    repeatMode: RepeatMode.OFF,
  });

  const togglePause = React.useCallback(() => {
    setFakeState((prev) => ({ ...prev, paused: !prev.paused }));
  }, []);

  const toggleShuffle = React.useCallback(() => {
    setFakeState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
  }, []);

  const cycleRepeatMode = React.useCallback(() => {
    setFakeState((prev) => ({
      ...prev,
      repeatMode:
        prev.repeatMode === RepeatMode.OFF
          ? RepeatMode.REPEAT
          : prev.repeatMode === RepeatMode.REPEAT
            ? RepeatMode.REPEAT_ONE
            : RepeatMode.OFF,
    }));
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <Image
        alt="Now Playing Demo"
        className="mx-auto w-full rounded-2xl"
        draggable={false}
        height={1080}
        loading="lazy"
        src="/assets/music-demo.png"
        width={1920}
      />
      <section className="flex w-full justify-center space-x-2 pt-2">
        <Button
          className="w-full"
          onClick={toggleShuffle}
          variant={fakeState.shuffle ? "success" : "secondary"}
        >
          {parseEmoji("<:shuffle:1362211982568063047>")}
        </Button>
        <Button className="w-full" variant="secondary">
          {parseEmoji("<:previous:1362211973709828250>")}
        </Button>
        <Button className="w-full" onClick={togglePause} variant="secondary">
          {parseEmoji(
            fakeState.paused
              ? "<:play:1362211925923991603>"
              : "<:pause:1362211964251668541>",
          )}
        </Button>
        <Button className="w-full" variant="secondary">
          {parseEmoji("<:next:1362211956056133752>")}
        </Button>
        <Button
          className="w-full"
          onClick={cycleRepeatMode}
          variant={
            fakeState.repeatMode === RepeatMode.OFF ? "secondary" : "success"
          }
        >
          {parseEmoji(
            fakeState.repeatMode === RepeatMode.REPEAT_ONE
              ? "<:repeatsingle:1362211936539771101>"
              : "<:repeat:1362211945700397239>",
          )}
        </Button>
      </section>
    </div>
  );
}

export default React.memo(NowPlayingDemo);
