import React,  { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import {  useStoreState } from '../../../store/store';
import { ChordMapCard } from './ChordMapCard';


const data = [
    { name: "CMD", desc: "Lists available commands.", example: "CMD" },
    { name: "ID", desc: "Identifies device, such as 'CHARACHORDER ONE M0", example: "ID" },
    { name: "VER", desc: "Returns the current firmware version, such as '1.5.16'", example: "VER"},
    { name: "CML", desc: "Used for getting, setting (adding or overwriting), and deleting chordmaps.", example: "VAR B1 2E"},
    { name: "VAR", desc: "Used for getting and settings parameters. This includes setting custom chordmaps.", example: "CML C1 0"},
    { name: "RST", desc: "Restarts/reboots the microcontroller hardware. It has additional arguments for Factory and Bootloader.", example: "RST"},
    //{ name: "RAM", desc: "Prints the current amount of SRAM available. This is primarily used for debugging.", example: "RAM"},
    //{ name: "SIM", desc: "Simulates/injects a chord and outputs the chord output if the chord exists in the chord library. This is primarily used for debugging.", example: "SIM CHORD 000000000000C1AE46DED6731EC20F2A"},

  ]

export function SerialCommandTable(): ReactElement {

  return (
    <React.Fragment>
    <table className='w-3/6 ml-8 overflow-y-auto'>
    <tr>
      <th>Command</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
    {data.map((val, key) => {
      return (
        <tr className='border-y-2' key={key}>
          <td>{val.name}</td>
          <td>{val.desc}</td>
          <td className='text-center'>{val.example}</td>
        </tr>
      )
    })}
  </table>
  </React.Fragment>
  );
}


const CardColumn = styled.div.attrs({
  className: `flex flex-wrap flex-col items-center center justify-center`,
})``;
