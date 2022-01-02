import React from 'react';
import { Piano } from 'react-piano';

const DURATION_UNIT = 0.2;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

class PianoWithRecording extends React.Component <any, any>{
  static defaultProps = {
    notesRecorded: false,
    
    
  };

  state = {
    keysDown: {},
    noteDuration: DEFAULT_NOTE_DURATION,
    notesRecorded: false,

  };

  onPlayNoteInput = (midiNumber: any) => {
    this.setState({
      notesRecorded: false,
    });
  };

  onStopNoteInput = (midiNumber: any, { prevActiveNotes }: any) => {
    if (this.state.notesRecorded === false) {
      this.recordNotes(prevActiveNotes, this.state.noteDuration);
      this.setState({
        notesRecorded: true,
        noteDuration: DEFAULT_NOTE_DURATION,
      });
    }
  };


  recordNotes = (midiNumbers: any[], duration: number) => {
    if (this.props.recording.mode !== 'RECORDING') {
      return;
    }
    const newEvents = midiNumbers.map((midiNumber: any) => {
      return {
        midiNumber,
        time: this.props.recording.currentTime,
        duration: duration,
      };
    });
    this.props.setRecording({
      events: this.props.recording.events.concat(newEvents),
      currentTime: this.props.recording.currentTime + duration,
    });
  };

  render() {
    const {
      playNote,
      stopNote,
      recording,
      setRecording,
      ...pianoProps
    } = this.props;

    const { mode, currentEvents } = this.props.recording;
    const activeNotes =
      mode === 'PLAYING' ? currentEvents.map((event: { midiNumber: any; }) => event.midiNumber) : null;
    return (
      <div>
        <Piano
          playNote={this.props.playNote}
          stopNote={this.props.stopNote}
          onPlayNoteInput={this.onPlayNoteInput}
          onStopNoteInput={this.onStopNoteInput}
          activeNotes={activeNotes}
          {...pianoProps}
        />
      </div>
    );
  }
}

export default PianoWithRecording;
