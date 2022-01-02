import React from "react";
import { MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import midiNumberToNote from "midi-note";
import SoundfontProvider from "./SoundfontProvider";
import KeyboardShortcuts from "./KeyboardShortcuts";
import _ from 'lodash';
import PianoWithRecording from './PianoWithRecording';
import PropTypes from 'prop-types';



//SECTION

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

//!SECTION



export default class PianoKeyBoard extends React.Component <any, any> {
    


  render() {
    
    return (
      <>
       <div>Yerr</div>
        </>
    );
  }
}
KeyboardConfig.propTypes = {
    name: PropTypes.any,
    instrument: PropTypes.any,
    handleChange: PropTypes.func,
    firstNote: PropTypes.any,
    lastNote: PropTypes.any,
    defaultValue: PropTypes.any,
  };
function KeyboardConfig(props: { handleChange: any; instrument: any; firstNote: any; lastNote: any; }) {
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


  function NoteSelector(props: { name: string | undefined; value?: string | number | readonly string[] | undefined; defaultValue: string | number | readonly string[] | undefined; handleChange: React.ChangeEventHandler<HTMLSelectElement> | undefined; }) {
    return (
      <select
      className="text-black"
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
      >
        <ConvertNumbersToKeys/>
        </select>
    
    );
  }
  
  function InstrumentSelector(props: { name: string | undefined; value?: string | number | readonly string[] | undefined; defaultValue: string | number | readonly string[] | undefined; handleChange: React.ChangeEventHandler<HTMLSelectElement> | undefined; }) {
    return (
      <select
        className="text-black"
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
      >
        <GetInstruments/>
        </select>
    );
  }

  function ConvertNumbersToKeys()  {
  

    const noteRange = {
      first: 21,
      last: 108
    };
    const Notes: any[] = [];

    for (let i = noteRange.first; i < noteRange.last + 1; i++) {
      Notes.push(midiNumberToNote(i));
    }

    return Notes.map(x => <option key={x}>{x}</option>);
  }
}

function GetInstruments() {
  const list: any[] = [];
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
