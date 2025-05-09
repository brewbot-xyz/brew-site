import { parseEmoji } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../button";

enum RepeatMode {
  OFF,
  REPEAT,
  REPEAT_ONE,
}

interface VoiceState {
  paused: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
}

function NowPlayingDemo() {
  const [fakeState, setFakeState] = React.useState<VoiceState>({
    paused: false,
    shuffle: false,
    repeatMode: RepeatMode.OFF,
  });

  const togglePause = React.useCallback(() => {
    setFakeState((prev) => ({ ...prev, paused: !prev.paused }));
  }, [setFakeState]);

  const toggleShuffle = React.useCallback(() => {
    setFakeState((prev) => ({ ...prev, shuffle: !prev.shuffle }));
  }, [setFakeState]);

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
  }, [setFakeState]);

  return (
    <div className="flex w-full flex-col items-center">
      <Image
        className="mx-auto w-full rounded-2xl"
        src="/now_playing_demo.png"
        alt="Now Playing Demo"
        width={1920}
        height={1080}
        draggable={false}
        loading="lazy"
      />
      <section className="flex w-full justify-center space-x-2 pt-2">
        <Button
          className="w-full"
          variant={fakeState.shuffle ? "success" : "secondary"}
          onClick={toggleShuffle}
        >
          {parseEmoji("<:shuffle:1362211982568063047>")}
        </Button>
        <Button className="w-full" variant="secondary">
          {parseEmoji("<:previous:1362211973709828250>")}
        </Button>
        <Button className="w-full" variant="secondary" onClick={togglePause}>
          {parseEmoji(
            fakeState.paused ? "<:play:1362211925923991603>" : "<:pause:1362211964251668541>"
          )}
        </Button>
        <Button className="w-full" variant="secondary">
          {parseEmoji("<:next:1362211956056133752>")}
        </Button>
        <Button
          className="w-full"
          variant={fakeState.repeatMode === RepeatMode.OFF ? "secondary" : "success"}
          onClick={cycleRepeatMode}
        >
          {parseEmoji(
            fakeState.repeatMode === RepeatMode.REPEAT_ONE
              ? "<:repeatsingle:1362211936539771101>"
              : "<:repeat:1362211945700397239>"
          )}
        </Button>
      </section>
    </div>
  );
}

export default React.memo(NowPlayingDemo);
