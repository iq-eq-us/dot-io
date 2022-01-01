import React, { Component } from "react";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import midiNumberToNote from "midi-note";
import SoundfontProvider from "./SoundfontProvider";
import KeyboardShortcuts from "./KeyboardShortcuts";
import _ from 'lodash';
import PianoWithRecording from './PianoWithRecording';
import PropTypes from 'prop-types';



//SECTION

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

//!SECTION



export default class PianoKeyBoard extends React.Component <any, any> {
    
    constructor(props) {
        super(props);
         this.state  = {
            recording: {
              mode: 'RECORDING',
              events: [],
              currentTime: 0,
              currentEvents: [],
              firstNote: "C3",
              lastNote: "B5",
              instrument: "acoustic_grand_piano"
            },
          };
    this.handleChange = this.handleChange.bind(this);
    this.scheduledEvents = [];

  }



  handleChange(e) {
      
    const { name, value } = e.target;

      this.setState({
        recording: Object.assign({}, this.state.recording, {[name]: value}),
        
      });
     
  }

    getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map(event => event.time + event.duration),
    );
  };

  setRecording = value => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value),
    });
  };

  onClickPlay = () => {
    this.setRecording({
      mode: 'PLAYING',
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, event => [
        event.time,
        event.time + event.duration,
      ]),
    );
    startAndEndTimes.forEach(time => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter(event => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents,
          });
        }, time * 1000),
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach(scheduledEvent => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: 'RECORDING',
      currentEvents: [],
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: 'RECORDING',
      currentEvents: [],
      currentTime: 0,
    });
  };


  render() {
    const firstNote = MidiNumbers.fromNote(this.state.recording.firstNote);
    const lastNote = MidiNumbers.fromNote(this.state.recording.lastNote);
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.EXTENDED_ROW
    });

    return (
      <>
        <KeyboardConfig
          firstNote={this.state.recording.firstNote}
          lastNote={this.state.recording.lastNote}
          handleChange={this.handleChange}
          instrument={this.state.recording.instrument}
        />
        <br />

        
            <SoundfontProvider
              instrumentName={this.state.recording.instrument}
              audioContext={audioContext}
              hostname={soundfontHostname}
              render={({ isLoading, playNote, stopNote }) => (
                <PianoWithRecording
                recording={this.state.recording}
                setRecording={this.setRecording}
                  noteRange={{ first: firstNote, last: lastNote }}
                  width={1000}
                  playNote={playNote}
                  stopNote={stopNote}
                  disabled={isLoading}
                  keyboardShortcuts={keyboardShortcuts}
                  
                />
              )}
            />
          <div className="mt-5">
          <button onClick={this.onClickPlay} className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]">Play</button>
          <button onClick={this.onClickStop} className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]">Stop</button>
          <button onClick={this.onClickClear} className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]">Clear</button>
        </div>
        <div className="mt-5">
          <strong className ="text-white">Recorded notes</strong>
          <div className ="text-white">{JSON.stringify(this.state.recording.events)}</div>
        </div>
        </>
    );
  }
}
KeyboardConfig.propTypes = {
    name: PropTypes.any,
    instrument: PropTypes.any,
    handleChange: PropTypes.func,
    firstNote: PropTypes.any,
    lastNote: PropTypes.string,
    defaultValue: PropTypes.any,
  };
function KeyboardConfig(props) {
  return (
      
    <>
      <label >Instrument: </label>
      <InstrumentSelector
        name="instrument"
        handleChange={props.handleChange}
        defaultValue={props.instrument}
        //value={props.instrument}
      />
      <br />
      <label>First Note: </label>
      <NoteSelector
        name="firstNote"
        handleChange={props.handleChange}
        defaultValue={props.firstNote}
      />

      <label> Last Note: </label>
      <NoteSelector
        name="lastNote"
        handleChange={props.handleChange}
        defaultValue={props.lastNote}
      />
    </>
  );
  InstrumentSelector.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired
}
NoteSelector.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired

}

  function NoteSelector(props) {
    return (
      <select
      className="text-black"
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
      >
        <ConvertNumbersToKeys />
      </select>
    );
  }

  
  function InstrumentSelector(props) {
    return (
      <select
        className="text-black"
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
      >
        <GetInstruments />
      </select>
    );
  }

  function ConvertNumbersToKeys()  {
  

    const noteRange = {
      first: 21,
      last: 108
    };

    const Notes = [];

    for (let i = noteRange.first; i < noteRange.last + 1; i++) {
      Notes.push(midiNumberToNote(i));
    }

    return Notes.map(x => <option key={x}>{x}</option>);
  }
}

function GetInstruments() {
  const list = [];
  for (let i = 0; i < instruments.length; i++) {
    list.push(instruments[i]);
  }

  return (list.map(x => <option key={x}>{x}</option>));
}

const instruments = [
  "accordion",
  "acoustic_bass",
  "acoustic_grand_piano",
  "acoustic_guitar_nylon",
  "acoustic_guitar_steel",
  "agogo",
  "alto_sax",
  "applause",
  "bagpipe",
  "banjo",
  "baritone_sax",
  "bassoon",
  "bird_tweet",
  "blown_bottle",
  "brass_section",
  "breath_noise",
  "bright_acoustic_piano",
  "celesta",
  "cello",
  "choir_aahs",
  "church_organ",
  "clarinet",
  "clavinet",
  "contrabass",
  "distortion_guitar",
  "drawbar_organ",
  "dulcimer",
  "electric_bass_finger",
  "electric_bass_pick",
  "electric_grand_piano",
  "electric_guitar_clean",
  "electric_guitar_jazz",
  "electric_guitar_muted",
  "electric_piano_1",
  "electric_piano_2",
  "english_horn",
  "fiddle",
  "flute",
  "french_horn",
  "fretless_bass",
  "fx_1_rain",
  "fx_2_soundtrack",
  "fx_3_crystal",
  "fx_4_atmosphere",
  "fx_5_brightness",
  "fx_6_goblins",
  "fx_7_echoes",
  "fx_8_scifi",
  "glockenspiel",
  "guitar_fret_noise",
  "guitar_harmonics",
  "gunshot",
  "harmonica",
  "harpsichord",
  "helicopter",
  "honkytonk_piano",
  "kalimba",
  "koto",
  "lead_1_square",
  "lead_2_sawtooth",
  "lead_3_calliope",
  "lead_4_chiff",
  "lead_5_charang",
  "lead_6_voice",
  "lead_7_fifths",
  "lead_8_bass__lead",
  "marimba",
  "melodic_tom",
  "music_box",
  "muted_trumpet",
  "oboe",
  "ocarina",
  "orchestra_hit",
  "orchestral_harp",
  "overdriven_guitar",
  "pad_1_new_age",
  "pad_2_warm",
  "pad_3_polysynth",
  "pad_4_choir",
  "pad_5_bowed",
  "pad_6_metallic",
  "pad_7_halo",
  "pad_8_sweep",
  "pan_flute",
  "percussive_organ",
  "percussion",
  "piccolo",
  "pizzicato_strings",
  "recorder",
  "reed_organ",
  "reverse_cymbal",
  "rock_organ",
  "seashore",
  "shakuhachi",
  "shamisen",
  "shanai",
  "sitar",
  "slap_bass_1",
  "slap_bass_2",
  "soprano_sax",
  "steel_drums",
  "string_ensemble_1",
  "string_ensemble_2",
  "synth_bass_1",
  "synth_bass_2",
  "synth_brass_1",
  "synth_brass_2",
  "synth_choir",
  "synth_drum",
  "synth_strings_1",
  "synth_strings_2",
  "taiko_drum",
  "tango_accordion",
  "telephone_ring",
  "tenor_sax",
  "timpani",
  "tinkle_bell",
  "tremolo_strings",
  "trombone",
  "trumpet",
  "tuba",
  "tubular_bells",
  "vibraphone",
  "viola",
  "violin",
  "voice_oohs",
  "whistle",
  "woodblock",
  "xylophone"
];
